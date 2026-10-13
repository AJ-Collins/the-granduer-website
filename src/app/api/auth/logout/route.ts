import { logout } from "@/server/auth/controllers/logout";

export async function POST(req: Request) {
  return logout(req);
}
