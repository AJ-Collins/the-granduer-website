-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "altDate" TIMESTAMP(3),
ADD COLUMN     "budget" TEXT,
ADD COLUMN     "consent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "details" TEXT,
ADD COLUMN     "eventTime" TEXT,
ADD COLUMN     "eventTypeName" TEXT,
ADD COLUMN     "flagged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "guests" INTEGER,
ADD COLUMN     "packageInterest" TEXT,
ADD COLUMN     "preferredDate" TIMESTAMP(3),
ADD COLUMN     "services" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "source" TEXT;

-- CreateTable
CREATE TABLE "SubmissionRejection" (
    "id" TEXT NOT NULL,
    "kind" TEXT,
    "email" TEXT,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionRejection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubmissionRejection_createdAt_idx" ON "SubmissionRejection"("createdAt");

-- CreateIndex
CREATE INDEX "Enquiry_flagged_createdAt_idx" ON "Enquiry"("flagged", "createdAt");
