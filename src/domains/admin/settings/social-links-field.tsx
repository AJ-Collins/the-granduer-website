"use client";

import { Input } from "@/shared/components/ui/Input";
import { MgmtButton } from "@/shared/components/management";
import type { SocialLink } from "@/shared/schemas/site-settings";

const inputClass =
  "w-full px-3 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-input-focus)] transition-colors";

export function SocialLinksField({
  links,
  onChange,
}: {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}) {
  function update(index: number, patch: Partial<SocialLink>) {
    onChange(links.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  return (
    <div className="space-y-2">
      {links.length === 0 && (
        <p className="text-sm text-[var(--color-mgmt-text-muted)]">No social links yet.</p>
      )}
      {links.map((link, i) => (
        <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
          <Input
            aria-label="Label"
            placeholder="Instagram"
            value={link.label}
            onChange={(e) => update(i, { label: e.target.value })}
            className={inputClass}
          />
          <Input
            aria-label="URL"
            inputMode="url"
            placeholder="https://…"
            value={link.href}
            onChange={(e) => update(i, { href: e.target.value })}
            className={inputClass}
          />
          <MgmtButton type="button" variant="ghost" size="sm" onClick={() => onChange(links.filter((_, j) => j !== i))}>
            Remove
          </MgmtButton>
        </div>
      ))}
      <MgmtButton
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onChange([...links, { label: "", href: "" }])}
      >
        Add link
      </MgmtButton>
    </div>
  );
}
