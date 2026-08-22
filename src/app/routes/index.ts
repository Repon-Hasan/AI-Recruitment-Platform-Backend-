
import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.routes";
import { candidateRoutes } from "../modules/candidate/candidate.route";
import { resumeRouter } from "../modules/Resume/resume.route";
import { companyRouter } from "../modules/company/createCompany/company.router";
import { jobRouters } from "../modules/company/createJob/job.route";
import { jobSkillRouters } from "../modules/company/jobSkills/job.router";
import { skillGapRouter } from "../modules/skillGap/skillGap.routes";
import { jobMatchRouter } from "../modules/jobMatched/job.router";
import { candidateApplication } from "../modules/Application/candidate/application.router";
import { recruiterApplication } from "../modules/Application/recruter/application.router";
import { ApplicationStatusHistoryRoutes } from "../modules/applicationStatusHistory/applicationStatusHistory.route";

const router=Router()

router.use("/auth",authRouters)
router.use("/candidates",candidateRoutes)
router.use("/resume",resumeRouter)
router.use("/company",companyRouter)
router.use("/job",jobRouters)
router.use("/skill",jobSkillRouters)
router.use("/skill-gap",skillGapRouter)
router.use("/job-matches",jobMatchRouter)
router.use("/candidate",candidateApplication)
router.use("/",recruiterApplication)
router.use("/",ApplicationStatusHistoryRoutes)
export const indexRoutes=router;