"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, MgmtButton, Alert, Skeleton, useToast } from "@/shared/components/management";
import { ReadOnlyField } from "./read-only-field";
import { RoleSelectField } from "./role-select-field";
import { StatusSelectField } from "./status-select-field";
import { useRoles } from "./use-roles";

type UserDetail = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  roles: string[];
};

export function UserEditForm({ userId, currentUserId }: { userId: string; currentUserId: string }) {
  const router = useRouter();
  const toast = useToast();

  const [user, setUser] = useState<UserDetail | null>(null);
  const allRoles = useRoles();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isSelf = userId === currentUserId;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/users/${userId}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "User not found." : "Failed to load user.");
        return r.json();
      })
      .then((userRes) => {
        const u = userRes.data ?? userRes;
        setUser(u);
        setSelectedRoles(u.roles ?? []);
        setSelectedStatus(u.status ?? "active");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  function toggleRole(key: string) {
    setSelectedRoles((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
    setFieldErrors((prev) => {
      if (!("roles" in prev)) return prev;
      const next = { ...prev };
      delete next.roles;
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (selectedRoles.length === 0) {
      setFieldErrors({ roles: "At least one role is required." });
      return;
    }
    setFieldErrors({});

    setSaving(true);
    try {
      const rolesChanged =
        JSON.stringify([...selectedRoles].sort()) !==
        JSON.stringify([...(user?.roles ?? [])].sort());

      const statusChanged = selectedStatus !== user?.status;

      if (isSelf && statusChanged) {
        toast.error("You cannot change your own account status.");
        setSaving(false);
        return;
      }

      const results: boolean[] = [];

      if (rolesChanged) {
        const res = await fetch(`/api/admin/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roleKeys: selectedRoles }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body?.error?.message || "Failed to update roles.");
          setSaving(false);
          return;
        }
        results.push(true);
      }

      if (statusChanged) {
        const res = await fetch(`/api/admin/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: selectedStatus }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body?.error?.message || "Failed to update status.");
          setSaving(false);
          return;
        }
        results.push(true);
      }

      if (results.length === 0) {
        toast.info("No changes to save.");
      } else {
        toast.success("User updated successfully.");
      }
      router.push(`/admin/users/${userId}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <SectionCard>
          <div className="space-y-4 p-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </SectionCard>
      </div>
    );
  }

  if (error && !user) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="error" onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <SectionCard title="Account Identity" description="Email and name cannot be changed here.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReadOnlyField label="Email" value={user.email} />
          <ReadOnlyField label="Display Name" value={user.name || "—"} />
          <ReadOnlyField label="User ID" value={user.id} mono />
        </div>
      </SectionCard>

      <SectionCard
        title="Account Status"
        description={isSelf ? "You cannot change your own status." : "Control this user's access to the platform."}
      >
        <StatusSelectField value={selectedStatus} disabled={isSelf} onChange={setSelectedStatus} />
      </SectionCard>

      <SectionCard title="Role Assignment" description="Update the roles assigned to this user.">
        <RoleSelectField roles={allRoles} selected={selectedRoles} onToggle={toggleRole} error={fieldErrors.roles} />
      </SectionCard>

      <div className="flex items-center justify-end gap-3 pt-2">
        <MgmtButton
          type="button"
          variant="ghost"
          onClick={() => router.push(`/admin/users/${userId}`)}
        >
          Cancel
        </MgmtButton>
        <MgmtButton type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </MgmtButton>
      </div>
    </form>
  );
}
