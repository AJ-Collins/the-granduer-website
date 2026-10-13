export type UploadForm = { file: File; prefix: string };

export class InvalidUploadFormError extends Error {
  readonly status = 400;
  constructor() {
    super("Expected multipart form with a file field");
    this.name = "InvalidUploadFormError";
  }
}

export async function readUploadForm(req: Request): Promise<UploadForm> {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const prefix = form?.get("prefix");
  if (!(file instanceof File)) throw new InvalidUploadFormError();
  return { file, prefix: typeof prefix === "string" ? prefix : "uploads" };
}
