import { ComplaintStatus } from "../../../generated/prisma/enums";
interface CreateComplaintPayload {
    companyId: string;
    jobId?: string;
    jobApplicationId?: string;
    type: "COMPANY_BEHAVIOR" | "JOB_MISMATCH" | "FAKE_JOB" | "SALARY_MISMATCH" | "INTERVIEW_PROBLEM" | "HARASSMENT" | "DISCRIMINATION" | "FRAUD" | "OTHER";
    title: string;
    description: string;
}
declare const createComplaint: (recruiterId: string, payload: CreateComplaintPayload) => Promise<{
    company: {
        id: string;
        name: string;
        description: string | null;
        website: string | null;
        userId: string;
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
    } | null;
    jobApplication: {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: import("../../../generated/prisma/enums").ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    candidateProfileId: string | null;
    submittedById: string;
    companyId: string;
    jobId: string | null;
    jobApplicationId: string | null;
    type: import("../../../generated/prisma/enums").ComplaintType;
    title: string;
    description: string;
    status: ComplaintStatus;
    decision: import("../../../generated/prisma/enums").ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getMyComplaints: (recruiterId: string) => Promise<({
    evidence: {
        id: string;
        complaintId: string;
        fileUrl: string;
        fileName: string;
        fileType: string;
        createdAt: Date;
    }[];
    job: {
        id: string;
        title: string;
    } | null;
    jobApplication: {
        id: string;
        status: import("../../../generated/prisma/enums").ApplicationStatus;
    } | null;
    penalty: {
        id: string;
        complaintId: string;
        companyId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        reason: string;
        status: import("../../../generated/prisma/enums").PenaltyStatus;
        stripePaymentIntentId: string | null;
        dueDate: Date | null;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    candidateProfileId: string | null;
    submittedById: string;
    companyId: string;
    jobId: string | null;
    jobApplicationId: string | null;
    type: import("../../../generated/prisma/enums").ComplaintType;
    title: string;
    description: string;
    status: ComplaintStatus;
    decision: import("../../../generated/prisma/enums").ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getMyComplaintById: (recruiterId: string, complaintId: string) => Promise<{
    company: {
        id: string;
        name: string;
        description: string | null;
        website: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    evidence: {
        id: string;
        complaintId: string;
        fileUrl: string;
        fileName: string;
        fileType: string;
        createdAt: Date;
    }[];
    job: {
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
    } | null;
    jobApplication: {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: import("../../../generated/prisma/enums").ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    penalty: {
        id: string;
        complaintId: string;
        companyId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        reason: string;
        status: import("../../../generated/prisma/enums").PenaltyStatus;
        stripePaymentIntentId: string | null;
        dueDate: Date | null;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    candidateProfileId: string | null;
    submittedById: string;
    companyId: string;
    jobId: string | null;
    jobApplicationId: string | null;
    type: import("../../../generated/prisma/enums").ComplaintType;
    title: string;
    description: string;
    status: ComplaintStatus;
    decision: import("../../../generated/prisma/enums").ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const ReviewComplaintService: {
    createComplaint: typeof createComplaint;
    getMyComplaints: typeof getMyComplaints;
    getMyComplaintById: typeof getMyComplaintById;
};
export {};
//# sourceMappingURL=reviewComplaint.service.d.ts.map