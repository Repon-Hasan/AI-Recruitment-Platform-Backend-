import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { deleteFileFromCloudinary } from "../../config/cloudnary.config";
import { generateCandidateEmbedding } from "./candidate.embedding.service";

// ===============================
// GET MY PROFILE
// ===============================
const getMyProfile = async (userId: string) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
    include: {
      skills: true,
      education: true,
      projects: true,
      certifications: true,
    },
  });

  if (!profile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  return profile;
};

// ===============================
// UPDATE MY PROFILE
// ===============================
const updateMyProfile = async (
  userId: string,
  payload: {
    name?: string;
    bio?:string;
    phone?: string;
    location?: string;
    experience?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  }
) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId },
  });

  console.log("Profile",profile)

  if (!profile) {
    throw new AppError(status.NOT_FOUND, "Candidate profile not found");
  }

  // Extract 'name' so it isn't passed directly into CandidateProfile update
  const { name, ...profileData } = payload;

  // 1. Update candidate profile (and optionally user name via relation)
  const updatedProfile = await prisma.candidateProfile.update({
    where: { userId },
    data: {
      ...profileData,
      ...(name ? { user: { update: { name } } } : {}),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      skills: true,
      education: true,
      projects: true,
      certifications: true,
    },
  });

  // 2. Generate embedding from NEW data
  await generateCandidateEmbedding(updatedProfile.id);

  // 3. Return updated profile
  return updatedProfile;
};

// ===============================
// ADD SKILL
// ===============================
const addSkill = async (
  userId: string,
  skills: string | { name: string }[]
) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  // ===============================
  // Single skill
  // ===============================
  if (typeof skills === "string") {
    const skill = await prisma.candidateSkill.create({
      data: {
        candidateId: profile.id,
        name: skills,
      },
    });

    // Generate embedding AFTER skill is created
    await generateCandidateEmbedding(profile.id);

    return skill;
  }

  // ===============================
  // Multiple skills
  // ===============================
  const result = await prisma.candidateSkill.createMany({
    data: skills.map((skill) => ({
      candidateId: profile.id,
      name: skill.name,
    })),
  });

  // Generate embedding AFTER skills are created
  await generateCandidateEmbedding(profile.id);

  return result;
};

// ===============================
// DELETE SKILL
// ===============================
const deleteSkill = async (
  userId: string,
  skillId: string
) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  const skill = await prisma.candidateSkill.findFirst({
    where: {
      id: skillId,
      candidateId: profile.id,
    },
  });

  if (!skill) {
    throw new AppError(
      status.NOT_FOUND,
      "Skill not found"
    );
  }

  // 1. Delete skill
  await prisma.candidateSkill.delete({
    where: {
      id: skillId,
    },
  });

  // 2. Generate embedding AFTER deletion
  await generateCandidateEmbedding(profile.id);

  return null;
};

// ===============================
// ADD EDUCATION
// ===============================
const addEducation = async (
  userId: string,
  payload: {
    institution: string;
    degree?: string;
    field?: string;
    startYear?: number;
    endYear?: number;
  }
) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  // 1. Create education
  const education =
    await prisma.candidateEducation.create({
      data: {
        ...payload,
        candidateId: profile.id,
      },
    });

  // 2. Generate embedding AFTER creation
  await generateCandidateEmbedding(profile.id);

  return education;
};

// ===============================
// UPDATE EDUCATION
// ===============================
const updateEducation = async (
  userId: string,
  educationId: string,
  payload: {
    institution?: string;
    degree?: string;
    field?: string;
    startYear?: number;
    endYear?: number;
  }
) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  const education =
    await prisma.candidateEducation.findFirst({
      where: {
        id: educationId,
        candidateId: profile.id,
      },
    });

  if (!education) {
    throw new AppError(
      status.NOT_FOUND,
      "Education not found"
    );
  }

  // 1. Update education
  const updatedEducation =
    await prisma.candidateEducation.update({
      where: {
        id: educationId,
      },
      data: payload,
    });

  // 2. Generate embedding AFTER update
  await generateCandidateEmbedding(profile.id);

  return updatedEducation;
};

// ===============================
// DELETE EDUCATION
// ===============================
const deleteEducation = async (
  userId: string,
  educationId: string
) => {
  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  const education =
    await prisma.candidateEducation.findFirst({
      where: {
        id: educationId,
        candidateId: profile.id,
      },
    });

  if (!education) {
    throw new AppError(
      status.NOT_FOUND,
      "Education not found"
    );
  }

  // 1. Delete education
  await prisma.candidateEducation.delete({
    where: {
      id: educationId,
    },
  });

  // 2. Generate embedding AFTER deletion
  await generateCandidateEmbedding(profile.id);

  return null;
};

// ===============================
// CREATE PROJECT
// ===============================
const createProject = async (
  userId: string,
  payload: CreateProjectPayload
) => {
  const candidateProfile =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidateProfile) {
    throw new AppError(
      status.NOT_FOUND,
      "Candidate profile not found"
    );
  }

  // 1. Create project
  const project = await prisma.candidateProject.create({
    data: {
      name: payload.name,
      description: payload.description ?? null,
      technologies: payload.technologies ?? null,
      projectUrl: payload.projectUrl ?? null,
      image: payload.image ?? null,
      candidateId: candidateProfile.id,
    },
  });

  // 2. Generate embedding AFTER creation
  await generateCandidateEmbedding(candidateProfile.id);

  return project;
};

// ===============================
// GET MY PROJECTS
// ===============================
const getMyProjects = async (candidateId: string) => {
  return await prisma.candidateProject.findMany({
    where: {
      candidateId,
    },
    orderBy: {
      id: "desc",
    },
  });
};

// ===============================
// GET PROJECT BY ID
// ===============================
const getProjectById = async (
  candidateId: string,
  projectId: string
) => {
  return await prisma.candidateProject.findFirst({
    where: {
      id: projectId,
      candidateId,
    },
  });
};

// ===============================
// UPDATE PROJECT
// ===============================
const updateProject = async (
  candidateId: string,
  projectId: string,
  payload: UpdateProjectPayload
) => {
  const existingProject =
    await prisma.candidateProject.findFirst({
      where: {
        id: projectId,
        candidateId,
      },
    });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  // 1. Update project
  const updatedProject =
    await prisma.candidateProject.update({
      where: {
        id: projectId,
      },
      data: {
        ...payload,
      },
    });

  // 2. Generate embedding AFTER update
  await generateCandidateEmbedding(candidateId);

  return updatedProject;
};

// ===============================
// DELETE PROJECT
// ===============================
const deleteProject = async (
  candidateId: string,
  projectId: string
) => {
  const existingProject =
    await prisma.candidateProject.findFirst({
      where: {
        id: projectId,
        candidateId,
      },
    });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  // 1. Delete project
  const deletedProject =
    await prisma.candidateProject.delete({
      where: {
        id: projectId,
      },
    });

  // 2. Generate embedding AFTER deletion
  await generateCandidateEmbedding(candidateId);

  return deletedProject;
};

// ===============================
// CREATE CERTIFICATION
// ===============================
const createCertification = async (
  userId: string,
  payload: CreateCertificationPayload
) => {

  console.log("Certificate",payload)
  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  // 1. Create certification
const certification = await prisma.candidateCertification.create({
  data: {
    name: payload.name ?? null,
    issuer: payload.issuer ?? null,

    issueDate: payload.issueDate
      ? new Date(payload.issueDate)
      : null,

    credentialUrl: payload.credentialUrl ?? null,

    image: payload.image ?? null,

    candidateId: candidate.id,
  },
});

  // 2. Generate embedding AFTER creation
  await generateCandidateEmbedding(candidate.id);

  return certification;
};

// ===============================
// GET MY CERTIFICATIONS
// ===============================
const getMyCertifications = async (
  candidateId: string
) => {
  return await prisma.candidateCertification.findMany({
    where: {
      candidateId,
    },
    orderBy: {
      issueDate: "desc",
    },
  });
};

// ===============================
// GET CERTIFICATION BY ID
// ===============================
const getCertificationById = async (
  candidateId: string,
  certificationId: string
) => {
  return await prisma.candidateCertification.findFirst({
    where: {
      id: certificationId,
      candidateId,
    },
  });
};

// ===============================
// UPDATE CERTIFICATION
// ===============================
const updateCertification = async (
  candidateId: string,
  certificationId: string,
  payload: UpdateCertificationPayload
) => {
  const existingCertification =
    await prisma.candidateCertification.findFirst({
      where: {
        id: certificationId,
        candidateId,
      },
    });

  if (!existingCertification) {
    throw new Error("Certification not found");
  }

  // 1. Update certification
  const updatedCertification =
    await prisma.candidateCertification.update({
      where: {
        id: certificationId,
      },
data: {
  ...(payload.name !== undefined && {
    name: payload.name,
  }),

  ...(payload.issuer !== undefined && {
    issuer: payload.issuer,
  }),

  ...(payload.issueDate !== undefined && {
    issueDate: payload.issueDate
      ? new Date(payload.issueDate)
      : null,
  }),

  ...(payload.credentialUrl !== undefined && {
    credentialUrl: payload.credentialUrl,
  }),
},
    });

  // 2. Generate embedding AFTER update
  await generateCandidateEmbedding(candidateId);

  return updatedCertification;
};

// ===============================
// DELETE CERTIFICATION
// ===============================
const deleteCertification = async (
  candidateId: string,
  certificationId: string
) => {
  // 1. Find certification
  const existingCertification =
    await prisma.candidateCertification.findFirst({
      where: {
        id: certificationId,
        candidateId,
      },
    });

  if (!existingCertification) {
    throw new Error("Certification not found");
  }

  // 2. Delete image from Cloudinary
  if (existingCertification.image) {
    await deleteFileFromCloudinary(
      existingCertification.image
    );
  }

  // 3. Delete certification
  const deletedCertification =
    await prisma.candidateCertification.delete({
      where: {
        id: certificationId,
      },
    });

  // 4. Generate embedding AFTER deletion
  await generateCandidateEmbedding(candidateId);

  return deletedCertification;
};

// ===============================
// EXPORT
// ===============================
export const candidateService = {
  getMyProfile,
  updateMyProfile,

  addSkill,
  deleteSkill,

  addEducation,
  updateEducation,
  deleteEducation,

  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,

  createCertification,
  getMyCertifications,
  getCertificationById,
  updateCertification,
  deleteCertification,
};