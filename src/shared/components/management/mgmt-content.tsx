import type { ReactNode } from "react";

/**
 * Wraps management pages with the correct content offset.
 * The sidebar is 260px wide on desktop (rendered by MgmtSidebar);
 * this component provides the matching margin and background.
 */
export function MgmtContent({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text)] lg:pl-[260px]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
