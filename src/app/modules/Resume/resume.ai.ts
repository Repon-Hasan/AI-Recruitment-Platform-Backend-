import Groq from "groq-sdk";
import { envVars } from "../../config/env";

const groq = new Groq({
  apiKey: envVars.GROQ_API_KEY,
});
console.log("GROQ KEY EXISTS:", !!envVars.GROQ_API_KEY);

// const models = await groq.models.list();

// console.log(
//   models.data.map((model) => model.id)
// );
export const parseResumeWithAI = async (text: string) => {
const prompt = `
You are a professional resume parser.

Extract structured information from this resume.

IMPORTANT:
- Return ONLY a valid JSON object.
- Do NOT use markdown.
- Do NOT use \`\`\`json.
- Do NOT add explanations before or after the JSON.

Schema:
{
  "summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": [],
  "certifications": []
}

Resume:
${text}
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

  return JSON.parse(content);
};