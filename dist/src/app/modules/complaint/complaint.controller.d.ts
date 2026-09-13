import { Request, Response } from "express";
declare const createComplaint: (req: Request, res: Response) => Promise<void>;
declare const getMyComplaints: (req: Request, res: Response) => Promise<void>;
declare const updateComplaint: (req: Request, res: Response) => Promise<void>;
declare const deleteComplaint: (req: Request, res: Response) => Promise<void>;
declare const getComplaintsForAdmin: (req: Request, res: Response) => Promise<void>;
declare const decideComplaint: (req: Request, res: Response) => Promise<void>;
declare const createPenalty: (req: Request, res: Response) => Promise<void>;
declare const getCompanyPenalties: (req: Request, res: Response) => Promise<void>;
declare const updatePenalty: (req: Request, res: Response) => Promise<void>;
declare const deletePenalty: (req: Request, res: Response) => Promise<void>;
export declare const ComplaintController: {
    createComplaint: typeof createComplaint;
    getMyComplaints: typeof getMyComplaints;
    getComplaintsForAdmin: typeof getComplaintsForAdmin;
    updateComplaint: typeof updateComplaint;
    deleteComplaint: typeof deleteComplaint;
    getCompanyPenalties: typeof getCompanyPenalties;
    createPenalty: typeof createPenalty;
    decideComplaint: typeof decideComplaint;
    updatePenalty: typeof updatePenalty;
    deletePenalty: typeof deletePenalty;
};
export {};
//# sourceMappingURL=complaint.controller.d.ts.map