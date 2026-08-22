import { GoogleGenAI } from "@google/genai";
import { prisma } from "../../../lib/prisma";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const generateInterviewQuestions = async (
  jobId: string,
  experienceLevel: string,
  interviewType: string
) => {
  // 1. Get job
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      company: true,
      requiredSkills: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // 2. Extract skills
  const skills = job.requiredSkills
    .map((skill) => skill.name)
    .join(", ");

  // 3. Create prompt
  const prompt = `
You are an expert technical interviewer.

Generate interview questions for this job.

Job Title:
${job.title}

Job Description:
${job.description}

Required Skills:
${skills}

Candidate Experience:
${experienceLevel}

Interview Type:
${interviewType}

Generate:

- 5 Technical Questions
- 3 Behavioral Questions
- 2 System Design Questions
- 3 Project Questions
- 3 Follow-up Questions

For every question provide:

question
difficulty
category

Return ONLY valid JSON.

Format:

{
  "technical": [
    {
      "question": "...",
      "difficulty": "Easy",
      "category": "Backend"
    }
  ],
  "behavioral": [],
  "systemDesign": [],
  "project": [],
  "followUp": []
}
`;

  // 4. Call Gemini
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  // 5. Get AI text
  const text = response.text;

  if (!text) {
    throw new Error("AI did not return a response");
  }

  // 6. Remove markdown code block if AI returns it
  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // 7. Convert JSON string to object
  const questions = JSON.parse(cleanedText);

  return {
    job: {
      id: job.id,
      title: job.title,
    },
    experienceLevel,
    interviewType,
    questions,
  };
};

export const InterviewQuestionService = {
  generateInterviewQuestions,
};