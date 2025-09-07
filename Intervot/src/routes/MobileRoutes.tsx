import LoginPage from "@/app/pages/auth/LoginPage";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "@/shared/stores/userStore";
import ReportPage from "@/web/pages/report/ReportPage";
import MypagePage from "@/web/pages/mypage/MypagePage";
import { ReactNode, useEffect } from "react";
import Header from "@/app/layouts/Header";
import ErrorPage from "@/shared/pages/ErrorPage";
import InterviewSetupPage from "@/web/pages/interview/InterviewSetupPage";
import InterviewPage from "@/web/pages/interview/InterviewPage";
import AuthHeader from "@/app/layouts/AuthHeader";
import SignupPage from "@/app/pages/auth/SignupPage";
import Footer from "@/app/layouts/Footer";

interface LayoutWrapperProps {
  children: ReactNode;
}

const AuthMonitor = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const isAuthPage = currentPath === "/login" || currentPath === "/signup";
    const isMainPage = currentPath === "/";
    if (!isMainPage && !isAuthPage && (!isAuthenticated || !accessToken)) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, accessToken, navigate, location.pathname]);

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

const MobileRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <LayoutWrapper>
      <AuthMonitor />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<div className="text-red-500">모바일 메인 페이지</div>}
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
  const location = useLocation();
  const currentPath = location.pathname;
  const isAuthPage = currentPath === "/login" || currentPath === "/signup";
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthPage ? <AuthHeader /> : <Header />}

      <main className="flex-1 w-full">{children}</main>

      {!isAuthPage && isAuthenticated && <Footer />}
    </div>
  );
};

export default MobileRoutes;
