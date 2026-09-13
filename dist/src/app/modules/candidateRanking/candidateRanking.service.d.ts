import { RankingFilters } from "./candidateRanking.interface";
interface RankingResult {
    applicationId: string;
    candidateId: string;
    id?: string | null;
    name?: string | null;
    email?: string | null;
    profileImage?: string | null;
    phone?: string | null;
    location?: string | null;
    experience?: number | null;
    skills: string[];
    appliedAt?: Date | string | null;
    resume?: ({
        id: string;
        fileName?: string | null;
        url?: string | null;
        fileUrl?: string | null;
    } & Record<string, unknown>) | null;
    education?: unknown;
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
    score: number;
    matchScore: number;
    matchPercentage: number;
    breakdown: {
        skillScore: number;
        experienceScore: number;
        semanticScore: number;
        locationScore: number;
    };
    strengths: string[];
    weaknesses: string[];
    explanation: string;
}
export declare const CandidateRankingService: {
    rankApplicants(jobId: string): Promise<RankingResult[]>;
    getRankedApplicants(jobId: string, filters: RankingFilters): Promise<{
        applicationId: string;
        candidateId: string;
        id?: string | null;
        name?: string | null;
        email?: string | null;
        profileImage?: string | null;
        phone?: string | null;
        location?: string | null;
        experience?: number | null;
        skills: string[];
        appliedAt?: Date | string | null;
        resume?: ({
            id: string;
            fileName?: string | null;
            url?: string | null;
            fileUrl?: string | null;
        } & Record<string, unknown>) | null;
        education?: unknown;
        linkedin?: string | null;
        github?: string | null;
        portfolio?: string | null;
        score: number;
        matchScore: number;
        matchPercentage: number;
        breakdown: {
            skillScore: number;
            experienceScore: number;
            semanticScore: number;
            locationScore: number;
        };
        strengths: string[];
        weaknesses: string[];
        explanation: string;
        candidateProfile: {
            resumes: {
                id: string;
                candidateId: string;
                fileName: string;
                fileUrl: string;
                publicId: string;
                fileType: string;
                fileSize: number | null;
                rawText: string | null;
                parsedData: import("@prisma/client/runtime/client").JsonValue | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: import("../../../generated/prisma/enums").Role;
                status: import("../../../generated/prisma/enums").UserStatus;
                needPasswordChange: boolean;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            userId: string;
            phone: string | null;
            location: string | null;
            bio: string | null;
            experience: string | null;
            linkedin: string | null;
            github: string | null;
            portfolio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        candidate: {
            resumes: {
                id: string;
                candidateId: string;
                fileName: string;
                fileUrl: string;
                publicId: string;
                fileType: string;
                fileSize: number | null;
                rawText: string | null;
                parsedData: import("@prisma/client/runtime/client").JsonValue | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                image: string | null;
                role: import("../../../generated/prisma/enums").Role;
                status: import("../../../generated/prisma/enums").UserStatus;
                needPasswordChange: boolean;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            userId: string;
            phone: string | null;
            location: string | null;
            bio: string | null;
            experience: string | null;
            linkedin: string | null;
            github: string | null;
            portfolio: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            needPasswordChange: boolean;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }[]>;
};
export {};
//# sourceMappingURL=candidateRanking.service.d.ts.map