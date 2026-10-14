"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <form onSubmit={submit}>
      <label>
        Assign to
        <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
          <option value="">Unassigned</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name ?? s.email} ({s.email})
            </option>
          ))}
        </select>
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save assignment"}
      </button>
    </form>
  );
}
