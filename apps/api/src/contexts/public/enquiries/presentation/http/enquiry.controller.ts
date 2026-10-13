import type { Context } from "hono";
import { badRequest } from "../../../../../core/errors/app-error.js";
import { created } from "../../../../../core/http/respond.js";
import type { SubmitEnquiry } from "../../application/use-cases/submit-enquiry.js";
import { submitEnquirySchema } from "./enquiry.schemas.js";

export function makeEnquiryController(submit: SubmitEnquiry) {
  return {
    async create(c: Context) {
      const parsed = submitEnquirySchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid enquiry payload", parsed.error.flatten());
      const { eventDate, ...rest } = parsed.data;
      const enquiry = await submit({
        ...rest,
        ...(eventDate && { eventDate: new Date(eventDate) }),
      });
      return created(c, enquiry);
    },
  };
}
