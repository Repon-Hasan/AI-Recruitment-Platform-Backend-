"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestResume = void 0;
const prisma_1 = require("../../lib/prisma");
const chunking_service_1 = require("./chunking.service");
const embedding_serviceRaw_1 = require("./embedding.serviceRaw");
const ingestResume = async (resumeId) => {
    const resume = await prisma_1.prisma.resume.findUnique({
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
    const chunks = (0, chunking_service_1.chunkText)(resume.rawText);
    if (chunks.length === 0) {
        throw new Error("No chunks generated from resume");
    }
    await prisma_1.prisma.resumeChunk.deleteMany({
        where: {
            resumeId,
        },
    });
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await (0, embedding_serviceRaw_1.generateEmbedding)(chunk);
        const vectorString = `[${embedding.join(",")}]`;
        await prisma_1.prisma.$executeRaw `
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
exports.ingestResume = ingestResume;
