import { db } from "../../../db/client";

export async function selectFileAsset(key: string) {
  return db.fileAsset.findUnique({ where: { key } });
}
