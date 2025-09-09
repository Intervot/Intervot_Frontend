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
      console.warn("❌ 로그인 API 실패", error);
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
      console.warn("❌ 회원가입 API 실패", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(`${API_BASE_URL}/api/auth/logout`);
    } catch (error) {
      console.error("❌ 로그아웃 API 실패:", error);
      throw error;
    }
  },

  refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
      const response = await apiClient.post<RefreshTokenResponse>(
        `${API_BASE_URL}/api/auth/refresh`,
        { refreshToken }
      );
      console.log("✅ 토큰 갱신 API 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ 토큰 갱신 API 실패:", error);
      throw error;
    }
  },
};
