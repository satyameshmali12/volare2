"use client";

export default function TopLoader({ progress }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[99999] h-1">
      <div
        className="h-full bg-red-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
