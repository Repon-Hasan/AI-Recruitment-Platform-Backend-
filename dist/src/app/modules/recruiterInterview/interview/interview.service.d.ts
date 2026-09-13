import { ApplicationStatus, InterviewStatus } from "../../../../generated/prisma/enums";
export declare function createInterview(recruiterId: string, input: unknown): Promise<{
    id: string;
    jobApplicationId: string;
    scheduledById: string;
    scheduledAt: Date;
    durationMinutes: number;
    type: import("../../../../generated/prisma/enums").InterviewType;
    status: InterviewStatus;
    meetingUrl: string | null;
    title: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getInterview(userId: string, applicationId: string): Promise<{
    candidateProfile: {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: import("../../../../generated/prisma/enums").Role;
            status: import("../../../../generated/prisma/enums").UserStatus;
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
    interviews: {
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: import("../../../../generated/prisma/enums").InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    job: {
        id: string;
        companyId: string;
        title: string;
        description: string;
        location: string;
        image: string | null;
        remoteType: import("../../../../generated/prisma/enums").RemoteType;
        employmentType: import("../../../../generated/prisma/enums").EmploymentType;
        experienceLevel: import("../../../../generated/prisma/enums").ExperienceLevel;
        salaryMin: number | null;
        salaryMax: number | null;
        salaryCurrency: string | null;
        deadline: Date;
        status: import("../../../../generated/prisma/enums").JobStatus;
        publishedAt: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    candidateProfileId: string;
    jobId: string;
    coverLetter: string | null;
    status: ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getSingleInterview(userId: string, interviewId: string): Promise<{
    jobApplication: {
        candidateProfile: {
            userId: string;
        };
        job: {
            companyId: string;
            id: string;
            title: string;
        };
    } & {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    jobApplicationId: string;
    scheduledById: string;
    scheduledAt: Date;
    durationMinutes: number;
    type: import("../../../../generated/prisma/enums").InterviewType;
    status: InterviewStatus;
    meetingUrl: string | null;
    title: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function rescheduleInterview(recruiterId: string, interviewId: string, input: unknown): Promise<{
    id: string;
    jobApplicationId: string;
    scheduledById: string;
    scheduledAt: Date;
    durationMinutes: number;
    type: import("../../../../generated/prisma/enums").InterviewType;
    status: InterviewStatus;
    meetingUrl: string | null;
    title: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function cancelInterview(recruiterId: string, interviewId: string): Promise<{
    id: string;
    jobApplicationId: string;
    scheduledById: string;
    scheduledAt: Date;
    durationMinutes: number;
    type: import("../../../../generated/prisma/enums").InterviewType;
    status: InterviewStatus;
    meetingUrl: string | null;
    title: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAll: (userId: string) => Promise<({
    jobApplication: {
        candidateProfile: {
            education: {
                id: string;
                institution: string;
                degree: string | null;
                field: string | null;
                startYear: number | null;
                endYear: number | null;
                candidateId: string;
            }[];
            skills: {
                id: string;
                name: string;
                candidateId: string;
            }[];
            user: {
                email: string;
                id: string;
                image: string | null;
                name: string;
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
        job: {
            company: {
                description: string | null;
                id: string;
                name: string;
                website: string | null;
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
            remoteType: import("../../../../generated/prisma/enums").RemoteType;
            employmentType: import("../../../../generated/prisma/enums").EmploymentType;
            experienceLevel: import("../../../../generated/prisma/enums").ExperienceLevel;
            salaryMin: number | null;
            salaryMax: number | null;
            salaryCurrency: string | null;
            deadline: Date;
            status: import("../../../../generated/prisma/enums").JobStatus;
            publishedAt: Date | null;
            closedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    jobApplicationId: string;
    scheduledById: string;
    scheduledAt: Date;
    durationMinutes: number;
    type: import("../../../../generated/prisma/enums").InterviewType;
    status: InterviewStatus;
    meetingUrl: string | null;
    title: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
//# sourceMappingURL=interview.service.d.ts.map