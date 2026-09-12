"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../shared/catchAsync");
const candiate_services_1 = require("./candiate.services");
const sendResponse_1 = require("../../shared/sendResponse");
const cloudnary_config_1 = require("../../config/cloudnary.config");
// ========================================
// GET /api/candidates/me
// ========================================
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await candiate_services_1.candidateService.getMyProfile(userId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Candidate profile fetched successfully",
        data: result,
    });
});
// ========================================
// PATCH /api/candidates/me
// ========================================
const updateMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await candiate_services_1.candidateService.updateMyProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Candidate profile updated successfully",
        data: result,
    });
});
// ========================================
// POST /api/candidates/skills
// ========================================
const addSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const { skills } = req.body;
    const result = await candiate_services_1.candidateService.addSkill(userId, skills);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Skill(s) added successfully",
        data: result,
    });
});
// ========================================
// DELETE /api/candidates/skills/:skillId
// ========================================
const deleteSkill = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const skillId = Array.isArray(req.params.skillId)
        ? req.params.skillId[0]
        : req.params.skillId;
    await candiate_services_1.candidateService.deleteSkill(userId, skillId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Skill deleted successfully",
        data: null,
    });
});
// ========================================
// POST /api/candidates/education
// ========================================
const addEducation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await candiate_services_1.candidateService.addEducation(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Education added successfully",
        data: result,
    });
});
// ========================================
// PATCH /api/candidates/education/:id
// ========================================
const updateEducation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    const result = await candiate_services_1.candidateService.updateEducation(userId, id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Education updated successfully",
        data: result,
    });
});
// ========================================
// DELETE /api/candidates/education/:id
// ========================================
const deleteEducation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    await candiate_services_1.candidateService.deleteEducation(userId, id);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Education deleted successfully",
        data: null,
    });
});
//Project Add PART
const createProject = async (req, res) => {
    try {
        const userId = req.user.userId;
        const project = await candiate_services_1.candidateService.createProject(userId, req.body);
        //console.log(project)
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create project",
        });
    }
};
const getMyProjects = async (req, res) => {
    try {
        const candidateId = req.user.userId;
        const projects = await candiate_services_1.candidateService.getMyProjects(candidateId);
        console.log("Projects", projects);
        res.status(200).json({
            success: true,
            message: "Projects retrieved successfully",
            data: projects,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve projects",
        });
    }
};
const getProjectById = async (req, res) => {
    try {
        const candidateId = req.user.userId;
        const projectId = Array.isArray(req.params.projectId)
            ? req.params.projectId[0]
            : req.params.projectId;
        const project = await candiate_services_1.candidateService.getProjectById(candidateId, projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project retrieved successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve project",
        });
    }
};
const updateProject = async (req, res) => {
    try {
        const candidateId = req.user.userId;
        const projectId = Array.isArray(req.params.projectId)
            ? req.params.projectId[0]
            : req.params.projectId;
        const project = await candiate_services_1.candidateService.updateProject(candidateId, projectId, req.body);
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update project",
        });
    }
};
const deleteProject = async (req, res) => {
    try {
        const candidateId = req.user.userId;
        const projectId = Array.isArray(req.params.projectId)
            ? req.params.projectId[0]
            : req.params.projectId;
        await candiate_services_1.candidateService.deleteProject(candidateId, projectId);
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete project",
        });
    }
};
//Certificate
const createCertification = async (req, res) => {
    try {
        const userId = req.user.userId;
        let certificateImage;
        console.log("📦 BODY:", req.body);
        console.log("📁 FILE:", req.file);
        // Multer memoryStorage gives us the file as a Buffer
        if (req.file) {
            const uploaded = await (0, cloudnary_config_1.uploadFileToCloudinary)(req.file.buffer, req.file.originalname);
            certificateImage = uploaded.secure_url;
            console.log("☁️ Cloudinary URL:", certificateImage);
        }
        const certification = await candiate_services_1.candidateService.createCertification(userId, {
            ...req.body,
            image: certificateImage,
        });
        res.status(201).json({
            success: true,
            message: "Certification created successfully",
            data: certification,
        });
    }
    catch (error) {
        console.error("❌ Certification error:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to create certification",
        });
    }
};
const getMyCertifications = async (req, res) => {
    try {
        const candidateId = req.user.id;
        const certifications = await candiate_services_1.candidateService.getMyCertifications(candidateId);
        res.status(200).json({
            success: true,
            message: "Certifications retrieved successfully",
            data: certifications,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve certifications",
        });
    }
};
const getCertificationById = async (req, res) => {
    try {
        const candidateId = req.user.id;
        const certificationId = Array.isArray(req.params.certificationId)
            ? req.params.certificationId[0]
            : req.params.certificationId;
        const certification = await candiate_services_1.candidateService.getCertificationById(candidateId, certificationId);
        if (!certification) {
            return res.status(404).json({
                success: false,
                message: "Certification not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Certification retrieved successfully",
            data: certification,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to retrieve certification",
        });
    }
};
const updateCertification = async (req, res) => {
    try {
        const candidateId = req.user.id;
        const certificationId = Array.isArray(req.params.certificationId)
            ? req.params.certificationId[0]
            : req.params.certificationId;
        const certification = await candiate_services_1.candidateService.updateCertification(candidateId, certificationId, req.body);
        res.status(200).json({
            success: true,
            message: "Certification updated successfully",
            data: certification,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to update certification",
        });
    }
};
const deleteCertification = async (req, res) => {
    try {
        const candidateId = req.user.id;
        const certificationId = Array.isArray(req.params.certificationId)
            ? req.params.certificationId[0]
            : req.params.certificationId;
        await candiate_services_1.candidateService.deleteCertification(candidateId, certificationId);
        res.status(200).json({
            success: true,
            message: "Certification deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to delete certification",
        });
    }
};
exports.candidateController = {
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
