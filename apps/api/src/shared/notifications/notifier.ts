/**
 * Application-level notification port. Implemented in bootstrap with
 * `@dgrandeur/queues` (BullMQ) + `apps/worker`. Domain use-cases depend
 * on this interface, never on BullMQ directly.
 */
export type NotificationPayload = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export interface Notifier {
  sendEmail(payload: NotificationPayload): Promise<void>;
}

export class LogNotifier implements Notifier {
  async sendEmail(payload: NotificationPayload): Promise<void> {
    console.log("[notifier] email queued", { to: payload.to, subject: payload.subject });
  }
}
