import { BOOKING_HERO } from "@/lib/booking-journey-content";

/** Hero — same `.hero` language. */
export function BookingHero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="brand">{BOOKING_HERO.eyebrow}</span>
        <h1>{BOOKING_HERO.title}</h1>
        <p>{BOOKING_HERO.copy}</p>
      </div>
    </section>
  );
}
