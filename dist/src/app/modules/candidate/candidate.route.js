import { Router } from "express";
import { candidateController } from "./candidate.controller";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { multerUpload } from "../../config/multer";
const router = Router();
// Candidate profile
router.get("/me", checkAuth(Role.CANDIDATE), candidateController.getMyProfile);
router.patch("/me", checkAuth(Role.CANDIDATE), candidateController.updateMyProfile);
// Skills
router.post("/skills", checkAuth(Role.CANDIDATE), candidateController.addSkill);
router.delete("/skills/:skillId", checkAuth(Role.CANDIDATE), candidateController.deleteSkill);
// Education
router.post("/education", checkAuth(Role.CANDIDATE), candidateController.addEducation);
router.patch("/education/:id", checkAuth(Role.CANDIDATE), candidateController.updateEducation);
router.delete("/education/:id", checkAuth(Role.CANDIDATE), candidateController.deleteEducation);
//Project Related
router.post("/projects", checkAuth(), candidateController.createProject);
router.get("/projects", checkAuth(), candidateController.getMyProjects);
router.get("/projects/:projectId", checkAuth(), candidateController.getProjectById);
router.patch("/projects/:projectId", checkAuth(), candidateController.updateProject);
router.delete("/projects/:projectId", checkAuth(), candidateController.deleteProject);
//CerTificate
router.post("/certificate", (req, res, next) => {
    multerUpload.single("image")(req, res, (err) => {
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
}, checkAuth(), candidateController.createCertification);
router.get("/certificate", checkAuth(), candidateController.getMyCertifications);
router.get("/certificate/:certificationId", checkAuth(), candidateController.getCertificationById);
router.patch("/certificate/:certificationId", checkAuth(), candidateController.updateCertification);
router.delete("/certificate/:certificationId", checkAuth(), candidateController.deleteCertification);
export const candidateRoutes = router;
