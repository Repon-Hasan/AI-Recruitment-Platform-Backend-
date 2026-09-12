"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewController = void 0;
const interview_service_1 = require("./interview.service");
// const startInterview = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const {
//       jobId,
//       experienceLevel,
//       interviewType,
//     } = req.body;
//     // Use your existing authenticated user
//     const candidateProfileId =
//       req.user.userId;
//       //console.log("Candidate",candidateProfileId)
//     const result =
//       await InterviewQuestionService.startInterview(
//         candidateProfileId,
//         jobId,
//         experienceLevel,
//         interviewType
//       );
//     res.status(200).json({
//       success: true,
//       message: "Interview started successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const startInterview = async (req, res) => {
    try {
        const { jobId, experienceLevel, interviewType } = req.body;
        const userId = req.user.userId;
        const result = await interview_service_1.InterviewQuestionService.startInterview(userId, jobId, experienceLevel, interviewType);
        res.status(200).json({
            success: true,
            message: "Interview started successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
const answerInterview = async (req, res) => {
    try {
        const { sessionId, answer, } = req.body;
        const result = await interview_service_1.InterviewQuestionService.evaluateAnswer(sessionId, answer);
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
exports.InterviewController = {
    startInterview,
    answerInterview,
};
