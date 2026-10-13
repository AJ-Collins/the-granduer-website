import { z } from "zod";
import { fail } from "./fail-response";

/** Exactly one validated reader pattern: parse JSON with Zod or return a 400 Response. */
export async function parseBody<T>(
  req: Request,
  schema: z.ZodType<T>,
): Promise<{ data: T } | { response: Response }> {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return {
      response: fail("VALIDATION_FAILED", "Invalid request body", {
        status: 400,
        details: parsed.error.flatten(),
      }),
    };
  }
  return { data: parsed.data };
}
