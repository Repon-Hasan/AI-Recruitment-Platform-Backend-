"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyForJobMessage = exports.deleteMyApplication = exports.getMyApplicationById = exports.getMyApplications = exports.applyToJob = void 0;
const AppError_1 = __importDefault(require("../../../errorHelpers/AppError"));
const prisma_1 = require("../../../lib/prisma");
const applyToJob = async (userId, jobId) => {
    // 1. Check job exists
    const job = await prisma_1.prisma.job.findUnique({
        where: {
            id: jobId,
        },
    });
    if (!job) {
        throw new AppError_1.default(404, "Job not found");
    }
    // 2. Find candidate profile of logged-in user
    const candidateProfile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidateProfile) {
        throw new AppError_1.default(404, "Candidate profile not found. Please complete your profile first.");
    }
    // 3. Check already applied
    const existingApplication = await prisma_1.prisma.jobApplication.findUnique({
        where: {
            candidateProfileId_jobId: {
                candidateProfileId: candidateProfile.id,
                jobId,
            },
        },
    });
    if (existingApplication) {
        throw new AppError_1.default(409, "You have already applied to this job");
    }
    // 4. Create application
    const application = await prisma_1.prisma.jobApplication.create({
        data: {
            candidateProfileId: candidateProfile.id,
            jobId,
        },
        include: {
            job: {
                include: {
                    company: true,
                },
            },
            candidateProfile: true,
        },
    });
    return application;
};
exports.applyToJob = applyToJob;
const getMyApplications = async (candidateProfileId) => {
    const applications = await prisma_1.prisma.jobApplication.findMany({
        where: {
            candidateProfileId,
        },
        include: {
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
exports.getMyApplications = getMyApplications;
const getMyApplicationById = async (candidateProfileId, applicationId) => {
    const application = await prisma_1.prisma.jobApplication.findFirst({
        where: {
            id: applicationId,
            candidateProfileId,
        },
        include: {
            job: {
                include: {
                    company: true,
                    requiredSkills: true,
                },
            },
        },
    });
    if (!application) {
        throw new AppError_1.default(404, "Application not found");
    }
    return application;
};
exports.getMyApplicationById = getMyApplicationById;
const deleteMyApplication = async (candidateProfileId, applicationId) => {
    const application = await prisma_1.prisma.jobApplication.findFirst({
        where: {
            id: applicationId,
            candidateProfileId,
        },
    });
    if (!application) {
        throw new AppError_1.default(404, "Application not found");
    }
    const now = Date.now();
    const createdAt = application.createdAt.getTime();
    const eightHours = 8 * 60 * 60 * 1000;
    if (now - createdAt > eightHours) {
        throw new AppError_1.default(403, "You can delete your application only within 8 hours");
    }
    await prisma_1.prisma.jobApplication.delete({
        where: {
            id: applicationId,
        },
    });
    return null;
};
exports.deleteMyApplication = deleteMyApplication;
const applyForJobMessage = async (candidateProfileId, jobId) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // 1. Get job + company + recruiter
        const job = await tx.job.findUnique({
            where: {
                id: jobId,
            },
            include: {
                company: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (!job) {
            throw new Error("Job not found");
        }
        // 2. Get candidate
        const candidate = await tx.candidateProfile.findUnique({
            where: {
                id: candidateProfileId,
            },
            include: {
                user: true,
            },
        });
        if (!candidate) {
            throw new Error("Candidate not found");
        }
        // 3. Create application
        const application = await tx.jobApplication.create({
            data: {
                candidateProfileId: candidate.id,
                jobId: job.id,
            },
        });
        // 4. Create conversation
        const conversation = await tx.conversation.create({
            data: {
                jobApplicationId: application.id,
                participants: {
                    create: [
                        {
                            userId: candidate.userId,
                        },
                        {
                            userId: job.company.userId,
                        },
                    ],
                },
            },
        });
        // 5. Automatic message
        const message = await tx.message.create({
            data: {
                conversationId: conversation.id,
                senderId: job.company.userId,
                content: `Thank you for your interest in ${job.company.name}'s ${job.title} position. Your application has been received successfully. You can use this conversation to communicate with our recruitment team regarding your application.`,
                isAutomatic: true,
            },
        });
        return {
            application,
            conversation,
            message,
        };
    });
    return result;
};
exports.applyForJobMessage = applyForJobMessage;
