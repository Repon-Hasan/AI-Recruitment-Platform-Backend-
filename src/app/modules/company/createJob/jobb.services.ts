import { prisma } from "../../../lib/prisma";
import { generateJobEmbedding } from "./generateJobEmbedding";

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
  title: string;
  description: string;
  location?: string;
  employmentType?: string;
  requiredSkills?: RequiredSkillInput[];
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

  // 2. Create Job + JobSkills together
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

      requiredSkills: {
        create: (data.requiredSkills ?? []).map((skill) => ({
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

  // 3. Prepare skills for embedding
  const skillsText = job.requiredSkills
    .map(
      (skill) =>
        `${skill.name} (${skill.priority} priority)`
    )
    .join(", ");

  // 4. Create complete text for embedding
  const jobText = `
Job Title:
${job.title}

Job Description:
${job.description}

Location:
${job.location ?? "Not specified"}

Employment Type:
${job.employmentType ?? "Not specified"}

Required Skills:
${skillsText || "No specific skills mentioned"}
`.trim();

  console.log("Job embedding text:");
  console.log(jobText);

  // 5. Generate and store embedding
  const embeddingResult = await generateJobEmbedding(
    job.id,
    jobText
  );

  // 6. Return job + embedding information
  return {
    ...job,
    embedding: {
      dimensions: embeddingResult.dimensions,
    },
  };
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