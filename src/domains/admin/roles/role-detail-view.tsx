"use client";

import { useEffect, useState } from "react";
import { SectionCard, StatusBadge, Alert, DetailSkeleton } from "@/shared/components/management";
import { IconShield } from "@/shared/components/management/icons";
import type { AdminRoleRow } from "./roles-table";

export function RoleDetailView({ roleId }: { roleId: string }) {
  const [role, setRole] = useState<AdminRoleRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/admin/roles/${roleId}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "Role not found." : "Failed to load role.");
        return r.json();
      })
      .then((res) => {
        if (!cancelled) setRole(res.data ?? res);
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
  }, [roleId]);

  if (loading) return <DetailSkeleton rows={4} />;

  if (error || !role) {
    return <Alert variant="error">{error || "Role not found."}</Alert>;
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Role Details" description="Label, key, and granted permissions. Read-only.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-0.5">
            <dt className="text-[11px] font-medium text-[var(--color-mgmt-text-muted)] uppercase tracking-wider">
              Label
            </dt>
            <dd className="text-sm font-medium text-[var(--color-mgmt-text)]">{role.label}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="text-[11px] font-medium text-[var(--color-mgmt-text-muted)] uppercase tracking-wider">
              Key
            </dt>
            <dd>
              <code className="text-xs bg-[var(--color-mgmt-bg)] px-1.5 py-0.5 rounded text-[var(--color-mgmt-text-secondary)]">
                {role.key}
              </code>
            </dd>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Permissions"
        description={`${role.permissions.length} permission${role.permissions.length === 1 ? "" : "s"} granted by this role.`}
      >
        {role.permissions.length === 0 ? (
          <p className="text-sm text-[var(--color-mgmt-text-muted)]">This role grants no permissions.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {role.permissions.map((p) => (
                <StatusBadge key={p} variant="info">
                  {p}
                </StatusBadge>
              ))}
            </div>
            <ul className="divide-y divide-[var(--color-mgmt-border-subtle)] border-t border-[var(--color-mgmt-border-subtle)]">
              {role.permissions.map((p) => (
                <li key={p} className="flex items-center gap-2.5 py-2 text-sm text-[var(--color-mgmt-text-secondary)]">
                  <IconShield size={13} className="text-[var(--color-mgmt-text-muted)] shrink-0" />
                  <span className="font-mono text-xs">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
