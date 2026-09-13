import { ApplicationStatus } from "../../../generated/prisma/enums";
declare const changeApplicationStatus: (applicationId: string, newStatus: ApplicationStatus, changedById: string) => Promise<{
    application: {
        id: string;
        candidateProfileId: string;
        jobId: string;
        coverLetter: string | null;
        status: ApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    };
    history: {
        id: string;
        applicationId: string;
        oldStatus: ApplicationStatus | null;
        newStatus: ApplicationStatus;
        changedById: string;
        changedAt: Date;
    };
}>;
declare const getApplicationStatusHistory: (applicationId: string) => Promise<{
    id: string;
    applicationId: string;
    oldStatus: ApplicationStatus | null;
    newStatus: ApplicationStatus;
    changedById: string;
    changedAt: Date;
}[]>;
declare const getSingleStatusHistory: (applicationId: string, historyId: string) => Promise<{
    id: string;
    applicationId: string;
    oldStatus: ApplicationStatus | null;
    newStatus: ApplicationStatus;
    changedById: string;
    changedAt: Date;
}>;
export declare const ApplicationStatusHistoryService: {
    changeApplicationStatus: typeof changeApplicationStatus;
    getApplicationStatusHistory: typeof getApplicationStatusHistory;
    getSingleStatusHistory: typeof getSingleStatusHistory;
};
export {};
//# sourceMappingURL=applicationStatusHistory.service.d.ts.map