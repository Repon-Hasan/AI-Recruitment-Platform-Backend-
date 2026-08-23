import { z } from "zod";

export const recruiterAssistantSchema = z.object({
  jobId: z.string().uuid().optional(),

  query: z
    .string()
    .min(3, "Query must contain at least 3 characters"),

  limit: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(5),
});