export type AccountStatus = "active" | "suspended" | "deactivated";

export type ListedAccount = {
  id: string;
  email: string;
  name: string | null;
  status: AccountStatus;
  roles: string[];
};

export type AccountRow = {
  id: string;
  email: string;
  name: string | null;
  status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  roles: { role: { key: string; permissions: string[] } }[];
};
