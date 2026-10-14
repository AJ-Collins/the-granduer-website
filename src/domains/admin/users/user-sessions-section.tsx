"use client";

import { SectionCard, EmptyState } from "@/shared/components/management";
import { IconRadio } from "@/shared/components/management/icons";

export function UserSessionsSection({ userId }: { userId: string }) {
  // Session revocation/listing API lands in subsequent phases
  return (
    <SectionCard
      title="Active Sessions"
      description="Active login sessions and connected devices for this account."
    >
      <EmptyState
        icon={<IconRadio size={24} />}
        title="No active sessions"
        description="Active device sessions and tokens for this account will appear here."
      />
    </SectionCard>
  );
}
