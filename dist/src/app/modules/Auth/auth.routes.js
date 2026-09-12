"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouters = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../../middleware/checkAuth");
const enums_1 = require("../../../generated/prisma/enums");
//import { authServices } from "./auth.services";
const multer_1 = require("../../config/multer");
const router = (0, express_1.Router)();
router.post("/register", multer_1.multerImageUpload.single("image"), auth_controller_1.authController.registerUser);
router.post("/login", auth_controller_1.authController.loginUser);
router.get("/getMe", (0, checkAuth_1.checkAuth)(), auth_controller_1.authController.getUser);
router.post("/refresh-token", auth_controller_1.authController.getNewToken);
router.post("/change-password", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.CANDIDATE, enums_1.Role.RECRUITER), auth_controller_1.authController.changePassword);
router.patch("/profile", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.CANDIDATE, enums_1.Role.RECRUITER), auth_controller_1.authController.updateProfile);
// Logout is intentionally idempotent so expired sessions can still be cleared.
router.post("/logout", auth_controller_1.authController.logoutUser);
router.post("/verify-email", auth_controller_1.authController.verifyEmail);
router.post("/forget-password", auth_controller_1.authController.forgetPassword);
router.post("/reset-password", auth_controller_1.authController.resetPassword);
//Google Login
router.get("/login/google", auth_controller_1.authController.googleLogin);
router.get("/google/success", auth_controller_1.authController.googleLoginSuccess);
router.get("/oauth/error", auth_controller_1.authController.handleOAuthError);
// ==========================================
// Change User Status
// ==========================================
router.patch("/users/:userId/status", (0, checkAuth_1.checkAuth)("ADMIN"), auth_controller_1.authController.changeUserStatus);
router.get("/allCandidates", (0, checkAuth_1.checkAuth)(enums_1.Role.ADMIN, enums_1.Role.RECRUITER), auth_controller_1.authController.getAllCandidates);
// ==========================================
// Permanently Delete User
// ==========================================
router.delete("/users/:userId", (0, checkAuth_1.checkAuth)("ADMIN"), auth_controller_1.authController.deleteUser);
exports.authRouters = router;
