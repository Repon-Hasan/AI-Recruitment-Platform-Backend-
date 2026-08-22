import { Request, Response } from "express";
import { InterviewQuestionService } from "./interview.service";

const startInterview = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      jobId,
      experienceLevel,
      interviewType,
    } = req.body;

    // Use your existing authenticated user
    const candidateProfileId =
      req.user.userId;

      //console.log("Candidate",candidateProfileId)

    const result =
      await InterviewQuestionService.startInterview(
        candidateProfileId,
        jobId,
        experienceLevel,
        interviewType
      );

    res.status(200).json({
      success: true,
      message: "Interview started successfully",
      data: result,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const answerInterview = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      sessionId,
      answer,
    } = req.body;

    const result =
      await InterviewQuestionService.evaluateAnswer(
        sessionId,
        answer
      );

    res.status(200).json({
      success: true,
      message: "Answer evaluated successfully",
      data: result,
    });

  } catch (error: any) {

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