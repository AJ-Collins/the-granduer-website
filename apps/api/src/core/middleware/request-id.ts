import type { MiddlewareHandler } from "hono";
import { requestId as honoRequestId } from "hono/request-id";

export const requestId: MiddlewareHandler = honoRequestId();
