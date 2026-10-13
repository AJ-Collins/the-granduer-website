import { insertFileAsset } from "../persistence/queries/insert-file-asset";
import { buildPublicUrl } from "./keys/build-public-url";
import { getStorage } from "./drivers/get-storage";
import { UploadRejectedError } from "./upload-rejected-error";

const MAX_BYTES = 10 * 1024 * 1024;

export async function saveUpload(file: File, prefix: string) {
  if (file.size === 0) throw new UploadRejectedError("Empty file");
  if (file.size > MAX_BYTES) throw new UploadRejectedError("File too large (max 10 MB)");
  if (!file.type.startsWith("image/")) throw new UploadRejectedError("Only image uploads are allowed");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const stored = await getStorage().put(bytes, { mimeType: file.type, prefix });
  return insertFileAsset({
    key: stored.key,
    url: buildPublicUrl(stored.key),
    mimeType: stored.mimeType,
    sizeBytes: stored.sizeBytes,
  });
}
