"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const enums_1 = require("../../generated/prisma/enums");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const prisma_1 = require("../lib/prisma");
const cookie_1 = require("../utlis/cookie");
const jwt_1 = require("../utlis/jwt");
const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        //Session Token Verification
        const sessionToken = cookie_1.CookieUtils.getCookie(req, "better-auth.session_token");
        if (!sessionToken) {
            throw new Error('Unauthorized access! No session token provided.');
        }
        if (sessionToken) {
            const sessionExists = await prisma_1.prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date(),
                    }
                },
                include: {
                    user: {
                        include: {
                            candidateProfile: true,
                        },
                    },
                }
            });
            if (sessionExists && sessionExists.user) {
                const user = sessionExists.user;
                const now = new Date();
                const expiresAt = new Date(sessionExists.expiresAt);
                const createdAt = new Date(sessionExists.createdAt);
                const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
                const timeRemaining = expiresAt.getTime() - now.getTime();
                const percentRemaining = (timeRemaining / sessionLifeTime) * 100;
                if (percentRemaining < 20) {
                    res.setHeader('X-Session-Refresh', 'true');
                    res.setHeader('X-Session-Expires-At', expiresAt.toISOString());
                    res.setHeader('X-Time-Remaining', timeRemaining.toString());
                    console.log("Session Expiring Soon!!");
                }
                if (user.status === enums_1.UserStatus.SUSPENDED || user.status === enums_1.UserStatus.INACTIVE) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access! User is not active.');
                }
                if (user.isDeleted) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access! User is deleted.');
                }
                if (authRoles.length > 0 && !authRoles.includes(user.role)) {
                    throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden access! You do not have permission to access this resource.');
                }
                req.user = {
                    id: user.id,
                    userId: user.id,
                    role: user.role,
                    email: user.email,
                    candidateProfile: user.candidateProfile,
                };
            }
            const accessToken = cookie_1.CookieUtils.getCookie(req, 'accessToken');
            if (!accessToken) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access! No access token provided.');
            }
        }
        //Access Token Verification
        const accessToken = cookie_1.CookieUtils.getCookie(req, 'accessToken');
        if (!accessToken) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access! No access token provided.');
        }
        const verifiedToken = jwt_1.jwtUtils.verifyToken(accessToken, env_1.envVars.ACCESS_TOKEN_SECRET);
        if (!verifiedToken.success) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access! Invalid access token.');
        }
        if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden access! You do not have permission to access this resource.');
        }
        req.user = {
            id: verifiedToken.data.id,
            userId: verifiedToken.data.userId,
            role: verifiedToken.data.role,
            email: verifiedToken.data.email,
            candidateProfile: verifiedToken.data.candidateProfile,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkAuth = checkAuth;
