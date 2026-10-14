import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { AdminShell } from "@/domains/admin/admin-shell";
import { getSessionUserFromCookies } from "@/server/auth/services/sessions/get-session-user-from-cookies";

/** Console shell: server-side gate — admin-role accounts only (login page exempt). */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const surfacePath = (await headers()).get("x-surface-path");
  let user = null;
  if (surfacePath !== "/login") {
    user = await getSessionUserFromCookies(await cookies());
    if (!user || (!user.roles.includes("admin") && !user.roles.includes("superadmin"))) {
      redirect("/login");
    }
  }

  /* Login page gets a clean layout without the sidebar shell */
  if (surfacePath === "/login") {
    return <>{children}</>;
  }

  const profileUser = user
    ? {
        name: user.email.split("@")[0],
        email: user.email,
      }
    : {
        name: "AJ-Collins",
        email: "kiprocolloaj254@gmail.com",
      };

  return <AdminShell user={profileUser}>{children}</AdminShell>;
}
