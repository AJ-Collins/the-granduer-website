export const PERMISSIONS = {
  adminAccess: "admin.access",
  cmsAccess: "cms.access",
  usersManage: "users.manage",
  rolesManage: "roles.manage",
  catalogManage: "catalog.manage",
  contentPublish: "content.publish",
  enquiriesManage: "enquiries.manage",
  uploadsCreate: "uploads.create",
  auditRead: "audit.read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS);

/** The one table answering "who may do what". Seeded into Role.permissions. */
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
    PERMISSIONS.uploadsCreate,
    PERMISSIONS.auditRead,
  ],
  editor: [
    PERMISSIONS.cmsAccess,
    PERMISSIONS.catalogManage,
    PERMISSIONS.contentPublish,
    PERMISSIONS.enquiriesManage,
    PERMISSIONS.uploadsCreate,
  ],
  viewer: [PERMISSIONS.cmsAccess],
};
