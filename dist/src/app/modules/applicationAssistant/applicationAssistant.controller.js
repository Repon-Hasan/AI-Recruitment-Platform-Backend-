// applicationAssistant.controller.ts
import { ApplicationAssistantService } from "./applicationAssistant.service";
const generateAssistant = async (req, res) => {
    const userId = req.user.userId;
    const { jobId } = req.params;
    const { resumeId } = req.body;
    const result = await ApplicationAssistantService.generateApplicationAssistant(userId, jobId, resumeId);
    res.status(200).json({
        success: true,
        message: "Application assistant generated successfully",
        data: result,
    });
};
export const ApplicationAssistantController = {
    generateAssistant,
};
