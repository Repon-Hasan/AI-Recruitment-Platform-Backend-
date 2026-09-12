"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInterviewController = exports.updateInterviewController = exports.getRecruiterInterviewsController = exports.rescheduleInterviewController = exports.cancelInterviewController = exports.confirmInterviewController = exports.getCandidateInterviewByIdController = exports.getCandidateInterviewsController = exports.createInterviewController = void 0;
const interview_service_1 = __importDefault(require("./interview.service"));
const interview_validation_1 = require("./interview.validation");
// ============================================
// CREATE
// ============================================
const createInterviewController = async (req, res) => {
    try {
        const recruiterId = req.user.userId;
        const parsed = interview_validation_1.createInterviewSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }
        const interview = await interview_service_1.default.createInterview(recruiterId, parsed?.data);
        return res.status(201).json({
            success: true,
            message: "Interview scheduled successfully",
            data: interview,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to create interview",
        });
    }
};
exports.createInterviewController = createInterviewController;
// ============================================
// CANDIDATE - GET ALL
// ============================================
const getCandidateInterviewsController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await interview_service_1.default.getCandidateInterviews(userId);
        return res.status(200).json({
            success: true,
            message: "Candidate interviews retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to retrieve interviews",
        });
    }
};
exports.getCandidateInterviewsController = getCandidateInterviewsController;
// ============================================
// CANDIDATE - GET SINGLE
// ============================================
const getCandidateInterviewByIdController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { interviewId } = req.params;
        const interview = await interview_service_1.default.getCandidateInterviewById(userId, interviewId);
        return res.status(200).json({
            success: true,
            message: "Interview retrieved successfully",
            data: interview,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message ||
                "Interview not found",
        });
    }
};
exports.getCandidateInterviewByIdController = getCandidateInterviewByIdController;
// ============================================
// CONFIRM
// ============================================
const confirmInterviewController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { interviewId } = req.params;
        const interview = await interview_service_1.default.confirmInterview(userId, interviewId);
        return res.status(200).json({
            success: true,
            message: "Interview confirmed successfully",
            data: interview,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to confirm interview",
        });
    }
};
exports.confirmInterviewController = confirmInterviewController;
// ============================================
// CANCEL
// ============================================
const cancelInterviewController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { interviewId } = req.params;
        const interview = await interview_service_1.default.cancelInterview(userId, interviewId);
        return res.status(200).json({
            success: true,
            message: "Interview cancelled successfully",
            data: interview,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to cancel interview",
        });
    }
};
exports.cancelInterviewController = cancelInterviewController;
// ============================================
// RESCHEDULE
// ============================================
const rescheduleInterviewController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { interviewId } = req.params;
        const { scheduledAt } = req.body;
        if (!scheduledAt) {
            return res.status(400).json({
                success: false,
                message: "scheduledAt is required",
            });
        }
        const interview = await interview_service_1.default.rescheduleInterview(userId, interviewId, scheduledAt);
        return res.status(200).json({
            success: true,
            message: "Interview rescheduled successfully",
            data: interview,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to reschedule interview",
        });
    }
};
exports.rescheduleInterviewController = rescheduleInterviewController;
// ============================================
// RECRUITER - GET ALL
// ============================================
const getRecruiterInterviewsController = async (req, res) => {
    try {
        const recruiterId = req.user.userId;
        const interviews = await interview_service_1.default.getRecruiterInterviews(recruiterId);
        return res.status(200).json({
            success: true,
            message: "Recruiter interviews retrieved successfully",
            data: interviews,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to retrieve interviews",
        });
    }
};
exports.getRecruiterInterviewsController = getRecruiterInterviewsController;
// ============================================
// RECRUITER - UPDATE
// ============================================
const updateInterviewController = async (req, res) => {
    try {
        const recruiterId = req.user.userId;
        const { interviewId } = req.params;
        const parsed = interview_validation_1.updateInterviewSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }
        const interview = await interview_service_1.default.updateInterview(recruiterId, interviewId, parsed.data);
        return res.status(200).json({
            success: true,
            message: "Interview updated successfully",
            data: interview,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to update interview",
        });
    }
};
exports.updateInterviewController = updateInterviewController;
// ============================================
// RECRUITER - DELETE
// ============================================
const deleteInterviewController = async (req, res) => {
    try {
        const recruiterId = req.user.userId;
        const { interviewId } = req.params;
        await interview_service_1.default.deleteInterview(recruiterId, interviewId);
        return res.status(200).json({
            success: true,
            message: "Interview deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message ||
                "Failed to delete interview",
        });
    }
};
exports.deleteInterviewController = deleteInterviewController;
