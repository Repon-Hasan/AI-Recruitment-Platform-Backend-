import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";

const OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/embeddings";

const EMBEDDING_MODEL =
  envVars.OPENROUTER_EMBEDDING_MODEL ||
  "nvidia/llama-nemotron-embed-vl-1b-v2:free";

export const generateJobEmbedding = async (
  jobId: string,
  jobText: string
) => {
  if (!jobText?.trim()) {
    throw new Error("Job text is empty");
  }

  const apiKey = envVars.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set in .env"
    );
  }

  try {
    // 1. Call OpenRouter embedding API
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
          input: jobText.trim(),
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

    // 4. Get embedding
    const embedding =
      data?.data?.[0]?.embedding;

    if (
      !Array.isArray(embedding) ||
      embedding.length === 0
    ) {
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

    // 5. IMPORTANT:
    // Your Prisma field is vector(2048)
    if (embedding.length !== 2048) {
      throw new Error(
        `Embedding dimension mismatch. Expected 2048 but received ${embedding.length}`
      );
    }

    // 6. Convert array to pgvector format
    const vector = `[${embedding.join(",")}]`;

    // 7. Store embedding in Job table
    const updateResult = await prisma.$executeRaw`
      UPDATE "Job"
      SET "embedding" = ${vector}::vector
      WHERE "id" = ${jobId}
    `;

    if (updateResult !== 1) {
      throw new Error(
        `Embedding was not stored: job ${jobId} was not updated`
      );
    }

    // Prisma cannot expose Unsupported vector fields directly. Verify the
    // value using PostgreSQL so this log reflects the actual database state.
    const verification = await prisma.$queryRaw<
      { hasEmbedding: boolean; dimensions: number | null }[]
    >`
      SELECT
        "embedding" IS NOT NULL AS "hasEmbedding",
        CASE
          WHEN "embedding" IS NULL THEN NULL
          ELSE vector_dims("embedding")
        END AS dimensions
      FROM "Job"
      WHERE "id" = ${jobId}
    `;

    const stored = verification[0];
    if (!stored?.hasEmbedding || stored.dimensions !== 2048) {
      throw new Error(
        `Embedding verification failed for job ${jobId}: ${JSON.stringify(stored ?? null)}`
      );
    }

    console.log(
      `Job embedding verified in database: ${jobId} (${stored.dimensions} dimensions)`
    );

    return {
      jobId,
      dimensions: stored.dimensions,
    };
  } catch (error) {
    console.error(
      "Job embedding generation failed:",
      error
    );

    throw error;
  }
};