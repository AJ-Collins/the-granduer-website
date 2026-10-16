"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MgmtButton, useToast } from "@/shared/components/management";
import { OPPORTUNITY_STAGES, stageLabel, type OpportunityStage } from "./opportunity-stages";

export function QuickAdvanceButton({
  opportunityId,
  currentStage,
}: {
  opportunityId: string;
  currentStage: OpportunityStage;
}) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const next = OPPORTUNITY_STAGES[OPPORTUNITY_STAGES.indexOf(currentStage) + 1];
  if (!next) return null;

  async function advance() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/opportunities/${opportunityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(body?.error?.message || "Failed to advance stage.");
        return;
      }
      toast.success(`Advanced to ${stageLabel(next)}.`);
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <MgmtButton type="button" variant="secondary" size="sm" disabled={busy} onClick={advance}>
      {busy ? "Moving…" : `Advance to ${stageLabel(next)} →`}
    </MgmtButton>
  );
}
