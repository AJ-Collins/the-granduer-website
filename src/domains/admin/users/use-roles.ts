"use client";

import { useEffect, useState } from "react";

export type RoleOption = { id: string; key: string; label: string };

export function useRoles() {
  const [roles, setRoles] = useState<RoleOption[]>([]);

  useEffect(() => {
    fetch("/api/admin/roles")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) setRoles(res.data);
      })
      .catch(() => {});
  }, []);

  return roles;
}
