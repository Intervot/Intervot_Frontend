import { apiClient } from "../api/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const interviewService = {
  // 인터뷰 셋업 페이지 분야 조회
  getInterviewCategories: async () => {
    try {
      const response = await apiClient.get(
        `${API_BASE_URL}/api/llm/session-category`
      );
      return response.data;
    } catch (error) {
      console.warn("❌ 인터뷰 분야 조회 API 실패", error);
      throw error;
    }
  },

  // 인터뷰 질문생성에 필요한 분야, 난이도 저장 및 질문 생성
  startInterview: async (params: { role: string; level: string }) => {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/api/llm/session-category`,
        params
      );
      return response.data;
    } catch (error) {
      console.warn("❌ 인터뷰 시작 API 실패", error);
      throw error;
    }
  },
};
