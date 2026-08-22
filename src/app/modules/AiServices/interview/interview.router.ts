import { Router } from "express";

import { InterviewController } from "./interview.controller";
import { checkAuth } from "../../../middleware/checkAuth";


const router = Router();

router.post(
  "/questions",
  checkAuth("CANDIDATE"),
  InterviewController.generateInterviewQuestions
);

export const InterviewRouter = router;