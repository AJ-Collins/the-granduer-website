/** Example job: send an email in the background. */
export const EMAIL_QUEUE = "email";

export type SendEmailJob = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};
