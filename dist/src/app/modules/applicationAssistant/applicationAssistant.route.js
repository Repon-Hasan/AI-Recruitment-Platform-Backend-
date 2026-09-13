import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { ApplicationAssistantController } from "./applicationAssistant.controller.js";
const router = Router();
router.post("/:jobId", checkAuth(Role.CANDIDATE), ApplicationAssistantController.generateAssistant);
export const ApplicationAssistantRouter = router;
//# sourceMappingURL=applicationAssistant.route.js.map