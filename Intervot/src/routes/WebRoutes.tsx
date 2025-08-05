import LoginPage from "@/web/pages/LoginPage";
import SignupPage from "@/web/pages/SignupPage";
import { Route, Routes } from "react-router-dom";

const WebRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<div className="text-red-500">웹 메인 페이지</div>}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <div className="text-center p-8">404 - 페이지를 찾을 수 없습니다</div>
        }
      />
    </Routes>
  );
};

export default WebRoutes;
