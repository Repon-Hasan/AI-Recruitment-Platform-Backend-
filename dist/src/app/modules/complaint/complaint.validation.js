import { z } from "zod";
export const createComplaintSchema = z.object({
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
export const complaintDecisionSchema = z.object({
    decision: z.enum([
        "NO_VIOLATION",
        "WARNING",
        "PENALTY",
        "SUSPENSION",
        "JOB_REMOVAL",
        "COMPANY_SUSPENSION",
    ]),
    adminNote: z.string().min(5),
});
