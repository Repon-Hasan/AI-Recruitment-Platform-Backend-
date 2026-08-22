import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/embeddings";
const EMBEDDING_MODEL = envVars.OPENROUTER_EMBEDDING_MODEL ||
    "nvidia/llama-nemotron-embed-vl-1b-v2:free";
export const generateJobEmbedding = async (jobId, jobText) => {
    if (!jobText?.trim()) {
        throw new Error("Job text is empty");
    }
    const apiKey = envVars.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set in .env");
    }
    try {
        // 1. Call OpenRouter embedding API
        const response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: EMBEDDING_MODEL,
                input: jobText.trim(),
                encoding_format: "float",
            }),
        });
        // 2. Handle API error
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter Embedding Error: ${response.status} ${errorText}`);
        }
        // 3. Parse response
        const data = await response.json();
        // 4. Get embedding
        const embedding = data?.data?.[0]?.embedding;
        if (!Array.isArray(embedding) ||
            embedding.length === 0) {
            throw new Error("No embedding returned from OpenRouter");
        }
        console.log("Embedding model:", EMBEDDING_MODEL);
        console.log("Embedding dimensions:", embedding.length);
        // 5. IMPORTANT:
        // Your Prisma field is vector(2048)
        if (embedding.length !== 2048) {
            throw new Error(`Embedding dimension mismatch. Expected 2048 but received ${embedding.length}`);
        }
        // 6. Convert array to pgvector format
        const vector = `[${embedding.join(",")}]`;
        // 7. Store embedding in Job table
        await prisma.$executeRaw `
      UPDATE "Job"
      SET "embedding" = ${vector}::vector
      WHERE "id" = ${jobId}
    `;
        console.log(`Job embedding stored successfully: ${jobId}`);
        return {
            jobId,
            dimensions: embedding.length,
        };
    }
    catch (error) {
        console.error("Job embedding generation failed:", error);
        throw error;
    }
};
