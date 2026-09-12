"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const prisma_1 = require("../../lib/prisma");
const createNotification = async (payload) => {
    const notification = await prisma_1.prisma.notification.create({
        data: {
            userId: payload.userId,
            type: payload.type,
            channel: payload.channel ?? enums_1.NotificationChannel.IN_APP,
            title: payload.title,
            message: payload.message,
            referenceId: payload.referenceId,
            status: enums_1.NotificationStatus.PENDING,
        },
    });
    return notification;
};
const getMyNotifications = async (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [notifications, total, unreadCount] = await Promise.all([
        prisma_1.prisma.notification.findMany({
            where: {
                userId,
                channel: enums_1.NotificationChannel.IN_APP,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.notification.count({
            where: {
                userId,
                channel: enums_1.NotificationChannel.IN_APP,
            },
        }),
        prisma_1.prisma.notification.count({
            where: {
                userId,
                channel: enums_1.NotificationChannel.IN_APP,
                status: {
                    not: enums_1.NotificationStatus.READ,
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
    return prisma_1.prisma.notification.findMany({
        where: {
            userId,
            channel: enums_1.NotificationChannel.IN_APP,
            status: {
                not: enums_1.NotificationStatus.READ,
            },
            readAt: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getUnreadCount = async (userId) => {
    return prisma_1.prisma.notification.count({
        where: {
            userId,
            channel: enums_1.NotificationChannel.IN_APP,
            status: {
                not: enums_1.NotificationStatus.READ,
            },
            readAt: null,
        },
    });
};
const markAsRead = async (userId, notificationId) => {
    const notification = await prisma_1.prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        throw new Error("Notification not found");
    }
    if (notification.status === enums_1.NotificationStatus.READ &&
        notification.readAt) {
        return notification;
    }
    return prisma_1.prisma.notification.update({
        where: {
            id: notificationId,
        },
        data: {
            status: enums_1.NotificationStatus.READ,
            readAt: new Date(),
        },
    });
};
const markAllAsRead = async (userId) => {
    return prisma_1.prisma.notification.updateMany({
        where: {
            userId,
            channel: enums_1.NotificationChannel.IN_APP,
            status: {
                not: enums_1.NotificationStatus.READ,
            },
        },
        data: {
            status: enums_1.NotificationStatus.READ,
            readAt: new Date(),
        },
    });
};
const deleteNotification = async (userId, notificationId) => {
    const notification = await prisma_1.prisma.notification.findFirst({
        where: {
            id: notificationId,
            userId,
        },
    });
    if (!notification) {
        throw new Error("Notification not found");
    }
    return prisma_1.prisma.notification.delete({
        where: {
            id: notificationId,
        },
    });
};
const deleteAllNotifications = async (userId) => {
    return prisma_1.prisma.notification.deleteMany({
        where: {
            userId,
            channel: enums_1.NotificationChannel.IN_APP,
        },
    });
};
exports.notificationService = {
    createNotification,
    getMyNotifications,
    getUnreadNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
};
