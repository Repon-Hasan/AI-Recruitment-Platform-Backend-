export interface RecruiterAssistantInput {
  jobId?: string;
  query: string;
  limit?: number;
}

export interface CandidateRanking {
  applicationId: string;
  candidateId: string;

  finalScore: number;

  breakdown: {
    skillScore: number;
    experienceScore: number;
    semanticScore: number;
    locationScore: number;
  };
}