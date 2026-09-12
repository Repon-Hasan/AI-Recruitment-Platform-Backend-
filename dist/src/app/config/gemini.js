"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genai_1 = require("@google/genai");
const env_1 = require("./env");
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
}
const gemini = new genai_1.GoogleGenAI({
    apiKey: env_1.envVars.GEMINI_API_KEY,
});
exports.default = gemini;
