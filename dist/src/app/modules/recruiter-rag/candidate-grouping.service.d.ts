import { RetrievedResumeChunk } from "./retrieval.service";
export interface CandidateEvidence {
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    resumeFileName: string;
    bestSimilarity: number;
    chunks: string[];
}
export declare const groupChunksByCandidate: (chunks: RetrievedResumeChunk[]) => CandidateEvidence[];
//# sourceMappingURL=candidate-grouping.service.d.ts.map