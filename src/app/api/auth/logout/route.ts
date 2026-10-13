import { logout } from "@/server/auth/controllers/session/logout";

export async function POST(req: Request) {
  return logout(req);
}
