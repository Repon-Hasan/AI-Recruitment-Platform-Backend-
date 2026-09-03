import { Request, Response } from "express";
import status from "http-status";

import {
  applyToJob,
  getMyApplications,
  getMyApplicationById,
  deleteMyApplication,
  applyForJobMessage
} from "./application.service";
import { sendResponse } from "../../../shared/sendResponse";



export const applyToJobController = async (
  req: Request,
  res: Response
) => {
  const { jobId } = req.body;

  const userId = req.user.userId;

  const result = await applyToJob(
    userId,
    jobId
  );

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Job application submitted successfully",
    data: result,
  });
};

export const getMyApplicationsController = async (
  req: Request,
  res: Response
) => {
  const candidateProfileId =
    req.user.candidateProfile;

  const result =
    await getMyApplications(candidateProfileId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Applications retrieved successfully",
    data: result,
  });
};

export const getMyApplicationControllerById = async (
  req: Request,
  res: Response
) => {
  const applicationId = String(req.params.applicationId);

  const candidateProfileId =
    req.user.candidateProfile;

  const result = await getMyApplicationById(
    candidateProfileId,
    applicationId
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Application retrieved successfully",
    data: result,
  });
};

export const deleteMyApplicationController = async (
  req: Request,
  res: Response
) => {
  const applicationId = String(req.params.applicationId);

  const candidateProfileId =
    req.user.userId;

  await deleteMyApplication(
    candidateProfileId,
    applicationId
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Application deleted successfully",
    data: null,
  });
};

export const applyForJob = async (
  req: Request,
  res: Response
) => {

  const { jobId } = req.body;

  const userId = req.user.userId;

  const result =
    await applyForJobMessage(
      userId,
      jobId
    );

  res.status(status.CREATED).json({
    success: true,
    message: "Application submitted successfully",
    data: result,
  });
};
