import type { StoredEnquiryRow } from "../rows";
import { toEnquiryRecord } from "../mappers/to-enquiry-record";

type AssignmentWriter = {
  enquiry: {
    update(args: { where: { id: string }; data: { assignedToId: string | null } }): Promise<StoredEnquiryRow>;
  };
};

export async function updateEnquiryAssignment(
  client: AssignmentWriter,
  id: string,
  assignedToId: string | null,
) {
  const updated = await client.enquiry.update({ where: { id }, data: { assignedToId } });
  return toEnquiryRecord(updated);
}
