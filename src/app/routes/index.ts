
import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.routes";
import { candidateRoutes } from "../modules/candidate/candidate.route";
import { resumeRouter } from "../modules/Resume/resume.route";

const router=Router()

router.use("/auth",authRouters)
router.use("/candidates",candidateRoutes)
router.use("/resume",resumeRouter)

export const indexRoutes=router;