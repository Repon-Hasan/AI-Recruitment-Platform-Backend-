
import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.routes";
import { candidateRoutes } from "../modules/candidate/candidate.route";
import { resumeRouter } from "../modules/Resume/resume.route";
import { companyRouter } from "../modules/company/createCompany/company.router";
import { jobRouters } from "../modules/company/createJob/job.route";
import { jobSkillRouters } from "../modules/company/jobSkills/job.router";

const router=Router()

router.use("/auth",authRouters)
router.use("/candidates",candidateRoutes)
router.use("/resume",resumeRouter)
router.use("/company",companyRouter)
router.use("/job",jobRouters)
router.use("/skill",jobSkillRouters)
export const indexRoutes=router;