"use client";

import { cn } from "@/shared/lib/cn";
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-mgmt-border-subtle)] rounded-[var(--radius-mgmt-sm)]",
        className,
      )}
    />
  );
}

