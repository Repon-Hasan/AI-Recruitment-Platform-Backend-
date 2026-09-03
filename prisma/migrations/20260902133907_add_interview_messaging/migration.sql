/*
  Warnings:

  - You are about to drop the column `referenceId` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('SCHEDULED', 'STARTED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('VIDEO', 'PHONE', 'IN_PERSON');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'INTERVIEW_RESCHEDULED';
ALTER TYPE "NotificationType" ADD VALUE 'INTERVIEW_CANCELLED';
ALTER TYPE "NotificationType" ADD VALUE 'INTERVIEW_REMINDER';
ALTER TYPE "NotificationType" ADD VALUE 'NEW_MESSAGE';

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "referenceId",
ADD COLUMN     "applicationId" TEXT,
ADD COLUMN     "interviewId" TEXT;

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "jobApplicationId" TEXT NOT NULL,
    "scheduledById" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 30,
    "type" "InterviewType" NOT NULL DEFAULT 'VIDEO',
    "status" "InterviewStatus" NOT NULL DEFAULT 'SCHEDULED',
    "meetingUrl" TEXT,
    "title" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Interview_jobApplicationId_idx" ON "Interview"("jobApplicationId");

-- CreateIndex
CREATE INDEX "Interview_scheduledById_idx" ON "Interview"("scheduledById");

-- CreateIndex
CREATE INDEX "Interview_scheduledAt_idx" ON "Interview"("scheduledAt");

-- CreateIndex
CREATE INDEX "Interview_status_idx" ON "Interview"("status");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- CreateIndex
CREATE INDEX "Notification_applicationId_idx" ON "Notification"("applicationId");

-- CreateIndex
CREATE INDEX "Notification_interviewId_idx" ON "Notification"("interviewId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_scheduledById_fkey" FOREIGN KEY ("scheduledById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
