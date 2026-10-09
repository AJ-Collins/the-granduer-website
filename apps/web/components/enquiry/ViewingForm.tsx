"use client";

import { useState } from "react";
import { EVENT_TYPES } from "@/lib/enquiry-content";
import { Field, inputLight, sendEnquiry, type Status } from "./form-ui";

const IMAGE =
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80";

/**
 * Book a Viewing, full screen.
 * lg+: pinned photo left (5 cols), form right (7 cols). Below lg: photo then form.
 * Posts to /api/enquiry with immediate on-page confirmation.
 * Rectangles only. No borders, no lines, no rounding.
 */
export function ViewingForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const ok = await sendEnquiry("viewing", form);
    setStatus(ok ? "done" : "error");
  }

  return (
    <section
      id="viewing"
      className="grid w-full overflow-x-clip bg-ivory text-navy lg:grid-cols-12"
    >
      {/* Photo (pinned on lg+) */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[3/2] lg:sticky lg:top-0 lg:col-span-5 lg:h-svh lg:aspect-auto">
        <img
          src={IMAGE}
          alt="The hall, ready for your viewing"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent"
        />
        <span className="absolute bottom-8 left-8 font-script text-[clamp(2.5rem,4vw,4rem)] leading-none text-ivory md:bottom-12 md:left-12">
          Come and see it
        </span>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,6rem)] py-16 lg:col-span-7 lg:min-h-svh lg:py-28">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60">
          Step one
        </span>
        <h2 className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">
          Book a Viewing
        </h2>
        <p className="mt-4 max-w-md font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] italic leading-snug text-navy/70">
          Walk the hall and see it for yourself.
        </p>

        {status === "done" ? (
          <div className="mt-12 bg-navy px-8 py-12 text-ivory md:px-12 md:py-16" role="status">
            <span className="block font-script text-[clamp(2.5rem,4vw,4rem)] leading-none text-ivory/70">
              Thank you
            </span>
            <p className="mt-4 font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug">
              Your viewing request is received.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 grid gap-5 sm:grid-cols-2">
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
                <option value="" disabled>
                  Choose one
                </option>
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
                {status === "sending" ? "Sending…" : "Book a Viewing"}
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