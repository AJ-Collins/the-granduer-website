import { escapeHtml } from "./escape-html";

export type BuiltMail = { subject: string; text: string; html: string };

export type MailLayoutInput = {
  heading: string;
  intro: string;
  lines?: string[];
  note?: string;
};

/** Single branded shell every template renders inside. Inline styles only (email clients). */
export function wrapMail(input: MailLayoutInput): string {
  const heading = escapeHtml(input.heading);
  const intro = escapeHtml(input.intro);
  const lines = (input.lines ?? []).map((l) => `<p style="margin:8px 0;">${escapeHtml(l)}</p>`).join("");
  const note = input.note ? `<p style="margin:16px 0 0;color:#8a8f98;font-size:13px;">${escapeHtml(input.note)}</p>` : "";
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f1ea;font-family:Georgia,serif;color:#1c2c3c;"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;padding:32px;"><h1 style="margin:0 0 4px;font-size:24px;">${heading}</h1><p style="margin:0 0 16px;color:#8a8f98;font-size:13px;letter-spacing:2px;">D&rsquo;GRANDEUR</p><p style="margin:0 0 12px;">${intro}</p>${lines}${note}</div></body></html>`;
}
