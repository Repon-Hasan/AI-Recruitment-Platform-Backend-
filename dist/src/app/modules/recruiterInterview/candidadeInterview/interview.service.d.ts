import { InterviewStatus, InterviewType } from "../../../../generated/prisma/enums";
import { CreateInterviewPayload, UpdateInterviewPayload } from "./interview.interface";
declare class InterviewService {
    createInterview(recruiterId: string, payload: CreateInterviewPayload): Promise<{
        jobApplication: {
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
            status: import("../../../../generated/prisma/enums").ApplicationStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        scheduledBy: {
            email: string;
            id: string;
            name: string;
        };
    } & {
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCandidateInterviews(userId: string): Promise<{
        interviews: ({
            jobApplication: {
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
            };
            scheduledBy: {
                email: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            jobApplicationId: string;
            scheduledById: string;
            scheduledAt: Date;
            durationMinutes: number;
            type: InterviewType;
            status: InterviewStatus;
            meetingUrl: string | null;
            title: string | null;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        upcoming: ({
            jobApplication: {
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
            };
            scheduledBy: {
                email: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            jobApplicationId: string;
            scheduledById: string;
            scheduledAt: Date;
            durationMinutes: number;
            type: InterviewType;
            status: InterviewStatus;
            meetingUrl: string | null;
            title: string | null;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        completed: ({
            jobApplication: {
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
            };
            scheduledBy: {
                email: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            jobApplicationId: string;
            scheduledById: string;
            scheduledAt: Date;
            durationMinutes: number;
            type: InterviewType;
            status: InterviewStatus;
            meetingUrl: string | null;
            title: string | null;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        cancelled: ({
            jobApplication: {
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
            };
            scheduledBy: {
                email: string;
                id: string;
                name: string;
            };
        } & {
            id: string;
            jobApplicationId: string;
            scheduledById: string;
            scheduledAt: Date;
            durationMinutes: number;
            type: InterviewType;
            status: InterviewStatus;
            meetingUrl: string | null;
            title: string | null;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        stats: {
            total: number;
            upcoming: number;
            completed: number;
            cancelled: number;
        };
    }>;
    getCandidateInterviewById(userId: string, interviewId: string): Promise<{
        jobApplication: {
            candidateProfile: {
                user: {
                    email: string;
                    id: string;
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
        };
        scheduledBy: {
            email: string;
            id: string;
            name: string;
        };
    } & {
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    confirmInterview(userId: string, interviewId: string): Promise<{
        jobApplication: {
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
            status: import("../../../../generated/prisma/enums").ApplicationStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    cancelInterview(userId: string, interviewId: string): Promise<{
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    rescheduleInterview(userId: string, interviewId: string, scheduledAt: string): Promise<{
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getRecruiterInterviews(recruiterId: string): Promise<({
        jobApplication: {
            candidateProfile: {
                user: {
                    email: string;
                    id: string;
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
        };
    } & {
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateInterview(recruiterId: string, interviewId: string, payload: UpdateInterviewPayload): Promise<{
        jobApplication: {
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
            status: import("../../../../generated/prisma/enums").ApplicationStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteInterview(recruiterId: string, interviewId: string): Promise<{
        id: string;
        jobApplicationId: string;
        scheduledById: string;
        scheduledAt: Date;
        durationMinutes: number;
        type: InterviewType;
        status: InterviewStatus;
        meetingUrl: string | null;
        title: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
declare const _default: InterviewService;
export default _default;
//# sourceMappingURL=interview.service.d.ts.map