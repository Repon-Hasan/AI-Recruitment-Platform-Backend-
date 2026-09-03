import { jobServices } from "./jobb.services";
import { createJobSchema } from "./job.validation";
const createJob = async (req, res) => {
    try {
        const userId = req.user.userId;
        const validatedData = createJobSchema.parse(req.body);
        const job = await jobServices.createJobService(userId, validatedData);
        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to create job",
        });
    }
};
// Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const jobs = await jobServices.getAllJobsService(userId);
        res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to fetch jobs",
        });
    }
};
const allJobs = async (req, res) => {
    try {
        const jobs = await jobServices.allJobsService();
        res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to fetch jobs",
        });
    }
};
// Update Job
const updateJob = async (req, res) => {
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
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to update job",
        });
    }
};
// Delete Job
const deleteJob = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const result = await jobServices.deleteJobService(userId, String(id));
        const responseMessage = result && typeof result === "object" && "message" in result
            ? String(result.message)
            : "Job deleted successfully";
        res.status(200).json({
            success: true,
            message: responseMessage,
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to delete job",
        });
    }
};
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await jobServices.getJobById(String(id));
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
const publishJob = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const result = await jobServices.publishJob(userId, String(id));
        res.status(200).json({
            success: true,
            message: "Job published successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const closeJob = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const result = await jobServices.closeJob(userId, String(id));
        res.status(200).json({
            success: true,
            message: "Job closed successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const duplicateJob = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const result = await jobServices.duplicateJob(userId, String(id));
        res.status(201).json({
            success: true,
            message: "Job duplicated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const searchJobs = async (req, res) => {
    try {
        const result = await jobServices.searchJobs(req.query);
        res.status(200).json({
            success: true,
            message: "Jobs searched successfully",
            data: result.jobs,
            pagination: result.pagination,
        });
    }
    catch (error) {
        console.error("========== SEARCH JOB ERROR ==========");
        console.error(error);
        console.error("======================================");
        console.error("Search jobs error:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to search jobs",
        });
    }
};
export const jobController = {
    createJob, getAllJobs, updateJob, deleteJob, getJobById, publishJob, closeJob, duplicateJob, searchJobs, allJobs
};
