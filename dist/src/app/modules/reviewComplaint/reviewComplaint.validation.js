import { z } from "zod";
export const createReviewComplaintSchema = z.object({
    companyId: z.string().uuid(),
    jobId: z.string().uuid().optional(),
    jobApplicationId: z.string().uuid().optional(),
    type: z.enum([
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
    title: z
        .string()
        .min(5)
        .max(200),
    description: z
        .string()
        .min(20)
        .max(5000),
});
export const updateComplaintStatusSchema = z.object({
    status: z.enum([
        "PENDING",
        "UNDER_REVIEW",
        "NEED_MORE_INFORMATION",
        "ACCEPTED",
        "REJECTED",
        "RESOLVED",
    ]),
});
export const complaintDecisionSchema = z.object({
    decision: z.enum([
        "NO_VIOLATION",
        "WARNING",
        "PENALTY",
        "SUSPENSION",
        "JOB_REMOVAL",
        "COMPANY_SUSPENSION",
    ]),
    adminNote: z
        .string()
        .min(5)
        .max(5000),
});
export const createPenaltySchema = z.object({
    amount: z
        .number()
        .positive(),
    currency: z
        .string()
        .length(3)
        .default("USD"),
    reason: z
        .string()
        .min(5)
        .max(1000),
    dueDate: z
        .string()
        .datetime()
        .optional(),
});
