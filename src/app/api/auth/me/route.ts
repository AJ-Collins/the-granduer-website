import { me } from "@/server/auth/controllers/session/me";

export async function GET(req: Request) {
  return me(req);
}
