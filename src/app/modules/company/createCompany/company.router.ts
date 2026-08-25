import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { companyController } from "./company.controller";

const router=Router()


router.post(
  "/jobs",
  checkAuth(Role.RECRUITER),
  companyController.createCompanyController
);

router.get(
  "/me",
  checkAuth(Role.RECRUITER),
  companyController.getMyCompanyController
);

router.patch(
  "/me",
  checkAuth(Role.RECRUITER),
  companyController.updateMyCompanyController
);

router.delete(
  "/me",
  checkAuth(Role.RECRUITER),
  companyController.deleteMyCompanyController
);


// =====================================================
// Get all complaints of logged-in company
// =====================================================

router.get(
  "/complaints",

  checkAuth(Role.RECRUITER),

  companyController.getMyCompanyComplaints
    
);

// =====================================================
// Get all penalties of logged-in company
// =====================================================

router.get(
  "/penalties",

  checkAuth(Role.RECRUITER),

  companyController
    .getMyCompanyPenalties
);


// =====================================================
// Get one penalty
// =====================================================

router.get(
  "/penalties/:penaltyId",

  checkAuth(Role.RECRUITER),

  companyController
    .getMyCompanyPenaltyById
);

export const companyRouter=router;