-- CreateTable
CREATE TABLE "CandidateEmbedding" (
    "id" TEXT NOT NULL,
    "candidateProfileId" TEXT NOT NULL,
    "embedding" vector(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateEmbedding_candidateProfileId_key" ON "CandidateEmbedding"("candidateProfileId");

-- AddForeignKey
ALTER TABLE "CandidateEmbedding" ADD CONSTRAINT "CandidateEmbedding_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
