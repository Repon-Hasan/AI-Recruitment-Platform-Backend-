"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeController = exports.getMyResumes = void 0;
const resume_service_1 = require("./resume.service");
const sendResponse_1 = require("../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const ingestion_service_1 = require("./ingestion.service");
const uploadResume = async (req, res) => {
    try {
        // console.log("========== CONTROLLER ==========");
        // console.log("Method:", req.method);
        // console.log("URL:", req.originalUrl);
        // console.log("Content-Type:", req.headers["content-type"]);
        // console.log("File:", req.file);
        // console.log("================================");
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }
        const userId = req.user.userId;
        const result = await resume_service_1.resumeServices.uploadResume(userId, req.file);
        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            data: result,
        });
    }
    catch (error) {
        //     console.error("========== UPLOAD ERROR ==========");
        // console.error("Message:", error?.message);
        // console.error("Name:", error?.name);
        // console.error("Stack:", error?.stack);
        // console.error("Full Error:", error);
        // console.error("=================================="); 
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getMyResumes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await resume_service_1.resumeServices.getMyResumes(userId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMyResumes = getMyResumes;
const getResume = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resumeId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const result = await resume_service_1.resumeServices.getResumeById(userId, resumeId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteResume = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resumeId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const result = await resume_service_1.resumeServices.deleteResume(userId, resumeId);
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const analyze = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resumeId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const result = await resume_service_1.resumeServices.analyzeResume(userId, resumeId);
        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getAnalysis = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resumeId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const result = await resume_service_1.resumeServices.getResumeAnalysis(userId, resumeId);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const ingestResume = async (req, res) => {
    const resumeId = Array.isArray(req.params.resumeId)
        ? req.params.resumeId[0]
        : req.params.resumeId;
    // console.log("ResumeId",resumeId)
    const result = await (0, ingestion_service_1.ingestResume)(resumeId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Resume ingested successfully",
        data: result,
    });
};
exports.resumeController = {
    uploadResume,
    getMyResumes: exports.getMyResumes,
    getResume, deleteResume, analyze, getAnalysis, ingestResume
};
