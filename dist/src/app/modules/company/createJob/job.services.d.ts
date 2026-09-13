import { EmploymentType, ExperienceLevel, JobStatus, RemoteType } from "../../../../generated/prisma/enums";
interface RequiredSkillInput {
    name: string;
    priority?: string;
}
type JobSkillValue = RequiredSkillInput | string;
interface CreateJobInput {
    status: string;
    salaryCurrency?: string | null;
    experienceLevel: ExperienceLevel | null | undefined;
    remoteType?: RemoteType;
    deadline?: Date;
    salaryMin?: number;
    salaryMax?: number;
    title: string;
    description: string;
    location?: string;
    employmentType?: string;
    requiredSkills?: JobSkillValue[];
    preferredSkills?: string[];
}
declare const createJobService: (userId: string, data: CreateJobInput) => Promise<{
    id: string;
    companyId: string;
    title: string;
    description: string;
    location: string;
    image: string | null;
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    embedding: {
        dimensions: number;
    } | null;
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
}>;
declare const getAllJobsService: (userId: string) => Promise<({
    _count: {
        jobApplications: number;
        matches: number;
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
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const allJobsService: () => Promise<({
    _count: {
        jobApplications: number;
        matches: number;
    };
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
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const updateJobService: (userId: string, jobId: string, data: CreateJobInput) => Promise<{
    id: string;
    companyId: string;
    title: string;
    description: string;
    location: string;
    image: string | null;
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    embedding: {
        dimensions: number;
    } | null;
    _count: {
        jobApplications: number;
        matches: number;
    };
    company: {
        id: string;
        name: string;
        description: string | null;
        website: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    matches: {
        id: string;
        candidateId: string;
        jobId: string;
        overallScore: number;
        semanticScore: number;
        skillsScore: number;
        experienceScore: number;
        educationScore: number;
        keywordScore: number;
        missingSkills: import("@prisma/client/runtime/client").JsonValue;
        matchedSkills: import("@prisma/client/runtime/client").JsonValue;
        recommendation: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    requiredSkills: {
        id: string;
        jobId: string;
        name: string;
        priority: string;
    }[];
}>;
declare const deleteJobService: (userId: string, jobId: string) => Promise<null>;
declare const getJobById: (jobId: string) => Promise<{
    _count: {
        jobApplications: number;
        matches: number;
    };
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
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const publishJob: (userId: string, jobId: string) => Promise<{
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
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const closeJob: (userId: string, jobId: string) => Promise<{
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
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const duplicateJob: (userId: string, jobId: string) => Promise<{
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
    remoteType: RemoteType;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    salaryMin: number | null;
    salaryMax: number | null;
    salaryCurrency: string | null;
    deadline: Date;
    status: JobStatus;
    publishedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const searchJobs: (query: unknown) => Promise<{
    jobs: ({
        _count: {
            jobApplications: number;
            matches: number;
        };
        company: {
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
        remoteType: RemoteType;
        employmentType: EmploymentType;
        experienceLevel: ExperienceLevel;
        salaryMin: number | null;
        salaryMax: number | null;
        salaryCurrency: string | null;
        deadline: Date;
        status: JobStatus;
        publishedAt: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}>;
export declare const jobServices: {
    createJobService: typeof createJobService;
    updateJobService: typeof updateJobService;
    deleteJobService: typeof deleteJobService;
    getAllJobsService: typeof getAllJobsService;
    getJobById: typeof getJobById;
    publishJob: typeof publishJob;
    closeJob: typeof closeJob;
    duplicateJob: typeof duplicateJob;
    searchJobs: typeof searchJobs;
    allJobsService: typeof allJobsService;
};
export {};
//# sourceMappingURL=job.services.d.ts.map