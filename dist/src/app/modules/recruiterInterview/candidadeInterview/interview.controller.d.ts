import { Request, Response } from "express";
export declare const createInterviewController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCandidateInterviewsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCandidateInterviewByIdController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const confirmInterviewController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cancelInterviewController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const rescheduleInterviewController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRecruiterInterviewsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateInterviewController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteInterviewController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=interview.controller.d.ts.map