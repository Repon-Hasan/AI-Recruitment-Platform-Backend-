import { z } from "zod";
export declare const changeApplicationStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<{
            APPLIED: "APPLIED";
            HIRED: "HIRED";
            INTERVIEW: "INTERVIEW";
            OFFER: "OFFER";
            REJECTED: "REJECTED";
            SCREENING: "SCREENING";
            WITHDRAWN: "WITHDRAWN";
        }>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        applicationId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=applicationStatusHistory.validation.d.ts.map