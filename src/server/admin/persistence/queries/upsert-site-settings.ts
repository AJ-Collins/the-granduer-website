import type { Prisma } from "../../../../../prisma/generated/client";
import type { SiteSettingsInput } from "@/shared/schemas/site-settings";

type SiteSettingsWriter = {
  siteSetting: {
    upsert(args: {
      where: { id: string };
      create: Prisma.SiteSettingCreateInput;
      update: Prisma.SiteSettingUpdateInput;
    }): Promise<unknown>;
  };
};

export async function upsertSiteSettingsRow(client: SiteSettingsWriter, input: SiteSettingsInput) {
  return client.siteSetting.upsert({
    where: { id: "site" },
    create: {
      id: "site",
      phone: input.phone,
      whatsapp: input.whatsapp,
      supportEmail: input.supportEmail,
      address: input.address,
      socialLinks: input.socialLinks,
      openingHours: input.openingHours,
    },
    update: {
      phone: input.phone,
      whatsapp: input.whatsapp,
      supportEmail: input.supportEmail,
      address: input.address,
      socialLinks: input.socialLinks,
      openingHours: input.openingHours,
    },
  });
}
