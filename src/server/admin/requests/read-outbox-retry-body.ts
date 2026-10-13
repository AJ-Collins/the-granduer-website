import { z } from "zod";

export const outboxRetrySchema = z.object({ action: z.literal("retry") });
