"use strict";
// services/llm.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAnswer = generateAnswer;
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
async function generateAnswer(query, context) {
    const prompt = `
You are an AI Recruiter Assistant.

Recruiter question:
${query}

Retrieved recruitment data:
${context}

Rules:

1. ONLY use the retrieved recruitment data.
2. NEVER invent candidate information.
3. NEVER assume information that is not provided.
4. Rank candidates based on the supplied scores and relevant skills.
5. Explain why each candidate is recommended.
6. If the retrieved data is insufficient, clearly say so.
7. Keep the answer concise and professional.
`;
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });
    const answer = response.text;
    if (!answer) {
        throw new Error("Gemini did not return an answer");
    }
    return answer;
}
