import { z } from "zod";
export declare const createComplaintSchema: z.ZodObject<{
    companyId: z.ZodString;
    jobId: z.ZodOptional<z.ZodString>;
    jobApplicationId: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        COMPANY_BEHAVIOR: "COMPANY_BEHAVIOR";
        DISCRIMINATION: "DISCRIMINATION";
        FAKE_JOB: "FAKE_JOB";
        FRAUD: "FRAUD";
        HARASSMENT: "HARASSMENT";
        INTERVIEW_PROBLEM: "INTERVIEW_PROBLEM";
        JOB_MISMATCH: "JOB_MISMATCH";
        OTHER: "OTHER";
        SALARY_MISMATCH: "SALARY_MISMATCH";
    }>;
    title: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const complaintDecisionSchema: z.ZodObject<{
    decision: z.ZodEnum<{
        COMPANY_SUSPENSION: "COMPANY_SUSPENSION";
        JOB_REMOVAL: "JOB_REMOVAL";
        NO_VIOLATION: "NO_VIOLATION";
        PENALTY: "PENALTY";
        SUSPENSION: "SUSPENSION";
        WARNING: "WARNING";
    }>;
    adminNote: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=complaint.validation.d.ts.map