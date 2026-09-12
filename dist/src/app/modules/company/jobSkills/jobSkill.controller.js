"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSkillController = void 0;
const job_services_1 = require("./job.services");
// Create Skill
const createJobSkill = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const skill = await job_services_1.jobSkillServices.createJobSkillService(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Skill added to job successfully",
            data: skill,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to add skill",
        });
    }
};
// Get Skills By Job ID
const getSkillsByJobId = async (req, res) => {
    try {
        const jobId = Array.isArray(req.params.jobId)
            ? req.params.jobId[0]
            : req.params.jobId;
        const skills = await job_services_1.jobSkillServices.getSkillsByJobIdService(jobId);
        res.status(200).json({
            success: true,
            message: "Job skills retrieved successfully",
            data: skills,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to fetch skills",
        });
    }
};
// Update Skill
const updateJobSkill = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "Request body cannot be empty" });
        }
        const updatedSkill = await job_services_1.jobSkillServices.updateJobSkillService(userId, id, req.body);
        res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            data: updatedSkill,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to update skill",
        });
    }
};
// Delete Skill
const deleteJobSkill = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const result = await job_services_1.jobSkillServices.deleteJobSkillService(userId, id);
        res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to delete skill",
        });
    }
};
const getAllJobs = async (req, res) => {
    try {
        const result = await job_services_1.jobSkillServices.getAllJobSkillService();
        res.status(200).json({
            success: true,
            message: result.message,
            data: result.skills, // Attach the skills data array here
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to fetch skills",
        });
    }
};
exports.jobSkillController = {
    createJobSkill,
    getSkillsByJobId,
    updateJobSkill,
    deleteJobSkill,
    getAllJobs
};
