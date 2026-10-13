import { clientIp } from "./client-ip";
import { emailKey } from "./email-key";
import { ipKey } from "./ip-key";

const MIN = 60_000;
const HOUR = 3600_000;

export type LimiterContext = {
  ip: string;
  email?: string;
  userId?: string;
  tokenHash?: string;
};

export type Limiter = {
  limit: number;
  windowMs: number;
  key: (c: LimiterContext) => string;
};

/** One named-limiter table. Identity buckets sit beside IP budgets. */
export const LIMITERS = {
  "auth-login": { limit: 5, windowMs: 15 * MIN, key: (c) => `auth-login:${emailKey(c.email ?? c.ip)}` },
  "auth-login-ip": { limit: 20, windowMs: 15 * MIN, key: (c) => `auth-login-ip:${ipKey(c.ip)}` },
  "password-request": { limit: 3, windowMs: 15 * MIN, key: (c) => `password-request:${emailKey(c.email ?? c.ip)}` },
  "password-reset": { limit: 5, windowMs: 15 * MIN, key: (c) => `password-reset:${ipKey(c.ip)}` },
  "auth-refresh": { limit: 20, windowMs: 15 * MIN, key: (c) => `auth-refresh:${c.tokenHash ?? ipKey(c.ip)}` },
  api: { limit: 60, windowMs: MIN, key: (c) => `api:${c.userId ?? ipKey(c.ip)}` },
  "admin-write": { limit: 60, windowMs: MIN, key: (c) => `admin-write:${c.userId ?? ipKey(c.ip)}` },
  "contact-email": { limit: 3, windowMs: HOUR, key: (c) => `contact-email:${emailKey(c.email ?? c.ip)}` },
  "enquiry-ip": { limit: 10, windowMs: MIN, key: (c) => `enquiry-ip:${ipKey(c.ip)}` },
  uploads: { limit: 30, windowMs: MIN, key: (c) => `uploads:${c.userId ?? ipKey(c.ip)}` },
} satisfies Record<string, Limiter>;

export type LimiterName = keyof typeof LIMITERS;

export function limiterContext(
  req: Request,
  extra?: Partial<LimiterContext>,
): LimiterContext {
  return { ip: clientIp(req), ...extra };
}
