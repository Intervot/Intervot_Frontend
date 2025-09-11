import LoginPage from "@/web/pages/auth/LoginPage";
import SignupPage from "@/web/pages/auth/SignupPage";
import Header from "@/web/layouts/Header";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/userStore";
import InterviewSetupPage from "@/web/pages/interview/InterviewSetupPage";
import InterviewPage from "@/web/pages/interview/InterviewPage";
import ReportPage from "@/web/pages/report/ReportPage";
import CompetencyQuestionsPage from "@/web/pages/questions/CompetencyQuestionsPage";
import FrequentQuestionsPage from "@/web/pages/questions/FrequentQuestionsPage";
import FaqPage from "@/web/pages/other/FaqPage";
import MypagePage from "@/web/pages/mypage/MypagePage";
import { ReactNode, useEffect } from "react";
import ErrorPage from "@/shared/pages/ErrorPage";
import MainPage from "@/shared/pages/MainPage";

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
    const isMainPage = currentPath === "/";
    if (!isMainPage && !isAuthPage && (!isAuthenticated || !accessToken)) {
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
        <Route path="/" element={<MainPage />} />
        <Route path="/interview/setup" element={<InterviewSetupPage />} />
        <Route
          path="/interview/:role/:level/:question_id"
          element={<InterviewPage />}
        />
        <Route path="/report" element={<ReportPage />} />
        <Route
          path="/questions/competency"
          element={<CompetencyQuestionsPage />}
        />
        <Route path="/questions/frequent" element={<FrequentQuestionsPage />} />
        <Route path="/other/faq" element={<FaqPage />} />
        <Route path="/mypage" element={<MypagePage />} />
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
