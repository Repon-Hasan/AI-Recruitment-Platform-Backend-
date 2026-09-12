import { Router } from "express";
import { InterviewController } from "./interview.controller";
import { checkAuth } from "../../../middleware/checkAuth";
const router = Router();
router.post("/practice/start", checkAuth(), InterviewController.startInterview);
router.post("/practice/answer", checkAuth(), InterviewController.answerInterview);
export const InterviewPracticesRouter = router;
