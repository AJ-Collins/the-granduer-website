import { db } from "../../../db/client";
import { toOpportunityRecord, toStageTransitionRecord } from "../mappers/to-opportunity-record";

export async function selectOpportunity(id: string) {
  const row = await db.opportunity.findUnique({
    where: { id },
    include: {
      enquiry: { select: { id: true, kind: true, name: true, email: true, status: true } },
      transitions: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!row) return null;
  const { enquiry, transitions, ...opportunity } = row;
  return {
    ...toOpportunityRecord(opportunity),
    enquiry: { ...enquiry, kind: enquiry.kind.toLowerCase(), status: enquiry.status.toLowerCase() },
    transitions: transitions.map(toStageTransitionRecord),
  };
}
