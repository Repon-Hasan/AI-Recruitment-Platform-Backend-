interface SkillItem {
    name: string;
    priority?: string;
}
interface CreateJobSkillInput {
    jobId: string;
    name?: string;
    priority?: string;
    skills?: SkillItem[];
}
interface UpdateJobSkillInput {
    name?: string;
    priority?: string;
}
declare const createJobSkillService: (userId: string, data: CreateJobSkillInput) => Promise<import("../../../../generated/prisma/internal/prismaNamespace").BatchPayload | {
    id: string;
    jobId: string;
    name: string;
    priority: string;
}>;
declare const getSkillsByJobIdService: (jobId: string) => Promise<{
    id: string;
    jobId: string;
    name: string;
    priority: string;
}[]>;
declare const updateJobSkillService: (userId: string, skillId: string, data: UpdateJobSkillInput) => Promise<{
    id: string;
    jobId: string;
    name: string;
    priority: string;
}>;
declare const deleteJobSkillService: (userId: string, skillId: string) => Promise<{
    message: string;
}>;
declare const getAllJobSkillService: () => Promise<{
    skills: ({
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
        jobId: string;
        name: string;
        priority: string;
    })[];
    message: string;
}>;
export declare const jobSkillServices: {
    createJobSkillService: typeof createJobSkillService;
    getSkillsByJobIdService: typeof getSkillsByJobIdService;
    updateJobSkillService: typeof updateJobSkillService;
    deleteJobSkillService: typeof deleteJobSkillService;
    getAllJobSkillService: typeof getAllJobSkillService;
};
export {};
//# sourceMappingURL=job.services.d.ts.map