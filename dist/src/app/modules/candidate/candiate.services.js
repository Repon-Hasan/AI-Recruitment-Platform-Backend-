"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const cloudnary_config_1 = require("../../config/cloudnary.config");
const candidate_embedding_service_1 = require("./candidate.embedding.service");
// ===============================
// GET MY PROFILE
// ===============================
const getMyProfile = async (userId) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
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
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    return profile;
};
// ===============================
// UPDATE MY PROFILE
// ===============================
const updateMyProfile = async (userId, payload) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
        where: { userId },
    });
    console.log("Profile", profile);
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    // Extract 'name' so it isn't passed directly into CandidateProfile update
    const { name, ...profileData } = payload;
    // 1. Update candidate profile (and optionally user name via relation)
    const updatedProfile = await prisma_1.prisma.candidateProfile.update({
        where: { userId },
        data: {
            ...profileData,
            ...(name ? { user: { update: { name } } } : {}),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            skills: true,
            education: true,
            projects: true,
            certifications: true,
        },
    });
    // 2. Generate embedding from NEW data
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(updatedProfile.id);
    // 3. Return updated profile
    return updatedProfile;
};
// ===============================
// ADD SKILL
// ===============================
const addSkill = async (userId, skills) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    // ===============================
    // Single skill
    // ===============================
    if (typeof skills === "string") {
        const skill = await prisma_1.prisma.candidateSkill.create({
            data: {
                candidateId: profile.id,
                name: skills,
            },
        });
        // Generate embedding AFTER skill is created
        await (0, candidate_embedding_service_1.generateCandidateEmbedding)(profile.id);
        return skill;
    }
    // ===============================
    // Multiple skills
    // ===============================
    const result = await prisma_1.prisma.candidateSkill.createMany({
        data: skills.map((skill) => ({
            candidateId: profile.id,
            name: skill.name,
        })),
    });
    // Generate embedding AFTER skills are created
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(profile.id);
    return result;
};
// ===============================
// DELETE SKILL
// ===============================
const deleteSkill = async (userId, skillId) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    const skill = await prisma_1.prisma.candidateSkill.findFirst({
        where: {
            id: skillId,
            candidateId: profile.id,
        },
    });
    if (!skill) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Skill not found");
    }
    // 1. Delete skill
    await prisma_1.prisma.candidateSkill.delete({
        where: {
            id: skillId,
        },
    });
    // 2. Generate embedding AFTER deletion
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(profile.id);
    return null;
};
// ===============================
// ADD EDUCATION
// ===============================
const addEducation = async (userId, payload) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    // 1. Create education
    const education = await prisma_1.prisma.candidateEducation.create({
        data: {
            ...payload,
            candidateId: profile.id,
        },
    });
    // 2. Generate embedding AFTER creation
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(profile.id);
    return education;
};
// ===============================
// UPDATE EDUCATION
// ===============================
const updateEducation = async (userId, educationId, payload) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    const education = await prisma_1.prisma.candidateEducation.findFirst({
        where: {
            id: educationId,
            candidateId: profile.id,
        },
    });
    if (!education) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Education not found");
    }
    // 1. Update education
    const updatedEducation = await prisma_1.prisma.candidateEducation.update({
        where: {
            id: educationId,
        },
        data: payload,
    });
    // 2. Generate embedding AFTER update
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(profile.id);
    return updatedEducation;
};
// ===============================
// DELETE EDUCATION
// ===============================
const deleteEducation = async (userId, educationId) => {
    const profile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!profile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    const education = await prisma_1.prisma.candidateEducation.findFirst({
        where: {
            id: educationId,
            candidateId: profile.id,
        },
    });
    if (!education) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Education not found");
    }
    // 1. Delete education
    await prisma_1.prisma.candidateEducation.delete({
        where: {
            id: educationId,
        },
    });
    // 2. Generate embedding AFTER deletion
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(profile.id);
    return null;
};
// ===============================
// CREATE PROJECT
// ===============================
const createProject = async (userId, payload) => {
    const candidateProfile = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidateProfile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Candidate profile not found");
    }
    // 1. Create project
    const project = await prisma_1.prisma.candidateProject.create({
        data: {
            name: payload.name,
            description: payload.description,
            technologies: payload.technologies,
            projectUrl: payload.projectUrl,
            image: payload.image,
            candidateId: candidateProfile.id,
        },
    });
    // 2. Generate embedding AFTER creation
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(candidateProfile.id);
    return project;
};
// ===============================
// GET MY PROJECTS
// ===============================
const getMyProjects = async (candidateId) => {
    return await prisma_1.prisma.candidateProject.findMany({
        where: {
            candidateId,
        },
        orderBy: {
            id: "desc",
        },
    });
};
// ===============================
// GET PROJECT BY ID
// ===============================
const getProjectById = async (candidateId, projectId) => {
    return await prisma_1.prisma.candidateProject.findFirst({
        where: {
            id: projectId,
            candidateId,
        },
    });
};
// ===============================
// UPDATE PROJECT
// ===============================
const updateProject = async (candidateId, projectId, payload) => {
    const existingProject = await prisma_1.prisma.candidateProject.findFirst({
        where: {
            id: projectId,
            candidateId,
        },
    });
    if (!existingProject) {
        throw new Error("Project not found");
    }
    // 1. Update project
    const updatedProject = await prisma_1.prisma.candidateProject.update({
        where: {
            id: projectId,
        },
        data: {
            ...payload,
        },
    });
    // 2. Generate embedding AFTER update
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(candidateId);
    return updatedProject;
};
// ===============================
// DELETE PROJECT
// ===============================
const deleteProject = async (candidateId, projectId) => {
    const existingProject = await prisma_1.prisma.candidateProject.findFirst({
        where: {
            id: projectId,
            candidateId,
        },
    });
    if (!existingProject) {
        throw new Error("Project not found");
    }
    // 1. Delete project
    const deletedProject = await prisma_1.prisma.candidateProject.delete({
        where: {
            id: projectId,
        },
    });
    // 2. Generate embedding AFTER deletion
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(candidateId);
    return deletedProject;
};
// ===============================
// CREATE CERTIFICATION
// ===============================
const createCertification = async (userId, payload) => {
    console.log("Certificate", payload);
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    // 1. Create certification
    const certification = await prisma_1.prisma.candidateCertification.create({
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
    // 2. Generate embedding AFTER creation
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(candidate.id);
    return certification;
};
// ===============================
// GET MY CERTIFICATIONS
// ===============================
const getMyCertifications = async (candidateId) => {
    return await prisma_1.prisma.candidateCertification.findMany({
        where: {
            candidateId,
        },
        orderBy: {
            issueDate: "desc",
        },
    });
};
// ===============================
// GET CERTIFICATION BY ID
// ===============================
const getCertificationById = async (candidateId, certificationId) => {
    return await prisma_1.prisma.candidateCertification.findFirst({
        where: {
            id: certificationId,
            candidateId,
        },
    });
};
// ===============================
// UPDATE CERTIFICATION
// ===============================
const updateCertification = async (candidateId, certificationId, payload) => {
    const existingCertification = await prisma_1.prisma.candidateCertification.findFirst({
        where: {
            id: certificationId,
            candidateId,
        },
    });
    if (!existingCertification) {
        throw new Error("Certification not found");
    }
    // 1. Update certification
    const updatedCertification = await prisma_1.prisma.candidateCertification.update({
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
    // 2. Generate embedding AFTER update
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(candidateId);
    return updatedCertification;
};
// ===============================
// DELETE CERTIFICATION
// ===============================
const deleteCertification = async (candidateId, certificationId) => {
    // 1. Find certification
    const existingCertification = await prisma_1.prisma.candidateCertification.findFirst({
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
        await (0, cloudnary_config_1.deleteFileFromCloudinary)(existingCertification.image);
    }
    // 3. Delete certification
    const deletedCertification = await prisma_1.prisma.candidateCertification.delete({
        where: {
            id: certificationId,
        },
    });
    // 4. Generate embedding AFTER deletion
    await (0, candidate_embedding_service_1.generateCandidateEmbedding)(candidateId);
    return deletedCertification;
};
// ===============================
// EXPORT
// ===============================
exports.candidateService = {
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
    deleteCertification,
};
