"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/shared/lib/cn";
import { IconCheck, IconX, IconHelpCircle } from "../icons";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
};

type ToastOptions = {
  description?: string;
  duration?: number;
};

type ToastContextType = {
  toast: {
    (message: string, options?: ToastOptions): string;
    success: (message: string, options?: ToastOptions | string) => string;
    error: (message: string, options?: ToastOptions | string) => string;
    info: (message: string, options?: ToastOptions | string) => string;
    warning: (message: string, options?: ToastOptions | string) => string;
    dismiss: (id: string) => void;
  };
};

const ToastContext = createContext<ToastContextType | null>(null);

let toastCount = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, options?: ToastOptions | string) => {
      const id = `toast-${++toastCount}-${Date.now()}`;
      const description =
        typeof options === "string" ? options : options?.description;
      const duration =
        typeof options === "object" && options?.duration !== undefined
          ? options.duration
          : 4500;

      const newToast: ToastItem = {
        id,
        type,
        message,
        description,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss],
  );

  const toastMethods = Object.assign(
    (message: string, options?: ToastOptions) =>
      addToast("info", message, options),
    {
      success: (message: string, options?: ToastOptions | string) =>
        addToast("success", message, options),
      error: (message: string, options?: ToastOptions | string) =>
        addToast("error", message, options),
      info: (message: string, options?: ToastOptions | string) =>
        addToast("info", message, options),
      warning: (message: string, options?: ToastOptions | string) =>
        addToast("warning", message, options),
      dismiss,
    },
  );

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}

      {/* Floating Top Toast Banner */}
      <div
        aria-live="polite"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
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
            {/* Status Icon */}
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

            {/* Message & Description */}
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-semibold leading-tight text-[var(--color-mgmt-text)]">
                {t.message}
              </p>
              {t.description && (
                <p className="text-[11px] text-[var(--color-mgmt-text-muted)] mt-0.5 leading-snug">
                  {t.description}
                </p>
              )}
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-0.5 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <IconX size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
}
