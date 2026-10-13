import type { ReactNode } from "react";

/** Soft filled rectangles. No borders, no lines, no rounding. */
export const inputLight =
  "w-full bg-navy/6 px-5 py-4 font-sans text-base text-navy placeholder:text-navy/40 transition-colors duration-300 focus:bg-white focus-visible:outline-2 focus-visible:outline-navy";

export const inputDark =
  "w-full bg-ivory/8 px-5 py-4 font-sans text-base text-ivory placeholder:text-ivory/40 transition-colors duration-300 [color-scheme:dark] focus:bg-ivory/15 focus-visible:outline-2 focus-visible:outline-ivory";

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
