import { Request, Response } from "express";
import { jobServices } from "./jobb.services";


 const createJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const job = await jobServices.createJobService(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create job",
    });
  }
};

// Get All Jobs
const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobServices.getAllJobsService();
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch jobs",
    });
  }
};

// Update Job
const updateJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updatedJob = await jobServices.updateJobService(userId, String(id), req.body);

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update job",
    });
  }
};

// Delete Job
const deleteJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await jobServices.deleteJobService(userId, String(id));

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to delete job",
    });
  }
};

export const jobController={
    createJob,getAllJobs,updateJob,deleteJob
}