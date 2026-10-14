import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { ObjectStorage, PutOptions, StoredObject } from "./storage-port";

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
    const path = this.pathFor(options.key);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, data);
    return { key: options.key, sizeBytes: data.length, mimeType: options.mimeType };
  }

  async get(key: string) {
    try {
      const { readFile } = await import("node:fs/promises");
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
    try {
      await stat(this.pathFor(key));
      return true;
    } catch {
      return false;
    }
  }
}
