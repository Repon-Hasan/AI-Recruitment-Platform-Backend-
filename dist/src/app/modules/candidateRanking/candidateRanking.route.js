import { Router } from "express";
import { CandidateRankingController, } from "./candidateRanking.controller.js";
const router = Router();
router.post("/jobs/:jobId/rank-applicants", CandidateRankingController.rankApplicants);
router.get("/jobs/:jobId/applicants", CandidateRankingController.getRankedApplicants);
export const CandidateRankingRouter = router;
//# sourceMappingURL=candidateRanking.route.js.map