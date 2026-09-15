import Link from "next/link";
import HomeVideo from "@/components/HomeVideo";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f5f5f3]">
        {/* Decorative circles */}
        <div className="absolute right-[-10%] top-[8%] h-[500px] w-[500px] rounded-full border border-[#00B4D8]/10" />

        <div className="absolute right-[0%] top-[18%] h-[350px] w-[350px] rounded-full border border-[#0077B6]/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pb-24 lg:pt-40">
          {/* INTRO */}
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.4em] text-[#0077B6]">
              Team Volare <span className="text-[#00A896]">•</span> Marine
              Innovation
            </p>

            <h1 className="text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-[#0077B6]">BUILDING</span>
              <br />

              <span className="bg-gradient-to-r from-[#00B4D8] via-[#0077B6] to-[#00A896] bg-clip-text text-transparent">
                TOMORROW,
              </span>

              <br />

              <span className="bg-gradient-to-r from-[#00A896] via-[#00B4D8] to-[#0077B6] bg-clip-text text-transparent">
                ONE WAVE AT A TIME
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#315A63] sm:text-lg">
              We are a student-driven marine technology team building innovative
              boats through{" "}
              <span className="font-semibold text-[#0077B6]">engineering</span>,{" "}
              <span className="font-semibold text-[#00A896]">chemistry</span>,{" "}
              <span className="font-semibold text-[#00B4D8]">electronics</span>,{" "}
              <span className="font-semibold text-[#6C63FF]">design</span> and
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
                bg-gradient-to-r
                from-[#0077B6]
                to-[#00A896]
                px-7
                py-3
                font-semibold
                text-white
                shadow-lg
                shadow-[#0077B6]/15
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl
                hover:shadow-[#00A896]/20
              "
            >
              Explore Our Mission →
            </Link>

            <Link
              href="/who-we-are"
              className="
                rounded-full
                border
                border-[#0077B6]/30
                px-7
                py-3
                font-semibold
                text-[#0077B6]
                transition-all
                duration-300
                hover:border-[#00A896]
                hover:bg-[#00A896]
                hover:text-white
              "
            >
              Who We Are
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-20 grid max-w-3xl grid-cols-2 gap-6 border-t border-[#0077B6]/15 pt-8 sm:grid-cols-4">
            {[
              ["01", "Marine Team", "text-[#0077B6]"],
              ["∞", "Ideas", "text-[#00A896]"],
              ["100%", "Student Driven", "text-[#6C63FF]"],
              ["2027", "Next Challenge", "text-[#00B4D8]"],
            ].map(([number, label, color]) => (
              <div key={label}>
                <p className={`text-2xl font-black ${color}`}>{number}</p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#527078]">
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
