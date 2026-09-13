import { Request, Response } from "express";
declare const changeApplicationStatus: (req: Request, res: Response) => Promise<void>;
declare const getApplicationStatusHistory: (req: Request, res: Response) => Promise<void>;
declare const getSingleStatusHistory: (req: Request, res: Response) => Promise<void>;
export declare const ApplicationStatusHistoryController: {
    changeApplicationStatus: typeof changeApplicationStatus;
    getApplicationStatusHistory: typeof getApplicationStatusHistory;
    getSingleStatusHistory: typeof getSingleStatusHistory;
};
export {};
//# sourceMappingURL=applicationStatusHistory.controller.d.ts.map