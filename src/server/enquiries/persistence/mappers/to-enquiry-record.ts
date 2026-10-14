import type { StoredEnquiryRow } from "../rows";

export function toEnquiryRecord(row: StoredEnquiryRow) {
  return { ...row, kind: row.kind.toLowerCase(), status: row.status.toLowerCase() };
}
