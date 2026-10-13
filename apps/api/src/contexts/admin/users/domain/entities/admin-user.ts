export type AdminUserStatus = "active" | "suspended" | "deactivated";

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  status: AdminUserStatus;
  roles: string[];
}
