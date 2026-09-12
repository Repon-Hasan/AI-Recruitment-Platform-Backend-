// applicationStatusHistory.validation.ts
import { z } from "zod";
export const changeApplicationStatusSchema = z.object({
    body: z.object({
        status: z.enum([
            "APPLIED",
            "SCREENING",
            "INTERVIEW",
            "OFFER",
            "HIRED",
            "REJECTED",
            "WITHDRAWN",
        ]),
    }),
    params: z.object({
        applicationId: z.string().uuid(),
    }),
});
