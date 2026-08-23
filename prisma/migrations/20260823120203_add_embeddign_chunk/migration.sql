-- CreateTable
CREATE TABLE "resume_chunks" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "chunkText" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "embedding" vector(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resume_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resume_chunks_resumeId_idx" ON "resume_chunks"("resumeId");

-- AddForeignKey
ALTER TABLE "resume_chunks" ADD CONSTRAINT "resume_chunks_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
