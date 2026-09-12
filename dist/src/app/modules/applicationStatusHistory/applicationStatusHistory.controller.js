"use strict";
// applicationStatusHistory.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStatusHistoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const applicationStatusHistory_service_1 = require("./applicationStatusHistory.service");
const changeApplicationStatus = async (req, res) => {
    const applicationId = req.params.applicationId;
    const { status } = req.body;
    const changedById = req.user.userId;
    //     console.log("USER:", req.user);
    //   console.log("USER ID:", req.user?.id);
    const result = await applicationStatusHistory_service_1.ApplicationStatusHistoryService.changeApplicationStatus(applicationId, status, changedById);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Application status updated successfully",
        data: result,
    });
};
const getApplicationStatusHistory = async (req, res) => {
    const applicationId = req.params.applicationId;
    const result = await applicationStatusHistory_service_1.ApplicationStatusHistoryService.getApplicationStatusHistory(applicationId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Application status history retrieved successfully",
        data: result,
    });
};
const getSingleStatusHistory = async (req, res) => {
    const applicationId = req.params.applicationId;
    const historyId = req.params.historyId;
    const result = await applicationStatusHistory_service_1.ApplicationStatusHistoryService.getSingleStatusHistory(applicationId, historyId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Application status history retrieved successfully",
        data: result,
    });
};
exports.ApplicationStatusHistoryController = {
    changeApplicationStatus,
    getApplicationStatusHistory,
    getSingleStatusHistory,
};
