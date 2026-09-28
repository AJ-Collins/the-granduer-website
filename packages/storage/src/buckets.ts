import { minio } from "./minio";

const BUCKETS = ["uploads"];

export async function ensureBuckets(): Promise<void> {
  for (const bucket of BUCKETS) {
    const exists = await minio.bucketExists(bucket);
    if (!exists) {
      await minio.makeBucket(bucket);
    }
  }
}
