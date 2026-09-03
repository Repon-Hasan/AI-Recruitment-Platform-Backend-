import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { jobController } from "./job.controller";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();


router.post("/create", checkAuth(Role.RECRUITER), jobController.createJob);
router.get("/",checkAuth(), jobController.getAllJobs);
router.get("/candidate",jobController.allJobs);
router.patch("/:id", checkAuth(), jobController.updateJob);
router.delete("/:id", checkAuth(), jobController.deleteJob);

// Get single public job
router.get(
  "/:id",
  checkAuth(),
  jobController.getJobById
);

// Search jobs
router.get(
  "/my/search",
  jobController.searchJobs
);

// Publish
router.patch(
  "/:id/publish",
  checkAuth(),
  jobController.publishJob
);

// Close
router.patch(
  "/:id/close",
  checkAuth(),
  jobController.closeJob
);

// Duplicate
router.post(
  "/:id/duplicate",
  checkAuth(),
  jobController.duplicateJob
);

export const jobRouters=router