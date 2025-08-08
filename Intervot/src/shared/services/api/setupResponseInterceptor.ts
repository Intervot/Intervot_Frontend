import { useDummyStore } from "@/shared/stores/dummyStore";
import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let interceptorRefreshPromise: Promise<string> | null = null;
export const dummyRefreshToken = async (
  refreshToken: string
): Promise<{ accessToken: string; accessTokenExpiresAt: string }> => {
  console.log("[더미] 토큰 갱신 요청", refreshToken);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    accessToken: "new-dummy-access-token",
    accessTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  };
};

export const dummyLogout = async () => {
  console.log("[더미] 로그아웃 호출");
};
export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const store = useDummyStore.getState();

          if (!store.refreshToken) {
            throw new Error("리프레시 토큰이 없습니다. 로그아웃 처리합니다.");
          }

          let newAccessToken: string;

          if (interceptorRefreshPromise) {
            console.log("🔄 만료후 인터셉터 토큰 갱신 진행 중... 대기");
            newAccessToken = await interceptorRefreshPromise;
          } else if (store.isRefreshing) {
            console.log("🔄 만료전 사전 토큰 갱신 진행 중... 잠시 대기");

            let waitCount = 0;
            while (store.isRefreshing && waitCount < 50) {
              await new Promise((resolve) => setTimeout(resolve, 100));
              waitCount++;
            }

            if (!store.isRefreshing && store.accessToken) {
              newAccessToken = store.accessToken;
            } else {
              throw new Error(
                "사전 토큰 갱신 실패 또는 토큰이 없습니다. 로그아웃 처리합니다."
              );
            }
          } else {
            interceptorRefreshPromise = (async (): Promise<string> => {
              try {
                store.clearRefreshTimer();

                const tokenResponse = await dummyRefreshToken(
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

          try {
            await dummyLogout();
          } catch (logoutError) {
            console.error("로그아웃 호출 실패:", logoutError);
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
