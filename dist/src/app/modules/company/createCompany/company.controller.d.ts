import { Request, Response } from "express";
declare const createCompanyController: (req: Request, res: Response) => Promise<void>;
declare const getMyCompanyController: (req: Request, res: Response) => Promise<void>;
declare const updateMyCompanyController: (req: Request, res: Response) => Promise<void>;
declare const deleteMyCompanyController: (req: Request, res: Response) => Promise<void>;
declare const getMyCompanyComplaints: (req: Request, res: Response) => Promise<void>;
declare const getMyCompanyComplaintById: (req: Request, res: Response) => Promise<void>;
declare const getMyCompanyPenalties: (req: Request, res: Response) => Promise<void>;
declare const getMyCompanyPenaltyById: (req: Request, res: Response) => Promise<void>;
export declare const companyController: {
    createCompanyController: typeof createCompanyController;
    getMyCompanyController: typeof getMyCompanyController;
    updateMyCompanyController: typeof updateMyCompanyController;
    deleteMyCompanyController: typeof deleteMyCompanyController;
    getMyCompanyPenaltyById: typeof getMyCompanyPenaltyById;
    getMyCompanyPenalties: typeof getMyCompanyPenalties;
    getMyCompanyComplaints: typeof getMyCompanyComplaints;
    getMyCompanyComplaintById: typeof getMyCompanyComplaintById;
};
export {};
//# sourceMappingURL=company.controller.d.ts.map