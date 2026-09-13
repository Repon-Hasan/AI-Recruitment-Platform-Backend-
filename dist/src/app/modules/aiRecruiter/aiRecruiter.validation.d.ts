import { z } from "zod";
export declare const recruiterAssistantSchema: z.ZodObject<{
    jobId: z.ZodOptional<z.ZodString>;
    query: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=aiRecruiter.validation.d.ts.map