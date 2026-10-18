"use client";

import { useEffect, useRef, useState } from "react";
import { HERO } from "@/shared/lib/home-content";

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/34926864/14794499_1920_1080_24fps.mp4";

/** * Full-screen cinematic hero. */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) v.play().catch(() => {});
  }, []);

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-navy-deep px-[clamp(1.25rem,4vw,5rem)] pb-32 pt-28 text-center sm:pb-28">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={HERO.poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Light navy veil: keeps the video vivid, darkens only top and bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-navy-deep/55 via-navy-deep/5 to-navy-deep/70"
      />

      {/* Soft glow behind the text for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(19,30,42,0.4),transparent_65%)]"
      />

      {/* Content (ignores the pointer so tile hovers pass through; links still work) */}
      <div className="pointer-events-none relative z-10 flex w-full max-w-6xl flex-col items-center">
        <h1 className="w-full">
          <img
            src="/brand/dg-lockup-ivory.svg"
            alt="D'Grandeur Event Centre"
            className="mx-auto h-auto w-[min(82vw,340px)] drop-shadow-[0_4px_30px_rgba(19,30,42,0.55)] sm:w-[min(70vw,500px)] lg:w-[600px] 2xl:w-[760px]"
          />
        </h1>

        <p className="mt-8 font-display text-[clamp(1.75rem,4.2vw,4rem)] leading-[1.1] tracking-wide text-ivory [text-shadow:0_2px_28px_rgba(19,30,42,0.6)] sm:mt-10">
          {HERO.tagline}
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-14 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <a
            href="/contact#viewing"
            className="pointer-events-auto bg-ivory px-10 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-navy transition-colors duration-500 hover:bg-white"
          >
            Book a Viewing
          </a>
          <a
            href="/venue"
            className="pointer-events-auto bg-ivory/20 px-10 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy"
          >
            Explore the Venue
          </a>
        </div>
      </div>

      {/* Scroll button (square, no border) */}
      <a
        href="#welcome"
        aria-label="Scroll to content"
        className="absolute bottom-24 left-1/2 z-10 flex size-12 -translate-x-1/2 items-center justify-center bg-ivory/20 text-ivory backdrop-blur-md transition-colors duration-500 hover:bg-ivory hover:text-navy md:bottom-10"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}