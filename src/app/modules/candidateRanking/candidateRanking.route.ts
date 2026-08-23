import { Router } from "express";

import {
  CandidateRankingController,
} from "./candidateRanking.controller";

const router = Router();

router.post(
  "/jobs/:jobId/rank-applicants",
  CandidateRankingController.rankApplicants
);
router.get(
  "/jobs/:jobId/applicants",
  CandidateRankingController.getRankedApplicants
);
export const CandidateRankingRouter =
  router;