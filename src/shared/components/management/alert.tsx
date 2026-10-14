"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { IconCheck, IconX, IconHelpCircle } from "./icons";

export type AlertVariant = "error" | "success" | "warning" | "info";

type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
};

const VARIANT_STYLES: Record<AlertVariant, { container: string; iconBg: string; defaultIcon: ReactNode }> = {
  error: {
    container: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-500 text-white",
    defaultIcon: <span className="font-bold text-[11px] leading-none">!</span>,
  },
  success: {
    container: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-600 text-white",
    defaultIcon: <IconCheck size={11} />,
  },
  warning: {
    container: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-500 text-black",
    defaultIcon: <span className="font-bold text-[11px] leading-none">!</span>,
  },
  info: {
    container: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-600 text-white",
    defaultIcon: <IconHelpCircle size={11} />,
  },
};

export function Alert({
  variant = "error",
  title,
  children,
  icon,
  onDismiss,
  className,
}: AlertProps) {
  const styles = VARIANT_STYLES[variant];
  const renderedIcon = icon ?? styles.defaultIcon;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "p-2.5 sm:p-3 rounded-lg border text-xs flex items-start gap-2.5 transition-colors duration-150 animate-in fade-in",
        styles.container,
        className,
      )}
    >
      {/* Icon Pill */}
      <span
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 select-none",
          styles.iconBg,
        )}
      >
        {renderedIcon}
      </span>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-xs leading-snug mb-0.5">
            {title}
          </p>
        )}
        <div className="leading-relaxed">
          {children}
        </div>
      </div>

      {/* Optional dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 p-0.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer -mr-1"
          aria-label="Dismiss alert"
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}
