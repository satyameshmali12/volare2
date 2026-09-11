"use client";

import { useEffect, useRef, useState } from "react";

export default function HomeVideo() {
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
    <section className="relative mx-auto w-full max-w-3xl">
      <div className="group relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-[#dedbd2] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        1{/* VIDEO */}
        <video
          ref={videoRef}
          src="/volare.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-[1.02]
          "
        />
        {/* SUBTLE OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />
        {/* TOP LEFT LABEL */}
        <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white sm:text-xs sm:tracking-[0.4em]">
            Team Volare
          </span>
        </div>
        {/* TOP RIGHT */}
        <div className="absolute right-5 top-5 hidden sm:block sm:right-7 sm:top-7">
          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-xs sm:tracking-[0.35em]">
            Marine Innovation
          </span>
        </div>
        {/* CENTER CONTENT */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center text-white">
            <p className="mb-3 text-[8px] uppercase tracking-[0.35em] text-white/75 sm:text-xs sm:tracking-[0.55em]">
              Monaco Energy Boat Challenge
            </p>

            <h2 className="text-[13vw] font-black uppercase leading-[0.8] tracking-[-0.08em] sm:text-[10vw] lg:text-[7rem]">
              VOLARE
            </h2>

            <div className="mx-auto mt-4 h-px w-12 bg-white/60 sm:mt-5 sm:w-20" />

            <p className="mt-3 text-[7px] uppercase tracking-[0.3em] text-white/70 sm:text-[9px] sm:tracking-[0.5em]">
              Engineering · Energy · Motion
            </p>
          </div>
        </div>
        {/* BOTTOM LEFT */}
        <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
          <p className="text-[8px] uppercase tracking-[0.25em] text-white/70 sm:text-xs sm:tracking-[0.35em]">
            2027 / Monaco
          </p>
        </div>
        {/* BOTTOM RIGHT */}
        <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
          <button
            onClick={toggleMute}
            className="
              pointer-events-auto
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/40
              bg-black/20
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-white
              hover:text-black
              sm:h-11
              sm:w-11
            "
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 sm:h-5 sm:w-5"
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
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
