
import { prisma } from "../lib/prisma";
import { envVars } from "../config/env";

const OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/embeddings";

const EMBEDDING_MODEL =
  envVars.OPENROUTER_EMBEDDING_MODEL ||
  "nvidia/llama-nemotron-embed-vl-1b-v2:free";

export const generateEmbeddingServices = async (
  resumeId: string,
  resumeText: string
) => {
  if (!resumeText?.trim()) {
    throw new Error("Resume text is empty");
  }

  const apiKey = envVars.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set in .env"
    );
  }

  try {
    // 1. Generate embedding using OpenRouter
    const response = await fetch(
      OPENROUTER_API_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: EMBEDDING_MODEL,
          input: resumeText.trim(),
          encoding_format: "float",
        }),
      }
    );

    // 2. Handle API error
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `OpenRouter Embedding Error: ${response.status} ${errorText}`
      );
    }

    // 3. Parse response
    const data = await response.json();

    // 4. Validate embedding
    const embedding = data?.data?.[0]?.embedding;

    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error(
        "No embedding returned from OpenRouter"
      );
    }

    console.log(
      "Embedding model:",
      EMBEDDING_MODEL
    );

    console.log(
      "Embedding dimensions:",
      embedding.length
    );

    // 5. Convert embedding array to pgvector format
    const vector = `[${embedding.join(",")}]`;

    // 6. Store embedding in PostgreSQL
    await prisma.$executeRaw`
      UPDATE "resumes"
      SET "embedding" = ${vector}::vector
      WHERE "id" = ${resumeId}
    `;

    console.log(
      `Resume embedding stored successfully: ${resumeId}`
    );

    return {
      resumeId,
      dimensions: embedding.length,
    };
  } catch (error) {
    console.error(
      "Resume embedding generation failed:",
      error
    );

    throw error;
  }
};