import { db } from "../../db/client";
import { buildPublicUrl } from "./build-public-url";
import { getStorage } from "./get-storage";
import { UploadRejectedError } from "./upload-rejected-error";

const MAX_BYTES = 10 * 1024 * 1024;

export async function saveUpload(file: File, prefix: string) {
  if (file.size === 0) throw new UploadRejectedError("Empty file");
  if (file.size > MAX_BYTES) throw new UploadRejectedError("File too large (max 10 MB)");
  if (!file.type.startsWith("image/")) throw new UploadRejectedError("Only image uploads are allowed");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const stored = await getStorage().put(bytes, { mimeType: file.type, prefix });
  const url = buildPublicUrl(stored.key);
  return db.fileAsset.create({
    data: { key: stored.key, url, mimeType: stored.mimeType, sizeBytes: stored.sizeBytes },
  });
}
