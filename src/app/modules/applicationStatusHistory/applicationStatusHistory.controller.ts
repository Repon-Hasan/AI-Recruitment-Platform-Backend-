// applicationStatusHistory.controller.ts

import { Request, Response } from "express";
import httpStatus from "http-status";
import { ApplicationStatusHistoryService } from "./applicationStatusHistory.service";

const changeApplicationStatus = async (
  req: Request,
  res: Response
) => {
  const applicationId = req.params.applicationId as string;

  const { status } = req.body;

  const changedById = req.user.userId;

//     console.log("USER:", req.user);
//   console.log("USER ID:", req.user?.id);

  const result =
    await ApplicationStatusHistoryService.changeApplicationStatus(
      applicationId,
      status,
      changedById
    );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Application status updated successfully",
    data: result,
  });
};

const getApplicationStatusHistory = async (
  req: Request,
  res: Response
) => {
  const applicationId = req.params.applicationId as string;

  const result =
    await ApplicationStatusHistoryService.getApplicationStatusHistory(
      applicationId
    );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Application status history retrieved successfully",
    data: result,
  });
};

const getSingleStatusHistory = async (
  req: Request,
  res: Response
) => {
  const applicationId = req.params.applicationId as string;
  const historyId = req.params.historyId as string;

  const result =
    await ApplicationStatusHistoryService.getSingleStatusHistory(
      applicationId,
      historyId
    );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Application status history retrieved successfully",
    data: result,
  });
};

export const ApplicationStatusHistoryController = {
  changeApplicationStatus,
  getApplicationStatusHistory,
  getSingleStatusHistory,
};

