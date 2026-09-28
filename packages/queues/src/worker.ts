import { Worker, type Processor, type WorkerOptions } from "bullmq";
import { getRedisConnection } from "./connection";

/** Start a worker for the given queue. Runs in `apps/worker`. */
export function createWorker<DataType = unknown>(
  queueName: string,
  processor: Processor<DataType>,
  opts?: Omit<WorkerOptions, "connection">,
): Worker<DataType> {
  return new Worker<DataType>(queueName, processor, {
    connection: getRedisConnection(),
    ...opts,
  });
}

/** Gracefully stop workers (used on SIGTERM/SIGINT). */
export async function closeWorkers(workers: Worker[]): Promise<void> {
  await Promise.all(workers.map((worker) => worker.close()));
}
