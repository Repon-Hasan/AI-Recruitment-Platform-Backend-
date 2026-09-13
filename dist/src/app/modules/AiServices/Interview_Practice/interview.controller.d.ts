import { Request, Response } from "express";
declare const startInterview: (req: Request, res: Response) => Promise<void>;
declare const answerInterview: (req: Request, res: Response) => Promise<void>;
export declare const InterviewController: {
    startInterview: typeof startInterview;
    answerInterview: typeof answerInterview;
};
export {};
//# sourceMappingURL=interview.controller.d.ts.map