import { z } from "zod";
export declare const generateInterviewQuestionsSchema: z.ZodObject<{
    jobId: z.ZodString;
    experienceLevel: z.ZodEnum<{
        JUNIOR: "JUNIOR";
        MID: "MID";
        SENIOR: "SENIOR";
    }>;
    interviewType: z.ZodEnum<{
        BEHAVIORAL: "BEHAVIORAL";
        MIXED: "MIXED";
        SYSTEM_DESIGN: "SYSTEM_DESIGN";
        TECHNICAL: "TECHNICAL";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=interview.validation.d.ts.map