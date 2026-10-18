"use client";

import { useEffect, useRef, useState } from "react";
import { BookViewingLink } from "../shell/book-viewing-link";

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/34926864/14794499_1920_1080_24fps.mp4";

/** * Full-screen cinematic hero with background video. */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) v.play().catch(() => { });
  }, []);

  return (
    <section className="relative flex min-h-screen min-h-[100svh] w-full items-center justify-center overflow-hidden text-center">
      {/* Background Cinematic Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-90"
          }`}
        poster="/images/homepage/hero-banquet.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Ambient Dark Overlay for legible glowing text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40 backdrop-brightness-[0.95]"
      />

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:py-28 text-white">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-normal leading-[1.18] tracking-wide text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]">
          A distinguished destination for life&rsquo;s<br className="hidden sm:inline" /> most important moments
        </h1>

        <p className="mx-auto mt-4 sm:mt-5 max-w-2xl font-serif text-xs sm:text-sm md:text-base tracking-[0.04em] text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
          Weddings, galas and conferences - one adaptable setting, hosted.
        </p>

        <div className="mt-7 sm:mt-9">
          <BookViewingLink className="inline-block rounded-full bg-white px-8 sm:px-9 py-3 sm:py-3.5 font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#1c2c3c] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#f4f1ea]">
            BOOK A VIEWING
          </BookViewingLink>
        </div>
      </div>
    </section>
  );
}