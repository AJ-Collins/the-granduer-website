import { z } from "zod";

import { eventBodySchema } from "./read-event-body";

export const eventPatchSchema = eventBodySchema.partial().omit({ slug: true });

export type EventPatch = z.infer<typeof eventPatchSchema>;
