import status from "http-status";
import { InterviewQuestionService } from "./interview.service";
const generateInterviewQuestions = async (req, res) => {
    try {
        const { jobId, experienceLevel, interviewType, } = req.body;
        const result = await InterviewQuestionService.generateInterviewQuestions(jobId, experienceLevel, interviewType);
        res.status(status.OK).json({
            success: true,
            message: "Interview questions generated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
export const InterviewController = {
    generateInterviewQuestions,
};
