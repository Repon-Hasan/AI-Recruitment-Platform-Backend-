interface RecruiterAssistantInput {
    jobId?: string;
    query: string;
    limit?: number;
}
interface CandidateResult {
    applicationId: string;
    candidateId: string;
    name: string;
    semanticScore: number;
    skillScore: number;
    experienceScore: number;
    locationScore: number;
    finalScore: number;
    skills: string[];
    experience?: string;
    resumeText?: string;
}
export declare const AIRecruiterService: {
    assistant(recruiterId: string, input: RecruiterAssistantInput): Promise<{
        job: {
            id: string;
            title: string;
        };
        candidates: never[];
        answer: string;
        query?: undefined;
    } | {
        query: string;
        job: {
            id: string;
            title: string;
        };
        candidates: {
            candidateId: string;
            applicationId: string;
            name: string;
            score: number;
            breakdown: {
                semanticScore: number;
                skillScore: number;
                experienceScore: number;
                locationScore: number;
            };
        }[];
        answer: string;
    }>;
    findJobFromQuery(recruiterId: string, query: string): Promise<({
        company: {
            id: string;
            name: string;
            description: string | null;
            website: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        requiredSkills: {
            id: string;
            jobId: string;
            name: string;
            priority: string;
        }[];
    } & {
        id: string;
        companyId: string;
        title: string;
        description: string;
        location: string;
        image: string | null;
        remoteType: import("../../../generated/prisma/enums").RemoteType;
        employmentType: import("../../../generated/prisma/enums").EmploymentType;
        experienceLevel: import("../../../generated/prisma/enums").ExperienceLevel;
        salaryMin: number | null;
        salaryMax: number | null;
        salaryCurrency: string | null;
        deadline: Date;
        status: import("../../../generated/prisma/enums").JobStatus;
        publishedAt: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    calculateSkillScore(job: any, candidate: any): number;
    calculateExperienceScore(job: any, candidate: any): number;
    calculateLocationScore(job: any, candidate: any): number;
    buildLLMContext(job: any, candidates: CandidateResult[]): string;
};
export {};
//# sourceMappingURL=aiRecruiter.service.d.ts.map