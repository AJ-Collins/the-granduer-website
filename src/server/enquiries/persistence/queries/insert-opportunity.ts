import type { StoredOpportunityRow } from "../rows";
import { toOpportunityRecord } from "../mappers/to-opportunity-record";

type OpportunityCreator = {
  opportunity: {
    create(args: { data: { enquiryId: string } }): Promise<StoredOpportunityRow>;
  };
};

export async function insertOpportunity(client: OpportunityCreator, enquiryId: string) {
  const created = await client.opportunity.create({ data: { enquiryId } });
  return toOpportunityRecord(created);
}
