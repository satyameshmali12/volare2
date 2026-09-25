"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Don't run on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let animationFrame;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      // Small dot follows immediately.
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateRing = () => {
      // Smooth trailing movement.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      animationFrame = requestAnimationFrame(animateRing);
    };

    const handlePointerOver = (event) => {
      const interactive = event.target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor]",
      );

      if (interactive) {
        ring.classList.add("cursor-hover");
        dot.classList.add("cursor-dot-hover");
      }
    };

    const handlePointerOut = (event) => {
      const interactive = event.target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor]",
      );

      if (interactive) {
        ring.classList.remove("cursor-hover");
        dot.classList.remove("cursor-dot-hover");
      }
    };

    const handleMouseDown = () => {
      ring.classList.add("cursor-click");
    };

    const handleMouseUp = () => {
      ring.classList.remove("cursor-click");
    };

    const handleMouseLeave = () => {
      dot.classList.add("cursor-hidden");
      ring.classList.add("cursor-hidden");
    };

    const handleMouseEnter = () => {
      dot.classList.remove("cursor-hidden");
      ring.classList.remove("cursor-hidden");
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handlePointerOver);
    document.addEventListener("mouseout", handlePointerOut);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrame = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseout", handlePointerOut);

      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />

      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
