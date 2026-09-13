export declare const analyzeSkillGap: (userId: string, jobId: string) => Promise<{
    overallMatchPercentage: number;
    semanticMatchPercentage: number;
    skillMatchPercentage: number;
    matchedSkills: string[];
    missingSkills: {
        high: string[];
        medium: string[];
        low: string[];
    };
    learningPath: {
        order: number;
        skill: string;
        priority: string;
    }[];
}>;
//# sourceMappingURL=skillGap.service.d.ts.map