import { Role } from "../../../generated/prisma/enums";

export interface ILoginUserPayload {
    email: string;
    password: string;
}

export interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
    role:string
}

export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export interface IUpdateProfilePayload {
    currentPassword: string;
    name?: string;
    image?: string | null;
    phone?: string;
    location?: string;
    experience?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
}

export interface IRequestUser{
    candidateProfile: any;
    id: any;
    userId : string;
    role : Role;
    email : string;
}