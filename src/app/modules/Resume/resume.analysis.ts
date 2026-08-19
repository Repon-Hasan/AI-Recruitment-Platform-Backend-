import Groq from "groq-sdk";
import { envVars } from "../../config/env";

const groq = new Groq({
  apiKey: envVars.GROQ_API_KEY,
});

export const analyzeResumeWithAI = async (
  resumeText: string
) => {
  const prompt = `
You are an expert ATS resume evaluator.

Analyze the following resume.

Return ONLY valid JSON.

Use this structure:

{
  "overallScore": 0,
  "skillsScore": 0,
  "experienceScore": 0,
  "educationScore": 0,
  "projectsScore": 0,
  "certificationsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "missingSkills": []
}

Rules:

- Scores must be between 0 and 100.
- overallScore should represent overall resume quality.
- Do not invent information.
- Give practical suggestions.
- Evaluate ATS friendliness, skills, experience,
  projects, education and certifications.
- Extract GitHub and LinkedIn URLs exactly as they appear in the resume.
- Do not guess or generate URLs.
- If a URL is not present in the extracted text, return an empty string.

Resume:

${resumeText}
`;

  const completion =
    await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const content =
    completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned empty response");
  }

  return JSON.parse(content);
};