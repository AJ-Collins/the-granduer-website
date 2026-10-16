"use client";

import { Input } from "@/shared/components/ui/Input";
import { MgmtButton } from "@/shared/components/management";
import type { OpeningHours } from "@/shared/schemas/site-settings";

const inputClass =
  "w-full px-3 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-input-focus)] transition-colors";

export function OpeningHoursField({
  hours,
  onChange,
}: {
  hours: OpeningHours[];
  onChange: (hours: OpeningHours[]) => void;
}) {
  function update(index: number, patch: Partial<OpeningHours>) {
    onChange(hours.map((h, i) => (i === index ? { ...h, ...patch } : h)));
  }

  return (
    <div className="space-y-2">
      {hours.length === 0 && (
        <p className="text-sm text-[var(--color-mgmt-text-muted)]">No opening hours set.</p>
      )}
      {hours.map((row, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <Input
            aria-label="Days"
            placeholder="Mon – Fri"
            value={row.days}
            onChange={(e) => update(i, { days: e.target.value })}
            className={inputClass}
          />
          <Input
            aria-label="Time"
            placeholder="9:00 – 18:00"
            value={row.time}
            onChange={(e) => update(i, { time: e.target.value })}
            className={inputClass}
          />
          <MgmtButton type="button" variant="ghost" size="sm" onClick={() => onChange(hours.filter((_, j) => j !== i))}>
            Remove
          </MgmtButton>
        </div>
      ))}
      <MgmtButton
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onChange([...hours, { days: "", time: "" }])}
      >
        Add row
      </MgmtButton>
    </div>
  );
}
