/*
  Warnings:

  - You are about to drop the `CandidateEmbedding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CandidateEmbedding" DROP CONSTRAINT "CandidateEmbedding_candidateProfileId_fkey";

-- DropTable
DROP TABLE "CandidateEmbedding";

-- CreateTable
CREATE TABLE "candidate_embeddings" (
    "id" TEXT NOT NULL,
    "candidateProfileId" TEXT NOT NULL,
    "embedding" vector(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidate_embeddings_candidateProfileId_key" ON "candidate_embeddings"("candidateProfileId");

-- AddForeignKey
ALTER TABLE "candidate_embeddings" ADD CONSTRAINT "candidate_embeddings_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
