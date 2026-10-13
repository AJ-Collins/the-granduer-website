import { ABOUT_HERO } from "@/shared/lib/about-content";

/** Hero — same `.hero` language. */
export function AboutHero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="brand">{ABOUT_HERO.eyebrow}</span>
        <h1>{ABOUT_HERO.title}</h1>
        <p>{ABOUT_HERO.copy}</p>
      </div>
    </section>
  );
}
