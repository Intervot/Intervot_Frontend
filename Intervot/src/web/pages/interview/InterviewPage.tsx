import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { useGetInterview } from "@/shared/hooks/useGetInterview ";

interface Question {
  id: string;
  keyword: string[];
  content: string;
}

const InterviewPage = () => {
  const { role, level, questionId } = useParams<{
    role: string;
    level: string;
    questionId: string;
  }>();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>([]);

  // questionId로 면접 데이터 조회
  const { data: interviewData, isLoading } = useGetInterview(questionId || "");

  const questions = interviewData?.questions || [];

  // 답변 배열 초기화
  useEffect(() => {
    if (questions.length > 0) {
      setAnswers(Array(questions.length).fill(""));
    }
  }, [questions.length]);

  // level에 따른 글자 제한 설정
  const getMaxLength = (levelValue: string): number => {
    switch (levelValue) {
      case "beginner":
        return 300;
      case "intermediate":
        return 500;
      case "advanced":
        return 700;
      default:
        return 300;
    }
  };

  const maxLength = getMaxLength(level || "beginner");

  // 모든 답변이 입력되었는지 확인
  const isAllAnswersFilled = answers.every(
    (answer) => answer.trim().length > 0
  );

  const handleAnswerChange = (index: number, value: string): void => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (): void => {
    navigate("/report", {
      state: {
        answers,
        questions,
        role: role || "",
        level: level || "beginner",
        questionId: questionId || "",
      },
    });
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="면접 데이터 로딩중..."
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-start mt-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="space-y-8">
            {questions.map((question: Question, index: number) => (
              <div
                key={question.id}
                className="border-b border-gray-100 pb-8 last:border-b-0"
              >
                <div className="mb-3 text-sm text-gray-500 font-medium">
                  예상 질문 {index + 1}
                </div>

                {/* 질문 */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800 leading-relaxed">
                  {question.content}
                </h2>

                {/* 답변 입력 */}
                <div>
                  <label className="block font-light mb-2 text-gray-400">
                    답변 ({answers[index]?.length || 0}/{maxLength}자)
                  </label>
                  <textarea
                    value={answers[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= maxLength) {
                        handleAnswerChange(index, value);
                      }
                    }}
                    placeholder="답변을 입력해주세요..."
                    maxLength={maxLength}
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-0 transition-colors duration-150 resize-none text-gray-700 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 제출 버튼 */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswersFilled}
              className={`w-full py-3 rounded-md border text-sm font-medium transition-colors ${
                isAllAnswersFilled
                  ? "bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 border-blue-900 cursor-pointer"
                  : "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
              }`}
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
