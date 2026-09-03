// company.service.ts

import AppError from "../../../errorHelpers/AppError";
import { prisma } from "../../../lib/prisma";



interface CreateCompanyPayload {
  name: string;
  description?: string;
  website?: string;
}

interface UpdateCompanyPayload {
  name?: string;
  description?: string;
  website?: string;
}

 const createCompany = async (
  userId: string,
  payload: CreateCompanyPayload
) => {
  // Check whether user already has a company
  const existingCompany = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (existingCompany) {
    throw new AppError(
      400,
      "You already have a company"
    );
  }

  // Create company
  const company = await prisma.company.create({
    data: {
      name: payload.name,
      description: payload.description,
      website: payload.website,
      userId,
    },
  });

  return company;
};

// company.service.ts

 const getMyCompany = async (userId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
    include: {
      jobs: true,
    },
  });

  if (!company) {
    // A recruiter can open the dashboard before creating a company.
    // Return an empty state so the setup screen can be displayed.
    return null;
  }

  return company;
};

// company.service.ts


const updateMyCompany = async (
  userId: string,
  payload: UpdateCompanyPayload
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new AppError(
      404,
      "Company not found"
    );
  }

  const updatedCompany = await prisma.company.update({
    where: {
      userId,
    },
    data: payload,
  });

  return updatedCompany;
};

// company.service.ts

const deleteMyCompany = async (
  userId: string
) => {
  const company = await prisma.company.findUnique({
    where: {
      userId,
    },
  });

  if (!company) {
    throw new AppError(
      404,
      "Company not found"
    );
  }

  await prisma.company.delete({
    where: {
      userId,
    },
  });

  return null;
};

// =====================================================
// Get complaints for authenticated company
// =====================================================

const getMyCompanyComplaints = async (
  userId: string
) => {

  // ============================================
  // 1. Find company belonging to logged-in user
  // ============================================

  const company =
    await prisma.company.findUnique({
      where: {
        userId,
      },
    });

  if (!company) {
    // No company means there are no complaints yet.
    return [];
  }

  // ============================================
  // 2. Get complaints belonging to this company
  // ============================================

  const complaints =
    await prisma.reviewComplaint.findMany({

      where: {
        companyId: company.id,
      },

      include: {

        // Candidate information
        candidateProfile: {
          select: {
            id: true,
            phone: true,
            location: true,
            experience: true,
          },
        },

        // Job information
        job: {
          select: {
            id: true,
            title: true,
            location: true,
          },
        },

        // Application information
        jobApplication: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
        },

        // Evidence/images
        evidence: true,

        // Admin decision
        penalty: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return complaints;
};
// =====================================================
// Get penalties for authenticated company
// =====================================================

const getMyCompanyPenalties = async (
  userId: string
) => {

  // ============================================
  // 1. Find company
  // ============================================

  const company =
    await prisma.company.findUnique({
      where: {
        userId,
      },
    });

  if (!company) {
    // No company means there are no penalties yet.
    return [];
  }

  // ============================================
  // 2. Get penalties
  // ============================================

  const penalties =
    await prisma.penalty.findMany({

      where: {
        companyId: company.id,
      },

      include: {

        complaint: {
          include: {
            job: {
              select: {
                id: true,
                title: true,
              },
            },

            evidence: true,
          },
        },

        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return penalties;
};
// =====================================================
// Get single penalty
// =====================================================

const getMyCompanyPenaltyById = async (
  userId: string,
  penaltyId: string
) => {

  // ============================================
  // 1. Find company
  // ============================================

  const company =
    await prisma.company.findUnique({
      where: {
        userId,
      },
    });

  if (!company) {
    throw new Error(
      "Company profile not found"
    );
  }

  // ============================================
  // 2. Find penalty
  // ============================================

  const penalty =
    await prisma.penalty.findFirst({

      where: {
        id: penaltyId,

        // Security check
        companyId: company.id,
      },

      include: {

        complaint: {
          include: {
            candidateProfile: {
              select: {
                id: true,
                phone: true,
                location: true,
                experience: true,
              },
            },

            job: true,

            evidence: true,
          },
        },

        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

  if (!penalty) {
    throw new Error(
      "Penalty not found"
    );
  }

  return penalty;
};
export const companyServices={
    createCompany,getMyCompany,updateMyCompany,deleteMyCompany,getMyCompanyComplaints,getMyCompanyPenalties,getMyCompanyPenaltyById
}