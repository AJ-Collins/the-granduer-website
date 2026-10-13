export type AuditEntryInput = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: unknown;
};

export type AuditFilter = { entityType?: string; entityId?: string };
