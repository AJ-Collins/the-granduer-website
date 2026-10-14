"use client";

export function CmsLogoutButton() {
  async function onClick() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }
  return (
    <button type="button" onClick={onClick}>
      Sign out
    </button>
  );
}
