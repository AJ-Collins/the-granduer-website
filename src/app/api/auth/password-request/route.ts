import { requestPasswordResetController } from "@/server/auth/controllers/password/request-password-reset";

export async function POST(req: Request) {
  return requestPasswordResetController(req);
}
