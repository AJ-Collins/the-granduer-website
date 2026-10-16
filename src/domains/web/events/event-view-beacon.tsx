"use client";

import { useEffect } from "react";

export function EventViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const key = `analytics:viewed:${window.location.pathname}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      const params = new URLSearchParams(window.location.search);
      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          eventName: "event_page_view",
          path: window.location.pathname,
          ...(params.get("utm_source") && { source: params.get("utm_source") }),
          ...(params.get("utm_medium") && { medium: params.get("utm_medium") }),
          ...(params.get("utm_campaign") && { campaign: params.get("utm_campaign") }),
        }),
      }).catch(() => {});
    } catch {
    }
  }, [slug]);
  return null;
}
