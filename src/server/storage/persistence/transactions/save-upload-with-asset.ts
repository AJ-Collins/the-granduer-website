import { insertFileAsset } from "../queries/insert-file-asset";

export async function saveUploadWithAsset(input: {
  key: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}) {
  return insertFileAsset(input);
}
