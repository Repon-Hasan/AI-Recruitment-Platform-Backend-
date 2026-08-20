import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { jobSkillController } from "./jobSkill.controller";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post("/create", checkAuth(Role.RECRUITER), jobSkillController.createJobSkill);
router.get("/job/:jobId", jobSkillController.getSkillsByJobId);
router.get("/allJobs",jobSkillController.getAllJobs)
router.patch("/:id", checkAuth(), jobSkillController.updateJobSkill);
router.delete("/:id", checkAuth(), jobSkillController.deleteJobSkill);

export const jobSkillRouters = router;