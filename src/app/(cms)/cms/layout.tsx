import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { CmsShell } from "@/domains/cms/cms-shell";
import { getSessionUserFromCookies } from "@/server/auth/services/sessions/get-session-user-from-cookies";

/** Studio shell: server-side gate — any cms.access account (login page exempt). */
export default async function CmsLayout({ children }: { children: ReactNode }) {
  const surfacePath = (await headers()).get("x-surface-path");
  let user = null;
  if (surfacePath !== "/login") {
    user = await getSessionUserFromCookies(await cookies());
    if (!user || !user.permissions.includes("cms.access")) {
      redirect("/login");
    }
  }

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

  return <CmsShell user={profileUser}>{children}</CmsShell>;
}
