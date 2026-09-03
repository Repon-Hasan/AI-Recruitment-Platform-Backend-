import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { calculateJobMatch, deleteJobMatch, getJobMatches, getJobMatchSummary, getMyJobMatch, getMyJobMatches, } from "./job.controller";
const router = Router();
// Recruiter - get all candidate matches for a job
router.get("/job/:jobId", checkAuth(Role.RECRUITER), getJobMatches);
// Candidate - calculate a match
router.post("/:jobId", checkAuth(Role.CANDIDATE), calculateJobMatch);
// Candidate - get all matches
router.get("/all/me", checkAuth(Role.CANDIDATE), getMyJobMatches);
// Candidate - get one match
router.get("/:jobId", checkAuth(Role.CANDIDATE), getMyJobMatch);
// Candidate - detailed summary
router.get("/:jobId/summary", checkAuth(Role.CANDIDATE), getJobMatchSummary);
// Candidate - delete a match
router.delete("/:jobId", checkAuth(Role.CANDIDATE), deleteJobMatch);
export const jobMatchRouter = router;
