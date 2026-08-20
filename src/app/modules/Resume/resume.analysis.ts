import Groq from "groq-sdk";
import { envVars } from "../../config/env";

const groq = new Groq({
  apiKey: envVars.GROQ_API_KEY,
});

export const analyzeResumeWithAI = async (
  resumeText: string,
  jobDescription?: string
) => {
  const prompt = `
You are an expert ATS resume evaluator and professional career coach.

Analyze the candidate's resume carefully.

Your goal is to evaluate the quality, ATS compatibility,
completeness, relevance, and effectiveness of the resume.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use \`\`\`json.
4. Do NOT add explanations before or after the JSON.
5. Do NOT invent information.
6. Never assume that the candidate has a skill, experience,
   certification, education or achievement that is not present.
7. Scores must be integers between 0 and 100.
8. Base all analysis only on the provided resume.
9. If a target job description is provided, compare the resume
   against that job description.
10. If no job description is provided, do NOT pretend that
    keyword matching is job-specific.

SCORING:

overallScore:
Overall quality of the resume considering skills, experience,
education, projects, certifications, ATS compatibility,
content quality and completeness.

skillsScore:
Quality, relevance and presentation of the candidate's skills.

experienceScore:
Quality and relevance of professional experience.
If there is no professional experience, do not treat this as
a writing error. Score according to the available evidence.

educationScore:
Quality and completeness of education information.

projectsScore:
Quality, technical depth, descriptions and achievements
of projects.

certificationsScore:
Quality and relevance of certifications.
If there are no certifications, score according to the
candidate's profile rather than inventing certifications.

ATS SCORE:

atsScore should evaluate how well the resume can be processed
and understood by an ATS.

Consider:

- clear section headings
- standard resume structure
- readable text
- keyword usage
- bullet point quality
- unnecessary formatting
- missing important information
- contact information
- section completeness

ATS ANALYSIS:

keywordMatch:
Evaluate how well the resume uses relevant keywords.

formattingScore:
Evaluate ATS-friendly formatting based ONLY on the extracted
resume text.

sectionCompleteness:
Evaluate whether important resume sections and information
are present.

IMPORTANT:

Do not claim that a PDF has bad colors, fonts, columns,
graphics or visual formatting unless that information is
actually available from the extracted text.

KEYWORD ANALYSIS:

If a job description is provided:

- matchedKeywords = important keywords appearing in both
  the resume and job description.
- missingKeywords = important job-description keywords that
  are relevant to the candidate but are missing from the resume.
- matchPercentage = approximate percentage of important
  job-description keywords found in the resume.

If a job description is NOT provided:

- matchedKeywords = important technical/professional keywords
  found in the resume.
- missingKeywords = [].
- matchPercentage = 0.

Do NOT randomly select technologies such as AWS, Docker,
GraphQL or Kubernetes as missing skills unless they are
relevant to the provided job description.

FORMATTING ANALYSIS:

Evaluate formatting-related issues that can reasonably be
detected from extracted text.

Examples:

- missing professional summary
- missing graduation year
- missing contact information
- missing GitHub URL
- missing LinkedIn URL
- inconsistent section structure
- overly long bullet points
- paragraphs instead of concise bullets

Do not invent visual formatting problems.

MISSING INFORMATION:

Identify useful resume information that appears to be missing.

Examples:

- professional summary
- graduation year
- GitHub URL
- LinkedIn URL
- measurable achievements
- internship experience
- relevant coursework
- certifications

STRENGTHS:

Identify specific strengths from the actual resume.

WEAKNESSES:

Identify specific weaknesses from the actual resume.

SUGGESTIONS:

Provide practical and actionable improvements.

MISSING SKILLS:

If a job description is provided:
return relevant skills required by the job that are missing
from the resume.

If no job description is provided:
return skills that could reasonably improve the resume,
but clearly base them on the candidate's target/profile context.
Do not randomly list popular technologies.

Return exactly this JSON structure:

{
  "overallScore": 0,

  "skillsScore": 0,

  "experienceScore": 0,

  "educationScore": 0,

  "projectsScore": 0,

  "certificationsScore": 0,

  "atsScore": 0,

  "atsAnalysis": {
    "keywordMatch": 0,
    "formattingScore": 0,
    "sectionCompleteness": 0,
    "issues": []
  },

  "keywordAnalysis": {
    "matchedKeywords": [],
    "missingKeywords": [],
    "matchPercentage": 0
  },

  "formattingAnalysis": {
    "score": 0,
    "issues": []
  },

  "missingInformation": [],

  "strengths": [],

  "weaknesses": [],

  "suggestions": [],

  "missingSkills": []
}

TARGET JOB DESCRIPTION:

${jobDescription || "No job description provided."}

RESUME:

${resumeText}
`;

  const completion = await groq.chat.completions.create({
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

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Invalid AI JSON:", content);
    throw new Error("AI returned invalid JSON");
  }
};