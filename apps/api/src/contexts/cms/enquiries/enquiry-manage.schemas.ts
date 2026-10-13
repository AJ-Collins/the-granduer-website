import { z } from "zod";

export const managedEnquiryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["new", "assigned", "contacted", "closed"]).optional(),
});

export const assignEnquirySchema = z.object({
  assignedToId: z.string().min(1).max(64).nullable(),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(["new", "assigned", "contacted", "closed"]),
  notes: z.string().max(5000).optional(),
});
