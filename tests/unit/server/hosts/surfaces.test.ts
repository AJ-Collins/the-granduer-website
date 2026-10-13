import { describe, expect, it } from "vitest";
import { hostOf } from "@/server/hosts/host-of";
import { stripPrefix } from "@/server/hosts/strip-prefix";
import { surfaceOf } from "@/server/hosts/surface-of";

describe("host dispatch", () => {
  it("classifies localhost surfaces", () => {
    expect(surfaceOf("localhost")).toBe("web");
    expect(surfaceOf("admin.localhost")).toBe("admin");
    expect(surfaceOf("cms.localhost")).toBe("cms");
  });

  it("fails closed on unknown hosts", () => {
    expect(surfaceOf("evil.com")).toBeNull();
  });

  it("strips the port before classifying", () => {
    expect(hostOf("admin.localhost:3000")).toBe("admin.localhost");
  });

  it("strips surface prefixes canonically", () => {
    expect(stripPrefix("/admin/products", "/admin")).toBe("/products");
    expect(stripPrefix("/admin", "/admin")).toBe("/");
    expect(stripPrefix("/products", "/admin")).toBeNull();
  });
});
