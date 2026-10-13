export interface AdminUserDto {
  id: string;
  email: string;
  name: string | null;
  status: "active" | "suspended" | "deactivated";
  roles: string[];
}

export interface RoleDto {
  id: string;
  key: string;
  label: string;
  permissions: string[];
}

export interface AuditRecordDto {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: unknown;
  createdAt: string;
}

export interface HealthDto {
  status: "ok";
  version: string;
  checks: { database: "ok" | "not-configured"; cache: "ok" | "not-configured" };
}
