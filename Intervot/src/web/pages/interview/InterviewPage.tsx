import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockQuestions from "@/web/mock/mockQuestions";

const InterviewPage = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>(
    Array(mockQuestions.length).fill("")
  );

  // level에 따른 글자 제한 설정
  const getMaxLength = (levelValue: string) => {
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

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // 답변 데이터를 report 페이지로 전달
    navigate("/report", {
      state: {
        answers,
        questions: mockQuestions,
        level: level || "beginner",
      },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-start mt-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="space-y-8">
            {mockQuestions.map((question, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-8 last:border-b-0"
              >
                <div className="mb-3 text-sm text-gray-500 font-medium">
                  예상 질문 {index + 1}
                </div>

                {/* 질문 */}
                <h2 className="text-xl font-semibold mb-4 text-gray-800 leading-relaxed">
                  {question}
                </h2>

                {/* 답변 입력 */}
                <div>
                  <label className="block font-light mb-2 text-gray-400">
                    답변 ({answers[index].length}/{maxLength}자)
                  </label>
                  <textarea
                    value={answers[index]}
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
