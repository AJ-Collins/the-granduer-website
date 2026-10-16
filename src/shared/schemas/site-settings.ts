import { z } from "zod";

export const socialLinkSchema = z.object({
  label: z.string().min(1).max(40),
  href: z.string().url().max(500),
});

export const openingHoursSchema = z.object({
  days: z.string().min(1).max(60),
  time: z.string().min(1).max(60),
});

export const siteSettingsSchema = z.object({
  phone: z.string().max(40),
  whatsapp: z.string().max(40),
  supportEmail: z.string().email().max(254).or(z.literal("")),
  address: z.string().max(500),
  socialLinks: z.array(socialLinkSchema).max(10),
  openingHours: z.array(openingHoursSchema).max(14),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type OpeningHours = z.infer<typeof openingHoursSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
