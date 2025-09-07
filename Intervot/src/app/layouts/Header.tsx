import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "@/shared/assets/png/edited_logo.png";
import hamburger from "@/app/assets/svg/hamburger.svg";
import close from "@/app/assets/svg/close.svg";
import { useAuthStore } from "@/shared/stores/userStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const userInfo = useAuthStore((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 py-3 px-3 flex justify-between">
        <Link className="flex items-center cursor-pointer" to="/">
          <img src={logo} alt="로고" className="w-15 h-10 object-contain" />
        </Link>
        <div className="flex gap-[30px] items-center cursor-pointer">
          {!isAuthenticated && (
            <Link
              className="text-xs text-gray-600 font-bold border p-2 border-gray-300 rounded-md hover:bg-gray-100"
              to="/login"
            >
              로그인/회원가입
            </Link>
          )}
          <button
            className="cursor-pointer z-[60]"
            onClick={toggleMenu}
            aria-label="메뉴 열기/닫기"
          >
            <img
              src={hamburger}
              alt="더보기"
              className="w-7 h-10 object-contain"
            />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-[55]"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-[60]  ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 ">
          {isAuthenticated ? (
            <div className="flex justify-between items-center w-full my-1">
              <h2 className="text-sm">
                환영합니다!{" "}
                <span className="text-blue-500 font-semibold">
                  {userInfo?.nickname}
                </span>
                님
              </h2>
              <button
                onClick={closeMenu}
                className="text-lg text-gray-500 hover:text-gray-700 cursor-pointer "
              >
                <img src={close} alt="닫기" className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center w-full my-1">
                <h2 className="text-sm text-black ">로그인 후 이용해주세요</h2>
                <button
                  onClick={closeMenu}
                  className="text-lg text-gray-500 hover:text-gray-700 cursor-pointer "
                >
                  <img src={close} alt="닫기" className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col h-[calc(100%-60px)]">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                  마이페이지
                </p>
                <div className="space-y-3">
                  <Link
                    to="/mypage"
                    className="block text-[16px] font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    마이페이지
                  </Link>
                  <Link
                    to="/report"
                    className="block text-[16px] font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    내 결과 보고서
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                  면접
                </p>
                <div className="space-y-3">
                  <Link
                    to="/interview_setup"
                    className="block text-[16px] font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    AI 면접
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                  취업준비
                </p>
                <div className="space-y-3">
                  <Link
                    to="/interview-questions"
                    className="block text-[16px] font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    빈출 면접 질문
                  </Link>
                  <Link
                    to="/competency-questions"
                    className="block text-[16px] font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    역량 기반 질문
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                  기타
                </p>
                <div className="space-y-3">
                  <Link
                    to="/faq"
                    className="block text-[16px] font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={closeMenu}
                  >
                    자주 묻는 질문
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {isAuthenticated && (
            <div className="p-5">
              <button
                onClick={handleLogout}
                className="cursor-pointer w-full text-left text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
