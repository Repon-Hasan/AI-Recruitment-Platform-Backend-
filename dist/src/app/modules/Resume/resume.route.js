import { Router } from "express";
import { uploadResume } from "../../middleware/uploadResume";
import { checkAuth } from "../../middleware/checkAuth";
import { resumeController } from "./resume.controller";
import { askRecruiterAIController } from "../recruiter-rag/recruiter-ai.controller";
const router = Router();
router.use(checkAuth());
router.post("/upload", uploadResume.single("resume"), resumeController.uploadResume);
router.get("/", resumeController.getMyResumes);
router.get("/:id", resumeController.getResume);
router.delete("/:id", resumeController.deleteResume);
router.post("/:id/analyze", resumeController.analyze);
router.get("/:id/analysis", resumeController.getAnalysis);
//Summery
router.post("/:resumeId/ingest", resumeController.ingestResume);
router.post("/ask", askRecruiterAIController);
export const resumeRouter = router;
