"use client";

import { useEffect, useRef, useState } from "react";

export default function CrazyVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className="relative aspect-video w-full overflow-hidden bg-neutral-950 md:aspect-auto md:h-[calc(100vh-80px)] md:min-h-[500px]">
      {/* VIDEO */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden md:inset-y-0 md:left-1/2 md:w-[90%] md:-translate-x-1/2">
        <video
          ref={videoRef}
          src="/volare.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-contain md:object-cover grayscale contrast-110 brightness-[0.65]"
        />

        {/* Cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Giant background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <h1 className="select-none whitespace-nowrap text-[18vw] font-black uppercase tracking-[-0.1em] text-white/[0.05]">
          VOLARE
        </h1>
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-y-3 left-[3%] right-[3%] border border-white/10 md:inset-y-8 md:left-[5%] md:right-[5%]" />

      {/* TOP LEFT */}
      <div className="absolute left-[5%] top-[6%] flex items-center gap-2 md:left-[7%] md:top-10 md:gap-3">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white md:h-2 md:w-2" />

        <span className="text-[8px] uppercase tracking-[0.25em] text-white/70 md:text-xs md:tracking-[0.4em]">
          Team Volare
        </span>
      </div>

      {/* TOP RIGHT */}
      <div className="absolute right-[5%] top-[6%] hidden text-[8px] uppercase tracking-[0.2em] text-white/50 sm:block md:right-[7%] md:top-10 md:text-xs md:tracking-[0.35em]">
        Energy · Motion · Engineering
      </div>

      {/* CENTER */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-2 text-[7px] uppercase tracking-[0.3em] text-white/60 sm:text-[9px] md:mb-5 md:text-[11px] md:tracking-[0.7em]">
            Monaco Energy Boat Challenge
          </p>

          <h2 className="text-[16vw] font-black uppercase leading-[0.8] tracking-[-0.08em] text-white sm:text-[14vw] md:text-[clamp(5rem,11vw,11rem)]">
            VOLARE
          </h2>

          <div className="mx-auto mt-3 h-px w-12 bg-white/40 md:mt-8 md:w-24" />

          <p className="mt-3 text-[7px] uppercase tracking-[0.3em] text-white/50 sm:text-[9px] md:mt-6 md:text-xs md:tracking-[0.6em]">
            Powered by Innovation
          </p>
        </div>
      </div>

      {/* BOTTOM LEFT */}
      <div className="absolute bottom-[6%] left-[5%] md:bottom-10 md:left-[7%]">
        <p className="text-[8px] uppercase tracking-[0.25em] text-white/50 md:text-xs md:tracking-[0.4em]">
          2027 / Monaco
        </p>
      </div>

      {/* BOTTOM RIGHT */}
      <div className="absolute bottom-[5%] right-[5%] flex items-center gap-3 md:bottom-10 md:right-[7%] md:gap-6">
        {/* Hide scroll text on mobile */}
        <span className="hidden text-xs uppercase tracking-[0.4em] text-white/50 md:block">
          Scroll to explore
        </span>

        {/* Hide arrow on mobile */}
        <span className="hidden text-lg text-white/70 md:block">↓</span>

        {/* MUTE BUTTON */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black md:h-11 md:w-11"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="m23 9-6 6" />
              <path d="m17 9 6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-neutral-950 to-transparent md:h-24" />
    </section>
  );
}
