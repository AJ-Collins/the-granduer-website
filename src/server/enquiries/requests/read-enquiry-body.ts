import { z } from "zod";
import { proposalSchema } from "@/shared/schemas/proposal";
import { viewingSchema } from "@/shared/schemas/viewing";

const attribution = {
  source: z.string().max(120).optional(),
  medium: z.string().max(120).optional(),
  campaign: z.string().max(120).optional(),
};

export const enquiryBodySchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("viewing"), data: viewingSchema }).extend(attribution),
  z.object({ kind: z.literal("proposal"), data: proposalSchema }).extend(attribution),
]);

export type EnquiryBody = z.infer<typeof enquiryBodySchema>;
