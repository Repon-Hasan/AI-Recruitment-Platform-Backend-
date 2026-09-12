"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complaintDecisionSchema = exports.createComplaintSchema = void 0;
const zod_1 = require("zod");
exports.createComplaintSchema = zod_1.z.object({
    companyId: zod_1.z.string().uuid(),
    jobId: zod_1.z.string().uuid().optional(),
    jobApplicationId: zod_1.z.string().uuid().optional(),
    type: zod_1.z.enum([
        "COMPANY_BEHAVIOR",
        "JOB_MISMATCH",
        "FAKE_JOB",
        "SALARY_MISMATCH",
        "INTERVIEW_PROBLEM",
        "HARASSMENT",
        "DISCRIMINATION",
        "FRAUD",
        "OTHER",
    ]),
    title: zod_1.z
        .string()
        .min(5)
        .max(200),
    description: zod_1.z
        .string()
        .min(20)
        .max(5000),
});
exports.complaintDecisionSchema = zod_1.z.object({
    decision: zod_1.z.enum([
        "NO_VIOLATION",
        "WARNING",
        "PENALTY",
        "SUSPENSION",
        "JOB_REMOVAL",
        "COMPANY_SUSPENSION",
    ]),
    adminNote: zod_1.z.string().min(5),
});
