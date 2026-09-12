"use strict";
// applicationStatusHistory.route.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStatusHistoryRoutes = void 0;
const express_1 = require("express");
const applicationStatusHistory_controller_1 = require("./applicationStatusHistory.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const router = (0, express_1.Router)();
router.patch("/applications/:applicationId/status", (0, checkAuth_1.checkAuth)(), applicationStatusHistory_controller_1.ApplicationStatusHistoryController.changeApplicationStatus);
router.get("/applications/:applicationId/status-history", (0, checkAuth_1.checkAuth)(), applicationStatusHistory_controller_1.ApplicationStatusHistoryController.getApplicationStatusHistory);
router.get("/applications/:applicationId/status-history/:historyId", applicationStatusHistory_controller_1.ApplicationStatusHistoryController.getSingleStatusHistory);
exports.ApplicationStatusHistoryRoutes = router;
