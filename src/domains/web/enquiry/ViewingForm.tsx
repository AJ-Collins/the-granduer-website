"use client";

import { EVENT_TYPES } from "@/shared/lib/enquiry-content";
import { EnquiryFormShell } from "./EnquiryFormShell";
import { Field } from "./Field";
import { inputLight } from "./input";
import { useEnquiryForm } from "./use-enquiry-form";

/** Book a Viewing. */
export function ViewingForm() {
  const { status, onSubmit } = useEnquiryForm("viewing");
  return (
    <EnquiryFormShell
      id="viewing"
      step="Step one"
      title="Book a Viewing"
      copy="Walk the hall and see it for yourself."
      image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80"
      imageAlt="The hall, ready for your viewing"
      caption="Come and see it"
      status={status}
      successTitle="Thank you"
      successCopy="Your viewing request is received."
      onSubmit={onSubmit}
    >
      <Field label="Name">
        <input name="name" required autoComplete="name" className={inputLight} />
      </Field>
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" className={inputLight} />
      </Field>
      <Field label="Phone / WhatsApp">
        <input name="phone" required autoComplete="tel" className={inputLight} />
      </Field>
      <Field label="Event type">
        <select name="eventType" required defaultValue="" className={inputLight}>
          <option value="" disabled>Choose one</option>
          {EVENT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Preferred viewing date">
        <input name="preferredDate" type="date" required className={inputLight} />
      </Field>
      <Field label="Alternative date">
        <input name="altDate" type="date" className={inputLight} />
      </Field>
      <Field label="Approx. event date">
        <input name="eventDate" className={inputLight} />
      </Field>
      <Field label="Estimated guests">
        <input name="guests" inputMode="numeric" className={inputLight} />
      </Field>
      <Field label="Message / requirements" className="sm:col-span-2">
        <textarea name="message" rows={4} className={inputLight} />
      </Field>
      <label className="flex items-start gap-3 font-sans text-sm text-navy/75 sm:col-span-2">
        <input name="consent" type="checkbox" required className="mt-1 size-5 shrink-0 accent-navy" />
        <span>
          I acknowledge the <a href="/privacy" className="underline underline-offset-4">privacy notice</a>.
        </span>
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-navy px-12 py-5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors duration-500 hover:bg-navy-deep disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Book a Viewing"}
        </button>
        {status === "error" ? (
          <p role="alert" className="mt-4 font-sans text-sm text-navy/80">
            Something went wrong. Please try again, or message us on WhatsApp.
          </p>
        ) : null}
      </div>
    </EnquiryFormShell>
  );
}
