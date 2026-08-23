import openai from "../../config/openai";
import { envVars } from "../../config/env";

const EMBEDDING_MODEL =
  envVars.OPENROUTER_EMBEDDING_MODEL ||
  "nvidia/llama-nemotron-embed-vl-1b-v2:free";

export const generateEmbedding = async (
  text: string
): Promise<number[]> => {

  if (!text.trim()) {
    throw new Error("Text is required for embedding");
  }

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
    encoding_format: "float",
  });

  const embedding = response.data[0]?.embedding;

  if (!embedding) {
    throw new Error(
      "Failed to generate embedding"
    );
  }

  if (!Array.isArray(embedding)) {
    throw new Error(
      "Embedding response is not an array"
    );
  }

  console.log(
    "Embedding dimension:",
    embedding.length
  );

  return embedding;
};