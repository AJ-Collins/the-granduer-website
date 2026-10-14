import { EnquiriesTable } from "@/domains/cms/enquiries-table";
import { listEnquiries } from "@/server/enquiries/services/managed/list-enquiries";

export default async function EnquiriesPage() {
  const { items } = await listEnquiries(1, 50);
  return (
    <main>
      <h1>Enquiries</h1>
      <EnquiriesTable enquiries={items} />
    </main>
  );
}
