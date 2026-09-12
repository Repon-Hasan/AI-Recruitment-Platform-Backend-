"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askRecruiterAIController = exports.ingestResumeController = void 0;
const recruiter_ai_service_1 = require("./recruiter-ai.service");
const recruiter_rag_validation_1 = require("./recruiter-rag.validation");
const ingestResumeController = async (req, res) => {
    try {
        const { resumeId } = req.params;
        if (typeof resumeId !== "string" || !resumeId) {
            return res.status(400).json({
                success: false,
                message: "Resume ID is required",
            });
        }
        const result = await (0, recruiter_ai_service_1.ingestResumeForRAG)(resumeId);
        return res.status(200).json({
            success: true,
            message: result.message,
            data: result,
        });
    }
    catch (error) {
        console.error("Resume ingestion error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to ingest resume",
        });
    }
};
exports.ingestResumeController = ingestResumeController;
const askRecruiterAIController = async (req, res) => {
    try {
        const validation = recruiter_rag_validation_1.recruiterSearchSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid recruiter question",
                errors: validation.error.flatten(),
            });
        }
        const { question, limit, } = validation.data;
        const result = await (0, recruiter_ai_service_1.askRecruiterAI)(question, limit);
        return res.status(200).json({
            success: true,
            message: "Recruiter AI response generated successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Recruiter AI error:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to generate recruiter AI response",
        });
    }
};
exports.askRecruiterAIController = askRecruiterAIController;
