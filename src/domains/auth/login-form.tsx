"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

/** Same-host login: POSTs to this surface's /api/auth/login (cookies set by the API). */
export function LoginForm({ title, allowedRoles }: { title: string; allowedRoles: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
        setError(body?.error?.message ?? "Login failed");
        return;
      }
      if (!allowedRoles.some((r) => roles.includes(r))) {
        await fetch("/api/auth/logout", { method: "POST" });
        setError("This account cannot access this surface");
        return;
      }
      router.push(searchParams.get("callbackUrl") ?? "/dashboard");
    } catch {
      setError("Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>{title}</h1>
      <form onSubmit={submit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
