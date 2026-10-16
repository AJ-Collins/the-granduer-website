"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SectionCard, MgmtButton, Alert } from "@/shared/components/management";

const STATUSES = ["new", "assigned", "contacted", "closed"] as const;

const inputClass =
  "w-full px-3 py-2.5 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-accent)] transition-colors";

export function UpdateSubmissionStatusForm({
  id,
  currentStatus,
  currentNotes,
}: {
  id: string;
  currentStatus: string;
  currentNotes: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status, notes: notes === "" ? undefined : notes }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        setError(body?.error?.message ?? "Status update failed");
        return;
      }
      router.refresh();
    } catch {
      setError("Status update failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SectionCard title="Status" description="Move this submission through triage.">
      <form onSubmit={submit} className="space-y-4">
        {error && <Alert variant="error" onDismiss={() => setError(null)}>{error}</Alert>}
        <div className="space-y-1.5">
          <label
            htmlFor="submission-status"
            className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]"
          >
            Status
          </label>
          <select
            id="submission-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="submission-notes"
            className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]"
          >
            Notes
          </label>
          <textarea
            id="submission-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className={inputClass}
          />
        </div>
        <div className="flex justify-end">
          <MgmtButton type="submit" variant="secondary" disabled={busy}>
            {busy ? "Saving…" : "Save status"}
          </MgmtButton>
        </div>
      </form>
    </SectionCard>
  );
}
