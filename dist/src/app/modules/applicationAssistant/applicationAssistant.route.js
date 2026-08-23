// applicationAssistant.route.ts
import { Router } from "express";
import { ApplicationAssistantController } from "./applicationAssistant.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/:jobId", checkAuth(Role.CANDIDATE), ApplicationAssistantController.generateAssistant);
export const ApplicationAssistantRouter = router;
