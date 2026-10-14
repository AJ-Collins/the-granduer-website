"use client";

import { useEffect, useState } from "react";

export function useClientTimezone(fallback = "Auto (Africa/Nairobi)") {
  const [clientTz, setClientTz] = useState(fallback);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setClientTz(`Auto (${tz})`);
    } catch {
    }
  }, []);

  return clientTz;
}
