"use client";

import { useState } from "react";
import {
  EVENT_TYPES,
  PACKAGE_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/enquiry-content";
import { Field, inputLight, sendEnquiry, type Status } from "./form-ui";

const IMAGE =
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80";

/**
 * Request a Proposal, full screen. Same design as Book a Viewing.
 * lg+: form left (7 cols), pinned photo right (5 cols), mirroring the viewing
 * form. Below lg: photo then form.
 * Posts to /api/enquiry with immediate on-page confirmation.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function ProposalForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const ok = await sendEnquiry("proposal", form);
    setStatus(ok ? "done" : "error");
  }

  return (
    <section
      id="proposal"
      className="grid w-full overflow-x-clip bg-ivory text-navy lg:grid-cols-12"
    >
      {/* Photo (first on small screens, pinned right on lg+) */}
      <div className="relative order-first aspect-[4/3] w-full sm:aspect-[3/2] lg:sticky lg:top-0 lg:order-last lg:col-span-5 lg:h-svh lg:aspect-auto">
        <img
          src={IMAGE}
          alt="A celebration designed to your brief"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent"
        />
        <span className="absolute bottom-8 left-8 font-script text-[clamp(2.5rem,4vw,4rem)] leading-none text-ivory md:bottom-12 md:left-12">
          Made for you
        </span>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,6rem)] py-16 lg:col-span-7 lg:min-h-svh lg:py-28">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60">
          Step two
        </span>
        <h2 className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">
          Request a Proposal
        </h2>
        <p className="mt-4 max-w-md font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] italic leading-snug text-navy/70">
          Tailored to your date and guest list.
        </p>

        {status === "done" ? (
          <div className="mt-12 bg-navy px-8 py-12 text-ivory md:px-12 md:py-16" role="status">
            <span className="block font-script text-[clamp(2.5rem,4vw,4rem)] leading-none text-ivory/70">
              Thank you
            </span>
            <p className="mt-4 font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug">
              Your proposal request is received.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 grid gap-5 sm:grid-cols-2">
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
                <option value="" disabled>
                  Choose one
                </option>
                {EVENT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Package interest">
              <select name="package" required defaultValue="" className={inputLight}>
                <option value="" disabled>
                  Choose one
                </option>
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

            {/* Services: selectable rectangles */}
            <fieldset className="m-0 border-0 p-0 sm:col-span-2">
              <legend className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-navy/60">
                Services you&rsquo;re interested in
              </legend>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((s) => (
                  <label key={s} className="cursor-pointer">
                    <input
                      type="checkbox"
                      name="services"
                      value={s}
                      className="peer sr-only"
                    />
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
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 size-5 shrink-0 accent-navy"
              />
              <span>
                I acknowledge the{" "}
                <a href="/privacy" className="underline underline-offset-4">
                  privacy notice
                </a>
                .
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
          </form>
        )}
      </div>
    </section>
  );
}