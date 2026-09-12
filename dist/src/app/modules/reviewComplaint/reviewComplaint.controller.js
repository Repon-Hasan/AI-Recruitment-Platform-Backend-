"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewComplaintController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const reviewComplaint_validation_1 = require("./reviewComplaint.validation");
const reviewComplaint_service_1 = require("./reviewComplaint.service");
const createComplaint = async (req, res) => {
    const validatedData = reviewComplaint_validation_1.createReviewComplaintSchema.parse(req.body);
    const recruiterId = req.user.userId;
    const result = await reviewComplaint_service_1.ReviewComplaintService.createComplaint(recruiterId, validatedData);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "Review/complaint sent to admin successfully",
        data: result,
    });
};
const getMyComplaints = async (req, res) => {
    const recruiterId = req.user.userId;
    const result = await reviewComplaint_service_1.ReviewComplaintService.getMyComplaints(recruiterId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Complaints retrieved successfully",
        data: result,
    });
};
const getMyComplaintById = async (req, res) => {
    const recruiterId = req.user.userId;
    const complaintId = String(req.params.complaintId);
    const result = await reviewComplaint_service_1.ReviewComplaintService.getMyComplaintById(recruiterId, complaintId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Complaint retrieved successfully",
        data: result,
    });
};
exports.ReviewComplaintController = {
    createComplaint,
    getMyComplaints,
    getMyComplaintById,
};
