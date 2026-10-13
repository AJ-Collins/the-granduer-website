import { login } from "@/server/auth/controllers/session/login";

export async function POST(req: Request) {
  return login(req);
}
