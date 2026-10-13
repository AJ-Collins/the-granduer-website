import { describe, expect, it } from "vitest";
import { hasPermission } from "@/server/access/has-permission";
import { ALL_PERMISSIONS, PERMISSIONS, ROLE_PERMISSIONS } from "@/server/access/permissions";

describe("permissions table", () => {
  it("superadmin holds every permission", () => {
    expect(ROLE_PERMISSIONS.superadmin).toEqual(expect.arrayContaining(ALL_PERMISSIONS));
  });

  it("viewer cannot manage users or publish", () => {
    const viewer = { id: "1", email: "v@x.com", roles: ["viewer"], permissions: ROLE_PERMISSIONS.viewer, sessionId: "s" };
    expect(hasPermission(viewer, PERMISSIONS.cmsAccess)).toBe(true);
    expect(hasPermission(viewer, PERMISSIONS.usersManage)).toBe(false);
    expect(hasPermission(viewer, PERMISSIONS.catalogManage)).toBe(false);
  });

  it("superadmin bypasses the permission list", () => {
    const root = { id: "1", email: "r@x.com", roles: ["superadmin"], permissions: [], sessionId: "s" };
    expect(hasPermission(root, PERMISSIONS.usersManage)).toBe(true);
  });
});
