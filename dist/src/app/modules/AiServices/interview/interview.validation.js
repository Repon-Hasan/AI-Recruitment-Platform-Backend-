import { z } from "zod";
export const generateInterviewQuestionsSchema = z.object({
    jobId: z.string(),
    experienceLevel: z.enum([
        "JUNIOR",
        "MID",
        "SENIOR",
    ]),
    interviewType: z.enum([
        "TECHNICAL",
        "BEHAVIORAL",
        "SYSTEM_DESIGN",
        "MIXED",
    ]),
});
