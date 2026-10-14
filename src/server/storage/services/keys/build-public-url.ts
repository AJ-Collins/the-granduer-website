import type { MinioConfig } from "../drivers/minio-config";

/** The URL clients load bytes from: MinIO URL in cloud, /api/files/<key> locally. */
export function buildPublicUrl(
  key: string,
  input: { driver: string; config?: MinioConfig },
): string {
  if (input.driver === "local") return `/api/files/${key}`;
  const config = input.config;
  if (!config) throw new Error("Minio config required for cloud URLs");
  const proto = config.useSSL ? "https" : "http";
  return `${proto}://${config.endPoint}:${config.port}/${config.bucket}/${key}`;
}
