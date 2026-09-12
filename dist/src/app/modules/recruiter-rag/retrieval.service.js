"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveRelevantResumeChunks = void 0;
const embedding_serviceRaw_1 = require("../Resume/embedding.serviceRaw");
const prisma_1 = require("../../lib/prisma");
const retrieveRelevantResumeChunks = async (question, topK = 10) => {
    // 1. Generate embedding for recruiter question
    const embedding = await (0, embedding_serviceRaw_1.generateEmbedding)(question);
    // 2. Convert embedding array to PostgreSQL vector format
    const vectorString = `[${embedding.join(",")}]`;
    // 3. Search similar resume chunks
    const results = await prisma_1.prisma.$queryRaw `
    SELECT
      rc.id,
      rc."resumeId",

      r."candidateId" AS "candidateId",

      rc."chunkText",
      rc."chunkIndex",

      CAST(
        1 - (rc.embedding <=> CAST(${vectorString} AS vector))
        AS FLOAT
      ) AS similarity,

      u.name AS "candidateName",
      u.email AS "candidateEmail",

      r."fileName" AS "resumeFileName"

    FROM resume_chunks rc

    INNER JOIN resumes r
      ON r.id = rc."resumeId"

    INNER JOIN candidate_profile cp
      ON cp.id = r."candidateId"

    INNER JOIN "user" u
      ON u.id = cp."userId"

    WHERE rc.embedding IS NOT NULL

    ORDER BY
      rc.embedding <=> CAST(${vectorString} AS vector)

    LIMIT ${topK}
  `;
    return results;
};
exports.retrieveRelevantResumeChunks = retrieveRelevantResumeChunks;
