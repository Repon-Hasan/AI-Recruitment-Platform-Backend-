"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewComplaintRouter = void 0;
const express_1 = require("express");
const reviewComplaint_controller_1 = require("./reviewComplaint.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post("/", (0, checkAuth_1.checkAuth)("RECRUITER"), reviewComplaint_controller_1.ReviewComplaintController
    .createComplaint);
router.post("/", (0, checkAuth_1.checkAuth)("RECRUITER"), reviewComplaint_controller_1.ReviewComplaintController
    .createComplaint);
exports.ReviewComplaintRouter = router;
