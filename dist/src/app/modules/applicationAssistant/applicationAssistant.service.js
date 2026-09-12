// applicationAssistant.service.ts
import { GoogleGenAI } from "@google/genai";
import { prisma } from "../../lib/prisma";
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
const generateApplicationAssistant = async (userId, jobId, resumeId) => {
    // 1. Get candidate profile
    const candidate = await prisma.candidateProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!candidate) {
        throw new Error("Candidate profile not found");
    }
    //   console.log("Candidate", candidate.id);
    // 2. Get job
    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
    });
    if (!job) {
        throw new Error("Job not found");
    }
    const candidateProfileId = candidate.id;
    // 3. Get resume
    const resume = await prisma.resume.findFirst({
        where: {
            id: resumeId,
            candidateId: candidateProfileId,
        },
    });
    if (!resume) {
        throw new Error("Resume not found or does not belong to this candidate");
    }
    // 4. Prepare AI prompt
    const prompt = `
You are an AI recruitment assistant.

Analyze the candidate resume against the job.

JOB:
Title: ${job.title}

Description:
${job.description}

CANDIDATE RESUME:
${resume.rawText ?? ""}

Return ONLY valid JSON.

Format:

{
  "matchScore": 0,
  "recommendation": "",
  "missingSkills": [],
  "suggestions": [],
  "applicationTips": []
}

Rules:
- matchScore must be between 0 and 100
- missingSkills must contain skills required by the job but missing from resume
- suggestions must provide practical resume improvements
- applicationTips must provide useful application advice
`;
    // 5. Ask Gemini
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });
    const text = response.text;
    if (!text) {
        throw new Error("AI failed to generate response");
    }
    // 6. Remove markdown if AI returns ```json
    const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    // 7. Convert AI response to object
    const result = JSON.parse(cleanText);
    // 8. Save result
    const saved = await prisma.applicationAssistant.upsert({
        where: {
            candidateProfileId_jobId: {
                candidateProfileId: candidate.id,
                jobId,
            },
        },
        update: {
            resumeId: resume.id,
            matchScore: result.matchScore,
            recommendation: result.recommendation,
            missingSkills: result.missingSkills,
            suggestions: result.suggestions,
            applicationTips: result.applicationTips,
        },
        create: {
            candidateProfileId: candidate.id,
            jobId,
            resumeId: resume.id,
            matchScore: result.matchScore,
            recommendation: result.recommendation,
            missingSkills: result.missingSkills,
            suggestions: result.suggestions,
            applicationTips: result.applicationTips,
        },
    });
    return saved;
};
export const ApplicationAssistantService = {
    generateApplicationAssistant,
};
