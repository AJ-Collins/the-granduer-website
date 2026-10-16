"use client";

import { cn } from "@/shared/lib/cn";
import { OPPORTUNITY_STAGES, stageLabel, type OpportunityStage } from "./opportunity-stages";

export function PipelineStepper({
  current,
  counts,
}: {
  current?: OpportunityStage;
  counts?: Partial<Record<OpportunityStage, number>>;
}) {
  const currentIndex = current ? OPPORTUNITY_STAGES.indexOf(current) : -1;
  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-2" aria-label="Pipeline progress">
      {OPPORTUNITY_STAGES.map((stage, i) => {
        const done = currentIndex >= 0 && i < currentIndex;
        const active = stage === current;
        return (
          <li key={stage} className="flex items-center gap-1 shrink-0">
            <span
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border",
                active
                  ? "border-[var(--color-mgmt-accent)] bg-[var(--color-mgmt-accent)]/10 text-[var(--color-mgmt-accent)]"
                  : done
                    ? "border-[var(--color-mgmt-border)] bg-[var(--color-mgmt-surface)] text-[var(--color-mgmt-text)]"
                    : "border-[var(--color-mgmt-border-subtle)] text-[var(--color-mgmt-text-muted)]",
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold",
                  active
                    ? "bg-[var(--color-mgmt-accent)] text-black"
                    : done
                      ? "bg-[var(--color-mgmt-accent)]/20 text-[var(--color-mgmt-accent)]"
                      : "bg-[var(--color-mgmt-bg)] text-[var(--color-mgmt-text-muted)]",
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              {stageLabel(stage)}
              {counts?.[stage] !== undefined && (
                <span className="font-mono opacity-70">{counts[stage]}</span>
              )}
            </span>
            {i < OPPORTUNITY_STAGES.length - 1 && (
              <span aria-hidden="true" className="w-3 h-px bg-[var(--color-mgmt-border)]" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
