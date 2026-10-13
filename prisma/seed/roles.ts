import { ROLE_PERMISSIONS } from "../../src/server/access/permissions";
import { upsertSeedRole } from "../../src/server/users/persistence/queries/upsert-seed-role";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export async function seedRoles() {
  for (const [key, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    await upsertSeedRole(key, ROLE_LABELS[key], permissions);
  }
  console.log("roles seeded:", Object.keys(ROLE_PERMISSIONS).join(", "));
}
