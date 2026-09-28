import type { Job } from "bullmq";
import { mailer } from "@dgrandeur/email";
import type { SendEmailJob } from "@dgrandeur/queues";

export async function processSendEmail(job: Job<SendEmailJob>): Promise<void> {
  await mailer.sendMail({
    from: process.env.SMTP_FROM ?? "noreply@dgrandeur.com",
    to: job.data.to,
    subject: job.data.subject,
    text: job.data.text,
    html: job.data.html,
  });
}
