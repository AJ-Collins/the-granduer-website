import { describe, expect, it } from "vitest";
import { isPublicApi } from "@/server/http/public-api-routes";

describe("public api table", () => {
  it("serves catalog reads and enquiry intake without a session", () => {
    expect(isPublicApi("/api/packages", "GET")).toBe(true);
    expect(isPublicApi("/api/packages/classic", "GET")).toBe(true);
    expect(isPublicApi("/api/enquiry", "POST")).toBe(true);
    expect(isPublicApi("/api/auth/login", "POST")).toBe(true);
  });

  it("guards everything else", () => {
    expect(isPublicApi("/api/admin/users", "GET")).toBe(false);
    expect(isPublicApi("/api/cms/packages", "POST")).toBe(false);
    expect(isPublicApi("/api/auth/me", "GET")).toBe(false);
  });
});
