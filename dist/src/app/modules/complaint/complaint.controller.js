import { ComplaintService } from "./complaint.service";
const createComplaint = async (req, res) => {
    const userId = req.user.userId;
    console.log("UserId", userId);
    const files = req.files;
    const result = await ComplaintService.createComplaint(userId, {
        companyId: req.body.companyId,
        jobId: req.body.jobId,
        jobApplicationId: req.body.jobApplicationId,
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
    }, files);
    res.status(201).json({
        success: true,
        message: "Complaint submitted successfully",
        data: result,
    });
};
const getMyComplaints = async (req, res) => {
    const candidateProfileId = req.user.candidateProfile;
    const result = await ComplaintService.getMyComplaints(candidateProfileId);
    res.status(200).json({
        success: true,
        data: result,
    });
};
const updateComplaint = async (req, res) => {
    const userId = req.user.userId;
    const complaintId = String(req.params.id);
    const files = req.files;
    const result = await ComplaintService.updateComplaint(userId, complaintId, {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
    }, files);
    res.status(200).json({
        success: true,
        message: "Complaint updated successfully",
        data: result,
    });
};
const deleteComplaint = async (req, res) => {
    const userId = req.user.userId;
    const complaintId = String(req.params.id);
    const result = await ComplaintService.deleteComplaint(userId, complaintId);
    res.status(200).json({
        success: true,
        message: "Complaint deleted successfully",
        data: result,
    });
};
//ForAdmin
const getComplaintsForAdmin = async (req, res) => {
    const result = await ComplaintService.getComplaintsForAdmin();
    res.status(200).json({
        success: true,
        data: result,
    });
};
// ============================================
// Decide Complaint
// ============================================
const decideComplaint = async (req, res) => {
    const complaintId = String(req.params.complaintId);
    const adminId = req.user.id;
    const { decision, adminNote, } = req.body;
    const result = await ComplaintService.decideComplaint(complaintId, adminId, decision, adminNote);
    res.status(200).json({
        success: true,
        message: "Complaint decision submitted successfully",
        data: result,
    });
};
// ============================================
// Create Penalty
// ============================================
const createPenalty = async (req, res) => {
    const complaintId = String(req.params.complaintId);
    const adminId = req.user.id;
    const result = await ComplaintService.createPenalty(complaintId, adminId, req.body);
    res.status(201).json({
        success: true,
        message: "Penalty created successfully",
        data: result,
    });
};
// ============================================
// Get Company Penalties
// ============================================
const getCompanyPenalties = async (req, res) => {
    const companyId = String(req.params.companyId);
    const result = await ComplaintService.getCompanyPenalties(companyId);
    res.status(200).json({
        success: true,
        message: "Company penalties retrieved successfully",
        data: result,
    });
};
// ============================================
// Update Penalty
// ============================================
const updatePenalty = async (req, res) => {
    const penaltyId = String(req.params.penaltyId);
    const companyId = String(req.params.companyId);
    const result = await ComplaintService.updatePenalty(penaltyId, companyId, req.body);
    res.status(200).json({
        success: true,
        message: "Penalty updated successfully",
        data: result,
    });
};
// ============================================
// Delete Penalty
// ============================================
const deletePenalty = async (req, res) => {
    const penaltyId = String(req.params.penaltyId);
    const companyId = String(req.params.companyId);
    const result = await ComplaintService.deletePenalty(penaltyId, companyId);
    res.status(200).json({
        success: true,
        message: "Penalty deleted successfully",
        data: result,
    });
};
export const ComplaintController = {
    createComplaint, getMyComplaints, getComplaintsForAdmin, updateComplaint, deleteComplaint, getCompanyPenalties, createPenalty, decideComplaint, updatePenalty, deletePenalty
};
