import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const setupInterceptors = async () => {
  const { setupRequestInterceptor } = await import("./setupRequestInterceptor");
  const { setupResponseInterceptor } = await import(
    "./setupResponseInterceptor"
  );

  setupRequestInterceptor(apiClient);
  setupResponseInterceptor(apiClient);
};

setupInterceptors();
