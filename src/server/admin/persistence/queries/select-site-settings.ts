import { db } from "../../../db/client";

export async function selectSiteSettings() {
  return db.siteSetting.findUnique({ where: { id: "site" } });
}
