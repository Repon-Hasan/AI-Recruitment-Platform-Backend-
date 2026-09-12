"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchJobSchema = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(200),
    description: zod_1.z.string().min(20),
    location: zod_1.z.string().trim().min(1, "Location is required"),
    remoteType: zod_1.z
        .enum(["ONSITE", "REMOTE", "HYBRID"])
        .default("ONSITE"),
    employmentType: zod_1.z
        .enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE",
    ]),
    experienceLevel: zod_1.z
        .enum([
        "ENTRY",
        "JUNIOR",
        "MID",
        "SENIOR",
        "LEAD",
    ]),
    salaryMin: zod_1.z.number().nonnegative().optional(),
    salaryMax: zod_1.z.number().nonnegative().optional(),
    salaryCurrency: zod_1.z
        .string()
        .max(10)
        .default("BDT"),
    deadline: zod_1.z.coerce.date().refine((date) => date > new Date(), "Deadline must be in the future"),
    requiredSkills: zod_1.z
        .array(zod_1.z.string().min(1))
        .min(1),
    preferredSkills: zod_1.z
        .array(zod_1.z.string().min(1))
        .default([]),
    status: zod_1.z
        .enum(["DRAFT", "PUBLISHED"])
        .default("DRAFT"),
});
exports.searchJobSchema = zod_1.z.object({
    keyword: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    skills: zod_1.z.string().optional(),
    salaryMin: zod_1.z.coerce.number().nonnegative().optional(),
    salaryMax: zod_1.z.coerce.number().nonnegative().optional(),
    experience: zod_1.z
        .enum([
        "ENTRY",
        "JUNIOR",
        "MID",
        "SENIOR",
        "LEAD",
    ])
        .optional(),
    remote: zod_1.z
        .enum(["ONSITE", "REMOTE", "HYBRID"])
        .optional(),
    employmentType: zod_1.z
        .enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE",
    ])
        .optional(),
    companyId: zod_1.z.string().uuid().optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z
        .coerce
        .number()
        .int()
        .positive()
        .max(50)
        .default(10),
    sortBy: zod_1.z
        .enum([
        "createdAt",
        "salaryMin",
        "salaryMax",
        "deadline",
    ])
        .default("createdAt"),
    sortOrder: zod_1.z
        .enum(["asc", "desc"])
        .default("desc"),
});
