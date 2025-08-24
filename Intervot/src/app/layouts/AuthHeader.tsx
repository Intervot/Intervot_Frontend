import { Link, useLocation } from "react-router-dom";
import logo from "@/shared/assets/png/edited_logo.png";
import arrow from "@/app/assets/svg/arrow.svg";

const AuthHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLoginPage = currentPath === "/login";
  const isSignupPage = currentPath === "/signup";

  const getNavigationPath = () => {
    if (isSignupPage) {
      return "/login";
    }
    if (isLoginPage) {
      return "/";
    }
    return "/";
  };

  const navigationPath = getNavigationPath();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 mt-5 py-3">
      <div className="flex w-full px-4 justify-between items-center">
        <Link
          className="flex items-center cursor-pointer p-2"
          to={navigationPath}
          onClick={() =>
            console.log("Link 클릭됨, 이동할 경로:", navigationPath)
          }
        >
          <img src={arrow} alt="뒤로가기 버튼" className="w-6 h-6" />
        </Link>
        {isSignupPage ? (
          <span className="text-xl font-bold">회원가입</span>
        ) : (
          <Link className="flex items-center cursor-pointer" to="/">
            <img src={logo} alt="로고" className="w-20 h-10 object-contain" />
          </Link>
        )}
        <div className="w-6"></div>
      </div>
    </header>
  );
};

export default AuthHeader;
