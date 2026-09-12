"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRecruiterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const aiRecruiter_service_1 = require("./aiRecruiter.service");
exports.AIRecruiterController = {
    async assistant(req, res) {
        try {
            const { jobId, query, limit, } = req.body;
            /*
            Your auth middleware should attach
            the authenticated user to req.user.
            */
            const recruiterId = req.user.userId;
            //console.log("REQ.USER:", req.user);
            const result = await aiRecruiter_service_1.AIRecruiterService.assistant(recruiterId, {
                jobId,
                query,
                limit,
            });
            return res.status(http_status_1.default.OK).json({
                success: true,
                message: "AI recruiter assistant response generated successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("AI Recruiter Assistant Error:", error);
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: error.message ??
                    "Failed to process recruiter request",
            });
        }
    },
};
