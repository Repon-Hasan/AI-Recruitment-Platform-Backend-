export declare const ingestResumeForRAG: (resumeId: string) => Promise<{
    resumeId: string;
    message: string;
}>;
export declare const askRecruiterAI: (question: string, topK?: number) => Promise<{
    summary: string;
    candidates: import("./llm.service").RecruiterCandidateResult[];
    retrievedChunks: number;
}>;
//# sourceMappingURL=recruiter-ai.service.d.ts.map