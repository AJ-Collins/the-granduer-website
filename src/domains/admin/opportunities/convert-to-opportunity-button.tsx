"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MgmtButton, useToast } from "@/shared/components/management";

export function ConvertToOpportunityButton({ enquiryId }: { enquiryId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  async function convert() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(body?.error?.message || "Failed to create opportunity.");
        return;
      }
      toast.success("Submission converted to opportunity.");
      router.push(`/admin/opportunities/${body.data.id}`);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <MgmtButton type="button" variant="primary" size="sm" disabled={saving} onClick={convert}>
      {saving ? "Converting…" : "Convert to Opportunity"}
    </MgmtButton>
  );
}
