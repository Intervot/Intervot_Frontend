// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  nickname: string;
}

// 더미 데이터 생성
const createDummyLoginResponse = (email: string): LoginResponse => {
  const now = Date.now();

  return {
    accessToken: `dummy_access_token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    refreshToken: `dummy_refresh_token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    accessTokenExpiresAt: now + 60 * 60 * 1000,
    nickname: email.split("@")[0] || "사용자",
  };
};

// 테스트용 계정
const DUMMY_USERS = [
  { email: "test@test.com", password: "1234" },
  { email: "admin@test.com", password: "1234" },
  { email: "user@test.com", password: "1234" },
];

export const authService = {
  login: async (params: { email: string; password: string }) => {
    // try {
    //   const response = await axios.post<LoginResponse>(
    //     `${API_BASE_URL}/api/auth/login`,
    //     params
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.warn("실제 API 호출 실패, 더미 데이터로 응답:", error);
    // }

    // 바로 더미 데이터 처리
    console.log("더미 로그인 시도:", params.email);

    // 실제 API 지연 시뮬레이션 (선택사항)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const validUser = DUMMY_USERS.find(
      (user) => user.email === params.email && user.password === params.password
    );

    if (validUser) {
      const dummyResponse = createDummyLoginResponse(params.email);
      console.log("✅ 더미 로그인 성공:", dummyResponse);
      return dummyResponse;
    } else {
      console.log("❌ 더미 로그인 실패: 잘못된 자격증명");
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  },
};
