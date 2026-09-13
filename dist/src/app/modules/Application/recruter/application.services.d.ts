export declare const getJobApplicationsForRecruiter: (userId: string, jobId: string) => Promise<({
    candidateProfile: {
        certifications: {
            id: string;
            name: string;
            issuer: string | null;
            issueDate: Date | null;
            credentialUrl: string | null;
            candidateId: string;
            image: string | null;
        }[];
        education: {
            id: string;
            institution: string;
            degree: string | null;
            field: string | null;
            startYear: number | null;
            endYear: number | null;
            candidateId: string;
        }[];
        projects: {
            id: string;
            name: string;
            description: string | null;
            technologies: string | null;
            projectUrl: string | null;
            candidateId: string;
            image: string | null;
        }[];
        skills: {
            id: string;
            name: string;
            candidateId: string;
        }[];
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
} & {
    id: string;
    candidateProfileId: string;
    jobId: string;
    coverLetter: string | null;
    status: import("../../../../generated/prisma/enums").ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getRecruiterApplicationById: (userId: string, applicationId: string) => Promise<{
    candidateProfile: {
        certifications: {
            id: string;
            name: string;
            issuer: string | null;
            issueDate: Date | null;
            credentialUrl: string | null;
            candidateId: string;
            image: string | null;
        }[];
        education: {
            id: string;
            institution: string;
            degree: string | null;
            field: string | null;
            startYear: number | null;
            endYear: number | null;
            candidateId: string;
        }[];
        projects: {
            id: string;
            name: string;
            description: string | null;
            technologies: string | null;
            projectUrl: string | null;
            candidateId: string;
            image: string | null;
        }[];
        skills: {
            id: string;
            name: string;
            candidateId: string;
        }[];
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
export declare const updateApplicationStatus: (userId: string, applicationId: string, status: "APPLIED" | "SCREENING" | "SHORTLISTED" | "INTERVIEW" | "OFFER" | "HIRED" | "REJECTED" | "WITHDRAWN") => Promise<{
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
export declare const deleteRecruiterApplication: (userId: string, applicationId: string) => Promise<null>;
export declare const getCompanyApplications: (userId: string) => Promise<({
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
})[]>;
//# sourceMappingURL=application.services.d.ts.map