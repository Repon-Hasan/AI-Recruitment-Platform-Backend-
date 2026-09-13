import { Request, Response } from "express";
declare const rankApplicants: (req: Request, res: Response) => Promise<void>;
declare const getRankedApplicants: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CandidateRankingController: {
    rankApplicants: typeof rankApplicants;
    getRankedApplicants: typeof getRankedApplicants;
};
export {};
//# sourceMappingURL=candidateRanking.controller.d.ts.map