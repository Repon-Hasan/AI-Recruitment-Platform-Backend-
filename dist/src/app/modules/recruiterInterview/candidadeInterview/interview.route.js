import { Router } from "express";
import { createInterviewController, getCandidateInterviewsController, getCandidateInterviewByIdController, confirmInterviewController, cancelInterviewController, rescheduleInterviewController, getRecruiterInterviewsController, updateInterviewController, deleteInterviewController, } from "./interview.controller";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
const router = Router();
// ============================================
// RECRUITER
// ============================================
router.post("/", checkAuth(Role.RECRUITER), createInterviewController);
router.get("/recruiter", checkAuth(Role.RECRUITER), getRecruiterInterviewsController);
router.patch("/:interviewId", checkAuth(Role.RECRUITER), updateInterviewController);
router.delete("/:interviewId", checkAuth(Role.RECRUITER), deleteInterviewController);
// ============================================
// CANDIDATE
// ============================================
router.get("/candidate", checkAuth(Role.CANDIDATE), getCandidateInterviewsController);
router.get("/candidate/:interviewId", checkAuth(Role.CANDIDATE), getCandidateInterviewByIdController);
router.patch("/candidate/:interviewId/confirm", checkAuth(Role.CANDIDATE), confirmInterviewController);
router.patch("/candidate/:interviewId/cancel", checkAuth(Role.CANDIDATE), cancelInterviewController);
router.patch("/candidate/:interviewId/reschedule", checkAuth(Role.CANDIDATE), rescheduleInterviewController);
export const candidateInterviews = router;
