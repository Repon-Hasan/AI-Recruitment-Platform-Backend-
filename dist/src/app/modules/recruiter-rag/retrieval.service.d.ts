export interface RetrievedResumeChunk {
    id: string;
    resumeId: string;
    candidateId: string;
    chunkText: string;
    chunkIndex: number;
    similarity: number;
    candidateName: string;
    candidateEmail: string;
    resumeFileName: string;
}
export declare const retrieveRelevantResumeChunks: (question: string, topK?: number) => Promise<RetrievedResumeChunk[]>;
//# sourceMappingURL=retrieval.service.d.ts.map