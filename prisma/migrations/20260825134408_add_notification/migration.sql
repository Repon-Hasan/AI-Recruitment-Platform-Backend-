-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('APPLICATION_SUBMITTED', 'APPLICATION_STATUS_CHANGED', 'APPLICATION_SHORTLISTED', 'APPLICATION_REJECTED', 'APPLICATION_ACCEPTED', 'INTERVIEW_SCHEDULED', 'NEW_CANDIDATE_APPLICATION');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'READ');

-- CreateEnum
CREATE TYPE "ComplaintType" AS ENUM ('COMPANY_BEHAVIOR', 'JOB_MISMATCH', 'FAKE_JOB', 'SALARY_MISMATCH', 'INTERVIEW_PROBLEM', 'HARASSMENT', 'DISCRIMINATION', 'FRAUD', 'OTHER');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'NEED_MORE_INFORMATION', 'ACCEPTED', 'REJECTED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "ComplaintDecision" AS ENUM ('NO_VIOLATION', 'WARNING', 'PENALTY', 'SUSPENSION', 'JOB_REMOVAL', 'COMPANY_SUSPENSION');

-- CreateEnum
CREATE TYPE "PenaltyStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "referenceId" TEXT,
    "readAt" TIMESTAMP(3),
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewComplaint" (
    "id" TEXT NOT NULL,
    "candidateProfileId" TEXT,
    "submittedById" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "jobId" TEXT,
    "jobApplicationId" TEXT,
    "type" "ComplaintType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'PENDING',
    "decision" "ComplaintDecision",
    "adminNote" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "reason" TEXT NOT NULL,
    "status" "PenaltyStatus" NOT NULL DEFAULT 'PENDING',
    "stripePaymentIntentId" TEXT,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplaintEvidence" (
    "id" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplaintEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_status_idx" ON "Notification"("userId", "status");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "ReviewComplaint_candidateProfileId_idx" ON "ReviewComplaint"("candidateProfileId");

-- CreateIndex
CREATE INDEX "ReviewComplaint_submittedById_idx" ON "ReviewComplaint"("submittedById");

-- CreateIndex
CREATE INDEX "ReviewComplaint_companyId_idx" ON "ReviewComplaint"("companyId");

-- CreateIndex
CREATE INDEX "ReviewComplaint_jobId_idx" ON "ReviewComplaint"("jobId");

-- CreateIndex
CREATE INDEX "ReviewComplaint_status_idx" ON "ReviewComplaint"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Penalty_complaintId_key" ON "Penalty"("complaintId");

-- CreateIndex
CREATE INDEX "Penalty_companyId_idx" ON "Penalty"("companyId");

-- CreateIndex
CREATE INDEX "Penalty_status_idx" ON "Penalty"("status");

-- CreateIndex
CREATE INDEX "ComplaintEvidence_complaintId_idx" ON "ComplaintEvidence"("complaintId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComplaint" ADD CONSTRAINT "ReviewComplaint_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "candidate_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComplaint" ADD CONSTRAINT "ReviewComplaint_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComplaint" ADD CONSTRAINT "ReviewComplaint_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComplaint" ADD CONSTRAINT "ReviewComplaint_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComplaint" ADD CONSTRAINT "ReviewComplaint_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "ReviewComplaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintEvidence" ADD CONSTRAINT "ComplaintEvidence_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "ReviewComplaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
