import { z } from "zod";
export declare const createInterviewSchema: z.ZodObject<{
    jobApplicationId: z.ZodString;
    scheduledAt: z.ZodString;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        IN_PERSON: "IN_PERSON";
        PHONE: "PHONE";
        VIDEO: "VIDEO";
    }>>;
    meetingUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    title: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateInterviewSchema: z.ZodObject<{
    scheduledAt: z.ZodOptional<z.ZodString>;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<{
        IN_PERSON: "IN_PERSON";
        PHONE: "PHONE";
        VIDEO: "VIDEO";
    }>>;
    meetingUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    title: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=interview.validation.d.ts.map