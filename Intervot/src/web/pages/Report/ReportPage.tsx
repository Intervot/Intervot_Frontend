import { useLocation, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface ReportData {
  answers: string[];
  questions: string[];
  level: string;
}

interface AnalysisResult {
  strengths: string[];
  weaknesses: string[];
  totalScore: number;
  maxScore: number;
  scoreBreakdown: {
    question: string;
    score: number;
    maxScore: number;
    feedback: string;
  }[];
}

const ReportPage = () => {
  const location = useLocation();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);

    // 데이터가 없으면 홈으로 리다이렉트
    if (!location.state) {
      setShouldRedirect(true);
      return;
    }

    const { questions } = location.state as ReportData;

    // 면접 결과 분석 (실제로는 AI API 호출)
    const analyzeInterview = async () => {
      setIsLoading(true);

      // 임시 분석 로직 (실제로는 AI 분석 결과를 받아옴)
      const scoreBreakdown = questions.map((question) => {
        const score = Math.floor(Math.random() * 20) + 1; // 0-20점 랜덤
        return {
          question,
          score,
          maxScore: 20,
          feedback:
            score > 10
              ? "좋은 답변입니다. 기본 개념을 잘 이해하고 있습니다."
              : "개선이 필요한 부분입니다. 더 구체적인 예시를 들어보세요.",
        };
      });

      // 총점 계산
      const totalScore = scoreBreakdown.reduce(
        (sum, item) => sum + item.score,
        0
      );
      const maxScore = scoreBreakdown.reduce(
        (sum, item) => sum + item.maxScore,
        0
      );

      const mockAnalysis: AnalysisResult = {
        strengths: [
          "기본 개념에 대한 이해도가 높습니다",
          "구체적인 예시를 들어 설명하는 능력이 좋습니다",
          "문제 해결 과정을 체계적으로 제시합니다",
        ],
        weaknesses: [
          "고급 개념에 대한 깊이 있는 이해가 부족합니다",
          "실무 경험을 바탕으로 한 설명이 미흡합니다",
          "최신 기술 트렌드에 대한 인식이 부족합니다",
        ],
        totalScore,
        maxScore,
        scoreBreakdown,
      };

      // 로딩 시뮬레이션
      setTimeout(() => {
        setAnalysisResult(mockAnalysis);
        setIsLoading(false);
      }, 2000);
    };

    analyzeInterview();
  }, [location.state]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">면접 결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return <Navigate to="/" replace />;
  }

  const scorePercentage = Math.round(
    (analysisResult.totalScore / analysisResult.maxScore) * 100
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            면접 결과 리포트
          </h1>
          <p className="text-gray-600">당신의 면접 성과를 분석했습니다</p>
        </div>

        {/* 전체 점수 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            전체 점수
          </h2>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg
                className="w-32 h-32 transform -rotate-90"
                viewBox="0 0 120 120"
              >
                {/* 배경 원 */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                {/* 진행률 원 */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#1e3a8a"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 50 * (1 - scorePercentage / 100)
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-900">
                    {analysisResult.totalScore}
                  </div>
                  <div className="text-sm text-gray-500">
                    / {analysisResult.maxScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-lg font-medium text-gray-800">
              {scorePercentage >= 80
                ? "우수"
                : scorePercentage >= 60
                ? "양호"
                : "개선 필요"}
            </p>
            <p className="text-sm text-gray-500">({scorePercentage}%)</p>
          </div>
        </div>

        {/* 좋은 점과 아쉬운 점 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 좋은 점 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              좋은 점
            </h3>
            <ul className="space-y-3">
              {analysisResult.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 아쉬운 점 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-700 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              개선할 점
            </h3>
            <ul className="space-y-3">
              {analysisResult.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 질문별 상세 분석 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            질문별 상세 분석
          </h2>
          <div className="space-y-6">
            {analysisResult.scoreBreakdown.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-6 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-800 flex-1 mr-4">
                    Q{index + 1}. {item.question}
                  </h4>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-900">
                      {item.score}/{item.maxScore}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((item.score / item.maxScore) * 100)}%
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{item.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 border border-blue-900 rounded-lg text-white bg-blue-900 hover:bg-white hover:text-blue-900 transition-colors cursor-pointer font-semibold"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
