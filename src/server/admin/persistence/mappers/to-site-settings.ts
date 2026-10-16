import { z } from "zod";
import { openingHoursSchema, socialLinkSchema } from "@/shared/schemas/site-settings";
import type { SiteSettingRow, SiteSettings } from "../rows";

function asValidList<T>(value: unknown, schema: z.ZodType<T>): T[] {
  if (!Array.isArray(value)) return [];
  const out: T[] = [];
  for (const item of value) {
    const parsed = schema.safeParse(item);
    if (parsed.success) out.push(parsed.data);
  }
  return out;
}

export function toSiteSettings(row: SiteSettingRow | null): SiteSettings {
  return {
    phone: row?.phone ?? "",
    whatsapp: row?.whatsapp ?? "",
    supportEmail: row?.supportEmail ?? "",
    address: row?.address ?? "",
    socialLinks: asValidList(row?.socialLinks, socialLinkSchema),
    openingHours: asValidList(row?.openingHours, openingHoursSchema),
  };
}
