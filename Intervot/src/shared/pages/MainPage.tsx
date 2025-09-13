import { Link } from "react-router-dom";
import aiInterview from "@/shared/assets/png/aiInterview.png";
import competency from "@/shared/assets/png/competency.png";
import FAQs from "@/shared/assets/png/FAQs.png";
import AI_logo from "@/shared/assets/png/AI_logo.png";
import { useAuthStore } from "../stores/userStore";
import qna from "@/shared/assets/png/qna.png";
import AnnouncementCarousel from "@/web/components/main/AnnouncementCarousel";
import AIInterviewScoreProgress from "@/web/components/main/AIInterviewScoreProgress";

const MainPage = () => {
  const userName = useAuthStore((state) => state.user?.nickname);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <div className="my-3 p-2 w-full">
        <div className="h-[400px]">
          <div className="flex flex-col lg:flex-row h-full gap-[10px]">
            <div className="w-full lg:w-[60%] flex flex-col">
              <AnnouncementCarousel />
              <div className="h-[50%] w-full flex border border-blue-100 rounded-md flex-1 bg-[#f0f9ff]">
                <div className="w-full flex flex-col px-4 py-0 justify-center">
                  <p className="text-xs  font-bold text-gray-600">
                    인터봇과 함께 면접 쉽게 준비하기!
                  </p>
                  <p className="text-sm xl:text-2xl font-bold my-3 text-gray-800 leading-relaxed">
                    내가 선택한 직무별 면접 질문을
                    <br /> 인터봇과 함께 연습해보세요.
                  </p>
                  <div className="flex gap-[6px] xl:gap-[8px] xl:mt-4  flex-wrap">
                    <span className="bg-blue-100 border text-gray-500 font-bold rounded-md border-blue-200 p-1.5 text-xs">
                      # AI 피드백
                    </span>
                    <span className="bg-blue-100 border text-gray-500 font-bold rounded-md border-blue-200 p-1.5 text-xs">
                      # 빈출문제
                    </span>
                    <span className="bg-blue-100 border text-gray-500 font-bold rounded-md border-blue-200 p-1.5 text-xs">
                      # 면접 질문
                    </span>
                  </div>
                </div>

                <div className="w-full flex items-center justify-center">
                  <img
                    src={AI_logo}
                    className="w-full h-full object-contain"
                    alt="메인이미지"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[40%] p-2 md:p-4">
              {isAuthenticated ? (
                <div className="flex flex-col gap-[15px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="xl:w-16 xl:h-16 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-blue-600 text-sm md:text-md xl:text-lg font-semibold">
                        {userName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[5px] text-xs xl:text-sm min-w-0 flex-1">
                      <div className="font-bold text-blue-900 truncate">
                        {userName}님
                      </div>
                      <div className="text-gray-500 leading-tight break-keep">
                        인터봇과 함께 면접 성공률을 높혀보세요!
                      </div>
                    </div>
                  </div>
                  <AIInterviewScoreProgress score={""} />
                </div>
              ) : (
                <div className="p-4 flex flex-col gap-[15px] md:gap-[20px] items-center justify-center m-auto border border-gray-300 rounded-lg min-h-[120px] md:min-h-[50%] mb-4">
                  <p className="font-bold text-gray-500 text-sm md:text-base text-center">
                    로그인하고 인터봇을 이용해주세요.
                  </p>
                  <Link
                    className="flex flex-col items-center justify-center rounded-lg w-[90%] bg-blue-900 text-white font-bold text-base md:text-lg h-[45px] md:h-[50px] cursor-pointer hover:border hover:border-blue-900 hover:bg-white hover:text-blue-900 transition-colors"
                    to="/login"
                  >
                    로그인
                  </Link>
                </div>
              )}
              <div className="min-h-[150px] lg:h-[calc(50%-10px)] rounded-lg bg-gray-100">
                <div className="p-3 md:p-4 h-full flex flex-col">
                  <div className="flex items-start md:items-center flex-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-700 mb-2 text-xs xl:text-md">
                        자주 묻는 질문
                      </h3>
                      <p className="text-xs xl:text-sm text-gray-500 leading-relaxed">
                        <span className="font-bold text-blue-900">
                          인터봇&nbsp;
                        </span>
                        사용법이나&nbsp;
                        <span className="font-bold text-blue-900">
                          면접 관련 궁금증
                        </span>
                        을
                        <br className="hidden md:block" /> 빠르게 해결해보세요
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-2 md:ml-3">
                      <img
                        src={qna}
                        alt="q&a"
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link
                      to="/qna"
                      className="inline-block w-full text-center py-2 px-4 bg-blue-900 text-white font-bold text-xs md:text-sm rounded-md hover:bg-blue-800 transition-colors"
                    >
                      자주묻는질문 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5 border-b border-gray-300" />

        <div className="h-[400px]">
          <div className="font-bold text-lg mb-4">인터봇 매칭</div>
          <div className=" h-[80%] flex justify-between gap-4">
            <div className="border border-gray-300 rounded-md w-[31%] overflow-hidden hover:shadow-md transition-shado">
              <div className="h-[50%] bg-red-200 overflow-hidden">
                <img
                  src={aiInterview}
                  alt="AI Interview"
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="h-[50%] p-3 xl:p-4 flex flex-col justify-between">
                <div className="font-semibold text-xs xl:text-sm leading-tight">
                  긴장 풀고 가볍게
                  <br /> AI 면접 체험
                </div>
                <div className="font-semibold text-xs xl:text-sm mb-3 text-gray-600">
                  AI 면접으로 미리 연습해 볼래요?
                </div>
                <Link
                  className="flex items-center justify-between w-full border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  to="/interview/setup"
                >
                  <span className="text-gray-600 font-semibold text-xs">
                    AI면접 시작하기
                  </span>
                  <span className="text-gray-400 text-xs">→</span>
                </Link>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md w-[31%] overflow-hidden hover:shadow-md transition-shado">
              <div className="h-[50%] bg-orange-200 overflow-hidden">
                <img
                  src={FAQs}
                  alt="FAQs"
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="h-[50%] p-3 xl:p-4 flex flex-col justify-between">
                <div className="font-semibold text-xs xl:text-sm leading-tight">
                  취업 준비 필수!
                  <br /> 자주 나오는 질문 모음
                </div>
                <div className="font-semibold text-xs xl:text-sm mb-3 text-gray-600">
                  진짜 많이 나오는 질문만 모아봤어요
                </div>
                <Link
                  className="flex items-center justify-between w-full border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  to="/questions/frequent"
                >
                  <span className="text-gray-600 font-semibold text-xs">
                    빈출질문 바로가기
                  </span>
                  <span className="text-gray-400 text-xs">→</span>
                </Link>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md w-[31%] overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-[50%] bg-green-200 overflow-hidden">
                <img
                  src={competency}
                  alt="Competency Check"
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="h-[50%] p-3 xl:p-4 flex flex-col justify-between">
                <div className="font-semibold text-xs xl:text-sm leading-tight">
                  자주 나오는 역량면접 질문
                  <br />
                  면접관의 의도까지 완벽 분석
                </div>
                <div className="font-semibold text-xs xl:text-sm mb-3 text-gray-600">
                  의도를 알면 답변 방향이 달라져요
                </div>
                <Link
                  className="flex items-center justify-between w-full border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  to="/questions/competency"
                >
                  <span className="text-gray-600 font-semibold text-xs">
                    역량질문 확인하기
                  </span>
                  <span className="text-gray-400 text-xs">→</span>
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
