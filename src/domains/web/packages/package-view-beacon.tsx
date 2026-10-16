"use client";

import { useEffect } from "react";

export function PackageViewBeacon() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(`analytics:viewed:${window.location.pathname}`)) return;
      sessionStorage.setItem(`analytics:viewed:${window.location.pathname}`, "1");
      const params = new URLSearchParams(window.location.search);
      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          eventName: "package_view",
          path: window.location.pathname,
          ...(params.get("utm_source") && { source: params.get("utm_source") }),
          ...(params.get("utm_medium") && { medium: params.get("utm_medium") }),
          ...(params.get("utm_campaign") && { campaign: params.get("utm_campaign") }),
        }),
      }).catch(() => {});
    } catch {
    }
  }, []);
  return null;
}
