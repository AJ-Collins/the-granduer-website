/** The authenticated actor every controller works with. */
export type SessionUser = {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
  sessionId: string;
};

export type AccessClaims = {
  sub: string;
  sid: string;
  roles: string[];
  permissions: string[];
};
