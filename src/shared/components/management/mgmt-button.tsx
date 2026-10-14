"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
type MgmtButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
  href?: string;
  className?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

const BTN_VARIANTS = {
  primary: "bg-[var(--color-mgmt-accent)] hover:bg-[var(--color-mgmt-accent-hover)] text-black font-medium",
  secondary: "bg-[var(--color-mgmt-surface)] border border-[var(--color-mgmt-border)] hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text)]",
  danger: "bg-[var(--color-mgmt-danger)] hover:bg-[var(--color-mgmt-danger-hover)] text-white font-medium",
  ghost: "hover:bg-[var(--color-mgmt-surface-hover)] text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)]",
};

const BTN_SIZES = {
  sm: "px-3 py-1.5 text-[13px]",
  md: "px-4 py-2 text-sm",
};

export function MgmtButton({ variant = "secondary", size = "md", children, href, className, ...rest }: MgmtButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-mgmt-md)] transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
    BTN_VARIANTS[variant],
    BTN_SIZES[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

