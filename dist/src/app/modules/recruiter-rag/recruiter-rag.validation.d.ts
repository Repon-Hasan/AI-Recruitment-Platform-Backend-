import { z } from "zod";
export declare const recruiterSearchSchema: z.ZodObject<{
    question: z.ZodString;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export type RecruiterSearchInput = z.infer<typeof recruiterSearchSchema>;
//# sourceMappingURL=recruiter-rag.validation.d.ts.map