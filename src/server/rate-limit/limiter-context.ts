import { clientIp } from "./keys/client-ip";
import type { LimiterContext } from "./limiters";

export function limiterContext(
  req: Request,
  extra?: Partial<LimiterContext>,
): LimiterContext {
  return { ip: clientIp(req), ...extra };
}
