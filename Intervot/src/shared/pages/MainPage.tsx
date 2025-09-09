import { Link } from "react-router-dom";
import aiInterview from "@/shared/assets/png/aiInterview.png";
import competency from "@/shared/assets/png/competency.png";
import FAQs from "@/shared/assets/png/FAQs.png";

const MainPage = () => {
  return (
    <>
      <div className="my-3 p-4 w-full border">
        <div className="border border-red-100 h-[400px]">로그인 부분</div>
        <hr className="my-5" />
        <div className="h-[300px]">
          <div className="font-bold text-lg mb-4">인터봇 매칭</div>
          <div className=" h-[80%] flex justify-between gap-4">
            <div className="border border-gray-300 rounded-md w-[31%] overflow-hidden">
              <div className="h-[50%] bg-red-200">
                <img
                  src={aiInterview}
                  alt="AI Interview"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-[50%] p-4 flex flex-col justify-between">
                <div className="font-semibold text-sm">
                  긴장 풀고 가볍게 AI 면접 체험
                </div>
                <div className="font-semibold text-sm mb-4">
                  AI 면접으로 미리 연습해 볼래요?
                </div>
                <Link
                  className="flex items-center justify-between gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-100 w-[60%]"
                  to="/interview/setup"
                >
                  <div className="text-gray-400 font-semibold text-xs">
                    AI면접 시작하기
                  </div>
                  <div className="text-gray-400 font-semibold text-xs">
                    &gt;
                  </div>
                </Link>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md w-[31%] overflow-hidden">
              <div className="h-[50%] bg-orange-200 ">
                <img
                  src={FAQs}
                  alt="FAQs"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-[50%] p-4 flex flex-col justify-between">
                <div className="font-semibold text-sm">
                  취업 준비 필수! 자주 나오는 질문 모음
                </div>
                <div className="font-semibold text-sm mb-4">
                  진짜 많이 나오는 질문만 모아봤어요
                </div>
                <Link
                  className="flex items-center justify-between gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-100 w-[60%]"
                  to="/questions/frequent"
                >
                  <div className="text-gray-400 font-semibold text-xs">
                    빈출질문 바로가기
                  </div>
                  <div className="text-gray-400 font-semibold text-xs">
                    &gt;
                  </div>
                </Link>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md w-[31%] overflow-hidden">
              <div className="h-[50%] bg-green-200">
                <img
                  src={competency}
                  alt="Competency Check"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-[50%] p-4 flex flex-col justify-between">
                <div className="font-semibold text-sm">
                  실전 같은 역량 면접 체험
                </div>
                <div className="font-semibold text-sm mb-2">
                  역량 면접, 부담 없이 시작해요
                </div>
                <Link
                  className="flex items-center justify-between gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-100 w-[60%]"
                  to="/questions/competency"
                >
                  <div className="text-gray-400 font-semibold text-xs">
                    역량면접 시작하기
                  </div>
                  <div className="text-gray-400 font-semibold text-xs">
                    &gt;
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
