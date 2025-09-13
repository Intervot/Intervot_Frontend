import { Link } from "react-router-dom";
import FAQS from "@/web/constants/FAQS";

const FaqPage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* 자주 묻는 질문 페이지 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            자주 묻는 질문(FAQs)
          </h2>
          <div className="space-y-6">
            {FAQS.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-6 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-800 flex-1 mr-4">
                    Q. {item.question}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">{item.answer}</p>
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

export default FaqPage;
