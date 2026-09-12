"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterAssistantSchema = void 0;
const zod_1 = require("zod");
exports.recruiterAssistantSchema = zod_1.z.object({
    jobId: zod_1.z.string().uuid().optional(),
    query: zod_1.z
        .string()
        .min(3, "Query must contain at least 3 characters"),
    limit: zod_1.z
        .number()
        .int()
        .min(1)
        .max(20)
        .default(5),
});
