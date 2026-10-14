import { saveUploadWithAsset } from "../persistence/transactions/save-upload-with-asset";
import { buildObjectKey } from "./keys/build-object-key";
import { buildPublicUrl } from "./keys/build-public-url";
import { getStorage } from "./drivers/get-storage";
import { minioConfig } from "./drivers/minio-config";
import { UploadRejectedError } from "./upload-rejected-error";

const MAX_BYTES = 10 * 1024 * 1024;

export async function saveUpload(file: File, prefix: string) {
  if (file.size === 0) throw new UploadRejectedError("Empty file");
  if (file.size > MAX_BYTES) throw new UploadRejectedError("File too large (max 10 MB)");
  if (!file.type.startsWith("image/")) throw new UploadRejectedError("Only image uploads are allowed");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const key = buildObjectKey(prefix, file.type);
  const stored = await getStorage().put(bytes, { key, mimeType: file.type });
  const driver = process.env.STORAGE_DRIVER ?? "local";
  const url = buildPublicUrl(stored.key, {
    driver,
    ...(driver !== "local" ? { config: minioConfig() } : {}),
  });
  return saveUploadWithAsset({
    key: stored.key,
    url,
    mimeType: stored.mimeType,
    sizeBytes: stored.sizeBytes,
  });
}
