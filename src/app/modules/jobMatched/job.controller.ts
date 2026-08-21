import { Request, Response } from "express";
import * as jobMatchService from "./job.services";

// =====================================================
// Calculate / Update Job Match
// =====================================================

export const calculateJobMatch = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.userId;
  const { jobId } = req.params;

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  const result = await jobMatchService.calculateJobMatch(
    userId,
    jobId
  );

  return res.status(200).json({
    success: true,
    message: "Job match calculated successfully",
    data: result,
  });
};

// =====================================================
// Get Current Candidate Match
// =====================================================

export const getMyJobMatch = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.userId;
  const { jobId } = req.params;

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  const result = await jobMatchService.getMyJobMatch(
    userId,
    jobId
  );

  return res.status(200).json({
    success: true,
    data: result,
  });
};

// =====================================================
// Get All My Job Matches
// =====================================================

export const getMyJobMatches = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.userId;

  const result =
    await jobMatchService.getMyJobMatches(
      userId
    );

  return res.status(200).json({
    success: true,
    data: result,
  });
};

// =====================================================
// Recruiter: Get Job Applicants Match
// =====================================================

export const getJobMatches = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  const result = await jobMatchService.getJobMatches(
    userId,
    jobId
  );

  return res.status(200).json({
    success: true,
    data: result,
  });
};

// =====================================================
// Get Match Summary
// =====================================================

export const getJobMatchSummary = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  const result = await jobMatchService.getJobMatchSummary(
    userId,
    jobId
  );

  return res.status(200).json({
    success: true,
    data: result,
  });
};

// =====================================================
// Delete Match
// =====================================================

export const deleteJobMatch = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  await jobMatchService.deleteJobMatch(
    userId,
    jobId
  );

  return res.status(200).json({
    success: true,
    message: "Job match deleted successfully",
  });
};