import { refresh } from "@/server/auth/controllers/refresh";

export async function POST(req: Request) {
  return refresh(req);
}
