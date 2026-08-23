import { InterviewQuestionService } from "./interview.service";
const startInterview = async (req, res) => {
    try {
        const { jobId, experienceLevel, interviewType, } = req.body;
        // Use your existing authenticated user
        const candidateProfileId = req.user.userId;
        //console.log("Candidate",candidateProfileId)
        const result = await InterviewQuestionService.startInterview(candidateProfileId, jobId, experienceLevel, interviewType);
        res.status(200).json({
            success: true,
            message: "Interview started successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const answerInterview = async (req, res) => {
    try {
        const { sessionId, answer, } = req.body;
        const result = await InterviewQuestionService.evaluateAnswer(sessionId, answer);
        res.status(200).json({
            success: true,
            message: "Answer evaluated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const InterviewController = {
    startInterview,
    answerInterview,
};
