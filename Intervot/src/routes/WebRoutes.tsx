import LoginPage from "@/web/pages/LoginPage";
import SignupPage from "@/web/pages/SignupPage";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/authStore";
import InterviewPage from "@/web/pages/InterviewPage";
import ReportPage from "@/web/pages/ReportPage";
import MypagePage from "@/web/pages/MypagePage";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<LayoutWrapper />}>
        <Route
          path="/"
          element={<div className="text-red-500">웹 메인 페이지</div>}
        />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/mypage" element={<MypagePage />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="text-center p-8">404 - 페이지를 찾을 수 없습니다</div>
        }
      />
    </Routes>
  );
};

const LayoutWrapper = () => {
  const { isLoggedIn } = useAuthStore();
  const location = window.location.pathname;

  //로그인, 회원가입 페이지 제외
  if (!isLoggedIn && location !== "/login" && location !== "/signup") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default WebRoutes;
