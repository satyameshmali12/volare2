"use client";

import { useEffect, useState } from "react";

export default function ScrollBoatProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const value = Math.min(
        100,
        Math.max(0, (scrollTop / documentHeight) * 100),
      );

      setProgress(value);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-[104px] z-40 px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        {/* TRACK */}
        <div
          className="
            relative h-[2px] flex-1 overflow-visible
            bg-black/15
            dark:bg-white/20
          "
        >
          {/* PROGRESS */}
          <div
            className="
              absolute left-0 top-0 h-full
              bg-[#00B4D8]
              transition-[width] duration-150
            "
            style={{ width: `${progress}%` }}
          />

          {/* MOVING BOAT */}
          <div
            className="
              absolute top-1/2
              -translate-x-1/2
              -translate-y-1/2
              transition-[left] duration-150
            "
            style={{ left: `${progress}%` }}
          >
            <img
              src="/boat.png"
              alt=""
              className="
                h-[30px]
                w-auto
                object-contain
                drop-shadow-[0_2px_4px_rgba(0,180,216,0.3)]
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
