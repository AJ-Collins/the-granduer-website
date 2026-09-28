import { ValueObject } from "./value-object";

/**
 * Global entity identifier value object. Use it (or extend it) for
 * entity IDs anywhere instead of passing raw strings around.
 */
export class EntityId extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  /** New random ID (UUID v4). */
  static generate(): EntityId {
    return new EntityId(crypto.randomUUID());
  }

  static from(value: string): EntityId {
    if (!value) {
      throw new Error("EntityId cannot be empty");
    }
    return new EntityId(value);
  }

  toString(): string {
    return this.getValue();
  }
}
