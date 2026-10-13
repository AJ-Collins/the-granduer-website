import { selectUserByEmail } from "../../src/server/users/persistence/queries/select-user-by-email";
import { createUserWithAudit } from "../../src/server/users/persistence/transactions/create-user-with-audit";

export async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@dgrandeur.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.warn("WARNING: using default seed admin password — set SEED_ADMIN_PASSWORD.");
  }
  const existing = await selectUserByEmail(email);
  if (!existing) {
    await createUserWithAudit({ email, password, name: "Site Administrator", roleKeys: ["superadmin"] });
  }
  console.log("admin seeded:", email);
}
