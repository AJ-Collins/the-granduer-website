import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import type { OpportunityStage } from "../../services/opportunities/opportunity-stage";
import type { StoredOpportunityRow } from "../rows";
import { selectOpportunity } from "../queries/select-opportunity";
import { updateOpportunityStageRow } from "../queries/update-opportunity-stage";

/** Stage advance + transition record + audit; all three writes are one transaction. */
export async function advanceOpportunityStageWithAudit(
  id: string,
  stage: OpportunityStage,
  actorId: string,
  notes?: string,
) {
  const current = await selectOpportunity(id);
  if (!current) return null;
  const from = current.stage.toUpperCase() as StoredOpportunityRow["stage"];
  return db.$transaction(async (tx) => {
    const updated = await updateOpportunityStageRow(tx, id, from, stage, actorId, notes);
    await insertAuditEntry(
      {
        actorId,
        action: "opportunity.stage-advanced",
        entityType: "opportunity",
        entityId: id,
        metadata: { from: current.stage, to: stage },
      },
      tx,
    );
    return updated;
  }, { timeout: 10_000 });
}
