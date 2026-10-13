import { login } from "@/server/auth/controllers/login";

export async function POST(req: Request) {
  return login(req);
}
