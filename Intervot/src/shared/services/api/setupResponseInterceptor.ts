import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/shared/stores/userStore";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 인터셉터에서의 토큰 갱신 Promise를 관리
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

          // 이미 인터셉터에서 토큰 갱신 중이면 대기
          if (interceptorRefreshPromise) {
            console.log("🔄 인터셉터 토큰 갱신 진행 중... 대기");
            newAccessToken = await interceptorRefreshPromise;
          }
          // store에서 토큰 갱신 중이면 대기
          else if (store.isRefreshing) {
            console.log("🔄 스토어에서 토큰 갱신 진행 중... 대기");

            let waitCount = 0;
            while (store.isRefreshing && waitCount < 50) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              waitCount++;
            }

            if (store.accessToken) {
              newAccessToken = store.accessToken;
            } else {
              throw new Error("Store token refresh failed");
            }
          }
          // 새로운 토큰 갱신 시작
          else {
            console.log("🚨 401 에러 발생 - 인터셉터에서 토큰 갱신 시작");

            interceptorRefreshPromise = store.refreshTokens();

            try {
              newAccessToken = await interceptorRefreshPromise;
            } finally {
              interceptorRefreshPromise = null;
            }
          }

          // 새 토큰으로 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("❌ 인터셉터 토큰 갱신 실패:", refreshError);

          const store = useAuthStore.getState();

          try {
            await store.logout();
          } catch (logoutError) {
            console.error("로그아웃 API 호출 실패:", logoutError);
          }

          store.logout({ showAlert: true, redirect: true });

          return Promise.reject(refreshError);
        } finally {
          interceptorRefreshPromise = null;
        }
      }

      return Promise.reject(error);
    }
  );
};
