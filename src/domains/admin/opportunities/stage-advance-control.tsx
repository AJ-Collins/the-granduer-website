"use client";

import { useState } from "react";
import { MgmtButton, useToast } from "@/shared/components/management";
import { Modal } from "@/shared/components/ui/Modal";
import { OPPORTUNITY_STAGES, stageLabel, type OpportunityStage } from "./opportunity-stages";

export function StageAdvanceControl({
  opportunityId,
  currentStage,
  onAdvanced,
}: {
  opportunityId: string;
  currentStage: OpportunityStage;
  onAdvanced: () => void;
}) {
  const toast = useToast();
  const [next, setNext] = useState<OpportunityStage | "">("");
  const [notes, setNotes] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentIndex = OPPORTUNITY_STAGES.indexOf(currentStage);
  const options = OPPORTUNITY_STAGES.slice(currentIndex + 1, currentIndex + 2);
  if (options.length === 0) return null;

  async function advance() {
    if (!next) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/opportunities/${opportunityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: next, ...(notes.trim() && { notes: notes.trim() }) }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(body?.error?.message || "Failed to advance stage.");
        return;
      }
      setConfirming(false);
      setNext("");
      setNotes("");
      toast.success(`Advanced to ${stageLabel(next as OpportunityStage)}.`);
      onAdvanced();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        aria-label="Next stage"
        value={next}
        onChange={(e) => setNext(e.target.value as OpportunityStage)}
        className="min-h-11 flex-1 px-3 py-2.5 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] focus:outline-none focus:border-[var(--color-mgmt-accent)]"
      >
        <option value="">Select next stage…</option>
        {options.map((s) => (
          <option key={s} value={s}>
            {stageLabel(s)}
          </option>
        ))}
      </select>
      <input
        aria-label="Transition notes"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-11 flex-1 px-3 py-2.5 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-accent)]"
      />
      <MgmtButton type="button" variant="primary" disabled={!next} onClick={() => setConfirming(true)}>
        Advance
      </MgmtButton>

      <Modal open={confirming} onClose={() => setConfirming(false)}>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold">Advance stage?</h3>
            <p className="text-sm opacity-70">
              Move from {stageLabel(currentStage)} to {next ? stageLabel(next as OpportunityStage) : "…"}.
              This is recorded with an audit entry.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <MgmtButton type="button" variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </MgmtButton>
            <MgmtButton type="button" variant="primary" disabled={saving} onClick={advance}>
              {saving ? "Advancing…" : "Confirm"}
            </MgmtButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
