import { z } from "zod";

export const createInterviewSchema = z.object({
  applicationId: z.string().uuid(),

  scheduledAt: z
    .string()
    .datetime({
      offset: true,
    }),

  durationMinutes: z
    .number()
    .int()
    .min(15)
    .max(180)
    .default(30),

  type: z
    .enum(["VIDEO", "PHONE", "IN_PERSON"])
    .default("VIDEO"),

  title: z
    .string()
    .trim()
    .min(3)
    .max(200)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000)
    .optional(),

  meetingUrl: z
    .string()
    .url()
    .optional(),
});

export const rescheduleInterviewSchema = z.object({
  scheduledAt: z
    .string()
    .datetime({
      offset: true,
    }),

  durationMinutes: z
    .number()
    .int()
    .min(15)
    .max(180)
    .optional(),
});

export const sendMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1)
    .max(5000),
});