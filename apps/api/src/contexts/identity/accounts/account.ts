export type AccountStatus = "active" | "suspended" | "deactivated";

/** Application-level account (no password hash — secrets stay in the repository). */
export interface Account {
  id: string;
  email: string;
  name: string | null;
  status: AccountStatus;
  roles: string[];
  permissions: string[];
}
