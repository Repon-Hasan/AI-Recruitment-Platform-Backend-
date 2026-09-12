import AppError from "../../../errorHelpers/AppError";
import { prisma } from "../../../lib/prisma";
export const getJobApplicationsForRecruiter = async (userId, jobId) => {
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            company: {
                userId,
            },
        },
    });
    if (!job) {
        throw new AppError(404, "Job not found or you don't have access");
    }
    const applications = await prisma.jobApplication.findMany({
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
export const getRecruiterApplicationById = async (userId, applicationId) => {
    const application = await prisma.jobApplication.findFirst({
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
        throw new AppError(404, "Application not found or unauthorized");
    }
    return application;
};
export const updateApplicationStatus = async (userId, applicationId, status) => {
    const application = await prisma.jobApplication.findFirst({
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
        throw new AppError(404, "Application not found or unauthorized");
    }
    const updatedApplication = await prisma.jobApplication.update({
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
export const deleteRecruiterApplication = async (userId, applicationId) => {
    const application = await prisma.jobApplication.findFirst({
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
        throw new AppError(404, "Application not found or unauthorized");
    }
    await prisma.jobApplication.delete({
        where: {
            id: applicationId,
        },
    });
    return null;
};
export const getCompanyApplications = async (userId) => {
    const applications = await prisma.jobApplication.findMany({
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
