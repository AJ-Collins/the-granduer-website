import { env } from "../core/config/env.js";
import { makeAuthenticate } from "../core/middleware/authenticate.js";
import { PrismaAdminUserRepository } from "../contexts/admin/users/infrastructure/persistence/prisma-admin-user.repository.js";
import { makeGetAdminUser } from "../contexts/admin/users/application/use-cases/get-user.js";
import { makeListAdminUsers } from "../contexts/admin/users/application/use-cases/list-users.js";
import {
  makeCreateAdminUser,
  makeSetAdminUserRoles,
  makeSetAdminUserStatus,
} from "../contexts/admin/users/application/use-cases/manage-users.js";
import { PrismaRoleRepository, makeListRoles } from "../contexts/admin/roles/roles.js";
import { PrismaAccountRepository } from "../contexts/identity/infrastructure/persistence/prisma-account.repository.js";
import { SessionService } from "../contexts/identity/sessions/session.service.js";
import { makeLogin, makeLogout } from "../contexts/identity/application/use-cases/login.js";
import {
  makeChangePassword,
  makeRequestPasswordReset,
  makeResetPassword,
} from "../contexts/identity/application/use-cases/passwords.js";
import { PrismaEnquiryRepository } from "../contexts/public/enquiries/infrastructure/persistence/prisma-enquiry.repository.js";
import { LogEventPublisher } from "../contexts/public/enquiries/application/ports/event-publisher.port.js";
import { makeSubmitEnquiry } from "../contexts/public/enquiries/application/use-cases/submit-enquiry.js";
import {
  makeAssignEnquiry,
  makeGetManagedEnquiry,
  makeListManagedEnquiries,
  makeUpdateEnquiryStatus,
} from "../contexts/public/enquiries/application/use-cases/manage-enquiries.js";
import {
  PrismaCatalogLookup,
  PrismaEventTypeRepository,
  PrismaPackageRepository,
} from "../domains/catalog/index.js";
import {
  makeCreateEventType,
  makeCreatePackage,
  makeGetPublishedEventType,
  makeGetPublishedPackage,
  makeListPublishedEventTypes,
  makeListPublishedPackages,
  makeSetEventTypeStatus,
  makeSetPackageStatus,
  makeUpdateEventType,
  makeUpdatePackage,
} from "../domains/catalog/application/use-cases/catalog.use-cases.js";
import { LogNotifier } from "../shared/notifications/notifier.js";
import { makeListAuditLogs, PrismaAuditWriter } from "../shared/audit/audit-log.js";

/**
 * Composition root: constructs repositories, ports, and use-cases once,
 * then injects them into context modules. Nothing outside bootstrap may
 * `new` an infrastructure adapter directly.
 */
export function buildDependencies() {
  const accountRepository = new PrismaAccountRepository();
  const sessions = new SessionService(accountRepository, env.SESSION_SECRET);
  const authenticate = makeAuthenticate((token) => sessions.verify(token));

  const notifier = new LogNotifier();
  const events = new LogEventPublisher();
  const audit = new PrismaAuditWriter();

  const enquiryRepo = new PrismaEnquiryRepository();
  const catalogLookup = new PrismaCatalogLookup();
  const packageRepository = new PrismaPackageRepository();
  const eventTypeRepository = new PrismaEventTypeRepository();
  const adminUserRepo = new PrismaAdminUserRepository();

  return {
    authenticate,
    accountRepository,
    packageRepository,
    eventTypeRepository,

    // identity
    login: makeLogin(accountRepository, sessions),
    logoutUser: makeLogout(accountRepository, sessions),
    changePassword: makeChangePassword(accountRepository, sessions),
    requestPasswordReset: makeRequestPasswordReset(accountRepository, notifier),
    resetPassword: makeResetPassword(accountRepository, sessions),

    // public enquiries
    submitEnquiry: makeSubmitEnquiry(enquiryRepo, events, notifier, catalogLookup),

    // cms enquiries (same domain, management workflows)
    listManagedEnquiries: makeListManagedEnquiries(enquiryRepo),
    getManagedEnquiry: makeGetManagedEnquiry(enquiryRepo),
    assignEnquiry: makeAssignEnquiry(enquiryRepo, audit),
    updateEnquiryStatus: makeUpdateEnquiryStatus(enquiryRepo, audit),

    // catalog reads (public) + writes (cms) — one shared domain
    listPublishedPackages: makeListPublishedPackages(packageRepository),
    getPublishedPackage: makeGetPublishedPackage(packageRepository),
    listPublishedEventTypes: makeListPublishedEventTypes(eventTypeRepository),
    getPublishedEventType: makeGetPublishedEventType(eventTypeRepository),
    createPackage: makeCreatePackage(packageRepository),
    updatePackage: makeUpdatePackage(packageRepository),
    setPackageStatus: makeSetPackageStatus(packageRepository),
    createEventType: makeCreateEventType(eventTypeRepository),
    updateEventType: makeUpdateEventType(eventTypeRepository),
    setEventTypeStatus: makeSetEventTypeStatus(eventTypeRepository),

    // admin
    getAdminUser: makeGetAdminUser(adminUserRepo),
    listAdminUsers: makeListAdminUsers(adminUserRepo),
    createAdminUser: makeCreateAdminUser(adminUserRepo, audit),
    setAdminUserStatus: makeSetAdminUserStatus(adminUserRepo, audit),
    setAdminUserRoles: makeSetAdminUserRoles(adminUserRepo, audit),
    listRoles: makeListRoles(new PrismaRoleRepository()),
    listAuditLogs: makeListAuditLogs(),
  };
}

export type Deps = ReturnType<typeof buildDependencies>;
