"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = exports.rescheduleInterviewSchema = exports.createInterviewSchema = void 0;
const zod_1 = require("zod");
exports.createInterviewSchema = zod_1.z.object({
    applicationId: zod_1.z.string().uuid(),
    scheduledAt: zod_1.z
        .string()
        .datetime({
        offset: true,
    }),
    durationMinutes: zod_1.z
        .number()
        .int()
        .min(15)
        .max(180)
        .default(30),
    type: zod_1.z
        .enum(["VIDEO", "PHONE", "IN_PERSON"])
        .default("VIDEO"),
    title: zod_1.z
        .string()
        .trim()
        .min(3)
        .max(200)
        .optional(),
    notes: zod_1.z
        .string()
        .trim()
        .max(2000)
        .optional(),
    meetingUrl: zod_1.z
        .string()
        .url()
        .optional(),
});
exports.rescheduleInterviewSchema = zod_1.z.object({
    scheduledAt: zod_1.z
        .string()
        .datetime({
        offset: true,
    }),
    durationMinutes: zod_1.z
        .number()
        .int()
        .min(15)
        .max(180)
        .optional(),
});
exports.sendMessageSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(5000),
});
