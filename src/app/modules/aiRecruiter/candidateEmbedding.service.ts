import { envVars } from "../../config/env";

const OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/embeddings";

const EMBEDDING_MODEL =
  envVars.OPENROUTER_EMBEDDING_MODEL ||
  "nvidia/llama-nemotron-embed-vl-1b-v2:free";

export const CandidateEmbeddingService = async (
  text: string,
  model: string = EMBEDDING_MODEL
): Promise<number[]> => {

  // =====================================
  // 1. Validate text
  // =====================================

  if (!text?.trim()) {
    throw new Error(
      "Text is empty. Cannot generate embedding."
    );
  }

  // =====================================
  // 2. Get OpenRouter API key
  // =====================================

  const apiKey = envVars.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set in .env"
    );
  }

  // =====================================
  // 3. Call OpenRouter Embedding API
  // =====================================

  try {
    const response = await fetch(
      OPENROUTER_API_URL,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model,
          input: text.trim(),
          encoding_format: "float",
        }),
      }
    );

    // =====================================
    // 4. Handle API error
    // =====================================

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `OpenRouter Embedding Error: ${response.status} ${errorText}`
      );
    }

    // =====================================
    // 5. Parse response
    // =====================================

    const data = await response.json();

    // =====================================
    // 6. Extract embedding
    // =====================================

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

    // =====================================
    // 7. Validate numbers
    // =====================================

    if (
      !embedding.every(
        (value: unknown) =>
          typeof value === "number"
      )
    ) {
      throw new Error(
        "OpenRouter returned an invalid embedding"
      );
    }

    console.log(
      "Embedding model:",
      model
    );

    console.log(
      "Embedding dimensions:",
      embedding.length
    );

    // =====================================
    // 8. Return number[]
    // =====================================

    return embedding;

  } catch (error) {

    console.error(
      "Candidate embedding generation failed:",
      error
    );

    throw error;
  }
};