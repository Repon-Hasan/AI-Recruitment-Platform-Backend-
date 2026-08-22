import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { calculateJobMatch, deleteJobMatch, getJobMatches, getJobMatchSummary, getMyJobMatch, getMyJobMatches } from "./job.controller";
const router = Router();
// Candidate
router.post("/:jobId", checkAuth(), calculateJobMatch);
// Candidate - get all matches
router.get("/all/me", checkAuth(), getMyJobMatches);
// Candidate - get one match
router.get("/:jobId", checkAuth(), getMyJobMatch);
// Recruiter - get all candidate matches
router.get("/job/:jobId", checkAuth(), getJobMatches);
// Candidate - detailed summary
router.get("/:jobId/summary", checkAuth(), getJobMatchSummary);
// Candidate
router.delete("/:jobId", checkAuth(), deleteJobMatch);
export const jobMatchRouter = router;
