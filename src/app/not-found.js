import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0077B6]">
          Team Volare
        </p>

        <h1 className="mt-4 text-7xl font-black tracking-tight text-[#082F49] sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-neutral-900">
          Page not found.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-neutral-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#0077B6] px-7 py-3 font-semibold text-white transition hover:bg-[#145DA0] hover:scale-105"
        >
          Back to Home →
        </Link>
      </div>
    </main>
  );
}
