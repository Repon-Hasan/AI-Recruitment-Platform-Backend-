"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobMatchRouter = void 0;
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const job_controller_1 = require("./job.controller");
const router = (0, express_1.Router)();
// Recruiter - get all candidate matches for a job
router.get("/job/:jobId", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), job_controller_1.getJobMatches);
// Candidate - calculate a match
router.post("/:jobId/calculate", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), job_controller_1.calculateJobMatch);
// Candidate - get all matches
router.get("/all/me", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), job_controller_1.getMyJobMatches);
// Candidate - get one match
router.get("/:jobId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), job_controller_1.getMyJobMatch);
// Candidate - detailed summary
router.get("/:jobId/summary", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), job_controller_1.getJobMatchSummary);
// Candidate - delete a match
router.delete("/:jobId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), job_controller_1.deleteJobMatch);
exports.jobMatchRouter = router;
