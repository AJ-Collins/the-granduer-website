export const PERMISSIONS = {
  adminAccess: "admin.access",
  cmsAccess: "cms.access",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
