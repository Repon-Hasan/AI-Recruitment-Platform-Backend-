import { z } from "zod";
export declare const createApplicationSchema: z.ZodObject<{
    jobId: z.ZodString;
}, z.core.$strip>;
export declare const updateApplicationStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        APPLIED: "APPLIED";
        HIRED: "HIRED";
        INTERVIEW: "INTERVIEW";
        OFFER: "OFFER";
        REJECTED: "REJECTED";
        SCREENING: "SCREENING";
        SHORTLISTED: "SHORTLISTED";
        WITHDRAWN: "WITHDRAWN";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=application.validation.d.ts.map