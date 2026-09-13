import { IChangePasswordPayload, ILoginUserPayload, IRegisterPatientPayload, IRequestUser, IUpdateProfilePayload } from "./auth.interface";
import { Role, UserStatus } from "../../../generated/prisma/enums";
declare const registerUser: (payload: IRegisterPatientPayload, file?: Express.Multer.File) => Promise<{
    token: null;
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        deletedAt?: Date | null | undefined;
        isDeleted: boolean;
        needPasswordChange: boolean;
        role: string;
        status: string;
    };
    accessToken: string;
    refreshToken: string;
    data: {
        token: null;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
            deletedAt?: Date | null | undefined;
            isDeleted: boolean;
            needPasswordChange: boolean;
            role: string;
            status: string;
        };
    } | {
        token: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
            deletedAt?: Date | null | undefined;
            isDeleted: boolean;
            needPasswordChange: boolean;
            role: string;
            status: string;
        };
    };
} | {
    token: string;
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        deletedAt?: Date | null | undefined;
        isDeleted: boolean;
        needPasswordChange: boolean;
        role: string;
        status: string;
    };
    accessToken: string;
    refreshToken: string;
    data: {
        token: null;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
            deletedAt?: Date | null | undefined;
            isDeleted: boolean;
            needPasswordChange: boolean;
            role: string;
            status: string;
        };
    } | {
        token: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
            deletedAt?: Date | null | undefined;
            isDeleted: boolean;
            needPasswordChange: boolean;
            role: string;
            status: string;
        };
    };
} | undefined>;
declare const loginUser: (payload: ILoginUserPayload) => Promise<{
    redirect: boolean;
    token: string;
    url?: string | undefined;
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        deletedAt?: Date | null | undefined;
        isDeleted: boolean;
        needPasswordChange: boolean;
        role: string;
        status: string;
    };
    accessToken: string;
    refreshToken: string;
}>;
declare const getMe: (user: IRequestUser) => Promise<{
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: Role;
    status: UserStatus;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getNewToken: (refreshToken: string, sessionToken: string) => Promise<{
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
}>;
declare const changePassword: (payload: IChangePasswordPayload, sessionToken: string) => Promise<{
    token: string | null;
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    } & Record<string, any> & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    };
    accessToken: string;
    refreshToken: string;
}>;
declare const logoutUser: (sessionToken?: string) => Promise<{
    success: boolean;
}>;
declare const updateProfile: (payload: IUpdateProfilePayload, sessionToken?: string) => Promise<{
    email: string;
    emailVerified: boolean;
    id: string;
    image: string | null;
    isDeleted: boolean;
    name: string;
    needPasswordChange: boolean;
    role: Role;
    status: UserStatus;
}>;
declare const verifyEmail: (email: string, otp: string) => Promise<void>;
declare const forgetPassword: (email: string) => Promise<void>;
declare const resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
declare const googleLoginSuccess: (session: Record<string, any>) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const changeUserStatus: (userId: string, userStatus: UserStatus) => Promise<{
    email: string;
    id: string;
    image: string | null;
    name: string;
    role: Role;
    status: UserStatus;
    updatedAt: Date;
}>;
declare const deleteUser: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    message: string;
}>;
declare const getAllCandidates: () => Promise<{
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: Role;
    status: UserStatus;
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const authServices: {
    registerUser: typeof registerUser;
    loginUser: typeof loginUser;
    getMe: typeof getMe;
    getNewToken: typeof getNewToken;
    changePassword: typeof changePassword;
    updateProfile: typeof updateProfile;
    logoutUser: typeof logoutUser;
    verifyEmail: typeof verifyEmail;
    forgetPassword: typeof forgetPassword;
    resetPassword: typeof resetPassword;
    googleLoginSuccess: typeof googleLoginSuccess;
    changeUserStatus: typeof changeUserStatus;
    deleteUser: typeof deleteUser;
    getAllCandidates: typeof getAllCandidates;
};
export {};
//# sourceMappingURL=auth.services.d.ts.map