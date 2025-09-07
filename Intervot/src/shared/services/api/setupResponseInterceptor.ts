import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/shared/stores/userStore";
import { authService } from "@/shared/services/auth/authServices";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let interceptorRefreshPromise: Promise<string> | null = null;

export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const store = useAuthStore.getState();

          if (!store.refreshToken) {
            throw new Error("No refresh token available");
          }

          let newAccessToken: string;

          if (interceptorRefreshPromise) {
            console.log("🔄 인터셉터 토큰 갱신 진행 중... 대기");
            newAccessToken = await interceptorRefreshPromise;
          } else if (store.isRefreshing) {
            console.log("🔄 사전 토큰 갱신 진행 중... 잠시 대기");

            let waitCount = 0;
            while (store.isRefreshing && waitCount < 50) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              waitCount++;
            }

            if (!store.isRefreshing && store.accessToken) {
              newAccessToken = store.accessToken;
            } else {
              throw new Error(
                "Pre-refresh failed, starting interceptor refresh"
              );
            }
          } else {
            console.log("🚨 401 에러 발생 - 인터셉터에서 토큰 긴급 갱신");

            interceptorRefreshPromise = (async (): Promise<string> => {
              try {
                store.clearRefreshTimer();

                const tokenResponse = await authService.refresh(
                  store.refreshToken!
                );

                store.updateAccessToken(
                  tokenResponse.accessToken,
                  tokenResponse.accessTokenExpiresAt
                );

                store.scheduleTokenRefresh();

                console.log("✅ 인터셉터 토큰 갱신 완료");
                return tokenResponse.accessToken;
              } finally {
                interceptorRefreshPromise = null;
              }
            })();

            newAccessToken = await interceptorRefreshPromise;
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("❌ 인터셉터 토큰 갱신 실패:", refreshError);

          interceptorRefreshPromise = null;

          const store = useAuthStore.getState();

          const isAxiosError = (error: unknown): error is AxiosError => {
            return (
              typeof error === "object" && error !== null && "response" in error
            );
          };

          if (
            isAxiosError(refreshError) &&
            refreshError.response?.status === 401
          ) {
            console.warn("⚠️ Refresh Token 만료 - 로그아웃 처리");

            await store.logout({
              showAlert: true,
              redirect: true,
              callApi: false,
            });
          } else {
            try {
              await authService.logout();
            } catch (logoutError) {
              console.error("로그아웃 API 호출 실패:", logoutError);
            }

            await store.logout({
              showAlert: true,
              redirect: true,
              callApi: false,
            });
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
