import { useState, useEffect } from "react";
import announcement from "@/shared/assets/svg/announcement.svg";

const AnnouncementCarousel = () => {
  const announcements = [
    "🎯 면접 준비의 새로운 기준, 인터봇과 함께 시작하세요!",
    "💡 실전 같은 AI 면접으로 긴장감까지 미리 경험해보세요!",
    "📝 면접관이 정말 자주 묻는 질문들만 엄선했어요!",
    "🔍 나만의 맞춤형 피드백으로 약점을 강점으로 바꿔보세요!",
    "🏆 면접 성공률 대폭 상승! 인터봇이 증명합니다!",
    "⚡ AI가 실시간으로 분석하는 나의 면접 역량을 확인해보세요!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
      }, 200);
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="flex gap-[10px] items-center my-3 border border-gray-100 rounded-lg bg-gray-100 text-sm md:text-md p-3 font-bold text-gray-600 overflow-hidden">
      <div>
        <img
          src={announcement}
          alt="공지사항"
          className="w-4 h-4 flex-shrink-0"
        />
      </div>
      <div className="relative flex-1 h-6 overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            isAnimating
              ? "transform translate-y-full opacity-0"
              : "transform translate-y-0 opacity-100"
          }`}
        >
          <p className="text-xs leading-6">{announcements[currentIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCarousel;
