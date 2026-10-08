"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EVENT_TYPES } from "@/lib/enquiry-content";

/** Book a Viewing form — posts to /api/enquiry, immediate confirmation. */
export function ViewingForm() {
  const [done, setDone] = useState(false);
  if (done) return <p>Thank you — your viewing request is received.</p>;
  return (
    <section className="dg-block ivory" id="viewing">
      <SectionHeading title="Book a Viewing" />
      <form onSubmit={async (e) => { e.preventDefault(); await fetch("/api/enquiry", { method: "POST", body: JSON.stringify({ kind: "viewing", data: Object.fromEntries(new FormData(e.currentTarget)) }) }); setDone(true); }}>
        <input name="name" required placeholder="Name" />
        <input name="email" type="email" required placeholder="Email" />
        <input name="phone" required placeholder="Phone / WhatsApp" />
        <select name="eventType" required defaultValue=""><option value="" disabled>Event type</option>{EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
        <input name="preferredDate" type="date" required aria-label="Preferred viewing date" />
        <input name="altDate" type="date" aria-label="Alternative date" />
        <input name="eventDate" aria-label="Approx. event date" placeholder="Approx. event date" />
        <input name="guests" inputMode="numeric" placeholder="Estimated guests" />
        <textarea name="message" placeholder="Message / requirements" />
        <label><input name="consent" type="checkbox" required /> Privacy acknowledgement</label>
        <button className="btn solid" type="submit">Book a Viewing</button>
      </form>
    </section>
  );
}
