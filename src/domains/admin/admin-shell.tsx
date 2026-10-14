"use client";

import type { ReactNode } from "react";
import {
  MgmtShell,
  type NavGroup,
  type ProfileUser,
} from "@/shared/components/management";
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

type AdminShellProps = {
  children: ReactNode;
  user?: ProfileUser;
};

export function AdminShell({ children, user }: AdminShellProps) {
  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      window.location.href = "/admin/login";
    });
  }

  return (
    <MgmtShell
      title="Admin Console"
      groups={NAV_GROUPS}
      basePath="/admin"
      orgName="AJ-Collins's Org"
      orgBadge="FREE"
      projectName="app-backend"
      branchName="main"
      branchBadge="PRODUCTION"
      user={user}
      onLogout={handleLogout}
    >
      {children}
    </MgmtShell>
  );
}
