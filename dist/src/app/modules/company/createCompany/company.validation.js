// company.validation.ts
import { z } from "zod";
export const createCompanySchema = z.object({
    name: z
        .string()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name is too long"),
    description: z
        .string()
        .max(1000, "Description is too long")
        .optional(),
    website: z.preprocess((value) => value === "" ? undefined : value, z.string().url("Invalid website URL").optional()),
});
export const updateCompanySchema = z.object({
    name: z
        .string()
        .min(2)
        .max(100)
        .optional(),
    description: z
        .string()
        .max(1000)
        .optional(),
    website: z.preprocess((value) => value === "" ? undefined : value, z.string().url("Invalid website URL").optional()),
});
