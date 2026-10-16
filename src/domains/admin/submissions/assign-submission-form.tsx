"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SectionCard, MgmtButton, Alert } from "@/shared/components/management";

const selectClass =
  "w-full px-3 py-2.5 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] focus:outline-none focus:border-[var(--color-mgmt-accent)] transition-colors";

export function AssignSubmissionForm({
  id,
  staff,
  currentAssigneeId,
}: {
  id: string;
  staff: { id: string; email: string; name: string | null }[];
  currentAssigneeId: string | null;
}) {
  const router = useRouter();
  const [assigneeId, setAssigneeId] = useState(currentAssigneeId ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}?action=assign`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ assignedToId: assigneeId === "" ? null : assigneeId }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        setError(body?.error?.message ?? "Assignment failed");
        return;
      }
      router.refresh();
    } catch {
      setError("Assignment failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SectionCard title="Assignment" description="Choose who owns this submission.">
      <form onSubmit={submit} className="space-y-4">
        {error && <Alert variant="error" onDismiss={() => setError(null)}>{error}</Alert>}
        <div className="space-y-1.5">
          <label
            htmlFor="submission-assignee"
            className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]"
          >
            Assign to
          </label>
          <select
            id="submission-assignee"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            className={selectClass}
          >
            <option value="">Unassigned</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name ?? s.email} ({s.email})
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <MgmtButton type="submit" variant="secondary" disabled={busy}>
            {busy ? "Saving…" : "Save assignment"}
          </MgmtButton>
        </div>
      </form>
    </SectionCard>
  );
}
