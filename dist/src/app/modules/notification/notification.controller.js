import { notificationService } from "./notification.service";
const getMyNotifications = async (req, res) => {
    const userId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const result = await notificationService.getMyNotifications(userId, page, limit);
    res.status(200).json({
        success: true,
        message: "Notifications retrieved successfully",
        data: result,
    });
};
const getUnreadNotifications = async (req, res) => {
    const userId = req.user.id;
    const notifications = await notificationService.getUnreadNotifications(userId);
    res.status(200).json({
        success: true,
        message: "Unread notifications retrieved successfully",
        data: notifications,
    });
};
const getUnreadCount = async (req, res) => {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);
    res.status(200).json({
        success: true,
        message: "Unread notification count retrieved successfully",
        data: {
            count,
        },
    });
};
const markAsRead = async (req, res) => {
    const userId = req.user.id;
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Notification id is required",
        });
    }
    const notification = await notificationService.markAsRead(userId, id);
    res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: notification,
    });
};
const markAllAsRead = async (req, res) => {
    const userId = req.user.id;
    const result = await notificationService.markAllAsRead(userId);
    res.status(200).json({
        success: true,
        message: "All notifications marked as read",
        data: result,
    });
};
const deleteNotification = async (req, res) => {
    const userId = req.user.id;
    const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Notification id is required",
        });
    }
    await notificationService.deleteNotification(userId, id);
    res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
    });
};
const deleteAllNotifications = async (req, res) => {
    const userId = req.user.id;
    const result = await notificationService.deleteAllNotifications(userId);
    res.status(200).json({
        success: true,
        message: "All notifications deleted successfully",
        data: result,
    });
};
export const notificationController = {
    getMyNotifications,
    getUnreadNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
};
