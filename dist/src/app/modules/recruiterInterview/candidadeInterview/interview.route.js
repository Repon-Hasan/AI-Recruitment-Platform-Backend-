"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateInterviews = void 0;
const express_1 = require("express");
const interview_controller_1 = require("./interview.controller");
const checkAuth_1 = require("../../../middleware/checkAuth");
const enums_1 = require("../../../../generated/prisma/enums");
const router = (0, express_1.Router)();
// ============================================
// RECRUITER
// ============================================
router.post("/", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), interview_controller_1.createInterviewController);
router.get("/recruiter", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), interview_controller_1.getRecruiterInterviewsController);
router.patch("/:interviewId", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), interview_controller_1.updateInterviewController);
router.delete("/:interviewId", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), interview_controller_1.deleteInterviewController);
// ============================================
// CANDIDATE
// ============================================
router.get("/candidate", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), interview_controller_1.getCandidateInterviewsController);
router.get("/candidate/:interviewId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), interview_controller_1.getCandidateInterviewByIdController);
router.patch("/candidate/:interviewId/confirm", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), interview_controller_1.confirmInterviewController);
router.patch("/candidate/:interviewId/cancel", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), interview_controller_1.cancelInterviewController);
router.patch("/candidate/:interviewId/reschedule", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), interview_controller_1.rescheduleInterviewController);
exports.candidateInterviews = router;
