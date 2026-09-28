import type { ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true">
      <button type="button" onClick={onClose} aria-label="Close">
        Close
      </button>
      {children}
    </div>
  );
}
