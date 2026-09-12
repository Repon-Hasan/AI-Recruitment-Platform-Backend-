"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../../middleware/checkAuth");
const enums_1 = require("../../../../generated/prisma/enums");
const company_controller_1 = require("./company.controller");
const router = (0, express_1.Router)();
// Canonical company creation endpoint
// router.post(
//   "/",
//   checkAuth(Role.RECRUITER),
//   companyController.createCompanyController
// );
router.post("/jobs", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController.createCompanyController);
router.get("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController.getMyCompanyController);
router.patch("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController.updateMyCompanyController);
router.delete("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController.deleteMyCompanyController);
// =====================================================
// Get all complaints of logged-in company
// =====================================================
router.get("/complaints", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController.getMyCompanyComplaints);
// =====================================================
// Get all penalties of logged-in company
// =====================================================
router.get("/penalties", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController
    .getMyCompanyPenalties);
// =====================================================
// Get one penalty
// =====================================================
router.get("/penalties/:penaltyId", (0, checkAuth_1.checkAuth)(enums_1.Role.RECRUITER), company_controller_1.companyController
    .getMyCompanyPenaltyById);
exports.companyRouter = router;
