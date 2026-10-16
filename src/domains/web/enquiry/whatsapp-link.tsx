"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

export function captureWhatsappClick() {
  try {
    const params = new URLSearchParams(window.location.search);
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName: "whatsapp_click",
        path: window.location.pathname,
        ...(params.get("utm_source") && { source: params.get("utm_source") }),
        ...(params.get("utm_medium") && { medium: params.get("utm_medium") }),
        ...(params.get("utm_campaign") && { campaign: params.get("utm_campaign") }),
      }),
    }).catch(() => {});
  } catch {
  }
}

export function WhatsappLink({
  children,
  ...rest
}: { children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      target="_blank"
      rel="noopener noreferrer"
      onClick={captureWhatsappClick}
    >
      {children}
    </a>
  );
}
