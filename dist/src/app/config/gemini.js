import { GoogleGenAI } from "@google/genai";
import { envVars } from "./env";
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
}
const gemini = new GoogleGenAI({
    apiKey: envVars.GEMINI_API_KEY,
});
export default gemini;
