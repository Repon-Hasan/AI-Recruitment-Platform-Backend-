"use strict";
// company.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanySchema = exports.createCompanySchema = void 0;
const zod_1 = require("zod");
exports.createCompanySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name is too long"),
    description: zod_1.z
        .string()
        .max(1000, "Description is too long")
        .optional(),
    website: zod_1.z.preprocess((value) => value === "" ? undefined : value, zod_1.z.string().url("Invalid website URL").optional()),
});
exports.updateCompanySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2)
        .max(100)
        .optional(),
    description: zod_1.z
        .string()
        .max(1000)
        .optional(),
    website: zod_1.z.preprocess((value) => value === "" ? undefined : value, zod_1.z.string().url("Invalid website URL").optional()),
});
