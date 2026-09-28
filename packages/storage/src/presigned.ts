import { minio } from "./minio";

export async function presignedPutUrl(bucket: string, objectName: string): Promise<string> {
  return minio.presignedPutObject(bucket, objectName);
}

export async function presignedGetUrl(bucket: string, objectName: string): Promise<string> {
  return minio.presignedGetObject(bucket, objectName);
}
