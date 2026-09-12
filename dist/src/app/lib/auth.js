"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const plugins_1 = require("better-auth/plugins");
const enums_1 = require("../../generated/prisma/enums");
const env_1 = require("../config/env");
const prisma_2 = require("./prisma");
const email_1 = require("../utlis/email");
// If your Prisma file is located elsewhere, you can change the path
exports.auth = (0, better_auth_1.betterAuth)({
    baseURL: env_1.envVars.BETTER_AUTH_URL,
    secret: env_1.envVars.BETTER_AUTH_SECRET,
    database: (0, prisma_1.prismaAdapter)(prisma_2.prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        google: {
            clientId: env_1.envVars.GOOGLE_CLIENT_ID,
            clientSecret: env_1.envVars.GOOGLE_CLIENT_SECRET,
            // callbackUrl: envVars.GOOGLE_CALLBACK_URL,
            mapProfileToUser: () => {
                return {
                    role: enums_1.Role.CANDIDATE,
                    status: enums_1.UserStatus.ACTIVE,
                    needPasswordChange: false,
                    emailVerified: true,
                    isDeleted: false,
                    deletedAt: null,
                };
            }
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: enums_1.Role.CANDIDATE,
                input: true
            },
            status: {
                type: "string",
                required: true,
                defaultValue: enums_1.UserStatus.ACTIVE
            },
            needPasswordChange: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            isDeleted: {
                type: "boolean",
                required: true,
                defaultValue: false
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null
            },
        }
    },
    plugins: [
        (0, plugins_1.bearer)(),
        (0, plugins_1.emailOTP)({
            overrideDefaultEmailVerification: true,
            async sendVerificationOTP({ email, otp, type }) {
                //                 console.log("🔥 sendVerificationOTP CALLED");
                // console.log("📧 Email:", email);
                // console.log("🔢 OTP:", otp);
                // console.log("📌 Type:", type);
                if (type === "email-verification") {
                    const user = await prisma_2.prisma.user.findUnique({
                        where: {
                            email,
                        }
                    });
                    if (user && !user.emailVerified) {
                        (0, email_1.sendEmail)({
                            to: email,
                            subject: "Verify your email",
                            templateName: "otp",
                            templateData: {
                                name: user.name,
                                otp,
                            }
                        });
                    }
                }
                else if (type === "forget-password") {
                    const user = await prisma_2.prisma.user.findUnique({
                        where: {
                            email,
                        }
                    });
                    if (user) {
                        (0, email_1.sendEmail)({
                            to: email,
                            subject: "Password Reset OTP",
                            templateName: "otp",
                            templateData: {
                                name: user.name,
                                otp,
                            }
                        });
                    }
                }
            },
            expiresIn: 2 * 60, // 2 minutes in seconds
            otpLength: 6,
        })
    ],
    session: {
        expiresIn: 60 * 60 * 60 * 24, // 1 day in seconds
        updateAge: 60 * 60 * 60 * 24, // 1 day in seconds
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 60 * 24, // 1 day in seconds
        }
    },
    redirectURLs: {
        signIn: `${env_1.envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:5000", env_1.envVars.FRONTEND_URL],
    advanced: {
        // disableCSRFCheck: true,
        useSecureCookies: env_1.envVars.NODE_ENV === "production",
        cookies: {
            state: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                    path: "/",
                }
            },
            sessionToken: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                    path: "/",
                }
            }
        }
    }
});
