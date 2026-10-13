type RoleLinkWriter = {
  accountRole: {
    deleteMany(args: { where: { accountId: string } }): Promise<unknown>;
    createMany(args: { data: { accountId: string; roleId: string }[] }): Promise<unknown>;
  };
};

export async function replaceAccountRoleLinks(
  client: RoleLinkWriter,
  accountId: string,
  roleIds: string[],
) {
  await client.accountRole.deleteMany({ where: { accountId } });
  await client.accountRole.createMany({
    data: roleIds.map((roleId) => ({ accountId, roleId })),
  });
}
