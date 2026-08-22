-- CreateTable
CREATE TABLE "ApplicationAssistant" (
    "id" TEXT NOT NULL,
    "candidateProfileId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "resumeId" TEXT,
    "matchScore" INTEGER NOT NULL,
    "recommendation" TEXT NOT NULL,
    "missingSkills" JSONB NOT NULL,
    "suggestions" JSONB NOT NULL,
    "applicationTips" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationAssistant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationAssistant_candidateProfileId_jobId_key" ON "ApplicationAssistant"("candidateProfileId", "jobId");

-- AddForeignKey
ALTER TABLE "ApplicationAssistant" ADD CONSTRAINT "ApplicationAssistant_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "candidate_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAssistant" ADD CONSTRAINT "ApplicationAssistant_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
