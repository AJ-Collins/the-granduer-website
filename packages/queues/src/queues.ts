import { Queue, type JobsOptions } from "bullmq";
import { getRedisConnection } from "./connection";

const queues = new Map<string, Queue<any>>();

/** Get (or create) the queue with the given name. Shared per process. */
export function getQueue<DataType = unknown>(name: string): Queue<DataType> {
  let queue = queues.get(name);
  if (!queue) {
    queue = new Queue(name, { connection: getRedisConnection() });
    queues.set(name, queue);
  }
  return queue as Queue<DataType>;
}

/** Add a job to a queue from anywhere (API routes, CMS actions, ...). */
export async function enqueue<DataType = unknown>(
  queueName: string,
  jobName: string,
  data: DataType,
  opts?: JobsOptions,
): Promise<string | undefined> {
  const queue = getQueue<any>(queueName);
  const job = await queue.add(jobName, data, opts);
  return job.id;
}

/** Close all queues created in this process (tests, graceful shutdown). */
export async function closeQueues(): Promise<void> {
  await Promise.all([...queues.values()].map((queue) => queue.close()));
  queues.clear();
}
