"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EVENT_TYPES, PACKAGE_OPTIONS, SERVICE_OPTIONS } from "@/lib/enquiry-content";

/** Request a Proposal form — posts to /api/enquiry, immediate confirmation. */
export function ProposalForm() {
  const [done, setDone] = useState(false);
  if (done) return <p>Thank you — your proposal request is received.</p>;
  return (
    <section className="dg-block" id="proposal">
      <SectionHeading title="Request a Proposal" />
      <form onSubmit={async (e) => { e.preventDefault(); await fetch("/api/enquiry", { method: "POST", body: JSON.stringify({ kind: "proposal", data: Object.fromEntries(new FormData(e.currentTarget)) }) }); setDone(true); }}>
        <input name="name" required placeholder="Name / organisation / role" />
        <input name="email" type="email" required placeholder="Email" />
        <input name="phone" required placeholder="Phone / WhatsApp" />
        <select name="eventType" required defaultValue=""><option value="" disabled>Event type</option>{EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
        <input name="eventDate" required placeholder="Event date and time" />
        <input name="guests" required inputMode="numeric" placeholder="Estimated guests" />
        <select name="package" required defaultValue=""><option value="" disabled>Package interest</option>{PACKAGE_OPTIONS.map((p) => <option key={p}>{p}</option>)}</select>
        <fieldset>{SERVICE_OPTIONS.map((s) => <label key={s}><input type="checkbox" name="services" value={s} /> {s}</label>)}</fieldset>
        <input name="budget" placeholder="Budget range (optional)" />
        <textarea name="details" placeholder="Special requirements / description" />
        <input name="source" placeholder="How did you hear about us?" />
        <label><input name="consent" type="checkbox" required /> Privacy acknowledgement</label>
        <button className="btn solid" type="submit">Request a Proposal</button>
      </form>
    </section>
  );
}
