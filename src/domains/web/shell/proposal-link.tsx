"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

function captureProposalClick() {
  try {
    const params = new URLSearchParams(window.location.search);
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName: "proposal_click",
        path: window.location.pathname,
        ...(params.get("utm_source") && { source: params.get("utm_source") }),
        ...(params.get("utm_medium") && { medium: params.get("utm_medium") }),
        ...(params.get("utm_campaign") && { campaign: params.get("utm_campaign") }),
      }),
    }).catch(() => {});
  } catch {
  }
}

export function ProposalLink({
  children,
  ...rest
}: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} href="/contact#proposal" onClick={captureProposalClick}>
      {children}
    </a>
  );
}
