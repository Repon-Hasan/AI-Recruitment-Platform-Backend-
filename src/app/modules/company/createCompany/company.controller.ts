// company.controller.ts

import { Request, Response } from "express";
import { createCompanySchema, updateCompanySchema } from "./company.validation";
import { companyServices } from "./comapny.services";


 const createCompanyController = async (
  req: Request,
  res: Response
) => {
    
  const userId = req.user?.userId;
//console.log("hi")
  const validatedData = createCompanySchema.parse(
    req.body
  );

  const company = await companyServices.createCompany(
    userId,
    validatedData
  );

  res.status(201).json({
    success: true,
    message: "Company created successfully",
    data: company,
  });
};

 const getMyCompanyController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user?.userId;

  const company = await companyServices.getMyCompany(userId);

  res.status(200).json({
    success: true,
    message: "Company retrieved successfully",
    data: company,
  });
};

const updateMyCompanyController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.userId;

  const validatedData = updateCompanySchema.parse(
    req.body
  );

  const company = await companyServices.updateMyCompany(
    userId,
    validatedData
  );

  res.status(200).json({
    success: true,
    message: "Company updated successfully",
    data: company,
  });
};

 const deleteMyCompanyController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.userId;

  await companyServices.deleteMyCompany(userId);

  res.status(200).json({
    success: true,
    message: "Company deleted successfully",
  });
};

// =====================================================
// Get My Company Complaints
// =====================================================

const getMyCompanyComplaints = async (
  req: Request,
  res: Response
) => {

  const userId = req.user.id;

  const result =
    await companyServices.getMyCompanyComplaints(
      userId
    );

  res.status(200).json({
    success: true,

    message:
      "Company complaints retrieved successfully",

    data: result,
  });
};


// =====================================================
// Get Single Company Complaint
// =====================================================

const getMyCompanyComplaintById =
  async (
    req: Request,
    res: Response
  ) => {

    const userId = req.user.userId;

    const complaintId =
      String(req.params.complaintId);

    const result =
      await companyServices.getMyCompanyPenaltyById(
          userId,
          complaintId
        );

    res.status(200).json({
      success: true,

      message:
        "Complaint retrieved successfully",

      data: result,
    });
  };


// =====================================================
// Get My Company Penalties
// =====================================================

const getMyCompanyPenalties = async (
  req: Request,
  res: Response
) => {

  const userId = req.user.id;

  const result =
    await companyServices
      .getMyCompanyPenalties(
        userId
      );

  res.status(200).json({
    success: true,

    message:
      "Company penalties retrieved successfully",

    data: result,
  });
};


// =====================================================
// Get Single Company Penalty
// =====================================================

const getMyCompanyPenaltyById =
  async (
    req: Request,
    res: Response
  ) => {

    const userId = req.user.id;

    const penaltyId =
      String(req.params.penaltyId);

    const result =
      await companyServices
        .getMyCompanyPenaltyById(
          userId,
          penaltyId
        );

    res.status(200).json({
      success: true,

      message:
        "Penalty retrieved successfully",

      data: result,
    });
  };
export const companyController={
    createCompanyController,getMyCompanyController,updateMyCompanyController,deleteMyCompanyController,getMyCompanyPenaltyById,getMyCompanyPenalties
}