import { Request, Response } from "express";
declare const getMyNotifications: (req: Request, res: Response) => Promise<void>;
declare const getUnreadNotifications: (req: Request, res: Response) => Promise<void>;
declare const getUnreadCount: (req: Request, res: Response) => Promise<void>;
declare const markAsRead: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const markAllAsRead: (req: Request, res: Response) => Promise<void>;
declare const deleteNotification: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const deleteAllNotifications: (req: Request, res: Response) => Promise<void>;
export declare const notificationController: {
    getMyNotifications: typeof getMyNotifications;
    getUnreadNotifications: typeof getUnreadNotifications;
    getUnreadCount: typeof getUnreadCount;
    markAsRead: typeof markAsRead;
    markAllAsRead: typeof markAllAsRead;
    deleteNotification: typeof deleteNotification;
    deleteAllNotifications: typeof deleteAllNotifications;
};
export {};
//# sourceMappingURL=notification.controller.d.ts.map