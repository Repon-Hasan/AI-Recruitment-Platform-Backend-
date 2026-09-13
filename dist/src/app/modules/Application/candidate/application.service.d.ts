export declare const applyToJob: (userId: string, jobId: string) => Promise<{
    candidateProfile: {
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
            id: string;
            name: string;
            description: string | null;
            website: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
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
    status: import("../../../../generated/prisma/enums").ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMyApplications: (candidateProfileId: string) => Promise<({
    job: {
        company: {
            id: string;
            name: string;
            description: string | null;
            website: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
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
    status: import("../../../../generated/prisma/enums").ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getMyApplicationById: (candidateProfileId: string, applicationId: string) => Promise<{
    job: {
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
    status: import("../../../../generated/prisma/enums").ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteMyApplication: (candidateProfileId: string, applicationId: string) => Promise<null>;
export declare const applyForJobMessage: (candidateProfileId: string, jobId: string) => Promise<{
    application: {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: import("../../../../generated/prisma/enums").ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    };
    conversation: {
        id: string;
        jobApplicationId: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    message: {
        id: string;
        conversationId: string;
        senderId: string;
        content: string;
        isAutomatic: boolean;
        readAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
//# sourceMappingURL=application.service.d.ts.map