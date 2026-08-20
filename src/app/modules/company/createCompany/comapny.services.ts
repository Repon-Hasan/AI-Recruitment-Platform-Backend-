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
    throw new AppError(
      404,
      "Company not found"
    );
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


export const companyServices={
    createCompany,getMyCompany,updateMyCompany,deleteMyCompany
}