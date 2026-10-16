import type { OpeningHours, SocialLink } from "@/shared/schemas/site-settings";

export type SiteSettingRow = {
  id: string;
  phone: string;
  whatsapp: string;
  supportEmail: string;
  address: string;
  socialLinks: unknown;
  openingHours: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  supportEmail: string;
  address: string;
  socialLinks: SocialLink[];
  openingHours: OpeningHours[];
};
