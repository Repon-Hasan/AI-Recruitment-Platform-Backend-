import { z } from "zod";

export const startInterviewSchema = z.object({
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

export const answerInterviewSchema = z.object({
  sessionId: z.string(),
  answer: z.string().min(5),
});