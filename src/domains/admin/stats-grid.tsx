import { Card } from "@/shared/components/ui/Card";

export type AdminStats = {
  users: number;
  enquiriesNew: number;
  enquiriesTotal: number;
  publishedPackages: number;
  publishedEvents: number;
};

const ITEMS: { key: keyof AdminStats; label: string }[] = [
  { key: "users", label: "Users" },
  { key: "enquiriesNew", label: "New enquiries" },
  { key: "enquiriesTotal", label: "Total enquiries" },
  { key: "publishedPackages", label: "Published packages" },
  { key: "publishedEvents", label: "Published events" },
];

export function StatsGrid({ stats }: { stats: AdminStats }) {
  return (
    <div>
      {ITEMS.map((item) => (
        <Card key={item.key}>
          <div>{stats[item.key]}</div>
          <div>{item.label}</div>
        </Card>
      ))}
    </div>
  );
}
