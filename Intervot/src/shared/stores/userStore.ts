import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/shared/services/auth/authServices";

interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
}

interface UserInfo {
  nickname: string | undefined;
}

interface AuthState {
  // 인증 상태
  isAuthenticated: boolean;
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  refreshTimer: NodeJS.Timeout | null;
  isRefreshing: boolean;

  // 액션들
  login: (user: UserInfo, tokens: Tokens) => void;
  logout: (options?: { showAlert?: boolean; redirect?: boolean }) => void;
  updateAccessToken: (accessToken: string, expiresAt?: number) => void;
  refreshTokens: () => Promise<string>; // 토큰 갱신을 외부에서도 사용할 수 있게
  scheduleTokenRefresh: () => void;
  clearRefreshTimer: () => void;
  setRefreshing: (isRefreshing: boolean) => void;
}

// 토큰 갱신 함수를 store 외부로 분리
const createTokenRefreshFunction = (getState: () => AuthState) => {
  return async (): Promise<string> => {
    const store = getState();

    // 이미 갱신 중이면 중복 실행 방지
    if (store.isRefreshing) {
      console.log("🔄 토큰 갱신이 이미 진행 중입니다.");
      // 갱신 완료까지 대기
      let waitCount = 0;
      while (store.isRefreshing && waitCount < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        waitCount++;
      }

      if (store.accessToken) {
        return store.accessToken;
      }
      throw new Error("토큰 갱신 대기 중 실패");
    }

    try {
      store.setRefreshing(true);

      if (!store.refreshToken) {
        throw new Error("No refresh token available");
      }

      console.log("🔄 토큰 갱신 시작...", new Date());
      const response = await authService.refresh(store.refreshToken);

      // 새 토큰 정보 업데이트
      store.updateAccessToken(
        response.accessToken,
        response.accessTokenExpiresAt
      );

      console.log("✅ 토큰 갱신 완료", new Date(response.accessTokenExpiresAt));

      // 다음 갱신 스케줄링
      store.scheduleTokenRefresh();

      return response.accessToken;
    } catch (error) {
      console.error("❌ 토큰 갱신 실패:", error);

      // 갱신 실패 시 세션 만료 처리
      store.logout({
        showAlert: true,
        redirect: true,
      });

      throw error;
    } finally {
      store.setRefreshing(false);
    }
  };
};

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      // 토큰 갱신 함수 생성
      const refreshTokens = createTokenRefreshFunction(get);

      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        accessTokenExpiresAt: null,
        isAuthenticated: false,
        refreshTimer: null,
        isRefreshing: false,

        login: (user, tokens) => {
          // 기존 타이머 정리
          const currentTimer = get().refreshTimer;
          if (currentTimer) {
            clearTimeout(currentTimer);
          }

          console.log(
            "🔐 로그인 - 토큰 만료시간:",
            new Date(tokens.accessTokenExpiresAt)
          );

          set({
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            accessTokenExpiresAt: tokens.accessTokenExpiresAt,
            isAuthenticated: true,
            refreshTimer: null,
            isRefreshing: false,
          });

          // 토큰 갱신 스케줄링 시작
          get().scheduleTokenRefresh();
        },

        logout: (options = {}) => {
          const { showAlert = false, redirect = true } = options;

          // 타이머 정리
          const currentTimer = get().refreshTimer;
          if (currentTimer) {
            clearTimeout(currentTimer);
          }

          console.log("🚪 로그아웃 처리");

          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            accessTokenExpiresAt: null,
            isAuthenticated: false,
            refreshTimer: null,
            isRefreshing: false,
          });

          // 세션 만료 알림 (옵션)
          if (showAlert) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          }

          // 로그인 페이지로 리다이렉트 (옵션)
          if (redirect && typeof window !== "undefined") {
            // replace를 사용해서 뒤로가기 방지
            window.location.replace("/login");
          }
        },

        updateAccessToken: (accessToken, expiresAt) => {
          set((state) => ({
            accessToken,
            accessTokenExpiresAt: expiresAt || state.accessTokenExpiresAt,
          }));
        },

        refreshTokens, // 외부에서 사용할 수 있도록 노출

        scheduleTokenRefresh: () => {
          const state = get();
          const { accessTokenExpiresAt, refreshTimer, isRefreshing } = state;

          // 기존 타이머 정리
          if (refreshTimer) {
            console.log("⏰ 기존 타이머 정리");
            clearTimeout(refreshTimer);
            set({ refreshTimer: null });
          }

          // 이미 갱신 중이면 스케줄하지 않음
          if (isRefreshing) {
            console.log("🔄 토큰 갱신 중이므로 스케줄링을 건너뜁니다.");
            return;
          }

          if (!accessTokenExpiresAt) {
            console.warn(
              "⚠️ 토큰 만료 시간이 없어서 자동 갱신을 스케줄할 수 없습니다."
            );
            return;
          }

          const now = Date.now();
          const expiresAt = accessTokenExpiresAt;

          // 토큰 만료 30초 전에 갱신
          const REFRESH_BEFORE_EXPIRY = 30 * 1000;
          const refreshTime = expiresAt - REFRESH_BEFORE_EXPIRY;

          console.log("📅 현재 시간:", new Date(now));
          console.log("📅 토큰 만료시간:", new Date(expiresAt));
          console.log("📅 갱신 예정시간:", new Date(refreshTime));

          // 이미 갱신 시점이 지났으면 즉시 갱신
          if (now >= refreshTime) {
            console.log("🚨 토큰 갱신 시점입니다. 즉시 갱신합니다.");
            refreshTokens();
            return;
          }

          // 갱신까지 남은 시간 계산
          const timeUntilRefresh = refreshTime - now;

          console.log(
            `⏰ ${Math.round(timeUntilRefresh / (60 * 1000))}분 ${Math.round(
              (timeUntilRefresh % (60 * 1000)) / 1000
            )}초 후 토큰 갱신 예정`
          );

          const newTimer = setTimeout(() => {
            console.log("⏰ 예약된 토큰 갱신 시작");
            refreshTokens();
          }, timeUntilRefresh);

          set({ refreshTimer: newTimer });
        },

        clearRefreshTimer: () => {
          const currentTimer = get().refreshTimer;
          if (currentTimer) {
            clearTimeout(currentTimer);
            set({ refreshTimer: null });
          }
        },

        setRefreshing: (isRefreshing) => {
          set({ isRefreshing });
        },
      };
    },
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => {
        console.log("🔄 Zustand persist 복원 시작");

        return (state, error) => {
          if (error) {
            console.error("❌ Zustand persist 복원 실패:", error);
            return;
          }

          console.log("✅ Zustand persist 복원 완료", state);

          // 복원 완료 후 토큰 상태 검증 및 초기화
          if (state?.isAuthenticated && state?.accessTokenExpiresAt) {
            // 토큰 만료 검사
            if (Date.now() >= state.accessTokenExpiresAt) {
              console.warn("⚠️ 복원된 토큰이 만료됨 - 로그아웃 처리");
              state.logout?.({ showAlert: true, redirect: true });
            } else {
              // 유효한 토큰이면 갱신 스케줄 시작
              console.log("✅ 유효한 토큰 복원 - 갱신 스케줄 시작");
              setTimeout(() => {
                state.scheduleTokenRefresh?.();
              }, 100);
            }
          }
        };
      },
    }
  )
);

// 유틸리티 함수들
export const initializeTokenRefresh = () => {
  const store = useAuthStore.getState();

  if (!store.isAuthenticated || !store.accessTokenExpiresAt) {
    return;
  }

  const now = Date.now();
  const expiresAt = store.accessTokenExpiresAt;

  console.log("🔄 페이지 로드 - 토큰 상태 확인");
  console.log("현재 시간:", new Date(now));
  console.log("토큰 만료시간:", new Date(expiresAt));

  if (now >= expiresAt) {
    console.warn("⚠️ 토큰이 이미 만료되었습니다. 로그아웃 처리합니다.");
    store.logout({ showAlert: true, redirect: true });
    return;
  }

  console.log("✅ 토큰이 유효합니다. 갱신 스케줄을 복원합니다.");
  store.scheduleTokenRefresh();
};

export const cleanupTokenRefresh = () => {
  const store = useAuthStore.getState();
  store.clearRefreshTimer();
};
