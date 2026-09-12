"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobMatch = exports.getJobMatchSummary = exports.getJobMatches = exports.getMyJobMatches = exports.getMyJobMatch = exports.calculateJobMatch = void 0;
const jobMatchService = __importStar(require("./job.services"));
// =====================================================
// Calculate / Update Job Match
// =====================================================
const calculateJobMatch = async (req, res) => {
    const userId = req.user.userId;
    const { jobId } = req.params;
    if (!jobId || Array.isArray(jobId)) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required",
        });
    }
    const result = await jobMatchService.calculateJobMatch(userId, jobId);
    return res.status(200).json({
        success: true,
        message: "Job match calculated successfully",
        data: result,
    });
};
exports.calculateJobMatch = calculateJobMatch;
// =====================================================
// Get Current Candidate Match
// =====================================================
const getMyJobMatch = async (req, res) => {
    const userId = req.user.userId;
    const { jobId } = req.params;
    if (!jobId || Array.isArray(jobId)) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required",
        });
    }
    const result = await jobMatchService.getMyJobMatch(userId, jobId);
    return res.status(200).json({
        success: true,
        data: result,
    });
};
exports.getMyJobMatch = getMyJobMatch;
// =====================================================
// Get All My Job Matches
// =====================================================
const getMyJobMatches = async (req, res) => {
    const userId = req.user.userId;
    const result = await jobMatchService.getMyJobMatches(userId);
    return res.status(200).json({
        success: true,
        data: result,
    });
};
exports.getMyJobMatches = getMyJobMatches;
// =====================================================
// Recruiter: Get Job Applicants Match
// =====================================================
const getJobMatches = async (req, res) => {
    const userId = req.user.id;
    const { jobId } = req.params;
    if (!jobId || Array.isArray(jobId)) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required",
        });
    }
    const result = await jobMatchService.getJobMatches(userId, jobId);
    return res.status(200).json({
        success: true,
        data: result,
    });
};
exports.getJobMatches = getJobMatches;
// =====================================================
// Get Match Summary
// =====================================================
const getJobMatchSummary = async (req, res) => {
    const userId = req.user.userId;
    const { jobId } = req.params;
    if (!jobId || Array.isArray(jobId)) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required",
        });
    }
    const result = await jobMatchService.getJobMatchSummary(userId, jobId);
    return res.status(200).json({
        success: true,
        data: result,
    });
};
exports.getJobMatchSummary = getJobMatchSummary;
// =====================================================
// Delete Match
// =====================================================
const deleteJobMatch = async (req, res) => {
    const userId = req.user.id;
    const { jobId } = req.params;
    if (!jobId || Array.isArray(jobId)) {
        return res.status(400).json({
            success: false,
            message: "Job ID is required",
        });
    }
    await jobMatchService.deleteJobMatch(userId, jobId);
    return res.status(200).json({
        success: true,
        message: "Job match deleted successfully",
    });
};
exports.deleteJobMatch = deleteJobMatch;
