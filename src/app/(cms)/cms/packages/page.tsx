import { PackagesTable } from "@/domains/cms/packages";
import { listPackages } from "@/server/catalog/services/packages/list-packages";

export default async function PackagesPage() {
  const packages = await listPackages(false);
  return (
    <main>
      <h1>Packages</h1>
      <PackagesTable packages={packages} />
    </main>
  );
}
