import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { getSessionUserFromCookies } from "@/server/auth/services/get-session-user-from-cookies";

/** Studio shell: server-side gate — any cms.access account (login page exempt). */
export default async function CmsLayout({ children }: { children: ReactNode }) {
  const surfacePath = (await headers()).get("x-surface-path");
  if (surfacePath !== "/login") {
    const user = await getSessionUserFromCookies(await cookies());
    if (!user || !user.permissions.includes("cms.access")) {
      redirect("/login");
    }
  }
  return (
    <>
      <header>
        <nav>
          <a href="/dashboard">Dashboard</a> <a href="/content">Content</a>{" "}
          <a href="/packages">Packages</a> <a href="/events">Events</a>{" "}
          <a href="/enquiries">Enquiries</a>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
