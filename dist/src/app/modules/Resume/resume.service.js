"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeServices = void 0;
const resume_extractor_1 = require("./resume.extractor");
const resume_ai_1 = require("./resume.ai");
const prisma_1 = require("../../lib/prisma");
const cloudnary_config_1 = require("../../config/cloudnary.config");
const resume_analysis_1 = require("./resume.analysis");
const embedding_service_1 = require("./embedding.service");
const uploadResume = async (userId, file) => {
    // ============================================
    // 1. Find candidate
    // ============================================
    //   console.log("========== STEP 1 ==========");
    // console.log("Finding candidate...");
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    // ============================================
    // 2. Upload resume to Cloudinary
    // ============================================
    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudnary_config_1.cloudinaryUpload.uploader.upload_stream({
            resource_type: "raw",
            folder: "resumes",
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
        stream.end(file.buffer);
    });
    // ============================================
    // 3. Extract text + hyperlinks
    // ============================================
    const extracted = await (0, resume_extractor_1.extractResumeText)(file.buffer, file.mimetype);
    const rawText = extracted.text;
    const links = extracted.links;
    // ============================================
    // 4. Validate extracted text
    // ============================================
    if (!rawText || !rawText.trim()) {
        throw new Error("Could not extract text from resume");
    }
    // ============================================
    // 5. Parse resume using Groq
    // ============================================
    const parsedData = await (0, resume_ai_1.parseResumeWithAI)(rawText, links);
    // ============================================
    // 6. Save resume
    // ============================================
    const resume = await prisma_1.prisma.resume.create({
        data: {
            candidateId: candidate.id,
            fileName: file.originalname,
            fileUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            fileType: file.mimetype,
            fileSize: file.size,
            rawText,
            parsedData,
        },
    });
    // ============================================
    // 7. Generate embedding
    // ============================================
    console.log("Resume Info", resume.id, rawText);
    await (0, embedding_service_1.generateResumeEmbedding)(resume.id, rawText);
    // ============================================
    // 8. Return resume
    // ============================================
    return resume;
};
const getMyResumes = async (userId) => {
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    return prisma_1.prisma.resume.findMany({
        where: {
            candidateId: candidate.id,
        },
        include: {
            analysis: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getResumeById = async (userId, resumeId) => {
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    const resume = await prisma_1.prisma.resume.findFirst({
        where: {
            id: resumeId,
            candidateId: candidate.id,
        },
        include: {
            analysis: true,
        },
    });
    if (!resume) {
        throw new Error("Resume not found");
    }
    return resume;
};
const deleteResume = async (userId, resumeId) => {
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    const resume = await prisma_1.prisma.resume.findFirst({
        where: {
            id: resumeId,
            candidateId: candidate.id,
        },
    });
    if (!resume) {
        throw new Error("Resume not found");
    }
    await cloudnary_config_1.cloudinaryUpload.uploader.destroy(resume.publicId, {
        resource_type: "raw",
    });
    await prisma_1.prisma.resume.delete({
        where: {
            id: resume.id,
        },
    });
    return {
        message: "Resume deleted successfully",
    };
};
const analyzeResume = async (userId, resumeId) => {
    //   console.log("========== ANALYZE RESUME ==========");
    // console.log("userId:", userId);
    // console.log("resumeId:", resumeId);
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    const resume = await prisma_1.prisma.resume.findFirst({
        where: {
            id: resumeId,
            candidateId: candidate.id,
        },
    });
    if (!resume) {
        throw new Error("Resume not found");
    }
    if (!resume.rawText) {
        throw new Error("Resume text not available");
    }
    // AI analysis
    const result = await (0, resume_analysis_1.analyzeResumeWithAI)(resume.rawText);
    // Save result
    const analysis = await prisma_1.prisma.resumeAnalysis.upsert({
        where: {
            resumeId: resume.id,
        },
        update: {
            overallScore: result.overallScore,
            skillsScore: result.skillsScore,
            experienceScore: result.experienceScore,
            educationScore: result.educationScore,
            projectsScore: result.projectsScore,
            certificationsScore: result.certificationsScore,
            strengths: result.strengths,
            weaknesses: result.weaknesses,
            suggestions: result.suggestions,
            missingSkills: result.missingSkills,
        },
        create: {
            resumeId: resume.id,
            overallScore: result.overallScore,
            skillsScore: result.skillsScore,
            experienceScore: result.experienceScore,
            educationScore: result.educationScore,
            projectsScore: result.projectsScore,
            certificationsScore: result.certificationsScore,
            strengths: result.strengths,
            weaknesses: result.weaknesses,
            suggestions: result.suggestions,
            missingSkills: result.missingSkills,
        },
    });
    return analysis;
};
const getResumeAnalysis = async (userId, resumeId) => {
    const candidate = await prisma_1.prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    const resume = await prisma_1.prisma.resume.findFirst({
        where: {
            id: resumeId,
            candidateId: candidate.id,
        },
    });
    if (!resume) {
        throw new Error("Resume not found");
    }
    return prisma_1.prisma.resumeAnalysis.findUnique({
        where: {
            resumeId,
        },
    });
};
//summary 
exports.resumeServices = {
    uploadResume, getMyResumes, getResumeById, deleteResume, analyzeResume, getResumeAnalysis
};
