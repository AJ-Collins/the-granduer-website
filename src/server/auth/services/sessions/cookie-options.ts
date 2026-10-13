export type CookieOptions = {
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
  path: string;
  maxAge: number;
};

export function isProductionCookies(): boolean {
  return process.env.NODE_ENV === "production";
}
