"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SectionCard, MgmtButton, Alert, useToast } from "@/shared/components/management";
import { IconSave, IconEye, IconEyeOff } from "@/shared/components/management/icons";
import { RoleSelectField } from "./role-select-field";
import { useRoles } from "./use-roles";
import { validateNewUser } from "./user-validation";

export function UserForm() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const roles = useRoles();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(key: string) {
    setFieldErrors((p) => {
      if (!(key in p)) return p;
      const n = { ...p };
      delete n[key];
      return n;
    });
  }

  function toggleRole(key: string) {
    setSelectedRoles((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
    clearFieldError("roles");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const errs = validateNewUser({ email, password, name, selectedRoles });
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          name: name.trim() || undefined,
          roleKeys: selectedRoles,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError("An account with this email already exists. Please use a different email address.");
        } else {
          setError(body?.error?.message || "Failed to create user. Please try again.");
        }
        return;
      }

      toast.success("User created successfully.");
      router.push("/admin/users");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full px-3 py-2.5 text-sm bg-[var(--color-mgmt-input-bg)] border rounded-[var(--radius-mgmt-md)] text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:ring-1 transition-colors";
  const inputOk =
    "border-[var(--color-mgmt-input-border)] focus:border-[var(--color-mgmt-input-focus)] focus:ring-[var(--color-mgmt-input-focus)]/30";
  const inputErr =
    "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="error" onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <SectionCard title="Account Details" description="Basic login credentials for the new user.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="user-email" className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="user-email"
              type="email"
              autoComplete="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={`${inputBase} ${fieldErrors.email ? inputErr : inputOk}`}
            />
            {fieldErrors.email && (
              <p className="text-[11px] text-rose-500">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="user-password" className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="user-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 12 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
                className={`${inputBase} pr-10 ${fieldErrors.password ? inputErr : inputOk}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-[11px] text-rose-500">{fieldErrors.password}</p>
            )}
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="user-name" className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)]">
              Display Name <span className="text-[var(--color-mgmt-text-muted)]">(optional)</span>
            </label>
            <input
              id="user-name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputBase} ${inputOk}`}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Role Assignment" description="Select at least one role to assign to this user.">
        <RoleSelectField roles={roles} selected={selectedRoles} onToggle={toggleRole} error={fieldErrors.roles} />
      </SectionCard>

      <div className="flex items-center justify-end gap-3 pt-2">
        <MgmtButton
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/users")}
        >
          Cancel
        </MgmtButton>
        <MgmtButton type="submit" variant="primary" disabled={submitting}>
          <IconSave size={16} />
          {submitting ? "Creating…" : "Create User"}
        </MgmtButton>
      </div>
    </form>
  );
}
