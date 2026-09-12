"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRankingRouter = void 0;
const express_1 = require("express");
const candidateRanking_controller_1 = require("./candidateRanking.controller");
const router = (0, express_1.Router)();
router.post("/jobs/:jobId/rank-applicants", candidateRanking_controller_1.CandidateRankingController.rankApplicants);
router.get("/jobs/:jobId/applicants", candidateRanking_controller_1.CandidateRankingController.getRankedApplicants);
exports.CandidateRankingRouter = router;
