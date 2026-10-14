"use client";

import { EVENT_TYPES, PACKAGE_OPTIONS, SERVICE_OPTIONS } from "@/shared/lib/enquiry-content";
import { EnquiryFormShell } from "./EnquiryFormShell";
import { Field } from "./Field";
import { inputLight } from "./input";
import { useEnquiryForm } from "./use-enquiry-form";

/** Request a Proposal. */
export function ProposalForm() {
  const { status, onSubmit } = useEnquiryForm("proposal");
  return (
    <EnquiryFormShell
      id="proposal"
      step="Step two"
      title="Request a Proposal"
      copy="Tailored to your date and guest list."
      image="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80"
      imageAlt="A celebration designed to your brief"
      caption="Made for you"
      mirror
      status={status}
      successTitle="Thank you"
      successCopy="Your proposal request is received."
      onSubmit={onSubmit}
    >
      <Field label="Name / organisation / role" className="sm:col-span-2">
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
      <Field label="Package interest">
        <select name="package" required defaultValue="" className={inputLight}>
          <option value="" disabled>Choose one</option>
          {PACKAGE_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Event date and time">
        <input name="eventDate" required className={inputLight} />
      </Field>
      <Field label="Estimated guests">
        <input name="guests" required inputMode="numeric" className={inputLight} />
      </Field>
      <fieldset className="m-0 border-0 p-0 sm:col-span-2">
        <legend className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-navy/60">
          Services you&rsquo;re interested in
        </legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="checkbox" name="services" value={s} className="peer sr-only" />
              <span className="block bg-navy/6 px-5 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-navy transition-colors duration-300 hover:bg-navy/12 peer-checked:bg-navy peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-navy">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Budget range (optional)">
        <input name="budget" className={inputLight} />
      </Field>
      <Field label="How did you hear about us?">
        <input name="source" className={inputLight} />
      </Field>
      <Field label="Special requirements / description" className="sm:col-span-2">
        <textarea name="details" rows={4} className={inputLight} />
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
          {status === "sending" ? "Sending…" : "Request a Proposal"}
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
