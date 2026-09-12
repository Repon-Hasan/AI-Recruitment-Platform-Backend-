"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateRoutes = void 0;
const express_1 = require("express");
const candidate_controller_1 = require("./candidate.controller");
const enums_1 = require("../../../generated/prisma/enums");
const checkAuth_1 = require("../../middleware/checkAuth");
const multer_1 = require("../../config/multer");
const router = (0, express_1.Router)();
// Candidate profile
router.get("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.getMyProfile);
router.patch("/me", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.updateMyProfile);
// Skills
router.post("/skills", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.addSkill);
router.delete("/skills/:skillId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.deleteSkill);
// Education
router.post("/education", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.addEducation);
router.patch("/education/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.updateEducation);
router.delete("/education/:id", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.deleteEducation);
// Project Related
router.post("/projects", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.createProject);
router.get("/projects", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.getMyProjects);
router.get("/projects/:projectId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.getProjectById);
router.patch("/projects/:projectId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.updateProject);
router.delete("/projects/:projectId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.deleteProject);
// Certificate
router.post("/certificate", (req, res, next) => {
    multer_1.multerImageUpload.single("image")(req, res, (err) => {
        if (err) {
            console.error("🔥 MULTER ERROR:", err);
            console.error("🔥 MESSAGE:", err.message);
            console.error("🔥 STACK:", err.stack);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
        console.log("✅ MULTER SUCCESS");
        console.log("FILE:", req.file);
        next();
    });
}, (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.createCertification);
router.get("/certificate", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.getMyCertifications);
router.get("/certificate/:certificationId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.getCertificationById);
router.patch("/certificate/:certificationId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.updateCertification);
router.delete("/certificate/:certificationId", (0, checkAuth_1.checkAuth)(enums_1.Role.CANDIDATE), candidate_controller_1.candidateController.deleteCertification);
exports.candidateRoutes = router;
