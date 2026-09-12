"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouters = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../../middleware/checkAuth");
const job_controller_1 = require("./job.controller");
const enums_1 = require("../../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/create", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), job_controller_1.jobController.createJob);
router.get("/my-jobs", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.getAllJobs);
router.get("/candidate", job_controller_1.jobController.allJobs);
router.patch("/:id", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.updateJob);
router.delete("/:id", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.deleteJob);
// Get single public job
router.get("/:id", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.getJobById);
// Search jobs
router.get("/my/search", job_controller_1.jobController.searchJobs);
// Publish
router.patch("/:id/publish", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.publishJob);
// Close
router.patch("/:id/close", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.closeJob);
// Duplicate
router.post("/:id/duplicate", (0, checkAuth_1.checkAuth)(), job_controller_1.jobController.duplicateJob);
exports.jobRouters = router;
