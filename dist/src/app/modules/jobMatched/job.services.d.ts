type MissingSkills = {
    high: string[];
    medium: string[];
    low: string[];
};
export declare const calculateJobMatch: (userId: string, jobId: string) => Promise<{
    jobMatchId: string;
    overallMatchPercentage: number;
    semanticMatchPercentage: number;
    skillMatchPercentage: number;
    experienceMatchPercentage: number;
    educationMatchPercentage: number;
    keywordMatchPercentage: number;
    matchedSkills: string[];
    missingSkills: MissingSkills;
    recommendation: string;
    matchLevel: string;
}>;
export declare const getMyJobMatch: (userId: string, jobId: string) => Promise<{
    jobMatchId: string;
    job: {
        description: string;
        id: string;
        title: string;
    };
    overallMatchPercentage: number;
    semanticMatchPercentage: number;
    skillMatchPercentage: number;
    experienceMatchPercentage: number;
    educationMatchPercentage: number;
    keywordMatchPercentage: number;
    matchedSkills: import("@prisma/client/runtime/client").JsonValue;
    missingSkills: import("@prisma/client/runtime/client").JsonValue;
    recommendation: string;
    matchLevel: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMyJobMatches: (userId: string) => Promise<{
    jobMatchId: string;
    job: {
        description: string;
        id: string;
        title: string;
    };
    overallMatchPercentage: number;
    semanticMatchPercentage: number;
    skillMatchPercentage: number;
    experienceMatchPercentage: number;
    educationMatchPercentage: number;
    keywordMatchPercentage: number;
    matchedSkills: import("@prisma/client/runtime/client").JsonValue;
    missingSkills: import("@prisma/client/runtime/client").JsonValue;
    recommendation: string;
    matchLevel: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const getJobMatches: (userId: string, jobId: string) => Promise<{
    job: {
        id: string;
        title: string;
    };
    totalCandidates: number;
    matches: {
        jobMatchId: string;
        candidate: {
            experience: string | null;
            github: string | null;
            id: string;
            linkedin: string | null;
            location: string | null;
            phone: string | null;
            portfolio: string | null;
            user: {
                email: string;
                name: string;
            };
        };
        overallMatchPercentage: number;
        semanticMatchPercentage: number;
        skillMatchPercentage: number;
        experienceMatchPercentage: number;
        educationMatchPercentage: number;
        keywordMatchPercentage: number;
        matchedSkills: import("@prisma/client/runtime/client").JsonValue;
        missingSkills: import("@prisma/client/runtime/client").JsonValue;
        recommendation: string;
        matchLevel: string;
    }[];
}>;
export declare const getJobMatchSummary: (userId: string, jobId: string) => Promise<{
    job: {
        id: string;
        title: string;
    };
    totalCandidates: number;
    averageOverallScore: number;
    averageSemanticScore: number;
    averageSkillScore: number;
    excellentMatches: number;
    strongMatches: number;
    moderateMatches: number;
    weakMatches: number;
    poorMatches: number;
    topCandidates: {
        overallScore: number;
        semanticScore: number;
        skillsScore: number;
        experienceScore: number;
        educationScore: number;
        keywordScore: number;
        matchedSkills: import("@prisma/client/runtime/client").JsonValue;
        missingSkills: import("@prisma/client/runtime/client").JsonValue;
        matchLevel: string;
    }[];
}>;
export declare const deleteJobMatch: (userId: string, jobId: string) => Promise<boolean>;
export {};
//# sourceMappingURL=job.services.d.ts.map