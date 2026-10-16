import { z } from "zod";

const consent = z.preprocess((v) => (v === "on" ? true : v), z.literal(true));

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected a calendar date")
  .max(10);

export const viewingSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
  eventType: z.string().min(1).max(120),
  preferredDate: dateString,
  altDate: dateString.optional(),
  eventDate: z.string().max(120).optional(),
  guests: z.coerce.number().int().min(1).max(5000).optional(),
  message: z.string().max(5000).optional(),
  consent,
});

export type ViewingInput = z.infer<typeof viewingSchema>;
