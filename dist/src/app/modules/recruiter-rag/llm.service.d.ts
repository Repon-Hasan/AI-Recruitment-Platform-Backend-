import { CandidateEvidence } from "./candidate-grouping.service";
export interface RecruiterCandidateResult {
    candidateId: string;
    name: string;
    matchScore: number;
    reason: string;
    evidence: string[];
    missingRequirements: string[];
}
interface RecruiterAIResult {
    summary: string;
    candidates: RecruiterCandidateResult[];
}
export declare const generateRecruiterAnswer: (question: string, candidates: CandidateEvidence[]) => Promise<RecruiterAIResult>;
export {};
//# sourceMappingURL=llm.service.d.ts.map