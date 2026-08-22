import AppError from "../../../errorHelpers/AppError";
import { prisma } from "../../../lib/prisma";


export const applyToJob = async (
  userId: string,
  jobId: string
) => {
  // 1. Check job exists
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new AppError(404, "Job not found");
  }

  // 2. Find candidate profile of logged-in user
  const candidateProfile =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidateProfile) {
    throw new AppError(
      404,
      "Candidate profile not found. Please complete your profile first."
    );
  }

  // 3. Check already applied
  const existingApplication =
    await prisma.jobApplication.findUnique({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId: candidateProfile.id,
          jobId,
        },
      },
    });

  if (existingApplication) {
    throw new AppError(
      409,
      "You have already applied to this job"
    );
  }

  // 4. Create application
  const application = await prisma.jobApplication.create({
    data: {
      candidateProfileId: candidateProfile.id,
      jobId,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
      candidateProfile: true,
    },
  });

  return application;
};

export const getMyApplications = async (
  candidateProfileId: string
) => {
  const applications =
    await prisma.jobApplication.findMany({
      where: {
        candidateProfileId,
      },

      include: {
        job: {
          include: {
            company: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return applications;
};

export const getMyApplicationById = async (
  candidateProfileId: string,
  applicationId: string
) => {
  const application =
    await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        candidateProfileId,
      },

      include: {
        job: {
          include: {
            company: true,
            requiredSkills: true,
          },
        },
      },
    });

  if (!application) {
    throw new AppError(
      404,
      "Application not found"
    );
  }

  return application;
};

export const deleteMyApplication = async (
  candidateProfileId: string,
  applicationId: string
) => {
  const application =
    await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        candidateProfileId,
      },
    });

  if (!application) {
    throw new AppError(
      404,
      "Application not found"
    );
  }

  const now = Date.now();
  const createdAt = application.createdAt.getTime();

  const eightHours = 8 * 60 * 60 * 1000;

  if (now - createdAt > eightHours) {
    throw new AppError(
      403,
      "You can delete your application only within 8 hours"
    );
  }

  await prisma.jobApplication.delete({
    where: {
      id: applicationId,
    },
  });

  return null;
};