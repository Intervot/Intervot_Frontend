import mypage from "@/app/assets/svg/mypage.svg";
import home from "@/app/assets/svg/home.svg";
import ai from "@/app/assets/svg/ai.svg";
import qna from "@/app/assets/svg/qna.svg";
import employ from "@/app/assets/svg/employ.svg";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="flex p-4 bg-white border-t border-gray-200">
      <Link to="/" className="text-center w-[20%] cursor-pointer">
        <img src={home} alt="Footer Logo" className="text-center m-auto" />
        <button
          className={`text-center cursor-pointer text-sm font-medium transition-colors ${
            isActive("/")
              ? "text-blue-600 font-bold "
              : "text-gray-600 hover:text-blue-600 font-medium"
          }`}
        >
          HOME
        </button>
      </Link>

      <Link to="/interview" className="text-center w-[20%] cursor-pointer">
        <img src={ai} alt="Footer Logo" className="text-center m-auto" />
        <button
          className={`text-center text-sm ${
            isActive("/interview")
              ? "text-blue-600 font-bold "
              : "text-gray-600 hover:text-blue-600 font-medium"
          }`}
        >
          AI 면접
        </button>
      </Link>

      <Link to="/employ" className="text-center w-[20%] cursor-pointer">
        <img src={employ} alt="Footer Logo" className="text-center m-auto" />
        <button
          className={`text-center text-sm ${
            isActive("/employ")
              ? "text-blue-600 font-bold "
              : "text-gray-600 hover:text-blue-600 font-medium"
          }`}
        >
          취업콘텐츠
        </button>
      </Link>

      <Link to="/qna" className="text-center w-[20%] cursor-pointer">
        <img src={qna} alt="Footer Logo" className="text-center m-auto" />
        <button
          className={`text-center text-sm ${
            isActive("/qna")
              ? "text-blue-600 font-bold "
              : "text-gray-600 hover:text-blue-600 font-medium"
          }`}
        >
          Q&A
        </button>
      </Link>

      <Link to="/mypage" className="text-center w-[20%] cursor-pointer">
        <img src={mypage} alt="Footer Logo" className="text-center m-auto" />
        <button
          className={`text-center text-sm ${
            isActive("/mypage")
              ? "text-blue-600 font-bold "
              : "text-gray-600 hover:text-blue-600 font-medium"
          }`}
        >
          MY
        </button>
      </Link>
    </footer>
  );
};

export default Footer;
