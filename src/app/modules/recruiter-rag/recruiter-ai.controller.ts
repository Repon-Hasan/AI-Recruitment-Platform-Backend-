import { Request, Response } from "express";

import {
  ingestResumeForRAG,
  askRecruiterAI,
} from "./recruiter-ai.service";
import { recruiterSearchSchema } from "./recruiter-rag.validation";



export const ingestResumeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { resumeId } = req.params;

    if (typeof resumeId !== "string" || !resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    const result = await ingestResumeForRAG(
      resumeId
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error(
      "Resume ingestion error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to ingest resume",
    });
  }
};

export const askRecruiterAIController = async (
  req: Request,
  res: Response
) => {
  try {
    const validation =
      recruiterSearchSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid recruiter question",
        errors: validation.error.flatten(),
      });
    }

    const {
      question,
      limit,
    } = validation.data;

    const result = await askRecruiterAI(
      question,
      limit
    );

    return res.status(200).json({
      success: true,
      message:
        "Recruiter AI response generated successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Recruiter AI error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to generate recruiter AI response",
    });
  }
};