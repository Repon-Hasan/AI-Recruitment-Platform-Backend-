"use strict";
// applicationAssistant.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationAssistantController = void 0;
const applicationAssistant_service_1 = require("./applicationAssistant.service");
const generateAssistant = async (req, res) => {
    const userId = req.user.userId;
    const { jobId } = req.params;
    const { resumeId } = req.body;
    const result = await applicationAssistant_service_1.ApplicationAssistantService.generateApplicationAssistant(userId, jobId, resumeId);
    res.status(200).json({
        success: true,
        message: "Application assistant generated successfully",
        data: result,
    });
};
exports.ApplicationAssistantController = {
    generateAssistant,
};
