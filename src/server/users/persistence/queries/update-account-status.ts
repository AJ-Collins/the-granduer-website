import { toListedAccount, WITH_ROLES, type AccountRow, type AccountStatus } from "../rows";

type StatusWriter = {
  account: {
    update(args: {
      where: { id: string };
      data: { status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED" };
      include: { roles: { include: { role: true } } };
    }): Promise<AccountRow>;
  };
};

export async function updateAccountStatus(
  client: StatusWriter,
  id: string,
  status: AccountStatus,
) {
  const updated = await client.account.update({
    where: { id },
    data: { status: status.toUpperCase() as "ACTIVE" | "SUSPENDED" | "DEACTIVATED" },
    include: WITH_ROLES,
  });
  return toListedAccount(updated);
}
