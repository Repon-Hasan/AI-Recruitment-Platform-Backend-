// company.service.ts
import AppError from "../../../errorHelpers/AppError";
import { prisma } from "../../../lib/prisma";
const createCompany = async (userId, payload) => {
    // Check whether user already has a company
    const existingCompany = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (existingCompany) {
        throw new AppError(400, "You already have a company");
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
const getMyCompany = async (userId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
        include: {
            jobs: true,
        },
    });
    if (!company) {
        throw new AppError(404, "Company not found");
    }
    return company;
};
// company.service.ts
const updateMyCompany = async (userId, payload) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw new AppError(404, "Company not found");
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
const deleteMyCompany = async (userId) => {
    const company = await prisma.company.findUnique({
        where: {
            userId,
        },
    });
    if (!company) {
        throw new AppError(404, "Company not found");
    }
    await prisma.company.delete({
        where: {
            userId,
        },
    });
    return null;
};
export const companyServices = {
    createCompany, getMyCompany, updateMyCompany, deleteMyCompany
};
