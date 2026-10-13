// Identity boundary: other contexts may use the account lookup port and
// the session verifier ONLY through what bootstrap injects — never by
// importing infrastructure/ or application/ internals.
export type { Account, AccountStatus } from "./accounts/account.js";
export type { AccountRepository } from "./accounts/account.repository.js";
export { identityModule } from "./identity.module.js";
