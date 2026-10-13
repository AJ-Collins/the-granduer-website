export class UnknownRolesError extends Error {
  constructor(roles: string[]) {
    super(`Unknown roles: ${roles.join(", ")}`);
    this.name = "UnknownRolesError";
  }
}
