"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconChevronRight, IconEye, IconEyeOff, IconLock, IconMail } from "./icons";
import { Alert } from "./alert";
import { useTheme } from "./theme-provider";

export type MgmtLoginFormContentProps = {
  allowedRoles: string[];
  deniedMessage: string;
  brandLabel: string;
  heading: string;
  subheading: string;
  heroImage: string;
  heroQuote: string;
  heroCaption: string;
};

export function MgmtLoginFormContent(props: MgmtLoginFormContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { theme, setTheme } = useTheme();
  void theme;
  void setTheme;
  void router;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = (await res.json().catch(() => null)) as {
        success?: boolean;
        data?: { account?: { roles?: string[] } };
        error?: { message?: string };
      } | null;
      const roles = body?.data?.account?.roles ?? [];
      if (!res.ok || !body?.success) {
        setError(body?.error?.message ?? "Invalid email or password");
        return;
      }
      if (!props.allowedRoles.some((r) => roles.includes(r))) {
        await fetch("/api/auth/logout", { method: "POST" });
        setError(props.deniedMessage);
        return;
      }
      const callback = searchParams.get("callbackUrl");
      const target = callback && callback !== "/login" ? callback : "/dashboard";
      window.location.href = target;
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text)] flex transition-colors duration-150">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mgmt-text)]">
              {props.brandLabel}
            </span>
          </div>
        </div>
        <div className="max-w-sm w-full mx-auto my-auto py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-mgmt-text)]">{props.heading}</h1>
            <p className="text-xs text-[var(--color-mgmt-text-muted)] mt-1">{props.subheading}</p>
          </div>
          {error && (
            <Alert variant="error" className="mb-4">
              {error}
            </Alert>
          )}
          <form onSubmit={submit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)] mb-1">
                Email
              </label>
              <div className="relative">
                <IconMail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mgmt-text-muted)] pointer-events-none"
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@dgrandeur.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-lg text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-accent)] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-mgmt-text-secondary)] mb-1">
                Password
              </label>
              <div className="relative">
                <IconLock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-mgmt-text-muted)] pointer-events-none"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 text-sm bg-[var(--color-mgmt-input-bg)] border border-[var(--color-mgmt-input-border)] rounded-lg text-[var(--color-mgmt-text)] placeholder:text-[var(--color-mgmt-text-muted)] focus:outline-none focus:border-[var(--color-mgmt-accent)] transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-mgmt-text-muted)] hover:text-[var(--color-mgmt-text)] p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IconEyeOff size={14} /> : <IconEye size={14} />}
                </button>
              </div>
            </div>
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={busy}
                className="w-full py-2 px-4 rounded-lg bg-[var(--color-mgmt-accent)] hover:bg-[var(--color-mgmt-accent-hover)] text-black text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {busy ? (
                  <span>Signing in…</span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <IconChevronRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="text-xs text-[var(--color-mgmt-text-muted)]">
          <a href="/" className="hover:text-[var(--color-mgmt-text)] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative bg-[var(--color-mgmt-surface)] border-l border-[var(--color-mgmt-border)] overflow-hidden">
        <img src={props.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10 text-white">
          <p className="text-lg font-medium">&ldquo;{props.heroQuote}&rdquo;</p>
          <span className="text-xs text-white/70 mt-1">{props.heroCaption}</span>
        </div>
      </div>
    </main>
  );
}
