import type { Request, Response } from "express";
export declare function createInterviewController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getApplicationInterviewController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function rescheduleInterviewController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function cancelInterviewController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare const getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=interview.controller.d.ts.map