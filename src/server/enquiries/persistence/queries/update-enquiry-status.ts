import { toEnquiryRecord, type StoredEnquiryRow } from "../rows";

type StatusWriter = {
  enquiry: {
    update(args: {
      where: { id: string };
      data: { status: "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED"; notes?: string };
    }): Promise<StoredEnquiryRow>;
  };
};

export async function updateEnquiryStatusRow(
  client: StatusWriter,
  id: string,
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED",
  notes?: string,
) {
  const updated = await client.enquiry.update({
    where: { id },
    data: { status, ...(notes !== undefined && { notes }) },
  });
  return toEnquiryRecord(updated);
}
