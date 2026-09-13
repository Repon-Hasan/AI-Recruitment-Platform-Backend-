import { Request, Response } from "express";
declare const uploadResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMyResumes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const analyze: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAnalysis: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const ingestResume: (req: Request, res: Response) => Promise<void>;
export declare const resumeController: {
    uploadResume: typeof uploadResume;
    getMyResumes: typeof getMyResumes;
    getResume: typeof getResume;
    deleteResume: typeof deleteResume;
    analyze: typeof analyze;
    getAnalysis: typeof getAnalysis;
    ingestResume: typeof ingestResume;
};
export {};
//# sourceMappingURL=resume.controller.d.ts.map