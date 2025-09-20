import { useMutation } from "@tanstack/react-query";
import { interviewService } from "../services/interview/interviewServices";

export const useCreateInterview = () => {
  return useMutation({
    mutationFn: interviewService.createInterview,
  });
};
