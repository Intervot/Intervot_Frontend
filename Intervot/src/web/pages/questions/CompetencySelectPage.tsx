import { useState } from "react";
import { useNavigate } from "react-router-dom";
import strengths from "@/web/constants/COMPETENCY_STRENGTHS";

const CompetencySelectPage = () => {
  const [selectedStrength, setSelectedStrength] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleStart = () => {
    if (selectedStrength) {
      navigate(`/questions/competency/${selectedStrength}`);
    }
  };

  return (
    <div className="py-5">
      <p className="text-gray-700 mb-6">원하는 역량을 선택해주세요.</p>
      {/* 역량 선택 */}
      <h2 className="text-lg font-bold mb-4">역량 선택</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {strengths.map((strength: string) => (
          <button
            key={strength}
            onClick={() => setSelectedStrength(strength)}
            className={`border rounded-md py-2 px-4 text-sm transition cursor-pointer
                ${
                  selectedStrength === strength
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-300 bg-white hover:border-blue-300"
                }`}
          >
            {strength}
          </button>
        ))}
      </div>
      <div className="min-h-[100px]">
        {selectedStrength && (
          <div className="border border-blue-500 bg-blue-100 rounded-lg p-4 mb-6 text-center">
            <p className="text-blue-600 font-semibold">
              <span className="text-blue-700">{selectedStrength}</span> 역량에
              대한 질문을 시작합니다.
            </p>
          </div>
        )}
      </div>
      {/* 시작 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={handleStart}
          disabled={!selectedStrength}
          className={`px-8 py-3 border rounded-lg font-semibold text-white transition cursor-pointer
            ${
              selectedStrength
                ? " bg-blue-900 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 hover:bg-gray-50 "
                : "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
            }`}
        >
          역량 질문 분석하기
        </button>
      </div>
    </div>
  );
};

export default CompetencySelectPage;
