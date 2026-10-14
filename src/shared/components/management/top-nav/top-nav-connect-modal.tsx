"use client";

import { IconTerminal } from "../icons";

export function TopNavConnectModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconTerminal size={18} className="text-[var(--color-mgmt-accent)]" />
            <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">
              Connect to Database &amp; Services
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-[var(--color-mgmt-text-muted)]">
          Use these connection parameters or CLI strings to connect directly to the operational database instance:
        </p>
        <div className="bg-[var(--color-mgmt-bg)] p-3 rounded-lg border border-[var(--color-mgmt-border)] font-mono text-xs text-[var(--color-mgmt-accent)] overflow-x-auto">
          <code>psql &quot;postgresql://postgres:postgres@localhost:5432/dgrandeur?sslmode=disable&quot;</code>
        </div>
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-[var(--color-mgmt-accent)] text-black font-semibold hover:bg-[var(--color-mgmt-accent-hover)] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
