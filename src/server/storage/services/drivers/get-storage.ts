import { LocalObjectStorage } from "./local-storage";
import { minioConfig } from "./minio-config";
import { MinioStorage } from "./minio-storage";
import type { ObjectStorage } from "./storage-port";

let cached: ObjectStorage | null = null;

export function getStorage(): ObjectStorage {
  if (cached) return cached;
  const driver = process.env.STORAGE_DRIVER ?? "local";
  if (driver === "local") cached = new LocalObjectStorage();
  else if (driver === "minio" || driver === "s3") cached = new MinioStorage(minioConfig());
  else throw new Error(`Unknown STORAGE_DRIVER: ${driver}`);
  return cached;
}
