import { Router } from "express";
import { InterviewController } from "./interview.controller.js";
import { checkAuth } from "../../../middleware/checkAuth";
const router = Router();
router.post("/practice/start", checkAuth(), InterviewController.startInterview);
router.post("/practice/answer", checkAuth(), InterviewController.answerInterview);
export const InterviewPracticesRouter = router;
//# sourceMappingURL=interview.router.js.map