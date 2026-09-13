declare const generateApplicationAssistant: (userId: string, jobId: string, resumeId?: string) => Promise<{
    id: string;
    candidateProfileId: string;
    jobId: string;
    resumeId: string | null;
    matchScore: number;
    recommendation: string;
    missingSkills: import("@prisma/client/runtime/client").JsonValue;
    suggestions: import("@prisma/client/runtime/client").JsonValue;
    applicationTips: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const ApplicationAssistantService: {
    generateApplicationAssistant: typeof generateApplicationAssistant;
};
export {};
//# sourceMappingURL=applicationAssistant.service.d.ts.map