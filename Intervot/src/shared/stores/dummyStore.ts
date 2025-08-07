import { create } from "zustand";

interface StoreState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
  isRefreshing: boolean;
  updateAccessToken: (token: string, expiresAt: string) => void;
  clearRefreshTimer: () => void;
  scheduleTokenRefresh: () => void;
  logout: () => void;
}

export const useDummyStore = create<StoreState>((set, get) => ({
  accessToken: "dummy-access-token",
  refreshToken: "dummy-refresh-token",
  isAuthenticated: true,
  isRefreshing: false,

  updateAccessToken: (token, expiresAt) => {
    console.log("[dummyStore] 토큰 업데이트", token, expiresAt);
    set({ accessToken: token });
  },

  clearRefreshTimer: () => {
    console.log("[dummyStore] 리프레시 타이머 클리어");
  },

  scheduleTokenRefresh: () => {
    console.log("[dummyStore] 토큰 리프레시 스케줄링");
  },

  logout: () => {
    console.log("[dummyStore] 로그아웃 처리");
    set({
      accessToken: "",
      refreshToken: "",
      isAuthenticated: false,
    });
  },
  getState: () => get(),
}));
