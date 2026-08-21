/*
  Warnings:

  - Added the required column `semanticScore` to the `JobMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JobMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobMatch" ADD COLUMN     "semanticScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
