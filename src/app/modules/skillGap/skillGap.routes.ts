import { Router } from "express";
import { analyzeSkillGap } from "./skillGap.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/:jobId",
  checkAuth(Role.CANDIDATE),
  analyzeSkillGap
);

export const skillGapRouter=router;