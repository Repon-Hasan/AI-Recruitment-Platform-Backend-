"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyApplicationsController = exports.deleteRecruiterApplicationController = exports.updateApplicationStatusController = exports.getRecruiterApplicationControllerById = exports.getJobApplicationsController = void 0;
const sendResponse_1 = require("../../../shared/sendResponse");
const application_services_1 = require("./application.services");
const http_status_1 = __importDefault(require("http-status"));
const getJobApplicationsController = async (req, res) => {
    const jobId = req.params.jobId;
    const userId = req.user.userId;
    const result = await (0, application_services_1.getJobApplicationsForRecruiter)(userId, jobId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Job applications retrieved successfully",
        data: result,
    });
};
exports.getJobApplicationsController = getJobApplicationsController;
const getRecruiterApplicationControllerById = async (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.user.userId;
    const result = await (0, application_services_1.getRecruiterApplicationById)(userId, applicationId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Application retrieved successfully",
        data: result,
    });
};
exports.getRecruiterApplicationControllerById = getRecruiterApplicationControllerById;
const updateApplicationStatusController = async (req, res) => {
    const applicationId = req.params.applicationId;
    const { status: applicationStatus } = req.body;
    const userId = req.user.id;
    const result = await (0, application_services_1.updateApplicationStatus)(userId, applicationId, applicationStatus);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Application status updated successfully",
        data: result,
    });
};
exports.updateApplicationStatusController = updateApplicationStatusController;
const deleteRecruiterApplicationController = async (req, res) => {
    const applicationId = req.params.applicationId;
    const userId = req.user.id;
    await (0, application_services_1.deleteRecruiterApplication)(userId, applicationId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Application deleted successfully",
        data: null,
    });
};
exports.deleteRecruiterApplicationController = deleteRecruiterApplicationController;
const getCompanyApplicationsController = async (req, res) => {
    const userId = req.user.id;
    const result = await (0, application_services_1.getCompanyApplications)(userId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Company applications retrieved successfully",
        data: result,
    });
};
exports.getCompanyApplicationsController = getCompanyApplicationsController;
