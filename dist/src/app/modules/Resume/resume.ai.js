import Groq from "groq-sdk";
import { envVars } from "../../config/env";
const groq = new Groq({
    apiKey: envVars.GROQ_API_KEY,
});
export const parseResumeWithAI = async (text, links) => {
    const prompt = `
You are a professional resume parser.

Extract structured information from the resume.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use \`\`\`json.
4. Do NOT add explanations before or after the JSON.
5. Do NOT invent information.
6. If information is missing, return an empty value.
7. Preserve the candidate's information accurately.
8. Do not create skills, experiences, projects, certifications,
   education or URLs that are not present.
9. Use the detected hyperlinks provided below.
10. Never guess or generate a GitHub or LinkedIn URL.
11. Keep descriptions concise but informative.

DETECTED HYPERLINKS:

${links.length > 0 ? links.join("\n") : "No hyperlinks detected."}

IMPORTANT URL RULES:

- If a detected URL belongs to GitHub, use it as githubUrl.
- If a detected URL belongs to LinkedIn, use it as linkedinUrl.
- If GitHub URL is not detected, return "".
- If LinkedIn URL is not detected, return "".
- Never construct URLs yourself.

Return exactly this structure:

{
  "summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": [],
  "certifications": [],
  "githubUrl": "",
  "linkedinUrl": ""
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
    const content = completion.choices[0]?.message?.content;
    if (!content) {
        throw new Error("AI returned empty response");
    }
    try {
        return JSON.parse(content);
    }
    catch (error) {
        console.error("Invalid AI response:", content);
        throw new Error("AI returned invalid JSON");
    }
};
