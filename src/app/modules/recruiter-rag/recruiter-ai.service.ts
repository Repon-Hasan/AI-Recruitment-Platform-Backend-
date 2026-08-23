
import { retrieveRelevantResumeChunks } from "./retrieval.service";
import { groupChunksByCandidate } from "./candidate-grouping.service";
import { generateRecruiterAnswer } from "./llm.service";
import { prisma } from "../../lib/prisma";
import { ingestResume } from "../Resume/ingestion.service";

export const ingestResumeForRAG = async (
  resumeId: string
) => {
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  await ingestResume(resumeId);

  return {
    resumeId,
    message: "Resume successfully indexed for RAG",
  };
};

export const askRecruiterAI = async (
  question: string,
  topK = 10
) => {
  const chunks = await retrieveRelevantResumeChunks(
    question,
    topK
  );

  if (chunks.length === 0) {
    return {
      summary:
        "No relevant candidates were found.",
      candidates: [],
      retrievedChunks: 0,
    };
  }

  const candidates = groupChunksByCandidate(chunks);

  const answer = await generateRecruiterAnswer(
    question,
    candidates
  );

  return {
    ...answer,
    retrievedChunks: chunks.length,
  };
};