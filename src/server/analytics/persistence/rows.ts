export type StoredAnalyticsEventRow = {
  id: string;
  eventName: string;
  path: string;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  enquiryId: string | null;
  occurredAt: Date;
};
