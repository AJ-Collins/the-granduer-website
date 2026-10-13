import type { MiddlewareHandler } from "hono";
import { forbidden } from "../errors/app-error.js";
import type { AuthContext } from "./authenticate.js";

/** Require one of the given permissions. Must run after `authenticate`. */
export function authorize(...required: string[]): MiddlewareHandler {
  return async (c, next) => {
    const auth = (c.get as (k: string) => unknown)("auth") as AuthContext | undefined;
    const has = required.some((p) => auth?.permissions.includes(p));
    if (!has) throw forbidden("Missing required permission");
    await next();
  };
}
