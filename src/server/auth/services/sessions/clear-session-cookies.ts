import { cookies } from "next/headers";

export async function clearSessionCookies(): Promise<void> {
  const jar = await cookies();
  jar.delete("dgrandeur_session");
  jar.delete("dgrandeur_refresh");
}
