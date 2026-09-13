import { z } from "zod";
export const createInterviewSchema = z.object({
    jobApplicationId: z
        .string()
        .uuid("Invalid job application ID"),
    scheduledAt: z
        .string()
        .datetime("Invalid scheduled date"),
    durationMinutes: z
        .number()
        .int()
        .positive()
        .max(480)
        .optional(),
    type: z
        .enum([
        "VIDEO",
        "PHONE",
        "IN_PERSON"
    ])
        .optional(),
    meetingUrl: z
        .string()
        .url("Invalid meeting URL")
        .optional()
        .or(z.literal("")),
    title: z
        .string()
        .max(200)
        .optional(),
    notes: z
        .string()
        .max(5000)
        .optional(),
});
export const updateInterviewSchema = z.object({
    scheduledAt: z
        .string()
        .datetime("Invalid scheduled date")
        .optional(),
    durationMinutes: z
        .number()
        .int()
        .positive()
        .max(480)
        .optional(),
    type: z
        .enum([
        "VIDEO",
        "PHONE",
        "IN_PERSON"
    ])
        .optional(),
    meetingUrl: z
        .string()
        .url("Invalid meeting URL")
        .optional()
        .or(z.literal("")),
    title: z
        .string()
        .max(200)
        .optional(),
    notes: z
        .string()
        .max(5000)
        .optional(),
});
//# sourceMappingURL=interview.validation.js.map