import { confirmPasswordReset } from "@/server/auth/controllers/confirm-password-reset";

export async function POST(req: Request) {
  return confirmPasswordReset(req);
}
