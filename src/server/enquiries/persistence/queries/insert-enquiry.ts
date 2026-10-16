import type { Prisma } from "../../../../../prisma/generated/client";
import type { NewEnquiry, StoredEnquiryRow } from "../rows";
import { toEnquiryRecord } from "../mappers/to-enquiry-record";

type EnquiryCreator = {
  enquiry: {
    create(args: { data: Prisma.EnquiryUncheckedCreateInput }): Promise<StoredEnquiryRow>;
  };
};

export async function insertEnquiry(client: EnquiryCreator, input: NewEnquiry, flagged: boolean) {
  const created = await client.enquiry.create({
    data: {
      kind: input.kind.toUpperCase() as "VIEWING" | "PROPOSAL",
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message ?? null,
      eventDate: input.eventDate ?? null,
      eventTypeId: input.eventTypeId ?? null,
      packageId: input.packageId ?? null,
      eventTypeName: input.eventTypeName ?? null,
      preferredDate: input.preferredDate ?? null,
      altDate: input.altDate ?? null,
      guests: input.guests ?? null,
      eventTime: input.eventTime ?? null,
      packageInterest: input.packageInterest ?? null,
      services: input.services ?? [],
      budget: input.budget ?? null,
      source: input.source ?? null,
      details: input.details ?? null,
      trafficSource: input.trafficSource ?? null,
      medium: input.medium ?? null,
      campaign: input.campaign ?? null,
      consent: true,
      flagged,
    },
  });
  return toEnquiryRecord(created);
}
