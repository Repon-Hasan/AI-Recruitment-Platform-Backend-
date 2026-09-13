import { Router } from "express";
import { Role } from "../../../../generated/prisma/enums";
import { checkAuth } from "../../../middleware/checkAuth";
import { applyToJobController, deleteMyApplicationController, getMyApplicationControllerById, getMyApplicationsController, } from "./application.controller.js";
const router = Router();
router.post("/apply", checkAuth(Role.CANDIDATE), applyToJobController);
router.get("/my/application", checkAuth(Role.CANDIDATE), getMyApplicationsController);
router.get("/my/:applicationId", checkAuth(Role.CANDIDATE), getMyApplicationControllerById);
router.delete("/:applicationId", checkAuth(Role.CANDIDATE), deleteMyApplicationController);
export const candidateApplication = router;
//# sourceMappingURL=application.router.js.map