import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/shared/assets/png/edited_logo.png";
import { Link } from "react-router-dom";
import MENUTABS from "../constants/MENUTABS";
import { useAuthStore } from "@/shared/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/services/auth/authServices";
import axios from "axios";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.user?.nickname);
  const logout = useAuthStore((state) => state.logout);

  const { mutate, isPending } = useMutation({
    mutationFn: authService.logout,
    onSuccess: (response) => {
      setIsDropdownOpen(false);
      console.log(response);
      logout();
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        console.log("Logout error status:", status);
        if (status === 401) {
          // 리프레시 토큰 만료 또는 액세스 토큰 누락
          console.warn("인증 토큰이 만료되었거나 유효하지 않습니다.");
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        } else if (status === 400) {
          // 잘못된 요청값
          console.error("잘못된 요청입니다.");
          alert("요청이 올바르지 않습니다. 다시 시도해주세요.");
        } else if (status === 500) {
          alert(
            "서버 오류로 로그아웃이 정상 처리되지 않았습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    },
  });

  // 로그아웃 핸들러
  const handleLogout = () => {
    mutate();
  };

  if (isPending) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="로그아웃 중입니다...."
      />
    );
  }

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-[60%] mx-auto flex items-center  py-3">
        {/* 로고 */}
        <Link className="flex items-center cursor-pointer" to="/">
          <img src={logo} alt="로고" className="w-20 h-10 object-contain" />
        </Link>

        {isAuthenticated ? (
          <>
            {/* 메뉴탭 */}
            <nav className="flex gap-6 items-center ml-8">
              {MENUTABS.map((tab) => {
                const isActiveTab = location.pathname.startsWith(tab.path);
                return (
                  <Link
                    key={tab.path}
                    className={`
                      px-3 py-1 rounded 
                      ${
                        isActiveTab
                          ? "font-bold text-blue-900"
                          : "font-normal hover:text-blue-900 hover:font-bold"
                      }
                    `}
                    to={tab.path}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
            {/* 유저 */}
            <div
              className="ml-auto relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center cursor-pointer">
                <span className="text-gray-700 text-sm mr-2">환영합니다!</span>
                <span className="text-blue-900 text-sm hover:font-bold transition-all">
                  {/* 추후 nickname으로 변경 */}
                  {userName}
                </span>
                <span className="text-gray-700 text-sm ml-1">님</span>
              </div>

              {/* 드롭다운 메뉴 */}
              <div
                className={`absolute right-0 top-full w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ease-in-out ${
                  isDropdownOpen
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  to="/mypage"
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-900 hover:bg-gray-100 hover:font-bold transition-all"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-900 hover:bg-gray-100 hover:font-bold transition-all"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-end gap-4">
            <Link
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-900 text-white hover:border hover:border-blue-900 hover:bg-white hover:text-blue-900 transition-colors"
              to="/login"
            >
              로그인
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
