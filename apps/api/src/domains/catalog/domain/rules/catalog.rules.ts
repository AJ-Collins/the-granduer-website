import { badRequest } from "../../../../core/errors/app-error.js";

/** Publishing requires the fields visitors will see. */
export function assertPublishable(input: { name: string; slug: string; priceCents?: number | null }): void {
  if (!input.name.trim()) throw badRequest("Name is required to publish");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
    throw badRequest("Slug must be lowercase alphanumeric with dashes");
  }
  if (input.priceCents != null && input.priceCents < 0) throw badRequest("Price cannot be negative");
}
