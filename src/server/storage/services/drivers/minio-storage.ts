import { Client } from "minio";
import { buildObjectKey } from "../keys/build-object-key";
import { minioConfig } from "./minio-config";
import { streamToBytes } from "../stream-to-bytes";
import type { ObjectStorage, PutOptions, StoredObject } from "./storage-port";

export class MinioStorage implements ObjectStorage {
  readonly name = "minio" as const;
  private client: Client;
  private bucket: string;
  private ready: Promise<void>;

  constructor() {
    const config = minioConfig();
    this.client = new Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    });
    this.bucket = config.bucket;
    this.ready = this.ensureBucket();
  }

  private async ensureBucket(): Promise<void> {
    const exists = await this.client.bucketExists(this.bucket).catch(() => false);
    if (!exists) await this.client.makeBucket(this.bucket);
    const policy = JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${this.bucket}/*`],
        },
      ],
    });
    await this.client.setBucketPolicy(this.bucket, policy).catch(() => {});
  }

  async put(data: Uint8Array, options: PutOptions): Promise<StoredObject> {
    await this.ready;
    const key = buildObjectKey(options.prefix ?? "uploads", options.mimeType);
    await this.client.putObject(this.bucket, key, Buffer.from(data), data.length, {
      "Content-Type": options.mimeType,
    });
    return { key, sizeBytes: data.length, mimeType: options.mimeType };
  }

  async get(key: string) {
    await this.ready;
    try {
      const stream = await this.client.getObject(this.bucket, key);
      const data = await streamToBytes(stream as unknown as AsyncIterable<Uint8Array>);
      return { data, mimeType: "application/octet-stream" };
    } catch {
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    await this.ready;
    await this.client.removeObject(this.bucket, key);
  }

  async exists(key: string): Promise<boolean> {
    await this.ready;
    try {
      await this.client.statObject(this.bucket, key);
      return true;
    } catch {
      return false;
    }
  }
}
