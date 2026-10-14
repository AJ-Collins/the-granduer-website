export function ReadOnlyField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-medium text-[var(--color-mgmt-text-muted)] uppercase tracking-wider">
        {label}
      </label>
      <div
        className={`px-3 py-2.5 text-sm bg-[var(--color-mgmt-bg)] border border-[var(--color-mgmt-border-subtle)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text-secondary)] ${
          mono ? "font-mono text-[11px]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
