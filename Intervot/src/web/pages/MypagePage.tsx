import { useState } from "react";
import { Link } from "react-router-dom";

const MypagePage = () => {
  const [activeTab, setActiveTab] = useState<"account" | "reports">("account");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState("홍길동");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 임시 사용자 데이터
  const userData = {
    name: "홍길동",
    email: "hong@example.com",
    joinDate: "2024.01.15",
    totalInterviews: 3,
    averageScore: 78,
  };

  // 임시 면접 결과 데이터
  const interviewResults = [
    {
      id: 1,
      date: "2024.01.20",
      role: "프론트엔드 개발",
      level: "중급",
      score: 85,
      totalQuestions: 5,
    },
    {
      id: 2,
      date: "2024.01.18",
      role: "백엔드 개발",
      level: "초급",
      score: 72,
      totalQuestions: 5,
    },
    {
      id: 3,
      date: "2024.01.15",
      role: "DevOps",
      level: "고급",
      score: 68,
      totalQuestions: 5,
    },
  ];

  const handlePasswordCheck = () => {
    // 임시로 비밀번호 체크 (실제로는 API 호출)
    if (currentPassword === "1234") {
      setIsPasswordCorrect(true);
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleSaveChanges = () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 실제로는 API 호출하여 정보 업데이트
    alert("정보가 성공적으로 수정되었습니다.");
    setEditMode(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="h-[748px] flex overflow-hidden">
      {/* 왼쪽 프로필 섹션 - 고정 */}
      <div className="w-80 flex-shrink-0 bg-white shadow-lg p-6 flex flex-col h-[748px]">
        {/* 프로필 정보 */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {userData.name}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{userData.email}</p>
        </div>

        {/* 통계 요약 */}
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-600">총 면접</span>
            <span className="text-sm font-medium text-gray-800">
              {userData.totalInterviews}회
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-600">평균 점수</span>
            <span className="text-sm font-medium text-gray-800">
              {userData.averageScore}점
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-600">등급</span>
            <span className="text-sm font-medium text-gray-800">
              {userData.averageScore >= 80
                ? "우수"
                : userData.averageScore >= 60
                ? "양호"
                : "개선"}
            </span>
          </div>
        </div>
      </div>

      {/* 오른쪽 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col h-[748px]">
        {/* 탭 네비게이션 - 고정 */}
        <div className="flex border-b border-gray-200 mt-6 mb-6 px-8 pt-6">
          <button
            onClick={() => setActiveTab("account")}
            className={`px-6 py-3 font-medium transition-colors cursor-pointer ${
              activeTab === "account"
                ? "text-blue-900 border-b-2 border-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            계정관리
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-6 py-3 font-medium transition-colors cursor-pointer ${
              activeTab === "reports"
                ? "text-blue-900 border-b-2 border-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            내 결과 보고서
          </button>
        </div>

        {/* 콘텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {/* 계정관리 섹션 */}
          {activeTab === "account" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {!isPasswordCorrect ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    비밀번호 확인
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    계정 정보를 수정하려면 현재 비밀번호를 입력해주세요.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        현재 비밀번호
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="현재 비밀번호를 입력하세요"
                      />
                    </div>
                    <button
                      onClick={handlePasswordCheck}
                      className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
                    >
                      확인
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      계정 정보
                    </h3>
                    {!editMode ? (
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        수정
                      </button>
                    ) : (
                      <div className="space-x-2">
                        <button
                          onClick={handleSaveChanges}
                          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            setEditMode(false);
                            setNewPassword("");
                            setConfirmPassword("");
                          }}
                          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          취소
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        닉네임
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-3 py-2 text-gray-800">
                          {nickname}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일
                      </label>
                      <div className="px-3 py-2 text-gray-800">
                        {userData.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        가입일
                      </label>
                      <div className="px-3 py-2 text-gray-800">
                        {userData.joinDate}
                      </div>
                    </div>

                    {editMode && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            새 비밀번호
                          </label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="새 비밀번호를 입력하세요"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            새 비밀번호 확인
                          </label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="새 비밀번호를 다시 입력하세요"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* 회원탈퇴 버튼 */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button className="px-4 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-md transition-colors cursor-pointer">
                      회원탈퇴
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 내 결과 보고서 섹션 */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              {/* 면접 결과 목록 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    면접 이력
                  </h3>
                  <div className="text-sm text-gray-500">
                    총 {interviewResults.length}건
                  </div>
                </div>

                <div className="space-y-4">
                  {interviewResults.map((result) => (
                    <div
                      key={result.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-medium text-gray-800 mr-3">
                              {result.role}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.level === "초급"
                                  ? "bg-green-100 text-green-800"
                                  : result.level === "중급"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {result.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{result.date}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="text-2xl font-bold text-blue-900 mb-1">
                            {result.score}점
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.score >= 80
                              ? "우수"
                              : result.score >= 60
                              ? "양호"
                              : "개선 필요"}
                          </div>
                        </div>
                        <Link
                          to="/report"
                          className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 hover:border-blue-900 border border-blue-900 transition-colors cursor-pointer text-sm font-medium"
                        >
                          상세보기
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 새로운 면접 시작 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    새로운 면접 시작
                  </h3>
                  <p className="text-gray-600 mb-4">
                    다른 분야나 난이도로 면접을 진행해보세요
                  </p>
                  <Link
                    to="/interview_setup"
                    className="inline-flex items-center px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-white hover:text-blue-900 hover:border-blue-900 border border-blue-900 transition-colors cursor-pointer font-medium"
                  >
                    면접 시작하기
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypagePage;
