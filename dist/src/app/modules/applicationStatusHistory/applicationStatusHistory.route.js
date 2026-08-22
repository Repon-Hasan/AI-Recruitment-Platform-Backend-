// applicationStatusHistory.route.ts
import { Router } from "express";
import { ApplicationStatusHistoryController } from "./applicationStatusHistory.controller";
import { checkAuth } from "../../middleware/checkAuth";
const router = Router();
router.patch("/applications/:applicationId/status", checkAuth(), ApplicationStatusHistoryController.changeApplicationStatus);
router.get("/applications/:applicationId/status-history", checkAuth(), ApplicationStatusHistoryController.getApplicationStatusHistory);
router.get("/applications/:applicationId/status-history/:historyId", ApplicationStatusHistoryController.getSingleStatusHistory);
export const ApplicationStatusHistoryRoutes = router;
