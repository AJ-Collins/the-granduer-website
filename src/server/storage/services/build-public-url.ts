import { minioConfig } from "./minio-config";

/** The URL clients load bytes from: MinIO URL in cloud, /api/files/<key> locally. */
export function buildPublicUrl(key: string): string {
  const driver = process.env.STORAGE_DRIVER ?? "local";
  if (driver === "local") return `/api/files/${key}`;
  const config = minioConfig();
  const proto = config.useSSL ? "https" : "http";
  return `${proto}://${config.endPoint}:${config.port}/${config.bucket}/${key}`;
}
