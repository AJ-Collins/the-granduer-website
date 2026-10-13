import { InvalidUploadFormError } from "./errors/invalid-upload-form-error";

export type UploadForm = { file: File; prefix: string };

export async function readUploadForm(req: Request): Promise<UploadForm> {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const prefix = form?.get("prefix");
  if (!(file instanceof File)) throw new InvalidUploadFormError();
  return { file, prefix: typeof prefix === "string" ? prefix : "uploads" };
}
