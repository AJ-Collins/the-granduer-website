"use client";

import { useCallback, useEffect, useState } from "react";
import { SectionCard, StatusBadge, Alert, DetailSkeleton } from "@/shared/components/management";
import { InfoRow } from "@/domains/admin/users";
import { PipelineStepper } from "./pipeline-stepper";
import { StageAdvanceControl } from "./stage-advance-control";
import { stageLabel, type OpportunityStage } from "./opportunity-stages";

type Transition = {
  id: string;
  from: OpportunityStage | null;
  to: OpportunityStage;
  notes: string | null;
  createdAt: string;
};

type Detail = {
  id: string;
  stage: OpportunityStage;
  stageChangedAt: string;
  createdAt: string;
  enquiry: { id: string; kind: string; name: string; email: string; status: string };
  transitions: Transition[];
};

function daysInStage(since: string) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(since).getTime()) / 86_400_000));
  return days === 0 ? "moved today" : `${days} day${days === 1 ? "" : "s"} in stage`;
}

export function OpportunityDetail({ opportunityId }: { opportunityId: string }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/opportunities/${opportunityId}`);
      if (!res.ok) throw new Error(res.status === 404 ? "Opportunity not found." : "Failed to load opportunity.");
      const body = await res.json();
      setDetail(body.data ?? body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }, [opportunityId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (loading) return <DetailSkeleton rows={5} />;
  if (error || !detail) return <Alert variant="error">{error || "Opportunity not found."}</Alert>;

  const done = detail.stage === "reviewed";

  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="text-lg font-semibold text-[var(--color-mgmt-text)] truncate">
              {detail.enquiry.name}
            </p>
            <p className="text-xs text-[var(--color-mgmt-text-muted)] truncate">{detail.enquiry.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge variant={done ? "success" : "info"}>{stageLabel(detail.stage)}</StatusBadge>
            <span className="text-[11px] text-[var(--color-mgmt-text-muted)]">
              {daysInStage(detail.stageChangedAt)}
            </span>
          </div>
        </div>
        <PipelineStepper current={detail.stage} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-3 mt-4 pt-4 border-t border-[var(--color-mgmt-border-subtle)]">
          <InfoRow label="Enquiry kind" value={<span className="capitalize">{detail.enquiry.kind}</span>} />
          <InfoRow label="Submission status" value={<span className="capitalize">{detail.enquiry.status}</span>} />
          <InfoRow
            label="Submission"
            value={
              <a
                href={`/admin/submissions/${detail.enquiry.id}`}
                className="text-[var(--color-mgmt-accent)] hover:underline"
              >
                View original →
              </a>
            }
          />
        </div>
      </SectionCard>

      {!done && (
        <SectionCard title="Advance Stage" description="Move to the next pipeline stage.">
          <StageAdvanceControl opportunityId={detail.id} currentStage={detail.stage} onAdvanced={fetchDetail} />
        </SectionCard>
      )}

      <SectionCard
        title="Stage Timeline"
        description={`${detail.transitions.length} move${detail.transitions.length === 1 ? "" : "s"}, oldest first.`}
      >
        {detail.transitions.length === 0 ? (
          <p className="text-sm text-[var(--color-mgmt-text-muted)]">No transitions yet.</p>
        ) : (
          <ol className="relative border-l-2 border-[var(--color-mgmt-border-subtle)] pl-4 space-y-5 ml-2">
            {detail.transitions.map((t, i) => (
              <li key={t.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full ring-2 ring-[var(--color-mgmt-surface)] ${
                    i === detail.transitions.length - 1
                      ? "bg-[var(--color-mgmt-accent)]"
                      : "bg-[var(--color-mgmt-border)]"
                  }`}
                />
                <p className="text-sm font-semibold text-[var(--color-mgmt-text)]">
                  {t.from ? stageLabel(t.from) : "Created"} → {stageLabel(t.to)}
                </p>
                <p className="text-[11px] text-[var(--color-mgmt-text-muted)] font-mono mt-0.5">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
                {t.notes && (
                  <div className="mt-2 rounded-[var(--radius-mgmt-md)] bg-[var(--color-mgmt-bg)] border border-[var(--color-mgmt-border-subtle)] px-3 py-2">
                    <p className="text-sm text-[var(--color-mgmt-text-secondary)] leading-snug">{t.notes}</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </SectionCard>
    </div>
  );
}
