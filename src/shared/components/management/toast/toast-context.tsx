"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { ToastCard } from "./toast-card";
import type { ToastItem, ToastOptions, ToastType } from "./toast-types";

export type { ToastItem, ToastType };

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
      const description = typeof options === "string" ? options : options?.description;
      const duration =
        typeof options === "object" && options?.duration !== undefined ? options.duration : 4500;
      setToasts((prev) => [...prev, { id, type, message, description, duration }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  const toastMethods = Object.assign(
    (message: string, options?: ToastOptions) => addToast("info", message, options),
    {
      success: (message: string, options?: ToastOptions | string) => addToast("success", message, options),
      error: (message: string, options?: ToastOptions | string) => addToast("error", message, options),
      info: (message: string, options?: ToastOptions | string) => addToast("info", message, options),
      warning: (message: string, options?: ToastOptions | string) => addToast("warning", message, options),
      dismiss,
    },
  );

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context.toast;
}
