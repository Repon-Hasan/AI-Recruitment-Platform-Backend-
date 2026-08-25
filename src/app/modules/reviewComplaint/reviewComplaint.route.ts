import { Router } from "express";

import {
  ReviewComplaintController,
} from "./reviewComplaint.controller";
import { checkAuth } from "../../middleware/checkAuth";
const router = Router();

router.post(
  "/",

  checkAuth(
    "RECRUITER"
  ),

  ReviewComplaintController
    .createComplaint
);

router.post(
  "/",

  checkAuth(
    "RECRUITER"
  ),

  ReviewComplaintController
    .createComplaint
);

export const ReviewComplaintRouter =
  router;