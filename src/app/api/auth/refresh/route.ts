import { refresh } from "@/server/auth/controllers/session/refresh";

export async function POST(req: Request) {
  return refresh(req);
}
