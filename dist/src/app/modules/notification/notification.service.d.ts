import { NotificationChannel, NotificationStatus, NotificationType } from "../../../generated/prisma/enums";
interface CreateNotificationPayload {
    userId: string;
    type: NotificationType;
    channel?: NotificationChannel;
    title: string;
    message: string;
    referenceId?: string;
}
declare const createNotification: (payload: CreateNotificationPayload) => Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    channel: NotificationChannel;
    status: NotificationStatus;
    title: string;
    message: string;
    applicationId: string | null;
    interviewId: string | null;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getMyNotifications: (userId: string, page?: number, limit?: number) => Promise<{
    notifications: {
        id: string;
        userId: string;
        type: NotificationType;
        channel: NotificationChannel;
        status: NotificationStatus;
        title: string;
        message: string;
        applicationId: string | null;
        interviewId: string | null;
        readAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        unreadCount: number;
    };
}>;
declare const getUnreadNotifications: (userId: string) => Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    channel: NotificationChannel;
    status: NotificationStatus;
    title: string;
    message: string;
    applicationId: string | null;
    interviewId: string | null;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const getUnreadCount: (userId: string) => Promise<number>;
declare const markAsRead: (userId: string, notificationId: string) => Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    channel: NotificationChannel;
    status: NotificationStatus;
    title: string;
    message: string;
    applicationId: string | null;
    interviewId: string | null;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const markAllAsRead: (userId: string) => Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
declare const deleteNotification: (userId: string, notificationId: string) => Promise<{
    id: string;
    userId: string;
    type: NotificationType;
    channel: NotificationChannel;
    status: NotificationStatus;
    title: string;
    message: string;
    applicationId: string | null;
    interviewId: string | null;
    readAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deleteAllNotifications: (userId: string) => Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload>;
export declare const notificationService: {
    createNotification: typeof createNotification;
    getMyNotifications: typeof getMyNotifications;
    getUnreadNotifications: typeof getUnreadNotifications;
    getUnreadCount: typeof getUnreadCount;
    markAsRead: typeof markAsRead;
    markAllAsRead: typeof markAllAsRead;
    deleteNotification: typeof deleteNotification;
    deleteAllNotifications: typeof deleteAllNotifications;
};
export {};
//# sourceMappingURL=notification.service.d.ts.map