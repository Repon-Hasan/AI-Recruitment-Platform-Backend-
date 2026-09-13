import { Request, Response } from "express";
declare const createComplaint: (req: Request, res: Response) => Promise<void>;
declare const getMyComplaints: (req: Request, res: Response) => Promise<void>;
declare const getMyComplaintById: (req: Request, res: Response) => Promise<void>;
export declare const ReviewComplaintController: {
    createComplaint: typeof createComplaint;
    getMyComplaints: typeof getMyComplaints;
    getMyComplaintById: typeof getMyComplaintById;
};
export {};
//# sourceMappingURL=reviewComplaint.controller.d.ts.map