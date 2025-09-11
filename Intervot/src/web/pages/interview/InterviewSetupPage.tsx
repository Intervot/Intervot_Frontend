import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SETUP_ROLES } from "@/web/constants/SETUP_ROLES";
import { SETUP_LEVELS } from "@/web/constants/SETUP_LEVELS";
import { useMutation } from "@tanstack/react-query";
import { interviewService } from "@/shared/services/interview/interviewServices";
import axios from "axios";

const InterviewSetupPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: interviewService.startInterview,
    onSuccess: (response) => {
      const questionId = response.question_id;
      navigate(`/interview/${selectedRole}/${selectedLevel}/${questionId}`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        console.log("Login error status:", status);
        if (status === 400) {
          alert("요청값이 올바르지 않습니다.");
        } else if (status === 500) {
          alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        } else if (status === 404) {
          alert("요청한 API를 찾을 수 없습니다.");
        } else {
          alert("예상치 못한 오류가 발생했습니다.");
        }
      }
    },
  });

  const handleStart = () => {
    if (selectedRole && selectedLevel) {
      mutate({ role: selectedRole, level: selectedLevel });
    }
  };

  return (
    <div className="py-5">
      <p className="text-gray-700 mb-6">원하는 분야와 난이도를 선택해주세요.</p>

      {/* 분야 선택 */}
      <h2 className="text-lg font-bold mb-4">분야 선택</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {SETUP_ROLES.map((role) => (
          <button
            key={role.value}
            onClick={() => setSelectedRole(role.value)}
            className={`border rounded-md py-2 px-4 text-sm transition cursor-pointer
              ${
                selectedRole === role.value
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 bg-white hover:border-blue-300"
              }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* 난이도 선택 */}
      <h2 className="text-lg font-bold mb-4">난이도 선택</h2>
      <div className="flex gap-3 mb-8">
        {SETUP_LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => setSelectedLevel(level.value)}
            className={`border rounded-md py-2 px-6 text-sm transition cursor-pointer
              ${
                selectedLevel === level.value
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 bg-white hover:border-blue-300"
              }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* 선택 요약 */}
      <div className="min-h-[100px]">
        {selectedRole && selectedLevel && (
          <div className="border border-blue-500 bg-blue-100 rounded-lg p-4 mb-6 text-center">
            <p className="text-blue-600 font-semibold">
              <span className="text-blue-700">
                {SETUP_ROLES.find((role) => role.value === selectedRole)?.label}
              </span>{" "}
              분야를{" "}
              <span className="text-blue-700">
                {
                  SETUP_LEVELS.find((level) => level.value === selectedLevel)
                    ?.label
                }
              </span>{" "}
              난이도로 면접을 시작합니다.
            </p>
          </div>
        )}
      </div>

      {/* 시작 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={handleStart}
          disabled={!selectedRole || !selectedLevel}
          className={`px-8 py-3 border rounded-lg font-semibold text-white transition cursor-pointer
            ${
              selectedRole && selectedLevel
                ? " bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 "
                : "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
            }`}
        >
          면접 시작하기
        </button>
      </div>
    </div>
  );
};

export default InterviewSetupPage;
