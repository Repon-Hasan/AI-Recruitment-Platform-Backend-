import { z } from "zod";
export declare const startInterviewSchema: z.ZodObject<{
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
export declare const answerInterviewSchema: z.ZodObject<{
    sessionId: z.ZodString;
    answer: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=interview.validation.d.ts.map