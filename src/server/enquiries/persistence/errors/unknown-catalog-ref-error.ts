export class UnknownCatalogRefError extends Error {
  readonly status = 400;
  constructor(ref: string) {
    super(`Unknown ${ref}`);
    this.name = "UnknownCatalogRefError";
  }
}
