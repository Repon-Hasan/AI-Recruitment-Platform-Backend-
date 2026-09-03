/*
  Warnings:

  - Made the column `location` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experienceLevel` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employmentType` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InterviewSession" DROP CONSTRAINT "InterviewSession_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "experienceLevel" SET NOT NULL,
ALTER COLUMN "employmentType" SET NOT NULL;

-- CreateIndex
CREATE INDEX "InterviewSession_candidateProfileId_idx" ON "InterviewSession"("candidateProfileId");

-- CreateIndex
CREATE INDEX "InterviewSession_jobId_idx" ON "InterviewSession"("jobId");

-- CreateIndex
CREATE INDEX "InterviewSession_status_idx" ON "InterviewSession"("status");

-- CreateIndex
CREATE INDEX "InterviewSession_createdAt_idx" ON "InterviewSession"("createdAt");

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "candidate_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
