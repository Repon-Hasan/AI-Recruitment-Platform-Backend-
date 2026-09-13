interface CreateCompanyPayload {
    name: string;
    description?: string;
    website?: string;
}
interface UpdateCompanyPayload {
    name?: string;
    description?: string;
    website?: string;
}
declare const createCompany: (userId: string, payload: CreateCompanyPayload) => Promise<{
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getMyCompany: (userId: string) => Promise<({
    jobs: {
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
    }[];
} & {
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const updateMyCompany: (userId: string, payload: UpdateCompanyPayload) => Promise<{
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deleteMyCompany: (userId: string) => Promise<null>;
declare const getMyCompanyComplaints: (userId: string) => Promise<({
    candidateProfile: {
        experience: string | null;
        id: string;
        location: string | null;
        phone: string | null;
    } | null;
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
        location: string;
        title: string;
    } | null;
    jobApplication: {
        createdAt: Date;
        id: string;
        status: import("../../../../generated/prisma/enums").ApplicationStatus;
    } | null;
    penalty: {
        id: string;
        complaintId: string;
        companyId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        reason: string;
        status: import("../../../../generated/prisma/enums").PenaltyStatus;
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
    type: import("../../../../generated/prisma/enums").ComplaintType;
    title: string;
    description: string;
    status: import("../../../../generated/prisma/enums").ComplaintStatus;
    decision: import("../../../../generated/prisma/enums").ComplaintDecision | null;
    adminNote: string | null;
    reviewedById: string | null;
    reviewedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getMyCompanyPenalties: (userId: string) => Promise<({
    company: {
        id: string;
        name: string;
    };
    complaint: {
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
    } & {
        id: string;
        candidateProfileId: string | null;
        submittedById: string;
        companyId: string;
        jobId: string | null;
        jobApplicationId: string | null;
        type: import("../../../../generated/prisma/enums").ComplaintType;
        title: string;
        description: string;
        status: import("../../../../generated/prisma/enums").ComplaintStatus;
        decision: import("../../../../generated/prisma/enums").ComplaintDecision | null;
        adminNote: string | null;
        reviewedById: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    complaintId: string;
    companyId: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    currency: string;
    reason: string;
    status: import("../../../../generated/prisma/enums").PenaltyStatus;
    stripePaymentIntentId: string | null;
    dueDate: Date | null;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getMyCompanyPenaltyById: (userId: string, penaltyId: string) => Promise<{
    company: {
        id: string;
        name: string;
    };
    complaint: {
        candidateProfile: {
            experience: string | null;
            id: string;
            location: string | null;
            phone: string | null;
        } | null;
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
        } | null;
    } & {
        id: string;
        candidateProfileId: string | null;
        submittedById: string;
        companyId: string;
        jobId: string | null;
        jobApplicationId: string | null;
        type: import("../../../../generated/prisma/enums").ComplaintType;
        title: string;
        description: string;
        status: import("../../../../generated/prisma/enums").ComplaintStatus;
        decision: import("../../../../generated/prisma/enums").ComplaintDecision | null;
        adminNote: string | null;
        reviewedById: string | null;
        reviewedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    complaintId: string;
    companyId: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    currency: string;
    reason: string;
    status: import("../../../../generated/prisma/enums").PenaltyStatus;
    stripePaymentIntentId: string | null;
    dueDate: Date | null;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const companyServices: {
    createCompany: typeof createCompany;
    getMyCompany: typeof getMyCompany;
    updateMyCompany: typeof updateMyCompany;
    deleteMyCompany: typeof deleteMyCompany;
    getMyCompanyComplaints: typeof getMyCompanyComplaints;
    getMyCompanyPenalties: typeof getMyCompanyPenalties;
    getMyCompanyPenaltyById: typeof getMyCompanyPenaltyById;
};
export {};
//# sourceMappingURL=comapny.services.d.ts.map