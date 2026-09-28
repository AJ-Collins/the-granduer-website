/**
 * Base class for value objects: small immutable objects that are
 * compared by their value rather than by identity.
 *
 * Subclasses holding object (non-primitive) values should override
 * {@link ValueObject.equals} with a deep comparison.
 */
export abstract class ValueObject<T> {
  protected constructor(protected readonly value: T) {}

  getValue(): T {
    return this.value;
  }

  equals(other: ValueObject<T> | null | undefined): boolean {
    if (other === null || other === undefined) return false;
    return this.value === other.value;
  }
}
