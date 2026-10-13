const EXTENSIONS: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export function extensionForMime(mimeType: string): string {
  return EXTENSIONS[mimeType] ?? "";
}
