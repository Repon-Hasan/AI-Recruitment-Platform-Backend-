"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterSearchSchema = void 0;
const zod_1 = require("zod");
exports.recruiterSearchSchema = zod_1.z.object({
    question: zod_1.z
        .string()
        .trim()
        .min(3, "Question must be at least 3 characters long")
        .max(1000, "Question cannot exceed 1000 characters"),
    limit: zod_1.z
        .number()
        .int()
        .min(1)
        .max(20)
        .optional()
        .default(5),
});
