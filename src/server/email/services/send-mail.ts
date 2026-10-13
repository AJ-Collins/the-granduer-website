import { mailer } from "../mailer";

export type OutgoingMail = { to: string; subject: string; text: string; html?: string };

/** Fail-open: logs instead of sending when SMTP is not configured. */
export async function sendMail(mail: OutgoingMail): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log("[mail] smtp unconfigured — logged", { to: mail.to, subject: mail.subject });
    return;
  }
  await mailer.sendMail({
    from: process.env.SMTP_FROM ?? "noreply@dgrandeur.com",
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    ...(mail.html && { html: mail.html }),
  });
}
