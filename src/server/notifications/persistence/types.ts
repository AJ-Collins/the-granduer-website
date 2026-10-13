export type QueuedNotification = {
  type: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export type ClaimedOutboxRow = {
  id: string;
  to: string;
  subject: string;
  text: string;
  html: string | null;
  attempts: number;
};

export type OutboxFilter = { status?: string; type?: string };
