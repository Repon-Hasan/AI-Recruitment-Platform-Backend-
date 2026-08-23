export interface RetrievedCandidate {
  resumeId: string;
  candidateId: string;

  fileName: string;
  rawText: string | null;
  parsedData: unknown;

  similarity: number;

  candidate: {
    id: string;
    userId: string;
  };
}

export interface RecruiterSearchResult {
  answer: string;

  candidates: RetrievedCandidate[];

  metadata: {
    totalCandidates: number;
    searchLimit: number;
  };
}