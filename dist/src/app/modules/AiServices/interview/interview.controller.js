"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const interview_service_1 = require("./interview.service");
const generateInterviewQuestions = async (req, res) => {
    try {
        const { jobId, experienceLevel, interviewType, } = req.body;
        const result = await interview_service_1.InterviewQuestionService.generateInterviewQuestions(jobId, experienceLevel, interviewType);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Interview questions generated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
exports.InterviewController = {
    generateInterviewQuestions,
};
