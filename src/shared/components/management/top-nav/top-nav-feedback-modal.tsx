"use client";

export function TopNavFeedbackModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className="bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--color-mgmt-text)]">Send Product Feedback</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1"
          >
            ✕
          </button>
        </div>
        <textarea
          rows={4}
          placeholder="What can we improve in the management console?"
          className="w-full p-3 rounded-lg border border-[var(--color-mgmt-input-border)] bg-[var(--color-mgmt-input-bg)] text-[var(--color-mgmt-text)] text-sm focus:outline-none focus:border-[var(--color-mgmt-accent)]"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              alert("Thank you for your feedback!");
              onClose();
            }}
            className="px-3 py-1.5 text-xs rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-medium"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
