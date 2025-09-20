import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKey";
import { interviewService } from "@/shared/services/interview/interviewServices";

export const useGetInterview = (questionId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.INTERVIEW.GET(questionId),
    queryFn: () => interviewService.getInterview(questionId),
    enabled: !!questionId,
    /*
      staleTime: 0        → 즉시 API 재요청 
      staleTime: 5000     → 5초 후에  API 재요청  
      staleTime: Infinity → API 재요청 없음
    */
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000, // 1시간 후 캐시 삭제
    retry: 1,
  });
};
