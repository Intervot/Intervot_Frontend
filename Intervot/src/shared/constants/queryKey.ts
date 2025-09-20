export const QUERY_KEYS = {
  INTERVIEW: {
    GET: (questionId: string) => ["INTERVIEW", "GET", questionId] as const,
  },
} as const;
