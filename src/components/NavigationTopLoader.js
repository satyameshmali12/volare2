"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationTopLoader() {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Detect navigation completion
  useEffect(() => {
    if (!loading) return;

    setProgress(100);

    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Start loader when a link is clicked
  useEffect(() => {
    const handleClick = (event) => {
      // Only left-clicks
      if (event.button !== 0) return;

      // Ignore modifier clicks
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      // Find the clicked link
      const link = event.target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      // Ignore external links
      if (!href || href.startsWith("http")) return;

      // Ignore anchors
      if (href.startsWith("#")) return;

      // Ignore new tab
      if (link.target === "_blank") return;

      // Ignore same page
      if (href === window.location.pathname) return;

      // Start loader
      setLoading(true);
      setProgress(20);

      // Slowly increase while navigation is happening
      let currentProgress = 20;

      const interval = setInterval(() => {
        currentProgress += Math.random() * 10;

        if (currentProgress >= 90) {
          currentProgress = 90;
          clearInterval(interval);
        }

        setProgress(currentProgress);
      }, 200);

      // Clean up after navigation
      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed left-0 top-0 z-[99999] h-[3px] w-full">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: "#F2511F",
        }}
      />
    </div>
  );
}
