"use client";

export function StatusSelectField({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled: boolean;
  onChange: (next: string) => void;
}) {
  const statusOptions: { value: string; label: string; description: string }[] = [
    { value: "active", label: "Active", description: "User can sign in and access the platform." },
    { value: "suspended", label: "Suspended", description: "Temporarily blocked from signing in." },
    { value: "deactivated", label: "Deactivated", description: "Permanently disabled. Cannot sign in." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {statusOptions.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col gap-1 px-3 py-3 rounded-[var(--radius-mgmt-md)] border text-left transition-all duration-150 ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${
              isActive
                ? "border-[var(--color-mgmt-accent)] bg-[var(--color-mgmt-accent)]/10"
                : "border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface)] hover:border-[var(--color-mgmt-text-muted)]"
            }`}
          >
            <span className={`text-sm font-medium ${isActive ? "text-[var(--color-mgmt-accent)]" : "text-[var(--color-mgmt-text)]"}`}>
              {opt.label}
            </span>
            <span className="text-[11px] text-[var(--color-mgmt-text-muted)] leading-snug">
              {opt.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
