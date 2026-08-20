import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { authServices } from "./auth.services";

const router=Router();

router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)
router.get("/getMe",checkAuth(Role.ADMIN,Role.CANDIDATE,Role.RECRUITER),authController.getUser)
router.post("/refresh-token", authController.getNewToken)
router.post("/change-password",checkAuth(Role.ADMIN,Role.CANDIDATE,Role.ADMIN),authController.changePassword)
router.post("/logout",checkAuth(Role.ADMIN,Role.CANDIDATE,Role.ADMIN),authController.logoutUser)
router.post("/verify-email", authController.verifyEmail)
router.post("/forget-password", authController.forgetPassword)
router.post("/reset-password", authController.resetPassword)

//Google Login
router.get("/login/google", authController.googleLogin);
router.get("/google/success", authController.googleLoginSuccess);
router.get("/oauth/error", authController.handleOAuthError);
export const authRouters=router