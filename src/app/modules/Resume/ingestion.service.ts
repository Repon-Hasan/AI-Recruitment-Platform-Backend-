
import { prisma } from "../../lib/prisma";
import { chunkText } from "./chunking.service";
import { generateEmbedding } from "./embedding.serviceRaw";

export const ingestResume = async (
  resumeId: string
): Promise<void> => {
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
    },
  });


  if (!resume) {
    throw new Error("Resume not found");
  }

  if (!resume.rawText?.trim()) {
    throw new Error("Resume text is empty");
  }

  const chunks = chunkText(resume.rawText);

  if (chunks.length === 0) {
    throw new Error("No chunks generated from resume");
  }

  await prisma.resumeChunk.deleteMany({
    where: {
      resumeId,
    },
  });

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    const embedding = await generateEmbedding(chunk);

    const vectorString = `[${embedding.join(",")}]`;

    await prisma.$executeRaw`
      INSERT INTO resume_chunks
      (
        id,
        "resumeId",
        "chunkText",
        "chunkIndex",
        embedding,
        "createdAt"
      )
      VALUES
      (
        gen_random_uuid(),
        ${resumeId},
        ${chunk},
        ${i},
        ${vectorString}::vector,
        NOW()
      )
    `;
  }
};