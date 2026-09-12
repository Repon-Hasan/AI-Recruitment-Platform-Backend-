"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyApplications = exports.deleteRecruiterApplication = exports.updateApplicationStatus = exports.getRecruiterApplicationById = exports.getJobApplicationsForRecruiter = void 0;
const AppError_1 = __importDefault(require("../../../errorHelpers/AppError"));
const prisma_1 = require("../../../lib/prisma");
const getJobApplicationsForRecruiter = async (userId, jobId) => {
    const job = await prisma_1.prisma.job.findFirst({
        where: {
            id: jobId,
            company: {
                userId,
            },
        },
    });
    if (!job) {
        throw new AppError_1.default(404, "Job not found or you don't have access");
    }
    const applications = await prisma_1.prisma.jobApplication.findMany({
        where: {
            jobId,
        },
        include: {
            candidateProfile: {
                include: {
                    skills: true,
                    education: true,
                    projects: true,
                    certifications: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return applications;
};
exports.getJobApplicationsForRecruiter = getJobApplicationsForRecruiter;
const getRecruiterApplicationById = async (userId, applicationId) => {
    const application = await prisma_1.prisma.jobApplication.findFirst({
        where: {
            id: applicationId,
            job: {
                company: {
                    userId,
                },
            },
        },
        include: {
            candidateProfile: {
                include: {
                    skills: true,
                    education: true,
                    projects: true,
                    certifications: true,
                },
            },
            job: {
                include: {
                    company: true,
                    requiredSkills: true,
                },
            },
        },
    });
    if (!application) {
        throw new AppError_1.default(404, "Application not found or unauthorized");
    }
    return application;
};
exports.getRecruiterApplicationById = getRecruiterApplicationById;
const updateApplicationStatus = async (userId, applicationId, status) => {
    const application = await prisma_1.prisma.jobApplication.findFirst({
        where: {
            id: applicationId,
            job: {
                company: {
                    userId,
                },
            },
        },
    });
    if (!application) {
        throw new AppError_1.default(404, "Application not found or unauthorized");
    }
    const updatedApplication = await prisma_1.prisma.jobApplication.update({
        where: {
            id: applicationId,
        },
        data: {
            status,
        },
        include: {
            candidateProfile: true,
            job: {
                include: {
                    company: true,
                },
            },
        },
    });
    return updatedApplication;
};
exports.updateApplicationStatus = updateApplicationStatus;
const deleteRecruiterApplication = async (userId, applicationId) => {
    const application = await prisma_1.prisma.jobApplication.findFirst({
        where: {
            id: applicationId,
            job: {
                company: {
                    userId,
                },
            },
        },
    });
    if (!application) {
        throw new AppError_1.default(404, "Application not found or unauthorized");
    }
    await prisma_1.prisma.jobApplication.delete({
        where: {
            id: applicationId,
        },
    });
    return null;
};
exports.deleteRecruiterApplication = deleteRecruiterApplication;
const getCompanyApplications = async (userId) => {
    const applications = await prisma_1.prisma.jobApplication.findMany({
        where: {
            job: {
                company: {
                    userId,
                },
            },
        },
        include: {
            candidateProfile: true,
            job: {
                include: {
                    company: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return applications;
};
exports.getCompanyApplications = getCompanyApplications;
