import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  nickname: string;
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
      console.warn("실제 API 호출 실패", error);
    }

    // 실제 API 지연 시뮬레이션 (선택사항)
    await new Promise((resolve) => setTimeout(resolve, 300));
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
};
