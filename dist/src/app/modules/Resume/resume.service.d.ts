declare const uploadResume: (userId: string, file: Express.Multer.File) => Promise<{
    id: string;
    candidateId: string;
    fileName: string;
    fileUrl: string;
    publicId: string;
    fileType: string;
    fileSize: number | null;
    rawText: string | null;
    parsedData: import("@prisma/client/runtime/client").JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getMyResumes: (userId: string) => Promise<({
    analysis: {
        id: string;
        resumeId: string;
        overallScore: number;
        skillsScore: number;
        experienceScore: number;
        educationScore: number;
        projectsScore: number;
        certificationsScore: number;
        strengths: import("@prisma/client/runtime/client").JsonValue;
        weaknesses: import("@prisma/client/runtime/client").JsonValue;
        suggestions: import("@prisma/client/runtime/client").JsonValue;
        missingSkills: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    candidateId: string;
    fileName: string;
    fileUrl: string;
    publicId: string;
    fileType: string;
    fileSize: number | null;
    rawText: string | null;
    parsedData: import("@prisma/client/runtime/client").JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getResumeById: (userId: string, resumeId: string) => Promise<{
    analysis: {
        id: string;
        resumeId: string;
        overallScore: number;
        skillsScore: number;
        experienceScore: number;
        educationScore: number;
        projectsScore: number;
        certificationsScore: number;
        strengths: import("@prisma/client/runtime/client").JsonValue;
        weaknesses: import("@prisma/client/runtime/client").JsonValue;
        suggestions: import("@prisma/client/runtime/client").JsonValue;
        missingSkills: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    candidateId: string;
    fileName: string;
    fileUrl: string;
    publicId: string;
    fileType: string;
    fileSize: number | null;
    rawText: string | null;
    parsedData: import("@prisma/client/runtime/client").JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deleteResume: (userId: string, resumeId: string) => Promise<{
    message: string;
}>;
declare const analyzeResume: (userId: string, resumeId: string) => Promise<{
    id: string;
    resumeId: string;
    overallScore: number;
    skillsScore: number;
    experienceScore: number;
    educationScore: number;
    projectsScore: number;
    certificationsScore: number;
    strengths: import("@prisma/client/runtime/client").JsonValue;
    weaknesses: import("@prisma/client/runtime/client").JsonValue;
    suggestions: import("@prisma/client/runtime/client").JsonValue;
    missingSkills: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getResumeAnalysis: (userId: string, resumeId: string) => Promise<{
    id: string;
    resumeId: string;
    overallScore: number;
    skillsScore: number;
    experienceScore: number;
    educationScore: number;
    projectsScore: number;
    certificationsScore: number;
    strengths: import("@prisma/client/runtime/client").JsonValue;
    weaknesses: import("@prisma/client/runtime/client").JsonValue;
    suggestions: import("@prisma/client/runtime/client").JsonValue;
    missingSkills: import("@prisma/client/runtime/client").JsonValue;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const resumeServices: {
    uploadResume: typeof uploadResume;
    getMyResumes: typeof getMyResumes;
    getResumeById: typeof getResumeById;
    deleteResume: typeof deleteResume;
    analyzeResume: typeof analyzeResume;
    getResumeAnalysis: typeof getResumeAnalysis;
};
export {};
//# sourceMappingURL=resume.service.d.ts.map