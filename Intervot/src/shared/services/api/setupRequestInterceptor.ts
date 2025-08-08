import { useDummyStore } from "@/shared/stores/dummyStore";
import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const setupRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { accessToken, isAuthenticated } = useDummyStore.getState();

      if (isAuthenticated && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};
