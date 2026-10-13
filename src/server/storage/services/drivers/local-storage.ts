import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buildObjectKey } from "../keys/build-object-key";
import type { ObjectStorage, PutOptions, StoredObject } from "./storage-port";

/** Dependency-free dev driver: disk under STORAGE_DIR, served via /api/files/<key>. */
export class LocalObjectStorage implements ObjectStorage {
  readonly name = "local" as const;
  private dir: string;

  constructor(dir = process.env.STORAGE_DIR ?? ".data/uploads") {
    this.dir = dir;
  }

  private pathFor(key: string): string {
    if (key.includes("..")) throw new Error("Invalid key");
    return join(process.cwd(), this.dir, key);
  }

  async put(data: Uint8Array, options: PutOptions): Promise<StoredObject> {
    const key = buildObjectKey(options.prefix ?? "uploads", options.mimeType);
    const path = this.pathFor(key);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, data);
    return { key, sizeBytes: data.length, mimeType: options.mimeType };
  }

  async get(key: string) {
    try {
      const data = await readFile(this.pathFor(key));
      return { data: new Uint8Array(data), mimeType: "application/octet-stream" };
    } catch {
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    await rm(this.pathFor(key), { force: true });
  }

  async exists(key: string): Promise<boolean> {
    return (await this.get(key)) !== null;
  }
}
