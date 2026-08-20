-- CreateTable
CREATE TABLE "ResumeSummary" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumeSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeSummary_resumeId_key" ON "ResumeSummary"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeSummary" ADD CONSTRAINT "ResumeSummary_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
