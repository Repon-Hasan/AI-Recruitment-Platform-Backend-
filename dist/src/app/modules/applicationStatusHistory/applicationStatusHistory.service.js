"use strict";
// applicationStatusHistory.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStatusHistoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const changeApplicationStatus = async (applicationId, newStatus, changedById) => {
    return await prisma_1.prisma.$transaction(async (tx) => {
        // 1. Find application
        const application = await tx.jobApplication.findUnique({
            where: {
                id: applicationId,
            },
        });
        if (!application) {
            throw new Error("Job application not found");
        }
        // 2. Check if status is already same
        if (application.status === newStatus) {
            throw new Error(`Application is already in ${newStatus} status`);
        }
        // 3. Update current application status
        const updatedApplication = await tx.jobApplication.update({
            where: {
                id: applicationId,
            },
            data: {
                status: newStatus,
            },
        });
        // 4. Create history
        const history = await tx.applicationStatusHistory.create({
            data: {
                applicationId,
                oldStatus: application.status,
                newStatus,
                changedById,
            },
        });
        return {
            application: updatedApplication,
            history,
        };
    });
};
const getApplicationStatusHistory = async (applicationId) => {
    const application = await prisma_1.prisma.jobApplication.findUnique({
        where: {
            id: applicationId,
        },
        select: {
            id: true,
        },
    });
    if (!application) {
        throw new Error("Job application not found");
    }
    const history = await prisma_1.prisma.applicationStatusHistory.findMany({
        where: {
            applicationId,
        },
        orderBy: {
            changedAt: "asc",
        },
    });
    return history;
};
const getSingleStatusHistory = async (applicationId, historyId) => {
    const history = await prisma_1.prisma.applicationStatusHistory.findFirst({
        where: {
            id: historyId,
            applicationId,
        },
    });
    if (!history) {
        throw new Error("Application status history not found");
    }
    return history;
};
exports.ApplicationStatusHistoryService = {
    changeApplicationStatus,
    getApplicationStatusHistory,
    getSingleStatusHistory,
};
