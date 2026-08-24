import OpenAI from "openai";
import { envVars } from "./env";
const openai = new OpenAI({
    apiKey: envVars.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});
export default openai;
