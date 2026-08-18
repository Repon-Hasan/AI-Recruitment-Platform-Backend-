
import { Router } from "express";
import { authRouters } from "../modules/Auth/auth.routes";

const router=Router()

router.use("/auth",authRouters)
export const indexRoutes=router;