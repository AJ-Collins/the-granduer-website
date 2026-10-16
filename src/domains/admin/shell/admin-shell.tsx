"use client";

import type { ReactNode } from "react";
import {
  MgmtShell,
  type NavGroup,
  type ProfileUser,
} from "@/shared/components/management";
import {
  IconActivity,
  IconDashboard,
  IconInbox,
  IconTrendingUp,
  IconUsers,
  IconShield,
  IconSettings,
  IconMail,
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
      { href: "/submissions", label: "Submissions", icon: <IconInbox /> },
      { href: "/opportunities", label: "Opportunities", icon: <IconTrendingUp /> },
      { href: "/marketing", label: "Marketing", icon: <IconActivity /> },
      { href: "/users", label: "Users", icon: <IconUsers /> },
      { href: "/roles", label: "Roles", icon: <IconShield /> },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/outbox", label: "Outbox", icon: <IconMail /> },
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
      window.location.href = "/login";
    });
  }

  return (
    <MgmtShell
      title="Admin Console"
      groups={NAV_GROUPS}
      basePath=""
      orgName="AJ-Collins's Org"
      orgBadge="FREE"
      projectName="D'Grandeur"
      branchName="main"
      branchBadge="PRODUCTION"
      user={user}
      onLogout={handleLogout}
    >
      {children}
    </MgmtShell>
  );
}
