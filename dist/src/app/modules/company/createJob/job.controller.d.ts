import { Request, Response } from "express";
declare const createJob: (req: Request, res: Response) => Promise<void>;
declare const getAllJobs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const allJobs: (req: Request, res: Response) => Promise<void>;
declare const updateJob: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const deleteJob: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getJobById: (req: Request, res: Response) => Promise<void>;
declare const publishJob: (req: Request, res: Response) => Promise<void>;
declare const closeJob: (req: Request, res: Response) => Promise<void>;
declare const duplicateJob: (req: Request, res: Response) => Promise<void>;
declare const searchJobs: (req: Request, res: Response) => Promise<void>;
export declare const jobController: {
    createJob: typeof createJob;
    getAllJobs: typeof getAllJobs;
    updateJob: typeof updateJob;
    deleteJob: typeof deleteJob;
    getJobById: typeof getJobById;
    publishJob: typeof publishJob;
    closeJob: typeof closeJob;
    duplicateJob: typeof duplicateJob;
    searchJobs: typeof searchJobs;
    allJobs: typeof allJobs;
};
export {};
//# sourceMappingURL=job.controller.d.ts.map