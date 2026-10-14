"use client";

import type { ReactNode } from "react";
import {
  MgmtShell,
  type NavGroup,
  type ProfileUser,
} from "@/shared/components/management";
import {
  IconDashboard,
  IconFileText,
  IconPackage,
  IconCalendar,
  IconInbox,
  IconImage,
  IconStar,
  IconHelpCircle,
} from "@/shared/components/management/icons";

const CMS_NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { href: "/dashboard", label: "Dashboard", icon: <IconDashboard /> },
    ],
  },
  {
    label: "Editorial & Catalogue",
    items: [
      { href: "/content", label: "Content Pages", icon: <IconFileText /> },
      { href: "/packages", label: "Packages", icon: <IconPackage /> },
      { href: "/events", label: "Event Types", icon: <IconCalendar /> },
      { href: "/enquiries", label: "Enquiries", icon: <IconInbox /> },
    ],
  },
  {
    label: "Media & Social Proof",
    items: [
      { href: "/gallery", label: "Gallery", icon: <IconImage /> },
      { href: "/testimonials", label: "Testimonials", icon: <IconStar /> },
      { href: "/faqs", label: "FAQs", icon: <IconHelpCircle /> },
    ],
  },
];

type CmsShellProps = {
  children: ReactNode;
  user?: ProfileUser;
};

export function CmsShell({ children, user }: CmsShellProps) {
  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      window.location.href = "/cms/login";
    });
  }

  return (
    <MgmtShell
      title="CMS Studio"
      groups={CMS_NAV_GROUPS}
      basePath="/cms"
      orgName="AJ-Collins's Org"
      orgBadge="EDITOR"
      projectName="cms-studio"
      branchName="main"
      branchBadge="PRODUCTION"
      user={user}
      onLogout={handleLogout}
    >
      {children}
    </MgmtShell>
  );
}
