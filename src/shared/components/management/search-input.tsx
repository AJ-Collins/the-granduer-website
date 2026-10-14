"use client";

import { IconSearch } from "./icons";
import { cn } from "@/shared/lib/cn";
type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function SearchInput({ placeholder = "Search…", value, onChange, className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <IconSearch
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mgmt-text-muted)] pointer-events-none"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-input-focus)] focus:ring-1 focus:ring-[var(--color-mgmt-input-focus)]/30 transition-colors"
      />
    </div>
  );
}

