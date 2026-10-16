"use client";

import { useEffect, useState } from "react";
import type { SiteSettings } from "@/server/admin/persistence/rows";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/settings/site")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load site settings.");
        return r.json();
      })
      .then((res) => {
        if (!cancelled) setSettings(res.data ?? res);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, loading, error };
}
