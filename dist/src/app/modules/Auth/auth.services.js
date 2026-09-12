"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const auth_1 = require("../../lib/auth");
const prisma_1 = require("../../lib/prisma");
const token_1 = require("../../utlis/token");
const enums_1 = require("../../../generated/prisma/enums");
const jwt_1 = require("../../utlis/jwt");
const env_1 = require("../../config/env");
const cloudnary_config_1 = require("../../config/cloudnary.config");
const registerUser = async (payload, file) => {
    const { name, email, password, role } = payload;
    // ==========================================
    // 1. Upload Image
    // ==========================================
    let imageUrl;
    if (file) {
        const uploadedImage = await (0, cloudnary_config_1.uploadFileToCloudinary)(file.buffer, file.originalname);
        imageUrl =
            uploadedImage.secure_url;
    }
    const data = await auth_1.auth.api.signUpEmail({
        body: {
            name, email, password, role, image: imageUrl
        }
    });
    //console.log(data)
    if (!data.user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Register");
    }
    try {
        // Create CandidateProfile only for CANDIDATE
        if (data.user.role === enums_1.Role.CANDIDATE) {
            await prisma_1.prisma.candidateProfile.create({
                data: {
                    userId: data.user.id,
                },
            });
        }
        const accessToken = token_1.tokenUtils.getAccessToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        });
        const refreshToken = token_1.tokenUtils.getRefreshToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        });
        return {
            ...data,
            accessToken,
            refreshToken,
            data
        };
    }
    catch (error) {
        console.log("Transaction error", error);
        await prisma_1.prisma.user.delete({
            where: {
                id: data.user.id
            }
        });
    }
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    const data = await auth_1.auth.api.signInEmail({
        body: {
            email, password
        }
    });
    if (data.user.status === enums_1.UserStatus.INACTIVE) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is Forbidden");
    }
    ;
    if (data.user.isDeleted || data.user.status === enums_1.UserStatus.SUSPENDED) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    ;
    const accessToken = token_1.tokenUtils.getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });
    const refreshToken = token_1.tokenUtils.getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });
    return {
        ...data, accessToken, refreshToken
    };
};
const getMe = async (user) => {
    //console.log(user)
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: { id: user.userId }
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return isUserExist;
};
const getNewToken = async (refreshToken, sessionToken) => {
    const isSessionTokenExists = await prisma_1.prisma.session.findUnique({
        where: {
            token: sessionToken
        },
        include: {
            user: true
        }
    });
    if (!isSessionTokenExists) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid session Token");
    }
    const verifiedRefreshToken = jwt_1.jwtUtils.verifyToken(refreshToken, env_1.envVars.REFRESH_TOKEN_SECRET);
    if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid refresh token");
    }
    const data = verifiedRefreshToken.data;
    const newAccessToken = token_1.tokenUtils.getAccessToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });
    const newRefreshToken = token_1.tokenUtils.getRefreshToken({
        userId: data.userId,
        role: data.role,
        name: data.name,
        email: data.email,
        status: data.status,
        isDeleted: data.isDeleted,
        emailVerified: data.emailVerified,
    });
    const { token } = await prisma_1.prisma.session.update({
        where: {
            token: sessionToken
        },
        data: {
            token: sessionToken,
            expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1000),
            updatedAt: new Date(),
        }
    });
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        sessionToken: token,
    };
};
const changePassword = async (payload, sessionToken) => {
    const session = await auth_1.auth.api.getSession({
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`
        })
    });
    if (!session) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid session token");
    }
    const { currentPassword, newPassword } = payload;
    const result = await auth_1.auth.api.changePassword({
        body: {
            currentPassword,
            newPassword,
            revokeOtherSessions: true,
        },
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`
        })
    });
    if (session.user.needPasswordChange) {
        await prisma_1.prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                needPasswordChange: false,
            }
        });
    }
    const accessToken = token_1.tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });
    const refreshToken = token_1.tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
        email: session.user.email,
        status: session.user.status,
        isDeleted: session.user.isDeleted,
        emailVerified: session.user.emailVerified,
    });
    return {
        ...result,
        accessToken,
        refreshToken,
    };
};
const logoutUser = async (sessionToken) => {
    if (!sessionToken) {
        return { success: true };
    }
    return auth_1.auth.api.signOut({
        headers: new Headers({
            Authorization: `Bearer ${sessionToken}`
        })
    });
};
const updateProfile = async (payload, sessionToken) => {
    if (!sessionToken) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Session token is missing");
    }
    const session = await auth_1.auth.api.getSession({
        headers: new Headers({ Authorization: `Bearer ${sessionToken}` }),
    });
    if (!session) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid session token");
    }
    if (!payload.currentPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Current password is required");
    }
    await auth_1.auth.api.verifyPassword({
        body: { password: payload.currentPassword },
        headers: new Headers({ Authorization: `Bearer ${sessionToken}` }),
    });
    const cleanName = typeof payload.name === "string" ? payload.name.trim() : undefined;
    if (cleanName !== undefined && cleanName.length < 2) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Name must be at least 2 characters");
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id: session.user.id },
        data: {
            ...(cleanName !== undefined ? { name: cleanName } : {}),
            ...(payload.image !== undefined ? { image: payload.image } : {}),
        },
        select: {
            id: true, name: true, email: true, image: true, role: true,
            status: true, emailVerified: true, needPasswordChange: true, isDeleted: true,
        },
    });
    const candidateFields = {
        phone: payload.phone,
        location: payload.location,
        experience: payload.experience,
        linkedin: payload.linkedin,
        github: payload.github,
        portfolio: payload.portfolio,
    };
    if (session.user.role === enums_1.Role.CANDIDATE) {
        await prisma_1.prisma.candidateProfile.update({
            where: { userId: session.user.id },
            data: Object.fromEntries(Object.entries(candidateFields).filter(([, value]) => value !== undefined)),
        });
    }
    return updatedUser;
};
const verifyEmail = async (email, otp) => {
    const result = await auth_1.auth.api.verifyEmailOTP({
        body: {
            email,
            otp,
        }
    });
    if (result.status && !result.user.emailVerified) {
        await prisma_1.prisma.user.update({
            where: {
                email,
            },
            data: {
                emailVerified: true,
            }
        });
    }
};
const forgetPassword = async (email) => {
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        }
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!isUserExist.emailVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email not verified");
    }
    if (isUserExist.isDeleted || isUserExist.status === enums_1.UserStatus.SUSPENDED) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    await auth_1.auth.api.requestPasswordResetEmailOTP({
        body: {
            email,
        }
    });
};
const resetPassword = async (email, otp, newPassword) => {
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        }
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!isUserExist.emailVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email not verified");
    }
    if (isUserExist.isDeleted || isUserExist.status === enums_1.UserStatus.SUSPENDED) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    await auth_1.auth.api.resetPasswordEmailOTP({
        body: {
            email,
            otp,
            password: newPassword,
        }
    });
    if (isUserExist.needPasswordChange) {
        await prisma_1.prisma.user.update({
            where: {
                id: isUserExist.id,
            },
            data: {
                needPasswordChange: false,
            }
        });
    }
    await prisma_1.prisma.session.deleteMany({
        where: {
            userId: isUserExist.id,
        }
    });
};
//Google Login
const googleLoginSuccess = async (session) => {
    const isUserExists = await prisma_1.prisma.user.findUnique({
        where: {
            id: session.user.id,
        }
    });
    if (!isUserExists) {
        await prisma_1.prisma.user.create({
            data: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
            }
        });
    }
    const accessToken = token_1.tokenUtils.getAccessToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
    });
    const refreshToken = token_1.tokenUtils.getRefreshToken({
        userId: session.user.id,
        role: session.user.role,
        name: session.user.name,
    });
    return {
        accessToken,
        refreshToken,
    };
};
// ==========================================
// Change User Status
// ==========================================
const changeUserStatus = async (userId, userStatus) => {
    // ----------------------------------------
    // Validate status
    // ----------------------------------------
    if (!Object.values(enums_1.UserStatus).includes(userStatus)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid user status");
    }
    // ----------------------------------------
    // Find user
    // ----------------------------------------
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            role: true,
            status: true,
            isDeleted: true,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User has already been deleted");
    }
    // ----------------------------------------
    // Update status
    // ----------------------------------------
    const updatedUser = await prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status: userStatus,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            image: true,
            updatedAt: true,
        },
    });
    return updatedUser;
};
// ==========================================
// Delete User
// ==========================================
const deleteUser = async (userId) => {
    // ----------------------------------------
    // Find User
    // ----------------------------------------
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // ----------------------------------------
    // Don't allow admin to delete himself
    // ----------------------------------------
    if (user.role === "ADMIN") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Admin user cannot be deleted");
    }
    // ----------------------------------------
    // Delete from Database
    // ----------------------------------------
    await prisma_1.prisma.$transaction(async (tx) => {
        // CandidateProfile
        await tx.candidateProfile.deleteMany({
            where: {
                userId,
            },
        });
        // Company
        await tx.company.deleteMany({
            where: {
                userId,
            },
        });
        // Sessions
        await tx.session.deleteMany({
            where: {
                userId,
            },
        });
        // Accounts
        await tx.account.deleteMany({
            where: {
                userId,
            },
        });
        // Finally delete User
        await tx.user.delete({
            where: {
                id: userId,
            },
        });
    });
    // ----------------------------------------
    // Delete Cloudinary Image
    // ----------------------------------------
    if (user.image) {
        try {
            await (0, cloudnary_config_1.deleteFileFromCloudinary)(user.image);
        }
        catch (error) {
            console.error("User deleted but Cloudinary image deletion failed:", error);
        }
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        message: "User and profile image deleted successfully",
    };
};
const getAllCandidates = async () => {
    const candidates = await prisma_1.prisma.user.findMany({
        where: {
            role: "CANDIDATE"
        }
    });
    return candidates;
};
exports.authServices = {
    registerUser, loginUser, getMe, getNewToken, changePassword, updateProfile, logoutUser, verifyEmail, forgetPassword, resetPassword, googleLoginSuccess, changeUserStatus, deleteUser, getAllCandidates
};
