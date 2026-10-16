import { db } from "../../src/server/db/client";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

type SeedEntry = {
  type: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  status: "PENDING" | "SENDING" | "SENT" | "FAILED";
  attempts: number;
  nextAttemptAt: Date;
  lastError?: string;
  sentAt?: Date;
  createdAt: Date;
};

export async function seedOutbox() {
  const existing = await db.notificationOutbox.count();
  if (existing > 0) {
    console.log(`outbox already seeded (${existing} entries), skipping`);
    return;
  }

  const now = Date.now();
  const entries: SeedEntry[] = [
    {
      type: "enquiry.ack",
      to: "eleanor.vance@example.com",
      subject: "We received your viewing request",
      text: "Hi Eleanor, thanks for booking a viewing at D'Grandeur. Our team will confirm a time shortly.",
      html: "<p>Hi Eleanor, thanks for booking a viewing at D'Grandeur.</p>",
      status: "SENT",
      attempts: 1,
      nextAttemptAt: new Date(now - 6 * DAY),
      sentAt: new Date(now - 6 * DAY + 2 * 60_000),
      createdAt: new Date(now - 6 * DAY),
    },
    {
      type: "enquiry.ack",
      to: "marcus.chen@example.com",
      subject: "We received your proposal request",
      text: "Hi Marcus, your proposal request for a corporate gala is with our events team.",
      status: "SENT",
      attempts: 2,
      nextAttemptAt: new Date(now - 4 * DAY),
      sentAt: new Date(now - 4 * DAY + 5 * 60_000),
      createdAt: new Date(now - 4 * DAY),
    },
    {
      type: "password.reset",
      to: "admin@dgrandeur.co.uk",
      subject: "Reset your password",
      text: "Use the link in the console to reset your password. It expires in 1 hour.",
      status: "SENT",
      attempts: 1,
      nextAttemptAt: new Date(now - 2 * DAY),
      sentAt: new Date(now - 2 * DAY + 60_000),
      createdAt: new Date(now - 2 * DAY),
    },
    {
      type: "enquiry.ack",
      to: "priya.nair@example.com",
      subject: "We received your viewing request",
      text: "Hi Priya, thanks for booking a viewing at D'Grandeur.",
      status: "PENDING",
      attempts: 0,
      nextAttemptAt: new Date(now + 60_000),
      createdAt: new Date(now - 10 * 60_000),
    },
    {
      type: "enquiry.ack",
      to: "goldman.events@example.com",
      subject: "We received your proposal request",
      text: "Hi team, your tech gala proposal request is queued for confirmation.",
      status: "PENDING",
      attempts: 1,
      nextAttemptAt: new Date(now + 4 * 60_000),
      lastError: "429 Too Many Requests from SMTP relay, backing off",
      createdAt: new Date(now - 30 * 60_000),
    },
    {
      type: "password.reset",
      to: "events.coordinator@dgrandeur.co.uk",
      subject: "Reset your password",
      text: "Use the link in the console to reset your password. It expires in 1 hour.",
      status: "PENDING",
      attempts: 0,
      nextAttemptAt: new Date(now + 2 * 60_000),
      createdAt: new Date(now - 5 * 60_000),
    },
    {
      type: "enquiry.ack",
      to: "bounce.me@example.com",
      subject: "We received your viewing request",
      text: "Hi, thanks for booking a viewing at D'Grandeur.",
      status: "FAILED",
      attempts: 3,
      nextAttemptAt: new Date(now + 8 * 60_000),
      lastError: "550 5.1.1 Recipient address rejected: User unknown in virtual mailbox table",
      createdAt: new Date(now - 1 * DAY),
    },
    {
      type: "password.reset",
      to: "stale.user@example.com",
      subject: "Reset your password",
      text: "Use the link in the console to reset your password. It expires in 1 hour.",
      html: "<p>Use the link in the console to reset your password.</p>",
      status: "FAILED",
      attempts: 3,
      nextAttemptAt: new Date(now + 8 * 60_000),
      lastError: "Connection timed out after 10000ms (smtp.sendgrid.net:587)",
      createdAt: new Date(now - 2 * DAY),
    },
    {
      type: "enquiry.ack",
      to: "sophia.laurent@example.com",
      subject: "We received your proposal request",
      text: "Hi Sophia, your wedding proposal request is being prepared.",
      status: "SENDING",
      attempts: 1,
      nextAttemptAt: new Date(now - 2 * 60_000),
      createdAt: new Date(now - 12 * 60_000),
    },
    {
      type: "enquiry.ack",
      to: "james.okafor@example.com",
      subject: "We received your viewing request",
      text: "Hi James, thanks for booking a viewing at D'Grandeur.",
      status: "SENDING",
      attempts: 2,
      nextAttemptAt: new Date(now - 60_000),
      lastError: "421 4.7.0 Temporary system problem, try again later",
      createdAt: new Date(now - 45 * 60_000),
    },
  ];

  await db.notificationOutbox.createMany({ data: entries });
  console.log("outbox seeded (10 entries)");
}
