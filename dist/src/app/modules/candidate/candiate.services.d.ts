declare const getMyProfile: (userId: string) => Promise<{
    certifications: {
        id: string;
        name: string;
        issuer: string | null;
        issueDate: Date | null;
        credentialUrl: string | null;
        candidateId: string;
        image: string | null;
    }[];
    education: {
        id: string;
        institution: string;
        degree: string | null;
        field: string | null;
        startYear: number | null;
        endYear: number | null;
        candidateId: string;
    }[];
    projects: {
        id: string;
        name: string;
        description: string | null;
        technologies: string | null;
        projectUrl: string | null;
        candidateId: string;
        image: string | null;
    }[];
    skills: {
        id: string;
        name: string;
        candidateId: string;
    }[];
} & {
    id: string;
    userId: string;
    phone: string | null;
    location: string | null;
    bio: string | null;
    experience: string | null;
    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateMyProfile: (userId: string, payload: {
    name?: string;
    bio?: string;
    phone?: string;
    location?: string;
    experience?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
}) => Promise<{
    certifications: {
        id: string;
        name: string;
        issuer: string | null;
        issueDate: Date | null;
        credentialUrl: string | null;
        candidateId: string;
        image: string | null;
    }[];
    education: {
        id: string;
        institution: string;
        degree: string | null;
        field: string | null;
        startYear: number | null;
        endYear: number | null;
        candidateId: string;
    }[];
    projects: {
        id: string;
        name: string;
        description: string | null;
        technologies: string | null;
        projectUrl: string | null;
        candidateId: string;
        image: string | null;
    }[];
    skills: {
        id: string;
        name: string;
        candidateId: string;
    }[];
    user: {
        email: string;
        id: string;
        image: string | null;
        name: string;
    };
} & {
    id: string;
    userId: string;
    phone: string | null;
    location: string | null;
    bio: string | null;
    experience: string | null;
    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const addSkill: (userId: string, skills: string | {
    name: string;
}[]) => Promise<import("../../../generated/prisma/internal/prismaNamespace").BatchPayload | {
    id: string;
    name: string;
    candidateId: string;
}>;
declare const deleteSkill: (userId: string, skillId: string) => Promise<null>;
declare const addEducation: (userId: string, payload: {
    institution: string;
    degree?: string;
    field?: string;
    startYear?: number;
    endYear?: number;
}) => Promise<{
    id: string;
    institution: string;
    degree: string | null;
    field: string | null;
    startYear: number | null;
    endYear: number | null;
    candidateId: string;
}>;
declare const updateEducation: (userId: string, educationId: string, payload: {
    institution?: string;
    degree?: string;
    field?: string;
    startYear?: number;
    endYear?: number;
}) => Promise<{
    id: string;
    institution: string;
    degree: string | null;
    field: string | null;
    startYear: number | null;
    endYear: number | null;
    candidateId: string;
}>;
declare const deleteEducation: (userId: string, educationId: string) => Promise<null>;
declare const createProject: (userId: string, payload: CreateProjectPayload) => Promise<{
    id: string;
    name: string;
    description: string | null;
    technologies: string | null;
    projectUrl: string | null;
    candidateId: string;
    image: string | null;
}>;
declare const getMyProjects: (candidateId: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    technologies: string | null;
    projectUrl: string | null;
    candidateId: string;
    image: string | null;
}[]>;
declare const getProjectById: (candidateId: string, projectId: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    technologies: string | null;
    projectUrl: string | null;
    candidateId: string;
    image: string | null;
} | null>;
declare const updateProject: (candidateId: string, projectId: string, payload: UpdateProjectPayload) => Promise<{
    id: string;
    name: string;
    description: string | null;
    technologies: string | null;
    projectUrl: string | null;
    candidateId: string;
    image: string | null;
}>;
declare const deleteProject: (candidateId: string, projectId: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    technologies: string | null;
    projectUrl: string | null;
    candidateId: string;
    image: string | null;
}>;
declare const createCertification: (userId: string, payload: CreateCertificationPayload) => Promise<{
    id: string;
    name: string;
    issuer: string | null;
    issueDate: Date | null;
    credentialUrl: string | null;
    candidateId: string;
    image: string | null;
}>;
declare const getMyCertifications: (candidateId: string) => Promise<{
    id: string;
    name: string;
    issuer: string | null;
    issueDate: Date | null;
    credentialUrl: string | null;
    candidateId: string;
    image: string | null;
}[]>;
declare const getCertificationById: (candidateId: string, certificationId: string) => Promise<{
    id: string;
    name: string;
    issuer: string | null;
    issueDate: Date | null;
    credentialUrl: string | null;
    candidateId: string;
    image: string | null;
} | null>;
declare const updateCertification: (candidateId: string, certificationId: string, payload: UpdateCertificationPayload) => Promise<{
    id: string;
    name: string;
    issuer: string | null;
    issueDate: Date | null;
    credentialUrl: string | null;
    candidateId: string;
    image: string | null;
}>;
declare const deleteCertification: (candidateId: string, certificationId: string) => Promise<{
    id: string;
    name: string;
    issuer: string | null;
    issueDate: Date | null;
    credentialUrl: string | null;
    candidateId: string;
    image: string | null;
}>;
export declare const candidateService: {
    getMyProfile: typeof getMyProfile;
    updateMyProfile: typeof updateMyProfile;
    addSkill: typeof addSkill;
    deleteSkill: typeof deleteSkill;
    addEducation: typeof addEducation;
    updateEducation: typeof updateEducation;
    deleteEducation: typeof deleteEducation;
    createProject: typeof createProject;
    getMyProjects: typeof getMyProjects;
    getProjectById: typeof getProjectById;
    updateProject: typeof updateProject;
    deleteProject: typeof deleteProject;
    createCertification: typeof createCertification;
    getMyCertifications: typeof getMyCertifications;
    getCertificationById: typeof getCertificationById;
    updateCertification: typeof updateCertification;
    deleteCertification: typeof deleteCertification;
};
export {};
//# sourceMappingURL=candiate.services.d.ts.map