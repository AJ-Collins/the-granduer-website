"use client";

import { Input } from "@/shared/components/ui/Input";

const inputClass =
  "w-full px-3 py-2.5 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-input-focus)] transition-colors";

function LabeledInput({
  id,
  label,
  ...rest
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]">
        {label}
      </label>
      <Input id={id} className={inputClass} {...rest} />
    </div>
  );
}

export function ContactFields({
  phone,
  whatsapp,
  supportEmail,
  address,
  onChange,
}: {
  phone: string;
  whatsapp: string;
  supportEmail: string;
  address: string;
  onChange: (patch: Partial<{ phone: string; whatsapp: string; supportEmail: string; address: string }>) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <LabeledInput id="site-phone" label="Phone" placeholder="+44 20 7946 0000" value={phone} onChange={(e) => onChange({ phone: e.target.value })} />
      <LabeledInput id="site-whatsapp" label="WhatsApp" placeholder="+44 7700 900000" value={whatsapp} onChange={(e) => onChange({ whatsapp: e.target.value })} />
      <LabeledInput id="site-email" label="Support email" type="email" placeholder="concierge@dgrandeur.com" value={supportEmail} onChange={(e) => onChange({ supportEmail: e.target.value })} />
      <LabeledInput id="site-address" label="Address" placeholder="Street, City, Postcode" value={address} onChange={(e) => onChange({ address: e.target.value })} />
    </div>
  );
}
