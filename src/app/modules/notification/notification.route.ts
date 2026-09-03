import { Router } from "express";
import { notificationController } from "./notification.controller";
import { checkAuth } from "../../middleware/checkAuth";


const router = Router();

router.get(
  "/",
  checkAuth(),
  notificationController.getMyNotifications
);

router.get(
  "/unread",
  checkAuth(),
  notificationController.getUnreadNotifications
);

router.get(
  "/unread-count",
  checkAuth(),
  notificationController.getUnreadCount
);

router.patch(
  "/read-all",
  checkAuth(),
  notificationController.markAllAsRead
);

router.patch(
  "/:id/read",
  checkAuth(),
  notificationController.markAsRead
);

router.delete(
  "/:id",
  checkAuth(),
  notificationController.deleteNotification
);

router.delete(
  "/",
  checkAuth(),
  notificationController.deleteAllNotifications
);

export const notificationRoutes = router;