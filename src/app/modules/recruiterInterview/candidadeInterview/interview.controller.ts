
import { Request, Response } from "express";

import interviewService from "./interview.service";

import {
  createInterviewSchema,
  updateInterviewSchema,
} from "./interview.validation";

// ============================================
// CREATE
// ============================================

export const createInterviewController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const recruiterId =
        req.user.userId;

      const parsed =
        createInterviewSchema.safeParse(
          req.body
        );

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message:
            "Validation failed",
          errors:
            parsed.error.flatten(),
        });
      }

      const interview =
        await interviewService.createInterview(
          recruiterId,
          parsed?.data
        );

      return res.status(201).json({
        success: true,
        message:
          "Interview scheduled successfully",
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to create interview",
      });
    }
  };

// ============================================
// CANDIDATE - GET ALL
// ============================================

export const getCandidateInterviewsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user.userId;

      const result =
        await interviewService.getCandidateInterviews(
          userId
        );

      return res.status(200).json({
        success: true,
        message:
          "Candidate interviews retrieved successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve interviews",
      });
    }
  };

// ============================================
// CANDIDATE - GET SINGLE
// ============================================

export const getCandidateInterviewByIdController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user.userId;

      const { interviewId } =
        req.params as {
          interviewId: string;
        };

      const interview =
        await interviewService.getCandidateInterviewById(
          userId,
          interviewId
        );

      return res.status(200).json({
        success: true,
        message:
          "Interview retrieved successfully",
        data: interview,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message:
          error.message ||
          "Interview not found",
      });
    }
  };

// ============================================
// CONFIRM
// ============================================

export const confirmInterviewController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user.userId;

      const { interviewId } =
        req.params as {
          interviewId: string;
        };

      const interview =
        await interviewService.confirmInterview(
          userId,
          interviewId
        );

      return res.status(200).json({
        success: true,
        message:
          "Interview confirmed successfully",
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to confirm interview",
      });
    }
  };

// ============================================
// CANCEL
// ============================================

export const cancelInterviewController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user.userId;

      const { interviewId } =
        req.params as {
          interviewId: string;
        };

      const interview =
        await interviewService.cancelInterview(
          userId,
          interviewId
        );

      return res.status(200).json({
        success: true,
        message:
          "Interview cancelled successfully",
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to cancel interview",
      });
    }
  };

// ============================================
// RESCHEDULE
// ============================================

export const rescheduleInterviewController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId =
        req.user.userId;

      const { interviewId } =
        req.params as {
          interviewId: string;
        };

      const { scheduledAt } =
        req.body;

      if (!scheduledAt) {
        return res.status(400).json({
          success: false,
          message:
            "scheduledAt is required",
        });
      }

      const interview =
        await interviewService.rescheduleInterview(
          userId,
          interviewId,
          scheduledAt
        );

      return res.status(200).json({
        success: true,
        message:
          "Interview rescheduled successfully",
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to reschedule interview",
      });
    }
  };

// ============================================
// RECRUITER - GET ALL
// ============================================

export const getRecruiterInterviewsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const recruiterId =
        req.user.userId;

      const interviews =
        await interviewService.getRecruiterInterviews(
          recruiterId
        );

      return res.status(200).json({
        success: true,
        message:
          "Recruiter interviews retrieved successfully",
        data: interviews,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to retrieve interviews",
      });
    }
  };

// ============================================
// RECRUITER - UPDATE
// ============================================

export const updateInterviewController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const recruiterId =
        req.user.userId;

      const { interviewId } =
        req.params as {
          interviewId: string;
        };

      const parsed =
        updateInterviewSchema.safeParse(
          req.body
        );

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message:
            "Validation failed",
          errors:
            parsed.error.flatten(),
        });
      }

      const interview =
        await interviewService.updateInterview(
          recruiterId,
          interviewId,
          parsed.data
        );

      return res.status(200).json({
        success: true,
        message:
          "Interview updated successfully",
        data: interview,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to update interview",
      });
    }
  };

// ============================================
// RECRUITER - DELETE
// ============================================

export const deleteInterviewController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const recruiterId =
        req.user.userId;

      const { interviewId } =
        req.params as {
          interviewId: string;
        };

      await interviewService.deleteInterview(
        recruiterId,
        interviewId
      );

      return res.status(200).json({
        success: true,
        message:
          "Interview deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to delete interview",
      });
    }
  };

