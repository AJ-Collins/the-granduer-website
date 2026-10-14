import { SubmissionsTable } from "@/domains/admin/submissions";
import { listEnquiries } from "@/server/enquiries/services/managed/list-enquiries";

export default async function SubmissionsPage() {
  const { items } = await listEnquiries(1, 50);
  return (
    <main>
      <h1>Submissions</h1>
      <SubmissionsTable submissions={items} />
    </main>
  );
}
