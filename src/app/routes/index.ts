
import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.routes";
import { candidateRoutes } from "../modules/candidate/candidate.route";

const router=Router()

router.use("/auth",authRouters)
router.use("/candidates",candidateRoutes)

export const indexRoutes=router;