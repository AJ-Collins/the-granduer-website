import { selectAuditLogs } from "../persistence/queries/select-audit-logs";

export async function listAuditLogs(
  page: number,
  pageSize: number,
  filter?: { entityType?: string; entityId?: string },
) {
  return selectAuditLogs(page, pageSize, filter);
}
