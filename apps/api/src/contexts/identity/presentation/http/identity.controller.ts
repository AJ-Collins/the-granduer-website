import type { Context } from "hono";
import { badRequest, unauthorized } from "../../../../core/errors/app-error.js";
import { created, ok } from "../../../../core/http/respond.js";
import type { AuthContext } from "../../../../core/middleware/authenticate.js";
import type { AccountRepository } from "../../accounts/account.repository.js";
import type { ChangePassword, RequestPasswordReset, ResetPassword } from "../../application/use-cases/passwords.js";
import type { Login, Logout } from "../../application/use-cases/login.js";
import {
  changePasswordSchema,
  loginSchema,
  requestResetSchema,
  resetPasswordSchema,
} from "./identity.schemas.js";

function requireAuth(c: Context): AuthContext {
  const auth = (c.get as (k: string) => unknown)("auth") as AuthContext | undefined;
  if (!auth) throw unauthorized();
  return auth;
}

export function makeIdentityController(
  accounts: AccountRepository,
  login: Login,
  logout: Logout,
  changePassword: ChangePassword,
  requestReset: RequestPasswordReset,
  resetPassword: ResetPassword,
) {
  return {
    async login(c: Context) {
      const parsed = loginSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid login payload", parsed.error.flatten());
      return created(c, await login(parsed.data.email, parsed.data.password));
    },
    async logout(c: Context) {
      await logout(requireAuth(c).userId);
      return ok(c, { loggedOut: true });
    },
    async me(c: Context) {
      const auth = requireAuth(c);
      const account = await accounts.findById(auth.userId);
      if (!account) throw unauthorized();
      return ok(c, {
        id: account.id,
        email: account.email,
        name: account.name,
        status: account.status,
        roles: account.roles,
        permissions: account.permissions,
      });
    },
    async changePassword(c: Context) {
      const parsed = changePasswordSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      await changePassword(requireAuth(c).userId, parsed.data.currentPassword, parsed.data.newPassword);
      return ok(c, { changed: true });
    },
    async requestReset(c: Context) {
      const parsed = requestResetSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      await requestReset(parsed.data.email);
      return ok(c, { sent: true });
    },
    async resetPassword(c: Context) {
      const parsed = resetPasswordSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      await resetPassword(parsed.data.token, parsed.data.newPassword);
      return ok(c, { reset: true });
    },
  };
}
