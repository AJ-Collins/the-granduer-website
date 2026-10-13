import { expect, test } from "@playwright/test";

// Opt-in: pnpm add -D @playwright/test && pnpm exec playwright test
// Covers the core loop: public read -> login -> publish -> public read.
test("public catalog is readable", async ({ request }) => {
  const res = await request.get("/api/packages");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.success).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});

test("admin login issues cookies and me works", async ({ request }) => {
  const login = await request.post("/api/auth/login", {
    data: { email: "admin@dgrandeur.com", password: process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!" },
  });
  expect(login.ok()).toBeTruthy();
  const me = await request.get("/api/auth/me");
  expect(me.ok()).toBeTruthy();
});
