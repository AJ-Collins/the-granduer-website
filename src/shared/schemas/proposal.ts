import { z } from "zod";

const consent = z.preprocess((v) => (v === "on" ? true : v), z.literal(true));

export const proposalSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(7).max(20),
  eventType: z.string().min(1).max(120),
  eventDate: z.string().min(1).max(120),
  eventTime: z.string().max(60).optional(),
  guests: z.coerce.number().int().min(1).max(5000),
  package: z.enum(["Essential", "Classic", "Signature", "Bespoke", "Not sure"]),
  services: z.array(z.string().min(1).max(60)).max(10).default([]),
  budget: z.string().max(120).optional(),
  details: z.string().max(5000).optional(),
  source: z.string().max(120).optional(),
  consent,
});

export type ProposalInput = z.infer<typeof proposalSchema>;
