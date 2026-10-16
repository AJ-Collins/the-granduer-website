-- CreateEnum
CREATE TYPE "OpportunityStage" AS ENUM ('VIEWING_SCHEDULED', 'PROPOSAL_SENT', 'DATE_HELD', 'DEPOSIT_RECEIVED', 'CONTRACT_SIGNED', 'IN_PLANNING', 'DELIVERED', 'REVIEWED');

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "enquiryId" TEXT NOT NULL,
    "stage" "OpportunityStage" NOT NULL DEFAULT 'VIEWING_SCHEDULED',
    "stageChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityStageTransition" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "from" "OpportunityStage",
    "to" "OpportunityStage" NOT NULL,
    "notes" TEXT,
    "actorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpportunityStageTransition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Opportunity_enquiryId_idx" ON "Opportunity"("enquiryId");

-- CreateIndex
CREATE INDEX "Opportunity_stage_createdAt_idx" ON "Opportunity"("stage", "createdAt");

-- CreateIndex
CREATE INDEX "OpportunityStageTransition_opportunityId_createdAt_idx" ON "OpportunityStageTransition"("opportunityId", "createdAt");

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityStageTransition" ADD CONSTRAINT "OpportunityStageTransition_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
