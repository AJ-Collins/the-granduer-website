import type { ReactNode } from "react";

export function Field({
  label,
  dark = false,
  className = "",
  children,
}: {
  label: string;
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span
        className={`mb-2 block font-sans text-[10px] font-medium uppercase tracking-[0.3em] ${
          dark ? "text-silver" : "text-navy/60"
        }`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
