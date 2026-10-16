"use client";

import { useEffect, useState } from "react";
import { SectionCard, MgmtButton, Alert, FormSkeleton, useToast } from "@/shared/components/management";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { OpeningHours, SiteSettingsInput, SocialLink } from "@/shared/schemas/site-settings";
import { ContactFields } from "./contact-fields";
import { OpeningHoursField } from "./opening-hours-field";
import { SocialLinksField } from "./social-links-field";
import { useSiteSettings } from "./use-site-settings";

const EMPTY: SiteSettingsInput = {
  phone: "",
  whatsapp: "",
  supportEmail: "",
  address: "",
  socialLinks: [],
  openingHours: [],
};

export function SiteSettingsForm() {
  const toast = useToast();
  const { settings, loading, error } = useSiteSettings();

  const [draft, setDraft] = useState<SiteSettingsInput>(EMPTY);
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setDraft({
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        supportEmail: settings.supportEmail,
        address: settings.address,
        socialLinks: settings.socialLinks,
        openingHours: settings.openingHours,
      });
    }
  }, [settings]);

  function patch(p: Partial<SiteSettingsInput>) {
    setDraft((d) => ({ ...d, ...p }));
  }

  async function save() {
    setSaving(true);
    setSaveError(null);
    try {
      const payload = {
        ...draft,
        socialLinks: draft.socialLinks.filter((l: SocialLink) => l.label.trim() && l.href.trim()),
        openingHours: draft.openingHours.filter((h: OpeningHours) => h.days.trim() && h.time.trim()),
      };
      const res = await fetch("/api/admin/settings/site", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setSaveError(body?.error?.message || "Failed to save settings.");
        return;
      }
      setConfirming(false);
      toast.success("Site settings saved.");
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <FormSkeleton fields={6} />;
  if (error || !settings) return <Alert variant="error">{error || "Failed to load site settings."}</Alert>;

  return (
    <div className="space-y-5">
      {saveError && <Alert variant="error" onDismiss={() => setSaveError(null)}>{saveError}</Alert>}

      <SectionCard title="Contact" description="Phone, WhatsApp, email, and address shown across the public site.">
        <ContactFields
          phone={draft.phone}
          whatsapp={draft.whatsapp}
          supportEmail={draft.supportEmail}
          address={draft.address}
          onChange={patch}
        />
      </SectionCard>

      <SectionCard title="Social links" description="Shown in the navbar and footer.">
        <SocialLinksField links={draft.socialLinks} onChange={(socialLinks) => patch({ socialLinks })} />
      </SectionCard>

      <SectionCard title="Opening hours" description="Shown wherever visiting times are listed.">
        <OpeningHoursField hours={draft.openingHours} onChange={(openingHours) => patch({ openingHours })} />
      </SectionCard>

      <div className="flex items-center justify-end gap-3 pt-2">
        <MgmtButton type="button" variant="primary" onClick={() => setConfirming(true)}>
          Save changes
        </MgmtButton>
      </div>

      <Modal open={confirming} onClose={() => setConfirming(false)}>
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold">Save site settings?</h3>
            <p className="text-sm opacity-70">This updates the contact details shown across the public site.</p>
          </div>
          <div className="flex justify-end gap-2">
            <MgmtButton type="button" variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </MgmtButton>
            <Button variant="solid" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Confirm save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
