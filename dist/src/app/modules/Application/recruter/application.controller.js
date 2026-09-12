import { sendResponse } from "../../../shared/sendResponse";
import { deleteRecruiterApplication, getCompanyApplications, getJobApplicationsForRecruiter, getRecruiterApplicationById, updateApplicationStatus } from "./application.services";
import status from "http-status";
export const getJobApplicationsController = async (req, res) => {
    const jobId = req.params.jobId;
    const userId = req.user.userId;
    const result = await getJobApplicationsForRecruiter(userId, jobId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Job applications retrieved successfully",
        data: result,
    });
};
export const getRecruiterApplicationControllerById = async (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.user.userId;
    const result = await getRecruiterApplicationById(userId, applicationId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Application retrieved successfully",
        data: result,
    });
};
export const updateApplicationStatusController = async (req, res) => {
    const applicationId = req.params.applicationId;
    const { status: applicationStatus } = req.body;
    const userId = req.user.id;
    const result = await updateApplicationStatus(userId, applicationId, applicationStatus);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Application status updated successfully",
        data: result,
    });
};
export const deleteRecruiterApplicationController = async (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.user.id;
    await deleteRecruiterApplication(userId, applicationId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Application deleted successfully",
        data: null,
    });
};
export const getCompanyApplicationsController = async (req, res) => {
    const userId = req.user.id;
    const result = await getCompanyApplications(userId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Company applications retrieved successfully",
        data: result,
    });
};
