"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const env_1 = require("./env");
const openai = new openai_1.default({
    apiKey: env_1.envVars.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});
exports.default = openai;
