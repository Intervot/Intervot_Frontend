//import { apiClient } from "../api/apiClient";
import INTERVIEW_QUESTIONS from "@/shared/constants/INTERVIEW_QUESTIONS";

// 타입 정의
export interface Question {
  id: string;
  keyword: string[];
  content: string;
}
export interface QuestionData {
  questionsId: number;
  questions: Question[];
}

export interface CreateInterviewResponse {
  questionId: string;
}

export interface SelectInterviewResponse {
  questionId: string;
  questions: Question[];
  role: string;
  level: string;
}
export interface InterviewQuestionsType {
  [role: string]: {
    [level: string]: QuestionData;
  };
}

export const interviewService = {
  createInterview: async (params: {
    role: string;
    level: string;
  }): Promise<CreateInterviewResponse> => {
    try {
      // TODO: 실제 API 연동
      // const response = await apiClient.post('/api/interview/create', params);
      // return response.data;

      // 더미 - 새로운 questionId 생성
      return new Promise<CreateInterviewResponse>((resolve) => {
        setTimeout(() => {
          const questionId = `${Date.now()}_${params.role}_${params.level}`;

          resolve({
            questionId: questionId,
          });
        }, 1000);
      });
    } catch (error) {
      console.warn("❌ 면접 생성 API 실패", error);
      throw error;
    }
  },

  // 면접 조회 API (Interview 페이지에서 호출)
  getInterview: async (
    questionId: string
  ): Promise<SelectInterviewResponse> => {
    try {
      // TODO: 실제 API 연동
      // const response = await apiClient.get(`/api/interview/${questionId}`);
      // return response.data;

      return new Promise<SelectInterviewResponse>((resolve, reject) => {
        setTimeout(() => {
          const parts = questionId.split("_");
          if (parts.length !== 3) {
            reject(new Error("유효하지 않은 면접 ID입니다."));
            return;
          }

          const [, role, level] = parts;

          // constants에서 해당 데이터 조회
          const typedQuestions = INTERVIEW_QUESTIONS as InterviewQuestionsType;
          let questionData;

          if (typedQuestions[role]?.[level]) {
            questionData = typedQuestions[role][level];
          } else {
            questionData = typedQuestions.frontend?.beginner || {
              questionsId: 1,
              questions: [],
            };
          }

          resolve({
            questionId: questionId,
            questions: questionData.questions,
            role: role,
            level: level,
          });
        }, 800);
      });
    } catch (error) {
      console.warn("❌ 면접 조회 API 실패", error);
      throw error;
    }
  },
};
