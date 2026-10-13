const isProd = process.env.NODE_ENV === "production";

type CookieOptions = {
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
  path: string;
  maxAge: number;
};

export function sessionCookieOptions(maxAge = 15 * 60): CookieOptions {
  return { httpOnly: true, sameSite: "lax", secure: isProd, path: "/", maxAge };
}

export function refreshCookieOptions(maxAge = 30 * 24 * 3600): CookieOptions {
  return { httpOnly: true, sameSite: "lax", secure: isProd, path: "/", maxAge };
}
