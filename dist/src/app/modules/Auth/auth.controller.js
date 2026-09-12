"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const env_1 = require("../../config/env");
const ms_1 = __importDefault(require("ms"));
const auth_services_1 = require("./auth.services");
const token_1 = require("../../utlis/token");
const sendResponse_1 = require("../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const cookie_1 = require("../../utlis/cookie");
const auth_1 = require("../../lib/auth");
const registerUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const maxAge = (0, ms_1.default)(env_1.envVars.ACCESS_TOKEN_EXPIRES_IN);
    //console.log({ maxAge });
    const payload = req.body;
    // console.log(payload);
    //console.log(payload)
    const result = await auth_services_1.authServices.registerUser(payload, req.file);
    if (!result || !("accessToken" in result) || !("refreshToken" in result)) {
        return res.status(400).json({
            success: false,
            message: "User registration failed",
        });
    }
    const { accessToken, refreshToken, token, ...rest } = result;
    token_1.tokenUtils.setAccessTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, refreshToken);
    //tokenUtils.setBetterAuthSessionCookie(res, token as string);
    if (token) {
        token_1.tokenUtils.setBetterAuthSessionCookie(res, token);
    }
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.CREATED,
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
const loginUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const result = await auth_services_1.authServices.loginUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;
    token_1.tokenUtils.setAccessTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, refreshToken);
    token_1.tokenUtils.setBetterAuthSessionCookie(res, token);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User Login Successfully",
        data: {
            token, accessToken, refreshToken, ...rest
        }
    });
});
const getUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    // console.log("controllerUser",user)
    const result = await auth_services_1.authServices.getMe(user);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User profile fetched successfully",
        data: result,
    });
});
const getNewToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Refresh token is missing");
    }
    const result = await auth_services_1.authServices.getNewToken(refreshToken, betterAuthSessionToken);
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
    token_1.tokenUtils.setAccessTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    token_1.tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "New tokens generated successfully",
        data: {
            accessToken,
            refreshToken: newRefreshToken,
            sessionToken,
        },
    });
});
const changePassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await auth_services_1.authServices.changePassword(payload, betterAuthSessionToken);
    const { accessToken, refreshToken, token } = result;
    token_1.tokenUtils.setAccessTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, refreshToken);
    token_1.tokenUtils.setBetterAuthSessionCookie(res, token);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
});
const updateProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const sessionToken = req.cookies["better-auth.session_token"];
    const result = await auth_services_1.authServices.updateProfile(req.body, sessionToken);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
const logoutUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await auth_services_1.authServices.logoutUser(betterAuthSessionToken);
    cookie_1.CookieUtils.clearCookie(res, 'accessToken', {
        httpOnly: true,
        secure: env_1.envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    cookie_1.CookieUtils.clearCookie(res, 'refreshToken', {
        httpOnly: true,
        secure: env_1.envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    cookie_1.CookieUtils.clearCookie(res, 'better-auth.session_token', {
        httpOnly: true,
        secure: env_1.envVars.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
    });
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User logged out successfully",
        data: result,
    });
});
const verifyEmail = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, otp } = req.body;
    await auth_services_1.authServices.verifyEmail(email, otp);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Email verified successfully",
    });
});
const forgetPassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email } = req.body;
    await auth_services_1.authServices.forgetPassword(email);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset OTP sent to email successfully",
    });
});
const resetPassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    await auth_services_1.authServices.resetPassword(email, otp, newPassword);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully",
    });
});
// /api/v1/auth/login/google?redirect=/profile
const googleLogin = (0, catchAsync_1.catchAsync)((req, res) => {
    const redirectPath = req.query.redirect || "/dashboard";
    const encodedRedirectPath = encodeURIComponent(redirectPath);
    const callbackURL = `${env_1.envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
    res.render("googleRedirect", {
        callbackURL: callbackURL,
        betterAuthUrl: env_1.envVars.BETTER_AUTH_URL,
    });
});
const googleLoginSuccess = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const redirectPath = req.query.redirect || "/dashboard";
    const sessionToken = req.cookies["better-auth.session_token"];
    if (!sessionToken) {
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=oauth_failed`);
    }
    const session = await auth_1.auth.api.getSession({
        headers: {
            "Cookie": `better-auth.session_token=${sessionToken}`
        }
    });
    if (!session) {
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=no_session_found`);
    }
    if (session && !session.user) {
        return res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=no_user_found`);
    }
    const result = await auth_services_1.authServices.googleLoginSuccess(session);
    const { accessToken, refreshToken } = result;
    token_1.tokenUtils.setAccessTokenCookie(res, accessToken);
    token_1.tokenUtils.setRefreshTokenCookie(res, refreshToken);
    // ?redirect=//profile -> /profile
    const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
    const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
    res.redirect(`${env_1.envVars.FRONTEND_URL}${finalRedirectPath}`);
});
const handleOAuthError = (0, catchAsync_1.catchAsync)((req, res) => {
    const error = req.query.error || "oauth_failed";
    res.redirect(`${env_1.envVars.FRONTEND_URL}/login?error=${error}`);
});
// ==========================================
// Change User Status
// ==========================================
const changeUserStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;
    const { status: userStatus } = req.body;
    const result = await auth_services_1.authServices.changeUserStatus(userId, userStatus);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User status updated successfully",
        data: result,
    });
});
// ==========================================
// Delete User
// ==========================================
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;
    const result = await auth_services_1.authServices.deleteUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});
const getAllCandidates = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_services_1.authServices.getAllCandidates();
    (0, sendResponse_1.sendResponse)(res, {
        httpStatusCode: http_status_1.default.OK,
        success: true,
        message: "Candidates retrieved successfully",
        data: result
    });
});
exports.authController = {
    registerUser, loginUser, getUser, getNewToken, changePassword, updateProfile, logoutUser, verifyEmail, forgetPassword, resetPassword, googleLogin, googleLoginSuccess, handleOAuthError, changeUserStatus, deleteUser, getAllCandidates
};
