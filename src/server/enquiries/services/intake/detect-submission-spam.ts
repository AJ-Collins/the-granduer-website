import type { EnquiryBody } from "../../requests/read-enquiry-body";

const URL_PATTERN = /https?:\/\/|[a-z0-9-]+\.(ru|xyz|top|click|buzz|loan)\b/i;

/** Flags link-heavy or suspicious free text at intake; the row is kept, just marked. */
export function detectSubmissionSpam(input: EnquiryBody): boolean {
  const texts = input.kind === "viewing"
    ? [input.data.message]
    : [input.data.details, input.data.source];
  const combined = texts.filter(Boolean).join("\n");
  const urls = combined.match(/https?:\/\/\S+/gi) ?? [];
  if (urls.length >= 2) return true;
  return URL_PATTERN.test(combined);
}
