import { ComplaintDecision } from "../../../generated/prisma/enums";
declare const createComplaint: (userId: string, payload: {
    companyId: string;
    jobId?: string;
    jobApplicationId?: string;
    type: any;
    title: string;
    description: string;
}, files?: Express.Multer.File[]) => Promise<({
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
    status: import("../../../generated/prisma/enums").ComplaintStatus;
    decision: ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const getMyComplaints: (candidateProfileId: string) => Promise<({
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
    status: import("../../../generated/prisma/enums").ComplaintStatus;
    decision: ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const updateComplaint: (userId: string, complaintId: string, payload: {
    type?: any;
    title?: string;
    description?: string;
}, files?: Express.Multer.File[]) => Promise<({
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
    status: import("../../../generated/prisma/enums").ComplaintStatus;
    decision: ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const deleteComplaint: (userId: string, complaintId: string) => Promise<{
    id: string;
    message: string;
}>;
declare const getComplaintsForAdmin: () => Promise<({
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
    status: import("../../../generated/prisma/enums").ComplaintStatus;
    decision: ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const decideComplaint: (complaintId: string, adminId: string, decision: ComplaintDecision, adminNote: string) => Promise<{
    id: string;
    candidateProfileId: string | null;
    submittedById: string;
    companyId: string;
    jobId: string | null;
    jobApplicationId: string | null;
    type: import("../../../generated/prisma/enums").ComplaintType;
    title: string;
    description: string;
    status: import("../../../generated/prisma/enums").ComplaintStatus;
    decision: ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const createPenalty: (complaintId: string, adminId: string, payload: {
    amount: number;
    currency: string;
    reason: string;
    dueDate?: string;
}) => Promise<{
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
}>;
declare const getCompanyPenalties: (companyId: string) => Promise<({
    complaint: {
        id: string;
        status: import("../../../generated/prisma/enums").ComplaintStatus;
        title: string;
        type: import("../../../generated/prisma/enums").ComplaintType;
    };
} & {
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
})[]>;
declare const getMyCompanyComplaintById: (userId: string, complaintId: string) => Promise<{
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
    status: import("../../../generated/prisma/enums").ComplaintStatus;
    decision: ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updatePenalty: (penaltyId: string, companyId: string, payload: {
    amount?: number;
    currency?: string;
    reason?: string;
    dueDate?: string | null;
}) => Promise<{
    company: {
        id: string;
        name: string;
    };
    complaint: {
        decision: ComplaintDecision | null;
        id: string;
        status: import("../../../generated/prisma/enums").ComplaintStatus;
        title: string;
        type: import("../../../generated/prisma/enums").ComplaintType;
    };
} & {
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
}>;
declare const deletePenalty: (penaltyId: string, companyId: string) => Promise<{
    id: string;
    message: string;
}>;
export declare const ComplaintService: {
    createComplaint: typeof createComplaint;
    getMyComplaints: typeof getMyComplaints;
    updateComplaint: typeof updateComplaint;
    deleteComplaint: typeof deleteComplaint;
    getComplaintsForAdmin: typeof getComplaintsForAdmin;
    decideComplaint: typeof decideComplaint;
    createPenalty: typeof createPenalty;
    getCompanyPenalties: typeof getCompanyPenalties;
    getMyCompanyComplaintById: typeof getMyCompanyComplaintById;
    updatePenalty: typeof updatePenalty;
    deletePenalty: typeof deletePenalty;
};
export {};
//# sourceMappingURL=complaint.service.d.ts.map