import { Router } from "express";

import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { uploadResume } from "../../middleware/uploadResume";
import { askRecruiterAIController } from "../recruiter-rag/recruiter-ai.controller";
import { resumeController } from "./resume.controller";

const router = Router();

router.use(checkAuth(Role.CANDIDATE));

router.post(
  "/upload",
  uploadResume.single("resume"),
  resumeController.uploadResume
);

router.get(
  "/",
  resumeController.getMyResumes
);

router.get(
  "/:id",
  resumeController.getResume
);

router.delete(
  "/:id",
  resumeController.deleteResume
);

router.post(
  "/:id/analyze",
  resumeController.analyze
);

router.get(
  "/:id/analysis",
  resumeController.getAnalysis
);

// Summary
router.post(
  "/:resumeId/ingest",
  resumeController.ingestResume
);

router.post(
  "/ask",
  askRecruiterAIController
);

export const resumeRouter = router;