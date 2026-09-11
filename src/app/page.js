import Link from "next/link";
import HomeVideo from "@/components/HomeVideo";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f5f5f3]">
        {/* Decorative circles */}
        <div className="absolute right-[-10%] top-[8%] h-[500px] w-[500px] rounded-full border border-black/5" />

        <div className="absolute right-[0%] top-[18%] h-[350px] w-[350px] rounded-full border border-black/5" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pb-24 lg:pt-40">
          {/* INTRO */}
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-black/45">
              Team Volare • Marine Innovation
            </p>

            <h1 className="text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
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

          {/* VIDEO */}
          <div className="mt-14 sm:mt-16 lg:mt-20">
            <HomeVideo />
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/challenge"
              className="
                rounded-full
                bg-[#174847]
                px-7
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#123b3a]
              "
            >
              Explore Our Mission →
            </Link>

            <Link
              href="/who-we-are"
              className="
                rounded-full
                border
                border-black/20
                px-7
                py-3
                text-black
                transition-all
                duration-300
                hover:bg-[#174847]
                hover:text-white
              "
            >
              Who We Are
            </Link>
          </div>

          {/* STATS */}
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

        {/* Decorative boat */}
        <div className="absolute bottom-12 right-[10%] hidden lg:block">
          <div className="text-7xl">🚤</div>
        </div>
      </section>

      <Contact />
    </>
  );
}
