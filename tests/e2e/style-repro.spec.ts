import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

test.use({
  baseURL: "http://admin.localhost:3000",
  launchOptions: {
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--host-resolver-rules=MAP admin.localhost 127.0.0.1, MAP cms.localhost 127.0.0.1",
    ],
  },
});

async function shellState(page: Page) {
  return page.evaluate(() => {
    const aside = document.querySelector("aside");
    return {
      url: location.href,
      hasAside: !!aside,
      asideBg: aside ? getComputedStyle(aside).backgroundColor : "NO-ASIDE",
      h1: document.querySelector("main h1")?.textContent ?? "NO-H1",
    };
  });
}

test("TEMP-VERIFY canonical URLs keep the shell, no reload", async ({ page }) => {
  page.on("pageerror", (e) => console.log("PAGEERROR:", e.message.split("\n")[0]));
  page.on("response", async (r) => {
    const url = r.url();
    if (!url.includes("admin.localhost") || url.includes("_next/static") || url.includes("favicon")) return;
    const headers = r.headers();
    let extra = "";
    if (url.includes("_rsc")) {
      try {
        const text = await r.text();
        const markers = {
          aside: text.includes("<aside") || text.includes("ADMIN CONSOLE"),
          dashboard: text.includes("Dashboard"),
          loginform: text.includes("Sign in") || text.includes("Admin Login"),
          shellTitle: text.includes("Admin Console"),
          topbar: text.includes("Search") && text.includes("Feedback"),
          rootLayout: text.includes("antialiased"),
        };
        extra = ` len=${text.length} ${JSON.stringify(markers)}`;
      } catch {
        extra = " body-unreadable";
      }
    }
    console.log(
      `RES ${r.status()} ${r.request().method()} ${url.replace("http://admin.localhost:3000", "")} :: loc=${(headers["location"] ?? "").slice(0, 80)}${extra}`,
    );
  });
  await page.goto("/login", { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', "admin@dgrandeur.com");
  await page.fill('input[type="password"]', process.env.SEED_ADMIN_PASSWORD ?? "SeedAdmin123!change");
  await Promise.all([
    page.waitForURL(/dashboard/, { timeout: 15000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1200);
  const afterLogin = await shellState(page);
  console.log("AFTER-LOGIN:", JSON.stringify(afterLogin));
  expect(afterLogin.hasAside).toBe(true);
  expect(afterLogin.asideBg).not.toBe("rgba(0, 0, 0, 0)");

  await page.click('aside a[href="/users"]');
  await page.waitForURL(/\/users$/, { timeout: 15000 });
  await page.waitForTimeout(1000);
  const afterNav = await shellState(page);
  console.log("AFTER-SIDEBAR-NAV:", JSON.stringify(afterNav));
  expect(afterNav.hasAside).toBe(true);
  expect(afterNav.h1).toBe("Users");
});
