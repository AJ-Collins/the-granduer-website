import type { ReactNode } from "react";
import type { Status } from "./lib/send-enquiry";

export function EnquiryFormShell({
  id,
  step,
  title,
  copy,
  image,
  imageAlt,
  caption,
  mirror = false,
  status,
  successTitle,
  successCopy,
  onSubmit,
  children,
}: {
  id: string;
  step: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  caption: string;
  mirror?: boolean;
  status: Status;
  successTitle: string;
  successCopy: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  return (
    <section id={id} className="grid w-full overflow-x-clip bg-ivory text-navy lg:grid-cols-12">
      <div
        className={`relative aspect-[4/3] w-full sm:aspect-[3/2] lg:sticky lg:top-0 lg:col-span-5 lg:h-svh lg:aspect-auto ${mirror ? "order-first lg:order-last" : ""}`}
      >
        <img src={image} alt={imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent" />
        <span className="absolute bottom-8 left-8 font-script text-[clamp(2.5rem,4vw,4rem)] leading-none text-ivory md:bottom-12 md:left-12">
          {caption}
        </span>
      </div>
      <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,6rem)] py-16 lg:col-span-7 lg:min-h-svh lg:py-28">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-navy/60">
          {step}
        </span>
        <h2 className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">{title}</h2>
        <p className="mt-4 max-w-md font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] italic leading-snug text-navy/70">
          {copy}
        </p>
        {status === "done" ? (
          <div className="mt-12 bg-navy px-8 py-12 text-ivory md:px-12 md:py-16" role="status">
            <span className="block font-script text-[clamp(2.5rem,4vw,4rem)] leading-none text-ivory/70">
              {successTitle}
            </span>
            <p className="mt-4 font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-snug">
              {successCopy}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 grid gap-5 sm:grid-cols-2">
            {children}
          </form>
        )}
      </div>
    </section>
  );
}
