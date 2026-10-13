export const PERMISSIONS = {
  adminAccess: "admin.access",
  cmsAccess: "cms.access",
  usersManage: "users.manage",
  rolesManage: "roles.manage",
  catalogManage: "catalog.manage",
  contentPublish: "content.publish",
  enquiriesManage: "enquiries.manage",
  auditRead: "audit.read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS);

/** Default permission sets for the seeded roles (source of truth for seed + tests). */
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  superadmin: ALL_PERMISSIONS,
  admin: [
    PERMISSIONS.adminAccess,
    PERMISSIONS.cmsAccess,
    PERMISSIONS.usersManage,
    PERMISSIONS.rolesManage,
    PERMISSIONS.catalogManage,
    PERMISSIONS.contentPublish,
    PERMISSIONS.enquiriesManage,
    PERMISSIONS.auditRead,
  ],
  editor: [
    PERMISSIONS.cmsAccess,
    PERMISSIONS.catalogManage,
    PERMISSIONS.contentPublish,
    PERMISSIONS.enquiriesManage,
  ],
  viewer: [PERMISSIONS.cmsAccess],
};
