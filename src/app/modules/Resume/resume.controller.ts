import { Request, Response } from "express";
import { resumeServices } from "./resume.service";
import { analyzeResumeWithAI } from "./resume.analysis";

 const uploadResume = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const userId = req.user!.userId;

    const result =
      await resumeServices.uploadResume(
        userId,
        req.file
      );

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyResumes = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const result =
      await resumeServices.getMyResumes(userId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getResume = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;
    const resumeId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result =
      await resumeServices.getResumeById(
        userId,
        resumeId
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

 const deleteResume = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;
    const resumeId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result =
      await resumeServices.deleteResume(
        userId,
        resumeId
      );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const analyze = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const resumeId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result = await resumeServices.analyzeResume(
      userId,
      resumeId
    );

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: result,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const getAnalysis = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;
    const resumeId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result =
      await resumeServices.getResumeAnalysis(
        userId,
        resumeId
      );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const resumeController={
    uploadResume,getMyResumes,getResume,deleteResume,analyze,getAnalysis
}