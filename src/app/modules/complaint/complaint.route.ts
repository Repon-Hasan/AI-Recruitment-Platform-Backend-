import { Router } from "express";

import {
  ComplaintController,
} from "./complaint.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { multerImageUpload } from "../../config/multer";



const router = Router();

router.post(
  "/",

  checkAuth("CANDIDATE"),

 multerImageUpload.array(
    "evidence",
    5
  ),

  ComplaintController.createComplaint
);

router.get(
  "/my",
  checkAuth("CANDIDATE"),
  ComplaintController.getMyComplaints
);

router.patch(
  "/:id",

  checkAuth("CANDIDATE"),

  multerImageUpload.array(
    "evidence",
    5
  ),

  ComplaintController.updateComplaint
);
router.delete(
  "/:id",

  checkAuth("CANDIDATE"),

  ComplaintController.deleteComplaint
);
//ForAdmin
router.get(
  "/admin",
  checkAuth("ADMIN"),
  ComplaintController.getComplaintsForAdmin
);

// ============================================
// Decide Complaint
// ============================================

router.patch(
  "/:complaintId/decision",
  checkAuth("ADMIN"),
   ComplaintController.decideComplaint
);


// ============================================
// Create Penalty
// ============================================

router.post(
  "/:complaintId/penalty",
  checkAuth("ADMIN"),
   ComplaintController.createPenalty
);


// ============================================
// Get Company Penalties
// ============================================

router.get(
  "/:companyId/penalties",
  checkAuth("ADMIN"),
   ComplaintController.getCompanyPenalties
);


// Update Company Penalty
// ============================================

router.patch(
  "/:companyId/penalties/:penaltyId",
  checkAuth("ADMIN"),
  ComplaintController.updatePenalty
);

// ============================================
// Delete Company Penalty
// ============================================

router.delete(
  "/:companyId/penalties/:penaltyId",
  checkAuth("ADMIN"),
  ComplaintController.deletePenalty
);

export const ComplaintRouter = router;