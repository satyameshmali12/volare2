"use client";
import styles from "../../styles/responsive.module.css";

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
    <section className="relative h-[40vh] min-h-0 w-full overflow-hidden bg-neutral-950 md:h-[calc(100vh-80px)] md:min-h-[500px]">
      {/* VIDEO */}
      <div className="absolute inset-0 overflow-hidden md:inset-y-0 md:left-1/2 md:w-[90%] md:-translate-x-1/2">
        <video
          ref={videoRef}
          src="/volare.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full object-contain w-full object-cover grayscale contrast-110 brightness-[0.65]"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Giant background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <h1 className="select-none whitespace-nowrap text-[18vw] font-black uppercase tracking-[-0.1em] text-white/[0.05]">
          VOLARE
        </h1>
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-y-8 left-[5%] right-[5%] border border-white/10" />

      {/* TOP LEFT */}
      <div className="absolute left-[7%] top-10 flex items-center gap-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

        <span className="text-xs uppercase tracking-[0.4em] text-white/70">
          Team Volare
        </span>
      </div>

      {/* TOP RIGHT */}
      <div className="absolute right-[7%] top-10 text-xs uppercase tracking-[0.35em] text-white/50">
        Energy · Motion · Engineering
      </div>

      {/* CENTER */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.7em] text-white/60">
            Monaco Energy Boat Challenge
          </p>

          <h2 className="text-[clamp(5rem,11vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.08em] text-white">
            VOLARE
          </h2>

          <div className="mx-auto mt-8 h-px w-24 bg-white/40" />

          <p className="mt-6 text-xs uppercase tracking-[0.6em] text-white/50">
            Powered by Innovation
          </p>
        </div>
      </div>

      {/* BOTTOM LEFT */}
      <div className="absolute bottom-10 left-[7%]">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          2027 / Monaco
        </p>
      </div>

      {/* BOTTOM RIGHT */}
      <div className="absolute bottom-10 right-[7%] flex items-center gap-6">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">
          Scroll to explore
        </span>

        <span className="text-lg text-white/70">↓</span>

        {/* MUTE BUTTON */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            /* Muted icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="m23 9-6 6" />
              <path d="m17 9 6 6" />
            </svg>
          ) : (
            /* Volume icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-neutral-950 to-transparent" />
    </section>
  );
}
