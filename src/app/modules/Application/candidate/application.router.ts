import { Router } from "express";

import {
  applyToJobController,
  getMyApplicationsController,
  deleteMyApplicationController,
  getMyApplicationControllerById,
} from "./application.controller";

import { checkAuth } from "../../../middleware/checkAuth";

const router = Router();

router.post(
  "/apply",
  checkAuth("CANDIDATE"),
  applyToJobController
);

router.get(
  "/me",
  checkAuth("CANDIDATE"),
  getMyApplicationsController
);

router.get(
  "/my/:applicationId",
  checkAuth("CANDIDATE"),
  getMyApplicationControllerById
);

router.delete(
  "/:applicationId",
  checkAuth("CANDIDATE"),
  deleteMyApplicationController
);

export const candidateApplication=router