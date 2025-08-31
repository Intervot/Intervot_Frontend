import axios from "axios";
import { setupRequestInterceptor } from "./setupRequestInterceptor";
import { setupResponseInterceptor } from "./setupResponseInterceptor";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const setupInterceptors = async () => {
  setupRequestInterceptor(apiClient);
  setupResponseInterceptor(apiClient);
};

setupInterceptors();
