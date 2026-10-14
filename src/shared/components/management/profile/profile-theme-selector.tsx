"use client";

import { useTheme, type ThemeMode } from "../theme-provider";
import { cn } from "@/shared/lib/cn";

const THEME_MODES: ThemeMode[] = ["system", "dark", "light"];

export function ProfileThemeSelector() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="px-4 py-3 border-b border-[var(--color-mgmt-border-subtle)]">
      <p className="text-xs font-medium text-[var(--color-mgmt-text-muted)] mb-2">Theme</p>
      <div className="space-y-1 pl-4" role="radiogroup" aria-label="Theme selection">
        {THEME_MODES.map((mode) => {
          const isSelected = theme === mode;
          const label = mode.charAt(0).toUpperCase() + mode.slice(1);
          return (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setTheme(mode)}
              className={cn(
                "flex items-center gap-2.5 w-full text-left py-1 text-sm rounded transition-colors group",
                isSelected
                  ? "text-[var(--color-mgmt-text)] font-medium"
                  : "text-[var(--color-mgmt-text-secondary)] hover:text-[var(--color-mgmt-text)]",
              )}
            >
              <span className="w-3 flex items-center justify-center shrink-0">
                {isSelected ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mgmt-text)] shrink-0" />
                ) : null}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
