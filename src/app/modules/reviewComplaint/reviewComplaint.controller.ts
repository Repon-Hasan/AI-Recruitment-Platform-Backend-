import { Request, Response } from "express";
import status from "http-status";

import {
  createReviewComplaintSchema,
} from "./reviewComplaint.validation";

import {
  ReviewComplaintService,
} from "./reviewComplaint.service";


const createComplaint = async (
  req: Request,
  res: Response
) => {

  const validatedData =
    createReviewComplaintSchema.parse(
      req.body
    );

  const recruiterId =
    req.user.userId;

  const result =
    await ReviewComplaintService.createComplaint(
      recruiterId,
      validatedData
    );

  res.status(status.CREATED).json({
    success: true,

    message:
      "Review/complaint sent to admin successfully",

    data: result,
  });
};

const getMyComplaints = async (
  req: Request,
  res: Response
) => {

  const recruiterId =
    req.user.userId;

  const result =
    await ReviewComplaintService.getMyComplaints(
      recruiterId
    );

  res.status(status.OK).json({
    success: true,

    message:
      "Complaints retrieved successfully",

    data: result,
  });
};

const getMyComplaintById = async (
  req: Request,
  res: Response
) => {

  const recruiterId =
    req.user.userId;

  const complaintId =
    String(req.params.complaintId);

  const result =
    await ReviewComplaintService.getMyComplaintById(
      recruiterId,
      complaintId
    );

  res.status(status.OK).json({
    success: true,

    message:
      "Complaint retrieved successfully",

    data: result,
  });
};

export const ReviewComplaintController = {
  createComplaint,
  getMyComplaints,
  getMyComplaintById,
};