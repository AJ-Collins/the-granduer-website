import { requestPasswordResetController } from "@/server/auth/controllers/request-password-reset";

export async function POST(req: Request) {
  return requestPasswordResetController(req);
}
