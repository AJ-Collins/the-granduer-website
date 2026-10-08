import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  as?: "div" | "article" | "li" | "span" | "p";
};

/**
 * Static passthrough — brand guideline: no motion on the site.
 * Kept API-compatible so existing call sites need no changes.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as as "div";
  return <Tag className={cn(className)}>{children}</Tag>;
}
