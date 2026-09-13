import { z } from "zod";
export declare const createInterviewSchema: z.ZodObject<{
    applicationId: z.ZodString;
    scheduledAt: z.ZodString;
    durationMinutes: z.ZodDefault<z.ZodNumber>;
    type: z.ZodDefault<z.ZodEnum<{
        IN_PERSON: "IN_PERSON";
        PHONE: "PHONE";
        VIDEO: "VIDEO";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    meetingUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const rescheduleInterviewSchema: z.ZodObject<{
    scheduledAt: z.ZodString;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const sendMessageSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=interview.validation.d.ts.map