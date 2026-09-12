"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRecruiterAnswer = void 0;
const gemini_1 = __importDefault(require("../../config/gemini"));
const prompt_1 = require("./prompt");
const LLM_MODEL = process.env.GEMINI_LLM_MODEL || "gemini-3.6-flash";
const generateRecruiterAnswer = async (question, candidates) => {
    const prompt = (0, prompt_1.buildRecruiterPrompt)(question, candidates);
    const response = await gemini_1.default.models.generateContent({
        model: LLM_MODEL,
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `
You are a precise AI recruitment assistant.

Rules:
- Never invent candidate information.
- Only use information provided in the candidate data.
- Return valid JSON only.
- Match candidates based on evidence.
- Explain why each candidate matches.
- Mention missing requirements when applicable.

${prompt}
`,
                    },
                ],
            },
        ],
        config: {
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    summary: {
                        type: "string",
                    },
                    candidates: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                candidateId: {
                                    type: "string",
                                },
                                name: {
                                    type: "string",
                                },
                                matchScore: {
                                    type: "number",
                                },
                                reason: {
                                    type: "string",
                                },
                                evidence: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                    },
                                },
                                missingRequirements: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                    },
                                },
                            },
                            required: [
                                "candidateId",
                                "name",
                                "matchScore",
                                "reason",
                                "evidence",
                                "missingRequirements",
                            ],
                        },
                    },
                },
                required: [
                    "summary",
                    "candidates",
                ],
            },
        },
    });
    const content = response.text;
    if (!content) {
        throw new Error("Gemini returned an empty response");
    }
    let parsed;
    try {
        parsed = JSON.parse(content);
    }
    catch {
        throw new Error("Gemini returned invalid JSON");
    }
    if (typeof parsed !== "object" ||
        parsed === null ||
        !("summary" in parsed) ||
        !("candidates" in parsed)) {
        throw new Error("Invalid recruiter AI response");
    }
    return parsed;
};
exports.generateRecruiterAnswer = generateRecruiterAnswer;
