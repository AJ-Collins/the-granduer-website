import type { OpportunityStage } from "../../services/opportunities/opportunity-stage";
import type { StoredOpportunityRow } from "../rows";
import { toOpportunityRecord } from "../mappers/to-opportunity-record";

type StageWriter = {
  opportunity: {
    update(args: {
      where: { id: string };
      data: { stage: StoredOpportunityRow["stage"]; stageChangedAt: Date };
    }): Promise<StoredOpportunityRow>;
  };
  opportunityStageTransition: {
    create(args: {
      data: {
        opportunityId: string;
        from: StoredOpportunityRow["stage"] | null;
        to: StoredOpportunityRow["stage"];
        notes?: string;
        actorId: string;
      };
    }): Promise<unknown>;
  };
};

export async function updateOpportunityStageRow(
  client: StageWriter,
  id: string,
  from: StoredOpportunityRow["stage"],
  stage: OpportunityStage,
  actorId: string,
  notes?: string,
) {
  const updated = await client.opportunity.update({
    where: { id },
    data: {
      stage: stage.toUpperCase() as StoredOpportunityRow["stage"],
      stageChangedAt: new Date(),
    },
  });
  await client.opportunityStageTransition.create({
    data: {
      opportunityId: id,
      from,
      to: stage.toUpperCase() as StoredOpportunityRow["stage"],
      ...(notes !== undefined && { notes }),
      actorId,
    },
  });
  return toOpportunityRecord(updated);
}
