import {
  EmploymentType,
  ExperienceLevel,
  JobStatus,
  RemoteType,
} from "../../../../generated/prisma/enums";
import type { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";
import { generateJobEmbedding } from "./generateJobEmbedding";
import { searchJobSchema } from "./job.validation";

interface SkillInput {
  name: string;
  priority?: string;
}

interface JobInput {
  title?: string;
  description?: string;
  location?: string;
  employmentType?: string;
  requiredSkills?: SkillInput[];
}
interface RequiredSkillInput {
  name: string;
  priority: string;
}

interface CreateJobInput {
  status: string;
  salaryCurrency: string | null | undefined;
  experienceLevel: ExperienceLevel | null | undefined;
  remoteType: RemoteType | undefined;
  deadline: Date;
  salaryMin: undefined;
  salaryMax: undefined;
  title: string;
  description: string;
  location?: string;
  employmentType?: string;
  requiredSkills?: RequiredSkillInput[];
  preferredSkills?: string[];
}


const createJobService = async (
  userId: string,
  data: CreateJobInput
) => {
  // 1. Find company belonging to logged-in user
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    const error: any = new Error("Company profile not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Validate salary
  if (
    data.salaryMin !== undefined &&
    data.salaryMax !== undefined &&
    data.salaryMin > data.salaryMax
  ) {
    const error: any = new Error(
      "Minimum salary cannot be greater than maximum salary"
    );

    error.statusCode = 400;

    throw error;
  }

  // 3. Validate deadline
  if (data.deadline && data.deadline <= new Date()) {
    const error: any = new Error(
      "Deadline must be a future date"
    );

    error.statusCode = 400;

    throw error;
  }

  // 4. Create Job + Required Skills
  const job = await prisma.job.create({
    data: {
      // Company
      company: {
        connect: {
          id: company.id,
        },
      },

      // Basic job information
      title: data.title,

      description: data.description,

      location: data.location,

      // Job type information
      remoteType: data.remoteType,

      employmentType: data.employmentType as EmploymentType | undefined,

      experienceLevel: data.experienceLevel,

      // Salary information
      salaryMin: data.salaryMin,

      salaryMax: data.salaryMax,

      salaryCurrency: data.salaryCurrency,

      // Job deadline
      deadline: data.deadline,

      // Job status
      status: data.status as JobStatus,

      // Automatically set published date
      publishedAt:
        data.status === "PUBLISHED"
          ? new Date()
          : null,

      // Required skills
      requiredSkills: {
        create: (data.requiredSkills ?? []).map(
          (skill) => ({
            name: skill.name.trim(),
          })
        ),
      },
    },

    include: {
      company: true,

      requiredSkills: true,
    },
  });

  // 5. Prepare required skills for embedding
  const skillsText = (data.requiredSkills ?? [])
    .map((skill) => skill.name)
    .join(", ");

  // 6. Create complete text for job embedding
  const jobText = `
Job Title:
${job.title}

Job Description:
${job.description}

Location:
${job.location ?? "Not specified"}

Remote Type:
${job.remoteType ?? "Not specified"}

Employment Type:
${job.employmentType ?? "Not specified"}

Experience Level:
${job.experienceLevel ?? "Not specified"}

Salary:
${
  job.salaryMin !== null || job.salaryMax !== null
    ? `${job.salaryMin ?? "N/A"} - ${
        job.salaryMax ?? "N/A"
      } ${job.salaryCurrency ?? ""}`
    : "Not specified"
}

Deadline:
${job.deadline?.toISOString() ?? "Not specified"}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();

  console.log("Job embedding text:");
  console.log(jobText);

  // 7. Generate and store job embedding
  const embeddingResult = await generateJobEmbedding(
    job.id,
    jobText
  );

  // 8. Return job + embedding information
  return {
    ...job,

    embedding: {
      dimensions: embeddingResult.dimensions,
    },
  };
};

// 1. Get All Jobs
 const getAllJobsService = async (
  userId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new Error("Company profile not found");
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

// 2. Update Job
const updateJobService = async (
  userId: string,
  jobId: string,
  data: CreateJobInput
) => {
  // 1. Check if job exists and belongs to
  //    the logged-in user's company
  const existingJob = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        userId,
      },
    },
  });

  if (!existingJob) {
    const error: any = new Error(
      "Job not found or unauthorized"
    );

    error.statusCode = 404;

    throw error;
  }

  // 2. Validate salary
  if (
    data.salaryMin !== undefined &&
    data.salaryMax !== undefined &&
    data.salaryMin > data.salaryMax
  ) {
    const error: any = new Error(
      "Minimum salary cannot be greater than maximum salary"
    );

    error.statusCode = 400;

    throw error;
  }

  // 3. Validate deadline
  if (data.deadline && data.deadline <= new Date()) {
    const error: any = new Error(
      "Deadline must be a future date"
    );

    error.statusCode = 400;

    throw error;
  }

  // 4. Update Job + Required Skills
  const updatedJob = await prisma.$transaction(
    async (tx) => {
      // If requiredSkills is provided,
      // replace the old skills
      if (data.requiredSkills !== undefined) {
        await tx.jobSkill.deleteMany({
          where: {
            jobId,
          },
        });
      }

      // Update job
      const job = await tx.job.update({
        where: {
          id: jobId,
        },

        data: {
          // Basic information
          title: data.title,

          description: data.description,

          location: data.location,

          // Job type
          remoteType: data.remoteType,

          employmentType:
            data.employmentType as EmploymentType | undefined,

          experienceLevel: data.experienceLevel,

          // Salary
          salaryMin: data.salaryMin,

          salaryMax: data.salaryMax,

          salaryCurrency: data.salaryCurrency,

          // Deadline
          deadline: data.deadline,

          // Status
          status: data.status as JobStatus,

          // Published date
          publishedAt:
            data.status === "PUBLISHED"
              ? existingJob.publishedAt ?? new Date()
              : null,

          // Required skills
          requiredSkills:
            data.requiredSkills !== undefined
              ? {
                  create: data.requiredSkills
                    .filter(
                      (skill) => skill.name.trim().length > 0
                    )
                    .map((skill) => ({
                      name: skill.name.trim(),
                    })),
                }
              : undefined,
        },

        include: {
          company: true,
          matches: true,
          requiredSkills: true,
        },
      });

      return job;
    }
  );

  // 5. Prepare skills for embedding
  const skillsText = updatedJob.requiredSkills
    .map((skill) => skill.name)
    .join(", ");

  // 6. Create complete job text
  const jobText = `
Job Title:
${updatedJob.title}

Job Description:
${updatedJob.description}

Location:
${updatedJob.location ?? "Not specified"}

Remote Type:
${updatedJob.remoteType ?? "Not specified"}

Employment Type:
${updatedJob.employmentType ?? "Not specified"}

Experience Level:
${updatedJob.experienceLevel ?? "Not specified"}

Salary:
${
  updatedJob.salaryMin !== null ||
  updatedJob.salaryMax !== null
    ? `${updatedJob.salaryMin ?? "N/A"} - ${
        updatedJob.salaryMax ?? "N/A"
      } ${updatedJob.salaryCurrency ?? ""}`
    : "Not specified"
}

Deadline:
${
  updatedJob.deadline?.toISOString() ??
  "Not specified"
}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();

  console.log("Updated Job embedding text:");
  console.log(jobText);

  // 7. Regenerate job embedding
  const embeddingResult = await generateJobEmbedding(
    updatedJob.id,
    jobText
  );

  // 8. Return updated job
  return {
    ...updatedJob,

    embedding: {
      dimensions: embeddingResult.dimensions,
    },
  };
};

// 3. Delete Job
 const deleteJobService = async (
  userId: string,
  jobId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new Error("Company profile not found");
  }

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id,
    },
  });

  if (!job) {
    throw new Error(
      "Job not found or you do not own this job"
    );
  }

  await prisma.job.delete({
    where: {
      id: jobId,
    },
  });

  return null;
};

 const getJobById = async (
  jobId: string
) => {
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
    throw new Error("Job not found");
  }

  return job;
};


 const publishJob = async (
  userId: string,
  jobId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new Error("Company profile not found");
  }

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.status === "PUBLISHED") {
    throw new Error("Job is already published");
  }

  if (
    job.deadline &&
    job.deadline <= new Date()
  ) {
    throw new Error(
      "Cannot publish a job with an expired deadline"
    );
  }

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
      closedAt: null,
    },
  });
};

const closeJob = async (
  userId: string,
  jobId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new Error("Company profile not found");
  }

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.status === "CLOSED") {
    throw new Error("Job is already closed");
  }

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      status: "CLOSED",
      closedAt: new Date(),
    },
  });
};

const duplicateJob = async (
  userId: string,
  jobId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new Error("Company profile not found");
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
    throw new Error("Job not found");
  }

  const duplicatedJob =
    await prisma.job.create({
      data: {
        companyId: company.id,

        title: `${job.title} - Copy`,

        description: job.description,

        location: job.location,

        remoteType: job.remoteType,

        employmentType:
          job.employmentType,

        experienceLevel:
          job.experienceLevel,

        salaryMin: job.salaryMin,

        salaryMax: job.salaryMax,

        salaryCurrency:
          job.salaryCurrency,

        deadline: null,

        status: "DRAFT",

        publishedAt: null,

        closedAt: null,

        requiredSkills: {
          create:
            job.requiredSkills.map(
              (skill: { name: string }) => ({
                name: skill.name,
              })
            ),
        },

      
      },

      include: {
        requiredSkills: true,
      },
    });

  return duplicatedJob;
};


const searchJobs = async (query: unknown) => {
  // =====================================================
  // 1. VALIDATE QUERY
  // =====================================================

  const params = searchJobSchema.parse(query);

  const {
    keyword,
    location,
    skills,
    salaryMin,
    salaryMax,
    experience,
    remote,
    employmentType,
    companyId,
    page,
    limit,
    sortBy,
    sortOrder,
  } = params;

  // =====================================================
  // 2. PAGINATION
  // =====================================================

  const currentPage = Math.max(page ?? 1, 1);

  const currentLimit = Math.min(
    Math.max(limit ?? 10, 1),
    100
  );

  const skip =
    (currentPage - 1) * currentLimit;

  // =====================================================
  // 3. BASE WHERE
  // =====================================================

  const where: Prisma.JobWhereInput = {
    status: "PUBLISHED",
  };

  // =====================================================
  // 4. KEYWORD SEARCH
  //
  // ?keyword=react
  //
  // Searches:
  // - title
  // - description
  // - company name
  // - required skill name
  // =====================================================

  if (keyword?.trim()) {
    const search = keyword.trim();

    where.OR = [
      // Job title
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      // Job description
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },

      // Company name
      {
        company: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },

      // Required skills
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

  // =====================================================
  // 5. LOCATION FILTER
  //
  // ?location=Dhaka
  // =====================================================

  if (location?.trim()) {
    where.location = {
      contains: location.trim(),
      mode: "insensitive",
    };
  }

  // =====================================================
  // 6. REMOTE TYPE FILTER
  //
  // ?remote=REMOTE
  // ?remote=HYBRID
  // ?remote=ONSITE
  // =====================================================

  if (remote) {
    where.remoteType = remote;
  }

  // =====================================================
  // 7. EXPERIENCE FILTER
  //
  // ?experience=ENTRY
  // =====================================================

  if (experience) {
    where.experienceLevel = experience;
  }

  // =====================================================
  // 8. EMPLOYMENT TYPE FILTER
  //
  // ?employmentType=FULL_TIME
  // =====================================================

  if (employmentType) {
    where.employmentType = employmentType;
  }

  // =====================================================
  // 9. COMPANY FILTER
  //
  // ?companyId=xxxxxxxx
  // =====================================================

  if (companyId) {
    where.companyId = companyId;
  }

  // =====================================================
  // 10. SKILLS FILTER
  //
  // Example:
  //
  // ?skills=React
  //
  // or:
  //
  // ?skills=React,Node.js
  //
  // Each requested skill must exist in requiredSkills.
  // =====================================================

  if (skills?.trim()) {
    const skillList = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skillList.length > 0) {
      const skillConditions: Prisma.JobWhereInput[] =
        skillList.map((skill) => ({
          requiredSkills: {
            some: {
              name: {
                contains: skill,
                mode: "insensitive",
              },
            },
          },
        }));

      // Preserve any existing conditions.
      where.AND = [
        ...(Array.isArray(where.AND)
          ? where.AND
          : []),

        ...skillConditions,
      ];
    }
  }

  // =====================================================
  // 11. SALARY FILTER
  //
  // salaryMin=30000
  //
  // Job salaryMax must be >= 30000
  //
  // salaryMax=60000
  //
  // Job salaryMin must be <= 60000
  //
  // This finds overlapping salary ranges.
  // =====================================================

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

  // =====================================================
  // 12. SAFE SORTING
  // =====================================================

  const allowedSortFields = [
    "createdAt",
    "publishedAt",
    "salaryMin",
    "salaryMax",
    "title",
  ] as const;

  const safeSortBy =
    allowedSortFields.includes(
      sortBy as (typeof allowedSortFields)[number]
    )
      ? sortBy
      : "createdAt";

  const safeSortOrder =
    sortOrder === "asc"
      ? "asc"
      : "desc";

  // =====================================================
  // 13. DATABASE QUERY
  //
  // IMPORTANT:
  //
  // DO NOT USE:
  //
  // prisma.$transaction([...])
  //
  // because your P2028 error is coming from
  // transaction startup.
  //
  // These are independent READ queries,
  // so Promise.all() is appropriate.
  // =====================================================

  const [jobs, total] = await Promise.all([
    // ---------------------------------------------------
    // FIND JOBS
    // ---------------------------------------------------

    prisma.job.findMany({
      where,

      skip,

      take: currentLimit,

      include: {
        // Company information
        company: {
          select: {
            id: true,
            name: true,
            website: true,
          },
        },

        // IMPORTANT:
        // Your schema has requiredSkills.
        // There is NO preferredSkills.
        requiredSkills: true,

        // Counts
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

    // ---------------------------------------------------
    // COUNT TOTAL MATCHING JOBS
    // ---------------------------------------------------

    prisma.job.count({
      where,
    }),
  ]);

  // =====================================================
  // 14. PAGINATION INFORMATION
  // =====================================================

  const totalPages =
    Math.ceil(
      total / currentLimit
    );

  // =====================================================
  // 15. RETURN
  // =====================================================

  return {
    jobs,

    pagination: {
      page: currentPage,

      limit: currentLimit,

      total,

      totalPages,

      hasNextPage:
        currentPage < totalPages,

      hasPreviousPage:
        currentPage > 1,
    },
  };
};



export const jobServices={
    createJobService,updateJobService,deleteJobService,getAllJobsService,getJobById,publishJob,
    closeJob,duplicateJob,searchJobs
}