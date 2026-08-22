// company.controller.ts
import { createCompanySchema, updateCompanySchema } from "./company.validation";
import { companyServices } from "./comapny.services";
const createCompanyController = async (req, res) => {
    const userId = req.user?.userId;
    //console.log("hi")
    const validatedData = createCompanySchema.parse(req.body);
    const company = await companyServices.createCompany(userId, validatedData);
    res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: company,
    });
};
const getMyCompanyController = async (req, res) => {
    const userId = req.user?.userId;
    const company = await companyServices.getMyCompany(userId);
    res.status(200).json({
        success: true,
        message: "Company retrieved successfully",
        data: company,
    });
};
const updateMyCompanyController = async (req, res) => {
    const userId = req.user.userId;
    const validatedData = updateCompanySchema.parse(req.body);
    const company = await companyServices.updateMyCompany(userId, validatedData);
    res.status(200).json({
        success: true,
        message: "Company updated successfully",
        data: company,
    });
};
const deleteMyCompanyController = async (req, res) => {
    const userId = req.user.userId;
    await companyServices.deleteMyCompany(userId);
    res.status(200).json({
        success: true,
        message: "Company deleted successfully",
    });
};
export const companyController = {
    createCompanyController, getMyCompanyController, updateMyCompanyController, deleteMyCompanyController
};
