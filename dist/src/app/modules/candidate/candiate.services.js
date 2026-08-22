import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { deleteFileFromCloudinary } from "../../config/cloudnary.config";
// ===============================
// GET MY PROFILE
// ===============================
const getMyProfile = async (userId) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
        include: {
            skills: true,
            education: true,
            projects: true,
            certifications: true,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    return profile;
};
// ===============================
// UPDATE MY PROFILE
// ===============================
const updateMyProfile = async (userId, payload) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    return prisma.candidateProfile.update({
        where: {
            userId,
        },
        data: payload,
        include: {
            skills: true,
            education: true,
            projects: true,
            certifications: true,
        },
    });
};
// ===============================
// ADD SKILL
// ===============================
const addSkill = async (userId, skills) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    // Single value
    if (typeof skills === "string") {
        return prisma.candidateSkill.create({
            data: {
                candidateId: profile.id,
                name: skills,
            },
        });
    }
    // Array
    return prisma.candidateSkill.createMany({
        data: skills.map((skill) => ({
            candidateId: profile.id,
            name: skill.name,
        })),
    });
};
// ===============================
// DELETE SKILL
// ===============================
const deleteSkill = async (userId, skillId) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    const skill = await prisma.candidateSkill.findFirst({
        where: {
            id: skillId,
            candidateId: profile.id,
        },
    });
    if (!skill) {
        throw new AppError(status.NOT_FOUND, "Skill not found");
    }
    await prisma.candidateSkill.delete({
        where: {
            id: skillId,
        },
    });
    return null;
};
// ===============================
// ADD EDUCATION
// ===============================
const addEducation = async (userId, payload) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    return prisma.candidateEducation.create({
        data: {
            ...payload,
            candidateId: profile.id,
        },
    });
};
// ===============================
// UPDATE EDUCATION
// ===============================
const updateEducation = async (userId, educationId, payload) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    const education = await prisma.candidateEducation.findFirst({
        where: {
            id: educationId,
            candidateId: profile.id,
        },
    });
    if (!education) {
        throw new AppError(status.NOT_FOUND, "Education not found");
    }
    return prisma.candidateEducation.update({
        where: {
            id: educationId,
        },
        data: payload,
    });
};
// ===============================
// DELETE EDUCATION
// ===============================
const deleteEducation = async (userId, educationId) => {
    const profile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    const education = await prisma.candidateEducation.findFirst({
        where: {
            id: educationId,
            candidateId: profile.id,
        },
    });
    if (!education) {
        throw new AppError(status.NOT_FOUND, "Education not found");
    }
    await prisma.candidateEducation.delete({
        where: {
            id: educationId,
        },
    });
    return null;
};
//Project Related all services..
const createProject = async (userId, payload) => {
    // Find candidate profile using logged-in user's ID
    const candidateProfile = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidateProfile) {
        throw new AppError(status.NOT_FOUND, "Candidate profile not found");
    }
    // Create project using candidate profile ID
    const project = await prisma.candidateProject.create({
        data: {
            name: payload.name,
            description: payload.description,
            technologies: payload.technologies,
            projectUrl: payload.projectUrl,
            image: payload.image,
            candidateId: candidateProfile.id,
        },
    });
    return project;
};
const getMyProjects = async (candidateId) => {
    return await prisma.candidateProject.findMany({
        where: {
            candidateId,
        },
        orderBy: {
            id: "desc",
        },
    });
};
const getProjectById = async (candidateId, projectId) => {
    return await prisma.candidateProject.findFirst({
        where: {
            id: projectId,
            candidateId,
        },
    });
};
const updateProject = async (candidateId, projectId, payload) => {
    const existingProject = await prisma.candidateProject.findFirst({
        where: {
            id: projectId,
            candidateId,
        },
    });
    if (!existingProject) {
        throw new Error("Project not found");
    }
    return await prisma.candidateProject.update({
        where: {
            id: projectId,
        },
        data: {
            ...payload,
        },
    });
};
const deleteProject = async (candidateId, projectId) => {
    const existingProject = await prisma.candidateProject.findFirst({
        where: {
            id: projectId,
            candidateId,
        },
    });
    if (!existingProject) {
        throw new Error("Project not found");
    }
    return await prisma.candidateProject.delete({
        where: {
            id: projectId,
        },
    });
};
//Certification
const createCertification = async (userId, payload) => {
    const candidate = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    return await prisma.candidateCertification.create({
        data: {
            name: payload.name,
            issuer: payload.issuer,
            issueDate: payload.issueDate
                ? new Date(payload.issueDate)
                : undefined,
            credentialUrl: payload.credentialUrl,
            image: payload.image,
            candidateId: candidate.id,
        },
    });
};
const getMyCertifications = async (candidateId) => {
    return await prisma.candidateCertification.findMany({
        where: {
            candidateId,
        },
        orderBy: {
            issueDate: "desc",
        },
    });
};
const getCertificationById = async (candidateId, certificationId) => {
    return await prisma.candidateCertification.findFirst({
        where: {
            id: certificationId,
            candidateId,
        },
    });
};
const updateCertification = async (candidateId, certificationId, payload) => {
    const existingCertification = await prisma.candidateCertification.findFirst({
        where: {
            id: certificationId,
            candidateId,
        },
    });
    if (!existingCertification) {
        throw new Error("Certification not found");
    }
    return await prisma.candidateCertification.update({
        where: {
            id: certificationId,
        },
        data: {
            name: payload.name,
            issuer: payload.issuer,
            issueDate: payload.issueDate
                ? new Date(payload.issueDate)
                : undefined,
            credentialUrl: payload.credentialUrl,
        },
    });
};
const deleteCertification = async (candidateId, certificationId) => {
    // 1. Find certification
    const existingCertification = await prisma.candidateCertification.findFirst({
        where: {
            id: certificationId,
            candidateId,
        },
    });
    if (!existingCertification) {
        throw new Error("Certification not found");
    }
    // 2. Delete image from Cloudinary
    if (existingCertification.image) {
        await deleteFileFromCloudinary(existingCertification.image);
    }
    // 3. Delete certification from database
    return await prisma.candidateCertification.delete({
        where: {
            id: certificationId,
        },
    });
};
export const candidateService = {
    getMyProfile,
    updateMyProfile,
    addSkill,
    deleteSkill,
    addEducation,
    updateEducation,
    deleteEducation,
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    createCertification,
    getMyCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
};
