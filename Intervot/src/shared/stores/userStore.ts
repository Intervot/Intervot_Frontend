import { create } from "zustand";

// 토큰 관련 인터페이스
interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
}

// 사용자 정보 인터페이스
interface UserInfo {
  nickname: string;
}

// 전체 인증 상태 인터페이스
interface AuthState {
  // 인증 상태
  isAuthenticated: boolean;

  // 토큰 정보
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;

  // 사용자 정보
  user: UserInfo | null;

  // 액션들
  login: (user: UserInfo, tokens: Tokens) => void;
  logout: () => void;
  updateAccessToken: (accessToken: string, expiresAt?: number) => void;

  // 토큰 만료 확인
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 초기 상태
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiresAt: null,
  user: null,
  company: null,

  // 로그인 - 사용자 정보, 토큰, 회사 정보를 모두 설정
  login: (user, tokens) => {
    set({
      isAuthenticated: true,
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
    });
  },

  // 로그아웃 - 모든 상태 초기화
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
    });
  },

  // 액세스 토큰만 업데이트 (토큰 갱신 시 사용)
  updateAccessToken: (accessToken, expiresAt) => {
    set({
      accessToken,
      accessTokenExpiresAt: expiresAt || Date.now() + 60 * 60 * 1000, // 기본 1시간
    });
  },

  // 토큰 만료 확인
  isTokenExpired: () => {
    const { accessTokenExpiresAt } = get();
    if (!accessTokenExpiresAt) return true;
    return Date.now() >= accessTokenExpiresAt;
  },
}));
