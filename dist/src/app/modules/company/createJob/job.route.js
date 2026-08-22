import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { jobController } from "./job.controller";
const router = Router();
router.post("/create", checkAuth(), jobController.createJob);
router.get("/", jobController.getAllJobs);
router.patch("/:id", checkAuth(), jobController.updateJob);
router.delete("/:id", checkAuth(), jobController.deleteJob);
export const jobRouters = router;
