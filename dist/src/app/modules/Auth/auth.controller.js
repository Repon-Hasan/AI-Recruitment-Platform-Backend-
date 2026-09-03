import { catchAsync } from "../../shared/catchAsync";
import { envVars } from "../../config/env";
import ms from "ms";
import { authServices } from "./auth.services";
import { tokenUtils } from "../../utlis/token";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { CookieUtils } from "../../utlis/cookie";
import { auth } from "../../lib/auth";
const registerUser = catchAsync(async (req, res) => {
    const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN);
    //console.log({ maxAge });
    const payload = req.body;
    // console.log(payload);
    //console.log(payload)
    const result = await authServices.registerUser(payload, req.file);
    if (!result || !("accessToken" in result) || !("refreshToken" in result)) {
        return res.status(400).json({
            success: false,
            message: "User registration failed",
        });
    }
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    //tokenUtils.setBetterAuthSessionCookie(res, token as string);
    if (token) {
        tokenUtils.setBetterAuthSessionCookie(res, token);
    }
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "User Registered successfully",
        data: {
            token,
            accessToken,
            refreshToken,
            ...rest
        }
    });
});
const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await authServices.loginUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User Login Successfully",
        data: {
            token, accessToken, refreshToken, ...rest
        }
    });
});
const getUser = catchAsync(async (req, res) => {
    const user = req.user;
    // console.log("controllerUser",user)
    const result = await authServices.getMe(user);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User profile fetched successfully",
        data: result,
    });
});
const getNewToken = catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
        throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
    }
    const result = await authServices.getNewToken(refreshToken, betterAuthSessionToken);
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "New tokens generated successfully",
        data: {
            accessToken,
            refreshToken: newRefreshToken,
            sessionToken,
        },
    });
});
const changePassword = catchAsync(async (req, res) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authServices.changePassword(payload, betterAuthSessionToken);
    const { accessToken, refreshToken, token } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCookie(res, token);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
});
const updateProfile = catchAsync(async (req, res) => {
    const sessionToken = req.cookies["better-auth.session_token"];
    const result = await authServices.updateProfile(req.body, sessionToken);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
const logoutUser = catchAsync(async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authServices.logoutUser(betterAuthSessionToken);
    CookieUtils.clearCookie(res, 'accessToken', {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    CookieUtils.clearCookie(res, 'refreshToken', {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    CookieUtils.clearCookie(res, 'better-auth.session_token', {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User logged out successfully",
        data: result,
    });
});
const verifyEmail = catchAsync(async (req, res) => {
    const { email, otp } = req.body;
    await authServices.verifyEmail(email, otp);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Email verified successfully",
    });
});
const forgetPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    await authServices.forgetPassword(email);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Password reset OTP sent to email successfully",
    });
});
const resetPassword = catchAsync(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    await authServices.resetPassword(email, otp, newPassword);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Password reset successfully",
    });
});
// /api/v1/auth/login/google?redirect=/profile
const googleLogin = catchAsync((req, res) => {
    const redirectPath = req.query.redirect || "/dashboard";
    const encodedRedirectPath = encodeURIComponent(redirectPath);
    const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
    res.render("googleRedirect", {
        callbackURL: callbackURL,
        betterAuthUrl: envVars.BETTER_AUTH_URL,
    });
});
const googleLoginSuccess = catchAsync(async (req, res) => {
    const redirectPath = req.query.redirect || "/dashboard";
    const sessionToken = req.cookies["better-auth.session_token"];
    if (!sessionToken) {
        return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
    }
    const session = await auth.api.getSession({
        headers: {
            "Cookie": `better-auth.session_token=${sessionToken}`
        }
    });
    if (!session) {
        return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
    }
    if (session && !session.user) {
        return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
    }
    const result = await authServices.googleLoginSuccess(session);
    const { accessToken, refreshToken } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    // ?redirect=//profile -> /profile
    const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
    const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
    res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});
const handleOAuthError = catchAsync((req, res) => {
    const error = req.query.error || "oauth_failed";
    res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});
// ==========================================
// Change User Status
// ==========================================
const changeUserStatus = catchAsync(async (req, res) => {
    const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;
    const { status: userStatus } = req.body;
    const result = await authServices.changeUserStatus(userId, userStatus);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
});
// ==========================================
// Delete User
// ==========================================
const deleteUser = catchAsync(async (req, res) => {
    const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;
    const result = await authServices.deleteUser(userId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});
export const authController = {
    registerUser, loginUser, getUser, getNewToken, changePassword, updateProfile, logoutUser, verifyEmail, forgetPassword, resetPassword, googleLogin, googleLoginSuccess, handleOAuthError, changeUserStatus, deleteUser
};
