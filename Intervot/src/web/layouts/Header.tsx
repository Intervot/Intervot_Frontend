import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/shared/assets/edited_logo.png";
import menuTabs from "../constants/menuTabs";
import { Link } from "react-router-dom";

const Header = () => {
  // 임시 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  // 메뉴 이동
  const goTo = (path: string) => navigate(path);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 로고 */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => goTo("/")}
        >
          <img
            src={logo}
            alt="로고"
            className="w-20 h-10 object-contain mr-2"
          />
        </div>
        {/* 메뉴탭 */}
        <nav className="flex gap-6 items-center">
          {menuTabs.map((tab) => {
            const isActiveTab = location.pathname.startsWith(tab.path);
            return (
              <button
                key={tab.path}
                className={`
                  px-3 py-1 rounded 
                  ${
                    isActiveTab
                      ? "font-bold text-blue-900"
                      : "font-normal hover:text-blue-900 hover:font-bold"
                  }
                `}
                onClick={() => goTo(tab.path)}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
        {/* 로그인/로그아웃 상태별 버튼 */}
        <div className="flex gap-2 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 text-sm mr-2">환영합니다!</span>
              <button
                className="px-4 py-2 rounded text-sm font-medium border border-blue-900  text-blue-900 hover:bg-blue-900 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                className="px-4 py-2 rounded text-sm font-medium border border-blue-900  text-blue-900 hover:bg-blue-900 hover:text-white transition-colors"
                to="/login"
              >
                로그인
              </Link>
              <Link
                className="px-4 py-2 rounded text-sm font-medium border border-blue-900  text-blue-900 hover:bg-blue-900 hover:text-white transition-colors"
                to="/signup"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
