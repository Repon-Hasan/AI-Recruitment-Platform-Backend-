import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { deleteRecruiterApplicationController, getCompanyApplicationsController, getJobApplicationsController, getRecruiterApplicationControllerById, updateApplicationStatusController } from "./application.controller";

const router=Router()
router.get(
  "/recruiter/applications",
  checkAuth("RECRUITER"),
  getCompanyApplicationsController
);

router.get(
  "/recruiter/jobs/:jobId/applications",
  checkAuth("RECRUITER"),
  getJobApplicationsController
);

router.get(
  "/recruiter/applications/:applicationId",
  checkAuth("RECRUITER"),
  getRecruiterApplicationControllerById
);

router.patch(
  "/recruiter/applications/:applicationId/status",
  checkAuth("RECRUITER"),
  updateApplicationStatusController
);

router.delete(
  "/recruiter/applications/:applicationId",
  checkAuth("RECRUITER"),
  deleteRecruiterApplicationController
);

export const recruiterApplication=router;