import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { getSessionUserFromCookies } from "@/server/auth/services/sessions/get-session-user-from-cookies";

/** Console shell: server-side gate — admin-role accounts only (login page exempt). */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const surfacePath = (await headers()).get("x-surface-path");
  if (surfacePath !== "/login") {
    const user = await getSessionUserFromCookies(await cookies());
    if (!user || (!user.roles.includes("admin") && !user.roles.includes("superadmin"))) {
      redirect("/login");
    }
  }
  return (
    <>
      <header>
        <nav>
          <a href="/dashboard">Dashboard</a> <a href="/users">Users</a>{" "}
          <a href="/roles">Roles</a>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
