import { describe, expect, it } from "vitest";
import { assertEnquiryTransition } from "@/server/enquiries/services/enquiry-status";
import { InvalidEnquiryTransitionError } from "@/server/enquiries/services/errors/invalid-enquiry-transition-error";

describe("enquiry status transitions", () => {
  it("allows new -> assigned and new -> closed", () => {
    expect(() => assertEnquiryTransition("new", "assigned")).not.toThrow();
    expect(() => assertEnquiryTransition("new", "closed")).not.toThrow();
  });

  it("rejects closed -> assigned", () => {
    expect(() => assertEnquiryTransition("closed", "assigned")).toThrow(
      InvalidEnquiryTransitionError,
    );
  });

  it("rejects skipping assigned -> contacted order violations", () => {
    expect(() => assertEnquiryTransition("new", "contacted")).toThrow(
      "Cannot move enquiry from new to contacted",
    );
  });
});
