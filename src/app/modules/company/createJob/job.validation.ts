import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3).max(200),

  description: z.string().min(20),

  location: z.string().optional(),

  remoteType: z
    .enum(["ONSITE", "REMOTE", "HYBRID"])
    .default("ONSITE"),

  employmentType: z
    .enum([
      "FULL_TIME",
      "PART_TIME",
      "CONTRACT",
      "INTERNSHIP",
      "FREELANCE",
    ])
    .optional(),

  experienceLevel: z
    .enum([
      "ENTRY",
      "JUNIOR",
      "MID",
      "SENIOR",
      "LEAD",
    ])
    .optional(),

  salaryMin: z.number().nonnegative().optional(),

  salaryMax: z.number().nonnegative().optional(),

  salaryCurrency: z
    .string()
    .max(10)
    .default("BDT"),

  deadline: z.coerce.date().optional(),

  requiredSkills: z
    .array(z.string().min(1))
    .min(1),

  preferredSkills: z
    .array(z.string().min(1))
    .default([]),

  status: z
    .enum(["DRAFT", "PUBLISHED"])
    .default("DRAFT"),
});


export const searchJobSchema = z.object({
  keyword: z.string().optional(),

  location: z.string().optional(),

  skills: z.string().optional(),

  salaryMin: z.coerce.number().nonnegative().optional(),

  salaryMax: z.coerce.number().nonnegative().optional(),

  experience: z
    .enum([
      "ENTRY",
      "JUNIOR",
      "MID",
      "SENIOR",
      "LEAD",
    ])
    .optional(),

  remote: z
    .enum(["ONSITE", "REMOTE", "HYBRID"])
    .optional(),

  employmentType: z
    .enum([
      "FULL_TIME",
      "PART_TIME",
      "CONTRACT",
      "INTERNSHIP",
      "FREELANCE",
    ])
    .optional(),

  companyId: z.string().uuid().optional(),

  page: z.coerce.number().int().positive().default(1),

  limit: z
    .coerce
    .number()
    .int()
    .positive()
    .max(50)
    .default(10),

  sortBy: z
    .enum([
      "createdAt",
      "salaryMin",
      "salaryMax",
      "deadline",
    ])
    .default("createdAt"),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("desc"),
});