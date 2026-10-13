import { describe, expect, it } from "node:test";
import { canTransition } from "../../src/contexts/public/enquiries/domain/rules/enquiry.rules.js";

describe("enquiry status transitions", () => {
  it("allows new -> assigned", () => expect(canTransition("new", "assigned")).toBe(true));
  it("rejects closed -> new", () => expect(canTransition("closed", "new")).toBe(false));
});
