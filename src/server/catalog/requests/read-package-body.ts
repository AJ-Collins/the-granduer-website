import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120);

export const packageBodySchema = z.object({
  slug,
  name: z.string().min(1).max(160),
  tier: z.enum(["essential", "classic", "signature", "bespoke"]),
  tagline: z.string().max(280).nullish(),
  description: z.string().max(20000).nullish(),
  priceCents: z.number().int().min(0).nullish(),
  currency: z.string().length(3).optional(),
  inclusions: z.unknown().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const packagePatchSchema = packageBodySchema.partial().omit({ slug: true });

export type PackageInput = z.infer<typeof packageBodySchema>;
export type PackagePatch = z.infer<typeof packagePatchSchema>;
