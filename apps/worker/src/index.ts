import { createWorker, closeWorkers, EMAIL_QUEUE, type SendEmailJob } from "@dgrandeur/queues";
import { processSendEmail } from "./processors/email";

const workers = [createWorker<SendEmailJob>(EMAIL_QUEUE, processSendEmail)];

async function shutdown(signal: string): Promise<void> {
  console.log(`Worker received ${signal}, closing...`);
  await closeWorkers(workers);
  process.exit(0);
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

console.log("Worker started");
