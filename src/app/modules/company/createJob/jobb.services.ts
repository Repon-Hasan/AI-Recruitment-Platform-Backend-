import { prisma } from "../../../lib/prisma";

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

 const createJobService = async (
  userId: string,
  data: {
    title: string;
    description: string;
    location?: string;
    employmentType?: string;
    requiredSkills?: string[];
  }
) => {
  // Find company belonging to logged-in user
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

  // Create job and connect it to company
  const job = await prisma.job.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      employmentType: data.employmentType,

      company: {
        connect: {
          id: company.id,
        },
      },
    },
    include: {
      company: true,
    },
  });

  return job;
};

// 1. Get All Jobs
const getAllJobsService = async () => {
  return await prisma.job.findMany({
    include: {
      company: true,
      requiredSkills: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 2. Update Job
const updateJobService = async (userId: string, jobId: string, data: JobInput) => {
  // Check if job exists and belongs to the logged-in user's company
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: { userId },
    },
  });

  if (!job) {
    const error: any = new Error("Job not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }

  // Handle skill updates using a transaction
  return await prisma.$transaction(async (tx) => {
    if (data.requiredSkills) {
      // Remove old skills first if replacing skills
      await tx.jobSkill.deleteMany({
        where: { jobId },
      });
    }

    return await tx.job.update({
      where: { id: jobId },
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        employmentType: data.employmentType,
        requiredSkills: data.requiredSkills?.length
          ? {
              create: data.requiredSkills.map((skill) => ({
                name: skill.name,
                priority: skill.priority || "medium",
              })),
            }
          : undefined,
      },
      include: {
        company: true,
        requiredSkills: true,
      },
    });
  });
};

// 3. Delete Job
const deleteJobService = async (userId: string, jobId: string) => {
  // Check ownership
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      company: { userId },
    },
  });

  if (!job) {
    const error: any = new Error("Job not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }

  await prisma.job.delete({
    where: { id: jobId },
  });

  return { message: "Job deleted successfully" };
};
export const jobServices={
    createJobService,updateJobService,deleteJobService,getAllJobsService
}