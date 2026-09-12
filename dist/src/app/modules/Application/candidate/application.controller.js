"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyForJob = exports.deleteMyApplicationController = exports.getMyApplicationControllerById = exports.getMyApplicationsController = exports.applyToJobController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const application_service_1 = require("./application.service");
const sendResponse_1 = require("../../../shared/sendResponse");
const applyToJobController = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user.userId;
    const result = await (0, application_service_1.applyToJob)(userId, jobId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.CREATED,
        success: true,
        message: "Job application submitted successfully",
        data: result,
    });
};
exports.applyToJobController = applyToJobController;
const getMyApplicationsController = async (req, res) => {
    const candidateProfileId = req.user.candidateProfile;
    const result = await (0, application_service_1.getMyApplications)(candidateProfileId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Applications retrieved successfully",
        data: result,
    });
};
exports.getMyApplicationsController = getMyApplicationsController;
const getMyApplicationControllerById = async (req, res) => {
    const applicationId = String(req.params.applicationId);
    const candidateProfileId = req.user.candidateProfile;
    const result = await (0, application_service_1.getMyApplicationById)(candidateProfileId, applicationId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Application retrieved successfully",
        data: result,
    });
};
exports.getMyApplicationControllerById = getMyApplicationControllerById;
const deleteMyApplicationController = async (req, res) => {
    const applicationId = String(req.params.applicationId);
    const candidateProfileId = req.user.userId;
    await (0, application_service_1.deleteMyApplication)(candidateProfileId, applicationId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Application deleted successfully",
        data: null,
    });
};
exports.deleteMyApplicationController = deleteMyApplicationController;
const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user.userId;
    const result = await (0, application_service_1.applyForJobMessage)(userId, jobId);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "Application submitted successfully",
        data: result,
    });
};
exports.applyForJob = applyForJob;
