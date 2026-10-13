import { confirmPasswordReset } from "@/server/auth/controllers/password/confirm-password-reset";

export async function POST(req: Request) {
  return confirmPasswordReset(req);
}
