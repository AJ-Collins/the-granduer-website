import type { OpportunityStage as PrismaOpportunityStage, Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import type { OpportunityStage } from "../../services/opportunities/opportunity-stage";
import { toOpportunityRecord } from "../mappers/to-opportunity-record";

export async function selectOpportunities(page: number, pageSize: number, stage?: OpportunityStage) {
  const where: Prisma.OpportunityWhereInput = stage
    ? { stage: stage.toUpperCase() as PrismaOpportunityStage }
    : {};
  const [rows, total] = await Promise.all([
    db.opportunity.findMany({
      where,
      include: {
        enquiry: { select: { id: true, name: true, email: true } },
        _count: { select: { transitions: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.opportunity.count({ where }),
  ]);
  return {
    items: rows.map(({ enquiry, _count, ...opportunity }) => ({
      ...toOpportunityRecord(opportunity),
      enquiry,
      transitionCount: _count.transitions,
    })),
    total,
  };
}
