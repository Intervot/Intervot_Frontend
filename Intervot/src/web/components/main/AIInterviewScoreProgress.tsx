import { useState, useEffect } from "react";

const AIInterviewScoreProgress = ({ score }: { score: string | number }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  const numericScore =
    typeof score === "string" ? (score === "" ? null : Number(score)) : score;
  const isEmptyScore = numericScore === null || isNaN(numericScore as number);

  useEffect(() => {
    if (!isEmptyScore) {
      const timer = setTimeout(() => {
        setAnimatedScore(numericScore as number);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [numericScore, isEmptyScore]);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  if (isEmptyScore) {
    return (
      <div className="p-4 flex flex-col gap-[15px] md:gap-[20px] items-center justify-center border border-gray-300 rounded-lg min-h-[120px] md:min-h-[50%] mb-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            AI 면접을 시작해보세요
          </h3>
          <p className="text-sm text-gray-500">
            첫 번째 AI 면접을 완료하시면
            <br />
            점수와 분석 결과를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-[15px] md:gap-[20px] items-start justify-start border border-gray-300 rounded-lg min-h-[120px] md:min-h-[50%] mb-4">
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-700">
            AI 면접 평균점수
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold ${getScoreTextColor(
                numericScore as number
              )}`}
            >
              {numericScore}
            </span>
            <span className="text-sm text-gray-500">/ 100</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${getScoreColor(
              numericScore as number
            )}`}
            style={{ width: `${animatedScore}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewScoreProgress;
