"use client";

import { useState, useEffect } from "react";
import { SectionCard, StatusBadge, MgmtButton, Alert, Skeleton, useToast } from "@/shared/components/management";
import { IconEdit, IconUser, IconShield } from "@/shared/components/management/icons";
import { InfoRow } from "./info-row";
import { UserStatusActions, type UserStatus } from "./user-status-actions";
import { UserSessionsSection } from "./user-sessions-section";
import { UserAuditSection } from "./user-audit-section";

type UserDetail = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  roles: string[];
  permissions: string[];
};

function statusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "active": return "success" as const;
    case "suspended": case "deactivated": return "danger" as const;
    default: return "default" as const;
  }
}

export function UserProfileView({ userId, currentUserId }: { userId: string; currentUserId: string }) {
  const toast = useToast();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/admin/users/${userId}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "User not found." : "Failed to load user.");
        return r.json();
      })
      .then((res) => {
        if (!cancelled) setUser(res.data ?? res);
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
  }, [userId]);

  async function handleStatusChange(newStatus: UserStatus) {
    if (userId === currentUserId) {
      toast.error("You cannot change your own account status.");
      return;
    }
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(body?.error?.message || "Failed to update status.");
        return;
      }
      setUser((prev) => (prev ? { ...prev, status: newStatus } : prev));
      toast.success(`User status updated to ${newStatus}.`);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setStatusUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <SectionCard>
          <div className="space-y-4 p-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-56" />
          </div>
        </SectionCard>
      </div>
    );
  }

  if (error || !user) {
    return <Alert variant="error">{error || "User not found."}</Alert>;
  }

  const isSelf = userId === currentUserId;

  return (
    <div className="space-y-5">
      <SectionCard
        title="Account Information"
        actions={
          <MgmtButton variant="secondary" size="sm" href={`/admin/users/${userId}/edit`}>
            <IconEdit size={14} />
            Edit
          </MgmtButton>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <InfoRow icon={<IconUser size={15} />} label="Name" value={user.name || "—"} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow
            label="Status"
            value={
              <StatusBadge variant={statusVariant(user.status)}>
                {user.status}
              </StatusBadge>
            }
          />
          <InfoRow label="User ID" value={<span className="font-mono text-[11px]">{user.id}</span>} />
        </div>
      </SectionCard>

      <SectionCard title="Roles & Permissions">
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium text-[var(--color-mgmt-text-muted)] mb-2 flex items-center gap-1.5">
              <IconShield size={13} /> Assigned Roles
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {user.roles.map((role) => (
                <StatusBadge key={role} variant="info">{role}</StatusBadge>
              ))}
            </div>
          </div>

          {user.permissions && user.permissions.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-[var(--color-mgmt-text-muted)] mb-2">
                Effective Permissions
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {user.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="px-2 py-0.5 text-[11px] rounded-full bg-[var(--color-mgmt-border-subtle)] text-[var(--color-mgmt-text-secondary)] font-mono"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Account Actions"
        description={isSelf ? "You cannot modify your own account status." : "Change this user's account status."}
      >
        <UserStatusActions status={user.status} isSelf={isSelf} updating={statusUpdating} onChange={handleStatusChange} />
      </SectionCard>

      <UserSessionsSection userId={userId} />

      <UserAuditSection userId={userId} />
    </div>
  );
}
