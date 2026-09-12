"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInterviewSchema = exports.createInterviewSchema = void 0;
const zod_1 = require("zod");
exports.createInterviewSchema = zod_1.z.object({
    jobApplicationId: zod_1.z
        .string()
        .uuid("Invalid job application ID"),
    scheduledAt: zod_1.z
        .string()
        .datetime("Invalid scheduled date"),
    durationMinutes: zod_1.z
        .number()
        .int()
        .positive()
        .max(480)
        .optional(),
    type: zod_1.z
        .enum([
        "VIDEO",
        "PHONE",
        "IN_PERSON"
    ])
        .optional(),
    meetingUrl: zod_1.z
        .string()
        .url("Invalid meeting URL")
        .optional()
        .or(zod_1.z.literal("")),
    title: zod_1.z
        .string()
        .max(200)
        .optional(),
    notes: zod_1.z
        .string()
        .max(5000)
        .optional(),
});
exports.updateInterviewSchema = zod_1.z.object({
    scheduledAt: zod_1.z
        .string()
        .datetime("Invalid scheduled date")
        .optional(),
    durationMinutes: zod_1.z
        .number()
        .int()
        .positive()
        .max(480)
        .optional(),
    type: zod_1.z
        .enum([
        "VIDEO",
        "PHONE",
        "IN_PERSON"
    ])
        .optional(),
    meetingUrl: zod_1.z
        .string()
        .url("Invalid meeting URL")
        .optional()
        .or(zod_1.z.literal("")),
    title: zod_1.z
        .string()
        .max(200)
        .optional(),
    notes: zod_1.z
        .string()
        .max(5000)
        .optional(),
});
