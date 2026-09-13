import { Request, Response } from "express";
declare const createJobSkill: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getSkillsByJobId: (req: Request, res: Response) => Promise<void>;
declare const updateJobSkill: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const deleteJobSkill: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getAllJobs: (req: Request, res: Response) => Promise<void>;
export declare const jobSkillController: {
    createJobSkill: typeof createJobSkill;
    getSkillsByJobId: typeof getSkillsByJobId;
    updateJobSkill: typeof updateJobSkill;
    deleteJobSkill: typeof deleteJobSkill;
    getAllJobs: typeof getAllJobs;
};
export {};
//# sourceMappingURL=jobSkill.controller.d.ts.map