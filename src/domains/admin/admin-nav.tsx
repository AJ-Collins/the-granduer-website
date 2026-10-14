"use client";

import { usePathname } from "next/navigation";
import {
  MgmtSidebar,
  type NavGroup,
} from "@/shared/components/management";
export { AdminShell } from "./admin-shell";
import {
  IconDashboard,
  IconUsers,
  IconShield,
  IconSettings,
} from "@/shared/components/management/icons";

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { href: "/dashboard", label: "Dashboard", icon: <IconDashboard /> },
    ],
  },
  {
    label: "Management",
    items: [
      { href: "/users", label: "Users", icon: <IconUsers /> },
      { href: "/roles", label: "Roles", icon: <IconShield /> },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: <IconSettings /> },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      window.location.href = "/admin/login";
    });
  }

  return (
    <MgmtSidebar
      title="Admin Console"
      groups={NAV_GROUPS}
      currentPath={pathname}
      basePath="/admin"
      onLogout={handleLogout}
    />
  );
}
