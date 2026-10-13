import { me } from "@/server/auth/controllers/me";

export async function GET(req: Request) {
  return me(req);
}
