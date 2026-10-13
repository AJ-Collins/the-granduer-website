export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET must be at least 32 characters in production");
    }
    return "dev-only-secret-change-it-in-production-000";
  }
  return secret;
}
