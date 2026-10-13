import type { Surface } from "./surface";

export type SurfaceConfig = {
  surface: Surface;
  prefix: string;
  publicPaths: Set<string>;
  loginPath: string;
  otherPrefix: string;
  otherHost: string;
};
