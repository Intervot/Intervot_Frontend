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
  const [openSection, setOpenSection] = useState<string | null>(null);
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
      <div className="w-[60%] mx-auto flex items-center py-3">
        {/* 로고 */}
        <Link className="flex items-center cursor-pointer" to="/">
          <img src={logo} alt="로고" className="w-20 h-10 object-contain" />
        </Link>

        {isAuthenticated ? (
          <>
            {/* 메뉴탭 */}
            <nav className="flex gap-6 items-center ml-8">
              {MENUTABS.map((group) => {
                return (
                  <div
                    key={group.section}
                    className="relative"
                    onMouseEnter={() => setOpenSection(group.section)}
                    onMouseLeave={() => setOpenSection(null)}
                  >
                    {/* 섹션 제목 */}
                    <span
                      className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        group.items.some((i) =>
                          location.pathname.startsWith(i.path)
                        )
                          ? "text-blue-900 font-semibold"
                          : "text-gray-700 hover:text-blue-900"
                      }`}
                    >
                      {group.section}
                    </span>

                    {/* 드롭다운 */}
                    {openSection === group.section && (
                      <div className="absolute top-full left-0 w-56 z-50">
                        {/* 브리지 영역 */}
                        <div className="h-4 w-full"></div>
                        <div className="bg-white border border-gray-200 rounded-xl shadow-xl animate-in slide-in-from-top-2 duration-200">
                          {group.items.map((item, index) => {
                            const isActiveTab = location.pathname.startsWith(
                              item.path
                            );
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`block px-4 py-3 text-sm transition-all duration-150 border-b border-gray-100 last:border-b-0
                              ${
                                isActiveTab
                                  ? "text-blue-900 font-semibold"
                                  : "text-gray-700 hover:text-blue-900"
                              }`}
                                style={{
                                  animationDelay: `${index * 50}ms`,
                                  animation: "fadeInUp 0.2s ease-out forwards",
                                }}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* 유저 */}
            <div
              className="ml-auto relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center cursor-pointer px-3 py-2 rounded-lg transition-all duration-200">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-sm font-semibold">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-xs">환영합니다!</span>
                  <span className="text-blue-900 text-sm font-medium">
                    {userName}님
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full w-56 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-200 py-2 transition-all duration-200 ease-in-out animate-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userName}님
                      </p>
                      <p className="text-xs text-gray-500">안녕하세요!</p>
                    </div>
                    <Link
                      to="/mypage"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-900 transition-all duration-150"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      마이페이지
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-150 cursor-pointer "
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
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
