"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

function captureBookViewingClick() {
  try {
    const params = new URLSearchParams(window.location.search);
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName: "book_viewing_click",
        path: window.location.pathname,
        ...(params.get("utm_source") && { source: params.get("utm_source") }),
        ...(params.get("utm_medium") && { medium: params.get("utm_medium") }),
        ...(params.get("utm_campaign") && { campaign: params.get("utm_campaign") }),
      }),
    }).catch(() => {});
  } catch {
  }
}

export function BookViewingLink({
  children,
  ...rest
}: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} href="/contact#viewing" onClick={captureBookViewingClick}>
      {children}
    </a>
  );
}
