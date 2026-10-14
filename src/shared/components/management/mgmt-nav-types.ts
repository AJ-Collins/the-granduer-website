import type { ReactNode } from "react";
export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  /** Optional badge text shown next to the label. */
  badge?: string;
};

