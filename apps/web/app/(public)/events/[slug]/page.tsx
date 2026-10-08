import { notFound } from "next/navigation";
import { EVENTS } from "@/lib/events-content";
import { EventCTA, EventHero, EventServices, EventStory } from "@/components/events";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/home/SiteFooter";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export default async function EventSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <main>
        <EventHero title={event.title} />
        <EventStory story={event.story} />
        <EventServices services={[...event.services]} />
        <EventCTA cta={event.cta} />
      </main>
      <SiteFooter />
    </>
  );
}