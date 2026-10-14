"use client";

import { cn } from "@/shared/lib/cn";
import { IconCheck, IconHelpCircle, IconX } from "../icons";
import type { ToastItem } from "./toast-types";

export function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const t = toast;
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto w-full p-3.5 rounded-xl shadow-xl border flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-top-4",
        "bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text)]",
        t.type === "success" && "border-emerald-500/40",
        t.type === "error" && "border-rose-500/40",
        t.type === "warning" && "border-amber-500/40",
        t.type === "info" && "border-blue-500/40",
      )}
    >
      <span
        className={cn(
          "p-1 rounded-full shrink-0 text-white flex items-center justify-center mt-0.5",
          t.type === "success" && "bg-emerald-600",
          t.type === "error" && "bg-rose-600",
          t.type === "warning" && "bg-amber-600",
          t.type === "info" && "bg-blue-600",
        )}
      >
        {t.type === "success" && <IconCheck size={12} />}
        {t.type === "error" && <IconX size={12} />}
        {t.type === "warning" && <span className="text-[11px] font-bold leading-none px-1">!</span>}
        {t.type === "info" && <IconHelpCircle size={12} />}
      </span>
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-xs font-semibold leading-tight text-[var(--color-mgmt-text)]">{t.message}</p>
        {t.description && (
          <p className="text-[11px] text-[var(--color-mgmt-text-muted)] mt-0.5 leading-snug">{t.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(t.id)}
        className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-0.5 transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <IconX size={14} />
      </button>
    </div>
  );
}
