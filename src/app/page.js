import Link from "next/link";
import HomeVideo from "@/components/HomeVideo";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-[#f5f5f3]">
        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full border border-black/5" />
        <div className="absolute right-[0%] top-[20%] h-[350px] w-[350px] rounded-full border border-black/5" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-5xl" style={{ marginBottom: "22px" }}>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-black/45">
              Team Volare • Marine Innovation
            </p>

            <h1 className="text-5xl font-black leading-[0.92] tracking-tight sm:text-5xl lg:text-7xl">
              BUILDING
              <br />
              <span className="text-neutral-500">TOMORROW,</span>
              <br />
              ONE WAVE AT A TIME
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-black/55 sm:text-lg">
              We are a student-driven marine technology team building innovative
              boats through engineering, chemistry, electronics, design and
              relentless experimentation.
            </p>
          </div>
          <div>
            <HomeVideo />
          </div>
          <div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/challenge"
                className="rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:scale-105 hover:bg-neutral-800"
              >
                Explore Our Mission →
              </Link>
              <Link
                href="/who-we-are"
                className="rounded-full border border-black/20 px-7 py-3 text-black transition hover:bg-black hover:text-white"
              >
                Who We Are
              </Link>
            </div>
          </div>

          <div className="mt-20 grid max-w-3xl grid-cols-2 gap-6 border-t border-black/10 pt-8 sm:grid-cols-4">
            {[
              ["01", "Marine Team"],
              ["∞", "Ideas"],
              ["100%", "Student Driven"],
              ["2027", "Next Challenge"],
            ].map(([number, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold">{number}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-black/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 right-[10%] hidden animate-[float_4s_ease-in-out_infinite] lg:block">
          <div className="text-7xl grayscale">🚤</div>
        </div>
      </section>
      <Contact />
    </>
  );
}
