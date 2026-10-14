import type { Prisma } from "../../../../../prisma/generated/client";
import type { NewEnquiry, StoredEnquiryRow } from "../rows";
import { toEnquiryRecord } from "../mappers/to-enquiry-record";

type EnquiryCreator = {
  enquiry: {
    create(args: { data: Prisma.EnquiryUncheckedCreateInput }): Promise<StoredEnquiryRow>;
  };
};

export async function insertEnquiry(client: EnquiryCreator, input: NewEnquiry) {
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
    },
  });
  return toEnquiryRecord(created);
}
