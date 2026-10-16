"use client";

import { useState, useCallback } from "react";
import { MgmtButton, useToast } from "@/shared/components/management";
import { Modal } from "@/shared/components/ui/Modal";

type RetryButtonProps = {
  entryId: string;
  /** Called after a successful retry so the parent can refresh data. */
  onRetried?: () => void;
};

export function RetryButton({ entryId, onRetried }: RetryButtonProps) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRetry = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/outbox/${entryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(body?.error?.message || "Retry failed. Please try again.");
        return;
      }
      toast.success("Entry queued for retry.");
      onRetried?.();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }, [entryId, onRetried, toast]);

  return (
    <>
      <MgmtButton
        variant="danger"
        size="sm"
        onClick={() => setOpen(true)}
        id="outbox-retry-trigger"
      >
        Retry Delivery
      </MgmtButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-[var(--radius-mgmt-lg)] p-5 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">Confirm Retry</h3>
            <p className="text-sm text-[var(--color-mgmt-text-muted)] leading-relaxed">
              This will reset the entry to <strong className="text-[var(--color-mgmt-text)]">PENDING</strong> and queue it for re-delivery. This action is audited.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <MgmtButton variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </MgmtButton>
              <MgmtButton variant="danger" size="sm" onClick={handleRetry} disabled={loading}>
                {loading ? "Retrying…" : "Confirm Retry"}
              </MgmtButton>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
