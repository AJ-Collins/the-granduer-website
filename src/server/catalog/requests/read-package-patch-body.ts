import { z } from "zod";

import { packageBodySchema } from "./read-package-body";

export const packagePatchSchema = packageBodySchema.partial().omit({ slug: true });

export type PackagePatch = z.infer<typeof packagePatchSchema>;
