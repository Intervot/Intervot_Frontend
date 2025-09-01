import axios from "axios";
import { apiClient } from "../api/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  nickname: string;
}
interface RefreshTokenResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
}
export const authService = {
  login: async (params: { email: string; password: string }) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/api/auth/login`,
        params
      );
      return response.data;
    } catch (error) {
      console.warn("API 호출 실패", error);
      throw error;
    }
  },
  signup: async (params: {
    email: string;
    nickname: string;
    password: string;
  }): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, params);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
  refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken }
    );
    console.log(response.data);

    return response.data;
  },
};
