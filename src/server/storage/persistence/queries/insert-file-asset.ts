import { db } from "../../../db/client";

export async function insertFileAsset(input: {
  key: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}) {
  return db.fileAsset.create({ data: input });
}
