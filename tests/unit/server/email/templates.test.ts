import { describe, expect, it } from "vitest";
import { enquiryAckMail } from "@/server/email/templates/enquiry-ack";
import { escapeHtml } from "@/server/email/templates/escape-html";
import { resetPasswordMail } from "@/server/email/templates/password-reset";

describe("mail templates", () => {
  it("builds the enquiry ack in text and html", () => {
    const mail = enquiryAckMail("Ava", "viewing");
    expect(mail.subject).toContain("enquiry");
    expect(mail.text).toContain("Ava");
    expect(mail.html).toContain("Ava");
    expect(mail.html).toContain("D&rsquo;GRANDEUR");
  });

  it("builds the password reset with the token in both bodies", () => {
    const mail = resetPasswordMail("abc123token");
    expect(mail.text).toContain("abc123token");
    expect(mail.html).toContain("abc123token");
  });

  it("escapes user input in html", () => {
    expect(escapeHtml('<script>"&')).toBe("&lt;script&gt;&quot;&amp;");
    const mail = enquiryAckMail("<b>Ava</b>", "viewing");
    expect(mail.html).not.toContain("<b>Ava</b>");
  });
});
