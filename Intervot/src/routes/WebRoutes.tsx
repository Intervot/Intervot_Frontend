import LoginPage from "@/web/pages/auth/LoginPage";
import SignupPage from "@/web/pages/auth/SignupPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/userStore";
import ReportPage from "@/web/pages/Report/ReportPage";
import MypagePage from "@/web/pages/MypagePage";
import { ReactNode, useEffect } from "react";
import Header from "@/web/layouts/Header";
import ErrorPage from "@/shared/pages/ErrorPage";
import InterviewSetupPage from "@/web/pages/Interview/InterviewSetupPage";
import InterviewPage from "@/web/pages/Interview/InterviewPage";

interface LayoutWrapperProps {
  children: ReactNode;
}

const AuthMonitor = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath === "/login" || currentPath === "/signup";
    if (!isAuthPage && (!isAuthenticated || !accessToken)) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, accessToken, navigate]);

  return null;
};
const NotFoundPage = () => {
  return (
    <ErrorPage
      title="페이지를 찾을 수 없습니다"
      message="요청하신 페이지가 존재하지 않습니다."
      showRetryButton={false}
      showHomeButton={true}
    />
  );
};

const WebRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <LayoutWrapper>
      <AuthMonitor />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<div className="text-red-500">웹 메인 페이지</div>}
        />
        <Route
          path="/interview_setup"
          element={
            isAuthenticated ? (
              <InterviewSetupPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/interview/:role/:level" element={<InterviewPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route
          path="/mypage"
          element={
            isAuthenticated ? <MypagePage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/404" : "/"} replace />}
        />
      </Routes>
    </LayoutWrapper>
  );
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <main>
      <Header />
      <div className="flex-1 w-[60%] mx-auto min-h-[684px]">{children}</div>
    </main>
  );
};

export default WebRoutes;
