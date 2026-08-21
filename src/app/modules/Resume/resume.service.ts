
import { extractResumeText } from "./resume.extractor";
import { parseResumeWithAI } from "./resume.ai";
import { prisma } from "../../lib/prisma";
import { cloudinaryUpload } from "../../config/cloudnary.config";
import { analyzeResumeWithAI } from "./resume.analysis";
import { generateResumeEmbedding } from "./embedding.service";

const uploadResume = async (
  userId: string,
  file: Express.Multer.File
) => {
  // ============================================
  // 1. Find candidate
  // ============================================

  //   console.log("========== STEP 1 ==========");
  // console.log("Finding candidate...");
  
  const candidate =
    await prisma.candidateProfile.findUnique({
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

  const uploadResult =
    await new Promise<any>((resolve, reject) => {
      const stream =
        cloudinaryUpload.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "resumes",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

      stream.end(file.buffer);
    });

  // ============================================
  // 3. Extract text + hyperlinks
  // ============================================

  const extracted = await extractResumeText(
    file.buffer,
    file.mimetype
  );

  const rawText = extracted.text;
  const links = extracted.links;

  // ============================================
  // 4. Validate extracted text
  // ============================================

  if (!rawText || !rawText.trim()) {
    throw new Error(
      "Could not extract text from resume"
    );
  }

  // ============================================
  // 5. Parse resume using Groq
  // ============================================

  const parsedData =
    await parseResumeWithAI(
      rawText,
      links
    );

  // ============================================
  // 6. Save resume
  // ============================================

  const resume =
    await prisma.resume.create({
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
  console.log("Resume Info",resume.id,rawText)
  await generateResumeEmbedding(
    resume.id,
    rawText
  );

  // ============================================
  // 8. Return resume
  // ============================================

  return resume;
};

const getMyResumes = async (userId: string) => {
  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  return prisma.resume.findMany({
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

 const getResumeById = async (
  userId: string,
  resumeId: string
) => {
  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const resume = await prisma.resume.findFirst({
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

 const deleteResume = async (
  userId: string,
  resumeId: string
) => {
  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidate.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  await cloudinaryUpload.uploader.destroy(
    resume.publicId,
    {
      resource_type: "raw",
    }
  );

  await prisma.resume.delete({
    where: {
      id: resume.id,
    },
  });

  return {
    message: "Resume deleted successfully",
  };
};

const analyzeResume = async (
  userId: string,
  resumeId: string
) => {
  //   console.log("========== ANALYZE RESUME ==========");
  // console.log("userId:", userId);
  // console.log("resumeId:", resumeId);

  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const resume = await prisma.resume.findFirst({
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
  const result = await analyzeResumeWithAI(
    resume.rawText
  );

  // Save result
  const analysis =
    await prisma.resumeAnalysis.upsert({
      where: {
        resumeId: resume.id,
      },

      update: {
        overallScore: result.overallScore,

        skillsScore: result.skillsScore,

        experienceScore:
          result.experienceScore,

        educationScore:
          result.educationScore,

        projectsScore:
          result.projectsScore,

        certificationsScore:
          result.certificationsScore,

        strengths: result.strengths,

        weaknesses: result.weaknesses,

        suggestions: result.suggestions,

        missingSkills: result.missingSkills,
      },

      create: {
        resumeId: resume.id,

        overallScore: result.overallScore,

        skillsScore: result.skillsScore,

        experienceScore:
          result.experienceScore,

        educationScore:
          result.educationScore,

        projectsScore:
          result.projectsScore,

        certificationsScore:
          result.certificationsScore,

        strengths: result.strengths,

        weaknesses: result.weaknesses,

        suggestions: result.suggestions,

        missingSkills: result.missingSkills,
      },
    });

  return analysis;
};

 const getResumeAnalysis = async (
  userId: string,
  resumeId: string
) => {
  const candidate =
    await prisma.candidateProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!candidate) {
    throw new Error("Candidate profile not found");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      candidateId: candidate.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  return prisma.resumeAnalysis.findUnique({
    where: {
      resumeId,
    },
  });
};

//summary 

export const resumeServices={
    uploadResume,getMyResumes,getResumeById,deleteResume,analyzeResume,getResumeAnalysis
}