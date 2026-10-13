/**
 * Application-level media port. Implemented in bootstrap with
 * `@dgrandeur/storage` (MinIO presigned URLs). Modules depend on this
 * interface, never on the MinIO client directly.
 */
export interface MediaService {
  presignedUpload(bucket: string, key: string, expiresSeconds?: number): Promise<string>;
  presignedDownload(bucket: string, key: string, expiresSeconds?: number): Promise<string>;
}
