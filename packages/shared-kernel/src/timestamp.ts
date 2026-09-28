import { ValueObject } from "./value-object";

/**
 * Global timestamp value object. Use it anywhere a point in time is
 * needed (createdAt, updatedAt, publishedAt, ...) instead of raw
 * `Date` / `string` / `number` values.
 *
 * Internally stored as epoch milliseconds (UTC); serializes to ISO.
 */
export class Timestamp extends ValueObject<number> {
  private constructor(ms: number) {
    super(ms);
  }

  /** Current time. */
  static now(): Timestamp {
    return new Timestamp(Date.now());
  }

  static fromDate(date: Date): Timestamp {
    return new Timestamp(date.getTime());
  }

  static fromMillis(ms: number): Timestamp {
    if (!Number.isFinite(ms)) {
      throw new Error(`Invalid timestamp millis: ${ms}`);
    }
    return new Timestamp(ms);
  }

  static fromISO(iso: string): Timestamp {
    const ms = Date.parse(iso);
    if (Number.isNaN(ms)) {
      throw new Error(`Invalid ISO timestamp: ${iso}`);
    }
    return new Timestamp(ms);
  }

  toDate(): Date {
    return new Date(this.getValue());
  }

  toMillis(): number {
    return this.getValue();
  }

  /** ISO 8601 string in UTC, e.g. "2026-09-28T12:00:00.000Z". */
  toISO(): string {
    return this.toDate().toISOString();
  }

  isBefore(other: Timestamp): boolean {
    return this.getValue() < other.getValue();
  }

  isAfter(other: Timestamp): boolean {
    return this.getValue() > other.getValue();
  }

  /** Serializes as an ISO string (used by JSON.stringify). */
  toJSON(): string {
    return this.toISO();
  }
}
