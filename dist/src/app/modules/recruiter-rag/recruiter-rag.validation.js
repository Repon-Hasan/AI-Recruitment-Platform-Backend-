import { z } from "zod";
export const recruiterSearchSchema = z.object({
    question: z
        .string()
        .trim()
        .min(3, "Question must be at least 3 characters long")
        .max(1000, "Question cannot exceed 1000 characters"),
    limit: z
        .number()
        .int()
        .min(1)
        .max(20)
        .optional()
        .default(5),
});
