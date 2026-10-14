"use client";

export function TopNavHelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">Help &amp; Documentation</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2 text-sm text-[var(--color-mgmt-text-secondary)]">
          <p>• <strong>Dashboard:</strong> Real-time overview of users, bookings, and inquiries.</p>
          <p>• <strong>Theme Switching:</strong> Click your profile avatar on the top right to switch between System, Dark, and Light themes.</p>
          <p>• <strong>Keyboard Shortcut:</strong> Press Ctrl+K anytime for fast search and navigation.</p>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
