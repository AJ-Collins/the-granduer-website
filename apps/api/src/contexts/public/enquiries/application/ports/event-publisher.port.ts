/** Outbound port: domain emits, infrastructure delivers. */
export interface EventPublisher {
  publish(event: string, payload: unknown): Promise<void>;
}

export class LogEventPublisher implements EventPublisher {
  async publish(event: string, payload: unknown): Promise<void> {
    console.log("[events]", event, payload);
  }
}
