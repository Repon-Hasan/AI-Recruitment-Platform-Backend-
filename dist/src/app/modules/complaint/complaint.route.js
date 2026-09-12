"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintRouter = void 0;
const express_1 = require("express");
const complaint_controller_1 = require("./complaint.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const multer_1 = require("../../config/multer");
const router = (0, express_1.Router)();
router.post("/", (0, checkAuth_1.checkAuth)("CANDIDATE"), multer_1.multerImageUpload.array("evidence", 5), complaint_controller_1.ComplaintController.createComplaint);
router.get("/my", (0, checkAuth_1.checkAuth)("CANDIDATE"), complaint_controller_1.ComplaintController.getMyComplaints);
router.patch("/:id", (0, checkAuth_1.checkAuth)("CANDIDATE"), multer_1.multerImageUpload.array("evidence", 5), complaint_controller_1.ComplaintController.updateComplaint);
router.delete("/:id", (0, checkAuth_1.checkAuth)("CANDIDATE"), complaint_controller_1.ComplaintController.deleteComplaint);
//ForAdmin
router.get("/admin", (0, checkAuth_1.checkAuth)("ADMIN"), complaint_controller_1.ComplaintController.getComplaintsForAdmin);
// ============================================
// Decide Complaint
// ============================================
router.patch("/:complaintId/decision", (0, checkAuth_1.checkAuth)("ADMIN"), complaint_controller_1.ComplaintController.decideComplaint);
// ============================================
// Create Penalty
// ============================================
router.post("/:complaintId/penalty", (0, checkAuth_1.checkAuth)("ADMIN"), complaint_controller_1.ComplaintController.createPenalty);
// ============================================
// Get Company Penalties
// ============================================
router.get("/:companyId/penalties", (0, checkAuth_1.checkAuth)("ADMIN"), complaint_controller_1.ComplaintController.getCompanyPenalties);
// Update Company Penalty
// ============================================
router.patch("/:companyId/penalties/:penaltyId", (0, checkAuth_1.checkAuth)("ADMIN"), complaint_controller_1.ComplaintController.updatePenalty);
// ============================================
// Delete Company Penalty
// ============================================
router.delete("/:companyId/penalties/:penaltyId", (0, checkAuth_1.checkAuth)("ADMIN"), complaint_controller_1.ComplaintController.deletePenalty);
exports.ComplaintRouter = router;
