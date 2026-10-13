import type { Context } from "hono";
import { badRequest } from "../../../../../core/errors/app-error.js";
import { created, ok, paginated } from "../../../../../core/http/respond.js";
import type { AuthContext } from "../../../../../core/middleware/authenticate.js";
import type { GetAdminUser } from "../../application/use-cases/get-user.js";
import type { ListAdminUsers } from "../../application/use-cases/list-users.js";
import type {
  CreateAdminUser,
  SetAdminUserRoles,
  SetAdminUserStatus,
} from "../../application/use-cases/manage-users.js";
import {
  adminUserQuerySchema,
  createAdminUserSchema,
  setAdminUserRolesSchema,
  setAdminUserStatusSchema,
} from "./user.schemas.js";

function actor(c: Context): string {
  return ((c.get as (k: string) => unknown)("auth") as AuthContext).userId;
}

export function makeAdminUsersController(
  get: GetAdminUser,
  list: ListAdminUsers,
  create: CreateAdminUser,
  setStatus: SetAdminUserStatus,
  setRoles: SetAdminUserRoles,
) {
  return {
    async index(c: Context) {
      const query = adminUserQuerySchema.parse({
        page: c.req.query("page"),
        pageSize: c.req.query("pageSize"),
        status: c.req.query("status"),
        search: c.req.query("search"),
      });
      const { items, total } = await list(query.page, query.pageSize, {
        ...(query.status && { status: query.status }),
        ...(query.search && { search: query.search }),
      });
      return paginated(c, items, query.page, query.pageSize, total);
    },
    async show(c: Context) {
      return ok(c, await get(c.req.param("id")));
    },
    async create(c: Context) {
      const parsed = createAdminUserSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      return created(c, await create(parsed.data, actor(c)));
    },
    async setStatus(c: Context) {
      const parsed = setAdminUserStatusSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      return ok(c, await setStatus(c.req.param("id"), parsed.data.status, actor(c)));
    },
    async setRoles(c: Context) {
      const parsed = setAdminUserRolesSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      return ok(c, await setRoles(c.req.param("id"), parsed.data.roleKeys, actor(c)));
    },
  };
}
