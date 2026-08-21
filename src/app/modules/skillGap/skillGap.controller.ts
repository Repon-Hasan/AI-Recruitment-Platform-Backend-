import { Request, Response } from "express";
import * as skillGapService from "./skillGap.service";

export const analyzeSkillGap = async (
  req: Request,
  res: Response
) => {
  const userId = req.user?.userId;

  //console.log("Authenticated user:", req.user);
  //console.log("User ID:", userId);

  const { jobId } = req.params;

  //console.log("Job ID:", jobId);

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  const result =
    await skillGapService.analyzeSkillGap(
      userId,
      jobId
    );

  return res.status(200).json({
    success: true,
    data: result,
  });
};