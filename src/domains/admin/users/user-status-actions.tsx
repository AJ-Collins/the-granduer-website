"use client";

import { MgmtButton } from "@/shared/components/management";

export type UserStatus = "active" | "suspended" | "deactivated";

export function UserStatusActions({
  status,
  isSelf,
  updating,
  onChange,
}: {
  status: string;
  isSelf: boolean;
  updating: boolean;
  onChange: (next: UserStatus) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {status !== "active" && (
        <MgmtButton variant="primary" size="sm" disabled={isSelf || updating} onClick={() => onChange("active")}>
          Activate
        </MgmtButton>
      )}
      {status !== "suspended" && (
        <MgmtButton variant="secondary" size="sm" disabled={isSelf || updating} onClick={() => onChange("suspended")}>
          Suspend
        </MgmtButton>
      )}
      {status !== "deactivated" && (
        <MgmtButton variant="danger" size="sm" disabled={isSelf || updating} onClick={() => onChange("deactivated")}>
          Deactivate
        </MgmtButton>
      )}
    </div>
  );
}
