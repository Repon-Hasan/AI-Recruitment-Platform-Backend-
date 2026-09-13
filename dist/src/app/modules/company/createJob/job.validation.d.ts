import { z } from "zod";
export declare const createJobSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    location: z.ZodString;
    remoteType: z.ZodDefault<z.ZodEnum<{
        HYBRID: "HYBRID";
        ONSITE: "ONSITE";
        REMOTE: "REMOTE";
    }>>;
    employmentType: z.ZodEnum<{
        CONTRACT: "CONTRACT";
        FREELANCE: "FREELANCE";
        FULL_TIME: "FULL_TIME";
        INTERNSHIP: "INTERNSHIP";
        PART_TIME: "PART_TIME";
    }>;
    experienceLevel: z.ZodEnum<{
        ENTRY: "ENTRY";
        JUNIOR: "JUNIOR";
        LEAD: "LEAD";
        MID: "MID";
        SENIOR: "SENIOR";
    }>;
    salaryMin: z.ZodOptional<z.ZodNumber>;
    salaryMax: z.ZodOptional<z.ZodNumber>;
    salaryCurrency: z.ZodDefault<z.ZodString>;
    deadline: z.ZodCoercedDate<unknown>;
    requiredSkills: z.ZodArray<z.ZodString>;
    preferredSkills: z.ZodDefault<z.ZodArray<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>;
}, z.core.$strip>;
export declare const searchJobSchema: z.ZodObject<{
    keyword: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    skills: z.ZodOptional<z.ZodString>;
    salaryMin: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    salaryMax: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    experience: z.ZodOptional<z.ZodEnum<{
        ENTRY: "ENTRY";
        JUNIOR: "JUNIOR";
        LEAD: "LEAD";
        MID: "MID";
        SENIOR: "SENIOR";
    }>>;
    remote: z.ZodOptional<z.ZodEnum<{
        HYBRID: "HYBRID";
        ONSITE: "ONSITE";
        REMOTE: "REMOTE";
    }>>;
    employmentType: z.ZodOptional<z.ZodEnum<{
        CONTRACT: "CONTRACT";
        FREELANCE: "FREELANCE";
        FULL_TIME: "FULL_TIME";
        INTERNSHIP: "INTERNSHIP";
        PART_TIME: "PART_TIME";
    }>>;
    companyId: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        createdAt: "createdAt";
        deadline: "deadline";
        salaryMax: "salaryMax";
        salaryMin: "salaryMin";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=job.validation.d.ts.map