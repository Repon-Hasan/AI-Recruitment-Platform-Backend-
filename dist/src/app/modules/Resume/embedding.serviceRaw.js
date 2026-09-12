"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbedding = void 0;
const openai_1 = __importDefault(require("../../config/openai"));
const env_1 = require("../../config/env");
const EMBEDDING_MODEL = env_1.envVars.OPENROUTER_EMBEDDING_MODEL ||
    "nvidia/llama-nemotron-embed-vl-1b-v2:free";
const generateEmbedding = async (text) => {
    if (!text.trim()) {
        throw new Error("Text is required for embedding");
    }
    const response = await openai_1.default.embeddings.create({
        model: EMBEDDING_MODEL,
        input: text,
        encoding_format: "float",
    });
    const embedding = response.data[0]?.embedding;
    if (!embedding) {
        throw new Error("Failed to generate embedding");
    }
    if (!Array.isArray(embedding)) {
        throw new Error("Embedding response is not an array");
    }
    console.log("Embedding dimension:", embedding.length);
    return embedding;
};
exports.generateEmbedding = generateEmbedding;
