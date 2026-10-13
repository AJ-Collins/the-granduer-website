type SessionRevoker = {
  session: {
    updateMany(args: {
      where: { userId: string; revokedAt: null };
      data: { revokedAt: Date };
    }): Promise<unknown>;
  };
};

export async function revokeAccountSessions(client: SessionRevoker, userId: string) {
  await client.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
