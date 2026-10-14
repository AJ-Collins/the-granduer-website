export type StoredObject = { key: string; sizeBytes: number; mimeType: string };

export type PutOptions = { key: string; mimeType: string };

/** Bytes never touch Postgres — the DB keeps only the key + public URL. */
export interface ObjectStorage {
  readonly name: "local" | "minio";
  put(data: Uint8Array, options: PutOptions): Promise<StoredObject>;
  get(key: string): Promise<{ data: Uint8Array; mimeType: string } | null>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}
