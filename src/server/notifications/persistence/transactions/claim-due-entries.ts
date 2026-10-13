import { claimOutboxRow } from "../queries/claim-outbox-row";
import { selectDueOutboxCandidates } from "../queries/select-due-outbox-candidates";
import type { ClaimedOutboxRow } from "../types";

/**
 * Multi-step claim flow (grouped here, not in a service): candidates are only
 * read; the atomic CAS inside claimOutboxRow is the single writer, so this
 * loop holds no locks and cannot deadlock across pollers.
 */
export async function claimDueEntries(limit: number): Promise<ClaimedOutboxRow[]> {
  const candidates = await selectDueOutboxCandidates(limit);
  const claimed: ClaimedOutboxRow[] = [];
  for (const candidate of candidates) {
    const won = await claimOutboxRow(candidate);
    if (won) claimed.push(won);
  }
  return claimed;
}
