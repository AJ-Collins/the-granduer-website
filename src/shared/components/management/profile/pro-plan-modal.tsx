"use client";

export function ProPlanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--color-mgmt-text)]">Upgrade to Pro</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-[var(--color-mgmt-text-secondary)]">
          Unlock dedicated compute replicas, automated daily audit logs, custom SSL domains, and priority 24/7 SLA support for D&apos;Grandeur Event Centre.
        </p>
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)] transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert("Pro plan inquiry submitted!");
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-medium transition-colors"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
