import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
//import { authServices } from "./auth.services";
import { multerImageUpload } from "../../config/multer";

const router=Router();

router.post("/register",multerImageUpload.single("image"),authController.registerUser)
router.post("/login",authController.loginUser)
router.get("/getMe",checkAuth(),authController.getUser)
router.post("/refresh-token", authController.getNewToken)
router.post("/change-password",checkAuth(Role.ADMIN,Role.CANDIDATE,Role.RECRUITER),authController.changePassword)
router.patch("/profile",checkAuth(Role.ADMIN,Role.CANDIDATE,Role.RECRUITER),authController.updateProfile)
// Logout is intentionally idempotent so expired sessions can still be cleared.
router.post("/logout", authController.logoutUser)
router.post("/verify-email", authController.verifyEmail)
router.post("/forget-password", authController.forgetPassword)
router.post("/reset-password", authController.resetPassword)

//Google Login
router.get("/login/google", authController.googleLogin);
router.get("/google/success", authController.googleLoginSuccess);
router.get("/oauth/error", authController.handleOAuthError);

// ==========================================
// Change User Status
// ==========================================

router.patch(
  "/users/:userId/status",
  checkAuth("ADMIN"),
  authController.changeUserStatus
);


// ==========================================
// Permanently Delete User
// ==========================================

router.delete(
  "/users/:userId",
  checkAuth("ADMIN"),
  authController.deleteUser
);

export const authRouters=router