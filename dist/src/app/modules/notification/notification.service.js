import { NotificationChannel, NotificationStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const createNotification = async (payload) => {
    const notification = await prisma.notification.create({
        data: {
            userId: payload.userId,
            type: payload.type,
            channel: payload.channel ?? NotificationChannel.IN_APP,
            title: payload.title,
            message: payload.message,
            referenceId: payload.referenceId,
            status: NotificationStatus.PENDING,
        },
    });
    return notification;
};
const getMyNotifications = async (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [notifications, total, unreadCount] = await Promise.all([
        prisma.notification.findMany({
            where: {
                userId,
                channel: NotificationChannel.IN_APP,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma.notification.count({
            where: {
                userId,
                channel: NotificationChannel.IN_APP,
            },
        }),
        prisma.notification.count({
            where: {
                userId,
                channel: NotificationChannel.IN_APP,
                status: {
                    not: NotificationStatus.READ,
                },
                readAt: null,
            },
        }),
    ]);
    return {
        notifications,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            unreadCount,
        },
    };
};
const getUnreadNotifications = async (userId) => {
    return prisma.notification.findMany({
        where: {
            userId,
            channel: NotificationChannel.IN_APP,
            status: {
                not: NotificationStatus.READ,
            },
            readAt: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getUnreadCount = async (userId) => {
    return prisma.notification.count({
        where: {
            userId,
            channel: NotificationChannel.IN_APP,
            status: {
                not: NotificationStatus.READ,
            },
            readAt: null,
        },
    });
};
const markAsRead = async (userId, notificationId) => {
    const notification = await prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        throw new Error("Notification not found");
    }
    if (notification.status === NotificationStatus.READ &&
        notification.readAt) {
        return notification;
    }
    return prisma.notification.update({
        where: {
            id: notificationId,
        },
        data: {
            status: NotificationStatus.READ,
            readAt: new Date(),
        },
    });
};
const markAllAsRead = async (userId) => {
    return prisma.notification.updateMany({
        where: {
            userId,
            channel: NotificationChannel.IN_APP,
            status: {
                not: NotificationStatus.READ,
            },
        },
        data: {
            status: NotificationStatus.READ,
            readAt: new Date(),
        },
    });
};
const deleteNotification = async (userId, notificationId) => {
    const notification = await prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        throw new Error("Notification not found");
    }
    return prisma.notification.delete({
        where: {
            id: notificationId,
        },
    });
};
const deleteAllNotifications = async (userId) => {
    return prisma.notification.deleteMany({
        where: {
            userId,
            channel: NotificationChannel.IN_APP,
        },
    });
};
export const notificationService = {
    createNotification,
    getMyNotifications,
    getUnreadNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
};
