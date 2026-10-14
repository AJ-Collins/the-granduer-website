export function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-0.5">
      <dt className="text-[11px] font-medium text-[var(--color-mgmt-text-muted)] uppercase tracking-wider flex items-center gap-1.5">
        {icon}
        {label}
      </dt>
      <dd className="text-sm text-[var(--color-mgmt-text)]">{value}</dd>
    </div>
  );
}
