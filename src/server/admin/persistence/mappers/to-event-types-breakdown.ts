export function toEventTypesBreakdown(
  eventTypes: { id: string; name: string; _count: { enquiries: number } }[],
) {
  return eventTypes.map((et) => ({
    id: et.id,
    label: et.name,
    value: et._count.enquiries,
    formattedValue: `${et._count.enquiries} enquiries`,
  }));
}
