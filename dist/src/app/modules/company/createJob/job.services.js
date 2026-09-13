import { JobStatus, RemoteType, } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import { generateJobEmbedding } from "./generateJobEmbedding.js";
import { searchJobSchema } from "./job.validation.js";
// ============================================================
// HELPER
// ============================================================
const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};
// ============================================================
// 1. CREATE JOB
// ============================================================
const createJobService = async (userId, data) => {
    // ==========================================================
    // 1. Find company
    // ==========================================================
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw createError("Company profile not found", 404);
    }
    // ==========================================================
    // 2. Validate basic fields
    // ==========================================================
    if (!data.title?.trim()) {
        throw createError("Job title is required", 400);
    }
    if (!data.description?.trim()) {
        throw createError("Job description is required", 400);
    }
    if (!data.location?.trim()) {
        throw createError("Job location is required", 400);
    }
    if (!data.employmentType) {
        throw createError("Employment type is required", 400);
    }
    if (!data.experienceLevel) {
        throw createError("Experience level is required", 400);
    }
    if (!data.deadline) {
        throw createError("Deadline is required", 400);
    }
    // ==========================================================
    // 3. Narrow required values
    // ==========================================================
    const title = data.title.trim();
    const description = data.description.trim();
    const location = data.location.trim();
    const employmentType = data.employmentType;
    const experienceLevel = data.experienceLevel;
    const remoteType = data.remoteType ?? RemoteType.ONSITE;
    const status = data.status;
    // ==========================================================
    // 4. Validate deadline
    // ==========================================================
    const deadline = data.deadline instanceof Date
        ? data.deadline
        : new Date(data.deadline);
    if (Number.isNaN(deadline.getTime())) {
        throw createError("Invalid deadline", 400);
    }
    if (deadline <= new Date()) {
        throw createError("Deadline must be a future date", 400);
    }
    // ==========================================================
    // 5. Validate salary
    // ==========================================================
    if (data.salaryMin !== undefined &&
        data.salaryMin !== null &&
        data.salaryMax !== undefined &&
        data.salaryMax !== null &&
        data.salaryMin > data.salaryMax) {
        throw createError("Minimum salary cannot be greater than maximum salary", 400);
    }
    // ==========================================================
    // 6. Prepare required skills
    // ==========================================================
    const skillNames = (data.requiredSkills ?? [])
        .map((skill) => {
        if (typeof skill === "string") {
            return {
                name: skill,
                priority: "medium",
            };
        }
        return {
            name: skill.name,
            priority: skill.priority ?? "medium",
        };
    })
        .map((skill) => ({
        name: skill.name.trim(),
        priority: skill.priority,
    }))
        .filter((skill) => Boolean(skill.name));
    // ==========================================================
    // 7. Create job
    // ==========================================================
    const job = await prisma.job.create({
        data: {
            company: {
                connect: {
                    id: company.id,
                },
            },
            title,
            description,
            location,
            remoteType,
            employmentType,
            experienceLevel,
            salaryMin: data.salaryMin,
            salaryMax: data.salaryMax,
            salaryCurrency: data.salaryCurrency ?? "BDT",
            deadline,
            status,
            publishedAt: status === JobStatus.PUBLISHED
                ? new Date()
                : null,
            requiredSkills: {
                create: skillNames.map((skill) => ({
                    name: skill.name,
                    priority: skill.priority,
                })),
            },
        },
        include: {
            company: true,
            requiredSkills: true,
        },
    });
    // ==========================================================
    // 8. Prepare embedding text
    // ==========================================================
    const skillsText = skillNames
        .map((skill) => skill.name)
        .join(", ");
    const jobText = `
Job Title:
${job.title}

Job Description:
${job.description}

Location:
${job.location}

Remote Type:
${job.remoteType}

Employment Type:
${job.employmentType}

Experience Level:
${job.experienceLevel}

Salary:
${job.salaryMin !== null ||
        job.salaryMax !== null
        ? `${job.salaryMin ?? "N/A"} - ${job.salaryMax ?? "N/A"} ${job.salaryCurrency ?? ""}`
        : "Not specified"}

Deadline:
${job.deadline.toISOString()}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();
    // ==========================================================
    // 9. Generate embedding
    // ==========================================================
    console.log("Job embedding text:");
    console.log(jobText);
    let embeddingResult = null;
    try {
        embeddingResult = await generateJobEmbedding(job.id, jobText);
    }
    catch (error) {
        console.error("Job saved, but embedding generation failed:", error);
    }
    // ==========================================================
    // 10. Return
    // ==========================================================
    return {
        ...job,
        embedding: embeddingResult
            ? {
                dimensions: embeddingResult.dimensions,
            }
            : null,
    };
};
// ============================================================
// 2. GET ALL COMPANY JOBS
// ============================================================
const getAllJobsService = async (userId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw createError("Company profile not found", 404);
    }
    const jobs = await prisma.job.findMany({
        where: {
            companyId: company.id,
        },
        include: {
            requiredSkills: true,
            _count: {
                select: {
                    jobApplications: true,
                    matches: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return jobs;
};
// ============================================================
// 3. GET ALL JOBS
// ============================================================
const allJobsService = async () => {
    const jobs = await prisma.job.findMany({
        include: {
            company: true,
            requiredSkills: true,
            _count: {
                select: {
                    jobApplications: true,
                    matches: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return jobs;
};
// ============================================================
// 4. UPDATE JOB
// ============================================================
const updateJobService = async (userId, jobId, data) => {
    // ==========================================================
    // 1. Check existing job
    // ==========================================================
    const existingJob = await prisma.job.findFirst({
        where: {
            id: jobId,
            company: {
                userId,
            },
        },
        include: {
            requiredSkills: true,
        },
    });
    if (!existingJob) {
        throw createError("Job not found or unauthorized", 404);
    }
    // ==========================================================
    // 2. Validate salary
    // ==========================================================
    if (data.salaryMin !== undefined &&
        data.salaryMax !== undefined &&
        data.salaryMin !== null &&
        data.salaryMax !== null &&
        data.salaryMin > data.salaryMax) {
        throw createError("Minimum salary cannot be greater than maximum salary", 400);
    }
    // ==========================================================
    // 3. Validate deadline
    // ==========================================================
    if (data.deadline) {
        if (data.deadline <= new Date()) {
            throw createError("Deadline must be a future date", 400);
        }
    }
    // ==========================================================
    // 4. Prepare update data
    // ==========================================================
    const updateData = {
        ...(data.title !== undefined && {
            title: data.title.trim(),
        }),
        ...(data.description !== undefined && {
            description: data.description.trim(),
        }),
        ...(data.location !== undefined && {
            location: data.location.trim(),
        }),
        ...(data.remoteType !== undefined && {
            remoteType: data.remoteType,
        }),
        ...(data.employmentType !== undefined &&
            data.employmentType !== "" && {
            employmentType: data.employmentType,
        }),
        ...(data.experienceLevel !== undefined &&
            data.experienceLevel !== null && {
            experienceLevel: data.experienceLevel,
        }),
        ...(data.salaryMin !== undefined && {
            salaryMin: data.salaryMin,
        }),
        ...(data.salaryMax !== undefined && {
            salaryMax: data.salaryMax,
        }),
        ...(data.salaryCurrency !== undefined && {
            salaryCurrency: data.salaryCurrency,
        }),
        ...(data.deadline !== undefined && {
            deadline: data.deadline,
        }),
        ...(data.status !== undefined && {
            status: data.status,
        }),
        ...(data.status === "PUBLISHED" && {
            publishedAt: existingJob.publishedAt ?? new Date(),
        }),
        ...(data.status !== "PUBLISHED" &&
            data.status !== undefined && {
            publishedAt: null,
        }),
    };
    // ==========================================================
    // 5. Transaction
    // ==========================================================
    const updatedJob = await prisma.$transaction(async (tx) => {
        // ------------------------------------------------------
        // Replace required skills if provided
        // ------------------------------------------------------
        if (data.requiredSkills !== undefined) {
            await tx.jobSkill.deleteMany({
                where: {
                    jobId,
                },
            });
            const skills = data.requiredSkills
                .map((skill) => {
                if (typeof skill === "string") {
                    return {
                        name: skill,
                        priority: "medium",
                    };
                }
                return {
                    name: skill.name,
                    priority: skill.priority ?? "medium",
                };
            })
                .map((skill) => ({
                name: skill.name.trim(),
                priority: skill.priority,
            }))
                .filter((skill) => Boolean(skill.name));
            if (skills.length > 0) {
                await tx.jobSkill.createMany({
                    data: skills.map((skill) => ({
                        jobId,
                        name: skill.name,
                        priority: skill.priority,
                    })),
                });
            }
        }
        // ------------------------------------------------------
        // Update job
        // ------------------------------------------------------
        const job = await tx.job.update({
            where: {
                id: jobId,
            },
            data: updateData,
            include: {
                company: true,
                matches: true,
                requiredSkills: true,
                _count: {
                    select: {
                        jobApplications: true,
                        matches: true,
                    },
                },
            },
        });
        return job;
    });
    // ==========================================================
    // 6. Prepare embedding skills
    // ==========================================================
    const skillsText = updatedJob.requiredSkills
        .map((skill) => skill.name)
        .join(", ");
    // ==========================================================
    // 7. Prepare embedding text
    // ==========================================================
    const jobText = `
Job Title:
${updatedJob.title}

Job Description:
${updatedJob.description}

Location:
${updatedJob.location}

Remote Type:
${updatedJob.remoteType}

Employment Type:
${updatedJob.employmentType}

Experience Level:
${updatedJob.experienceLevel}

Salary:
${updatedJob.salaryMin !== null ||
        updatedJob.salaryMax !== null
        ? `${updatedJob.salaryMin ?? "N/A"} - ${updatedJob.salaryMax ?? "N/A"} ${updatedJob.salaryCurrency ?? ""}`
        : "Not specified"}

Deadline:
${updatedJob.deadline.toISOString()}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();
    console.log("Updated Job embedding text:");
    console.log(jobText);
    // ==========================================================
    // 8. Regenerate embedding
    // ==========================================================
    let embeddingResult = null;
    try {
        embeddingResult =
            await generateJobEmbedding(updatedJob.id, jobText);
    }
    catch (error) {
        console.error("Job updated, but embedding generation failed:", error);
    }
    // ==========================================================
    // 9. Return
    // ==========================================================
    return {
        ...updatedJob,
        embedding: embeddingResult
            ? {
                dimensions: embeddingResult.dimensions,
            }
            : null,
    };
};
// ============================================================
// 5. DELETE JOB
// ============================================================
const deleteJobService = async (userId, jobId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw createError("Company profile not found", 404);
    }
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            companyId: company.id,
        },
    });
    if (!job) {
        throw createError("Job not found or you do not own this job", 404);
    }
    await prisma.job.delete({
        where: {
            id: jobId,
        },
    });
    return null;
};
// ============================================================
// 6. GET JOB BY ID
// ============================================================
const getJobById = async (jobId) => {
    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
        include: {
            company: true,
            requiredSkills: true,
            _count: {
                select: {
                    jobApplications: true,
                    matches: true,
                },
            },
        },
    });
    if (!job) {
        throw createError("Job not found", 404);
    }
    return job;
};
// ============================================================
// 7. PUBLISH JOB
// ============================================================
const publishJob = async (userId, jobId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw createError("Company profile not found", 404);
    }
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            companyId: company.id,
        },
    });
    if (!job) {
        throw createError("Job not found", 404);
    }
    if (job.status === JobStatus.PUBLISHED) {
        throw createError("Job is already published", 400);
    }
    if (job.deadline <= new Date()) {
        throw createError("Cannot publish a job with an expired deadline", 400);
    }
    return prisma.job.update({
        where: {
            id: jobId,
        },
        data: {
            status: JobStatus.PUBLISHED,
            publishedAt: new Date(),
            closedAt: null,
        },
        include: {
            company: true,
            requiredSkills: true,
        },
    });
};
// ============================================================
// 8. CLOSE JOB
// ============================================================
const closeJob = async (userId, jobId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw createError("Company profile not found", 404);
    }
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            companyId: company.id,
        },
    });
    if (!job) {
        throw createError("Job not found", 404);
    }
    if (job.status === JobStatus.CLOSED) {
        throw createError("Job is already closed", 400);
    }
    return prisma.job.update({
        where: {
            id: jobId,
        },
        data: {
            status: JobStatus.CLOSED,
            closedAt: new Date(),
        },
        include: {
            company: true,
            requiredSkills: true,
        },
    });
};
// ============================================================
// 9. DUPLICATE JOB
// ============================================================
const duplicateJob = async (userId, jobId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw createError("Company profile not found", 404);
    }
    const job = await prisma.job.findFirst({
        where: {
            id: jobId,
            companyId: company.id,
        },
        include: {
            requiredSkills: true,
        },
    });
    if (!job) {
        throw createError("Job not found", 404);
    }
    // Prisma schema requires deadline.
    // Therefore, duplicated draft gets a future deadline.
    const duplicateDeadline = new Date();
    duplicateDeadline.setDate(duplicateDeadline.getDate() + 30);
    const duplicatedJob = await prisma.job.create({
        data: {
            companyId: company.id,
            title: `${job.title} - Copy`,
            description: job.description,
            location: job.location,
            remoteType: job.remoteType,
            employmentType: job.employmentType,
            experienceLevel: job.experienceLevel,
            salaryMin: job.salaryMin,
            salaryMax: job.salaryMax,
            salaryCurrency: job.salaryCurrency,
            deadline: duplicateDeadline,
            status: JobStatus.DRAFT,
            publishedAt: null,
            closedAt: null,
            requiredSkills: {
                create: job.requiredSkills.map((skill) => ({
                    name: skill.name,
                    priority: skill.priority,
                })),
            },
        },
        include: {
            requiredSkills: true,
            company: true,
        },
    });
    return duplicatedJob;
};
// ============================================================
// 10. SEARCH JOBS
// ============================================================
const searchJobs = async (query) => {
    // ==========================================================
    // 1. Validate query
    // ==========================================================
    const params = searchJobSchema.parse(query);
    const { keyword, location, skills, salaryMin, salaryMax, experience, remote, employmentType, companyId, page, limit, sortBy, sortOrder, } = params;
    // ==========================================================
    // 2. Pagination
    // ==========================================================
    const currentPage = Math.max(page ?? 1, 1);
    const currentLimit = Math.min(Math.max(limit ?? 10, 1), 100);
    const skip = (currentPage - 1) *
        currentLimit;
    // ==========================================================
    // 3. Base where
    // ==========================================================
    const where = {
        status: JobStatus.PUBLISHED,
    };
    // ==========================================================
    // 4. Keyword search
    // ==========================================================
    if (keyword?.trim()) {
        const search = keyword.trim();
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                company: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },
            {
                requiredSkills: {
                    some: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            },
        ];
    }
    // ==========================================================
    // 5. Location filter
    // ==========================================================
    if (location?.trim()) {
        where.location = {
            contains: location.trim(),
            mode: "insensitive",
        };
    }
    // ==========================================================
    // 6. Remote filter
    // ==========================================================
    if (remote) {
        where.remoteType =
            remote;
    }
    // ==========================================================
    // 7. Experience filter
    // ==========================================================
    if (experience) {
        where.experienceLevel =
            experience;
    }
    // ==========================================================
    // 8. Employment type filter
    // ==========================================================
    if (employmentType) {
        where.employmentType =
            employmentType;
    }
    // ==========================================================
    // 9. Company filter
    // ==========================================================
    if (companyId) {
        where.companyId = companyId;
    }
    // ==========================================================
    // 10. Skills filter
    // ==========================================================
    if (skills?.trim()) {
        const skillList = skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
        if (skillList.length > 0) {
            const skillConditions = skillList.map((skill) => ({
                requiredSkills: {
                    some: {
                        name: {
                            contains: skill,
                            mode: "insensitive",
                        },
                    },
                },
            }));
            where.AND = [
                ...(Array.isArray(where.AND)
                    ? where.AND
                    : []),
                ...skillConditions,
            ];
        }
    }
    // ==========================================================
    // 11. Salary filter
    // ==========================================================
    if (salaryMin !== undefined) {
        where.salaryMax = {
            gte: salaryMin,
        };
    }
    if (salaryMax !== undefined) {
        where.salaryMin = {
            lte: salaryMax,
        };
    }
    // ==========================================================
    // 12. Safe sorting
    // ==========================================================
    const allowedSortFields = [
        "createdAt",
        "publishedAt",
        "salaryMin",
        "salaryMax",
        "title",
    ];
    const safeSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";
    const safeSortOrder = sortOrder === "asc"
        ? "asc"
        : "desc";
    // ==========================================================
    // 13. Database queries
    // ==========================================================
    const [jobs, total] = await Promise.all([
        prisma.job.findMany({
            where,
            skip,
            take: currentLimit,
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        website: true,
                    },
                },
                requiredSkills: true,
                _count: {
                    select: {
                        jobApplications: true,
                        matches: true,
                    },
                },
            },
            orderBy: {
                [safeSortBy]: safeSortOrder,
            },
        }),
        prisma.job.count({
            where,
        }),
    ]);
    // ==========================================================
    // 14. Pagination
    // ==========================================================
    const totalPages = Math.ceil(total / currentLimit);
    // ==========================================================
    // 15. Return
    // ==========================================================
    return {
        jobs,
        pagination: {
            page: currentPage,
            limit: currentLimit,
            total,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        },
    };
};
// ============================================================
// EXPORT
// ============================================================
export const jobServices = {
    createJobService,
    updateJobService,
    deleteJobService,
    getAllJobsService,
    getJobById,
    publishJob,
    closeJob,
    duplicateJob,
    searchJobs,
    allJobsService,
};
//# sourceMappingURL=job.services.js.map