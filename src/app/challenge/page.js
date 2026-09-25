import PageShell from "@/components/PageShell";

const challenges = [
  {
    number: "01",
    title: "DESIGN",
    description:
      "Create a boat where engineering, hydrodynamics and lightweight design work together as one system.",
    tag: "ENGINEERING",
    shape: "circle",
    accent: "blue",
  },
  {
    number: "02",
    title: "POWER",
    description:
      "Develop an efficient propulsion system capable of delivering performance while respecting sustainability.",
    tag: "PROPULSION",
    shape: "square",
    accent: "orange",
  },
  {
    number: "03",
    title: "COMPETE",
    description:
      "Take our creation to the water and prove that innovation can push marine mobility forward.",
    tag: "PERFORMANCE",
    shape: "triangle",
    accent: "aqua",
  },
];

export default function Challenge() {
  return (
    <PageShell>
      <main className="overflow-hidden bg-[#f4f7f6] text-[#102F3A] dark:bg-[#0d1719] dark:text-gray-100">
        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="relative min-h-[85vh] overflow-hidden">
          {/* Technical background */}

          <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(16,47,58,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,47,58,0.045) 1px, transparent 1px)",
                backgroundSize: "55px 55px",
              }}
            />
          </div>

          {/* Decorative circles */}

          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border border-[#00B8D4]/20 dark:border-cyan-400/15 sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute right-16 top-48 hidden h-40 w-40 rounded-full border border-[#FF6B35]/20 dark:border-orange-400/15 lg:block" />

          <div className="pointer-events-none absolute bottom-20 left-[-70px] h-48 w-48 rotate-45 border border-[#145DA0]/15 dark:border-blue-400/15" />

          {/* Floating accent */}

          <div className="pointer-events-none absolute right-[20%] top-[32%] h-3 w-3 rounded-full bg-[#FF6B35]" />

          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
            <div className="w-full">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-12 bg-[#145DA0]" />

                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#527078] dark:text-gray-400">
                  Team Volare / The Challenge
                </p>
              </div>

              <div className="grid items-end gap-12 lg:grid-cols-[1fr_280px]">
                <div>
                  <h1 className="max-w-5xl text-[11vw] font-black leading-[0.82] tracking-[-0.07em] sm:text-[8vw] lg:text-[6.5rem]">
                    <span className="text-[#145DA0]">RACE.</span>
                    <br />

                    <span className="text-[#FF6B35]">INNOVATE.</span>
                    <br />

                    <span className="text-[#00A6B8]">TRANSFORM.</span>
                  </h1>
                </div>

                <div className="relative pb-2 lg:pb-4">
                  <div className="absolute -left-6 top-0 h-full w-px bg-[#145DA0]/15 dark:bg-blue-400/15" />

                  <p className="text-sm leading-6 text-[#527078] dark:text-gray-300">
                    Building a new generation of marine mobility through
                    engineering, technology and relentless experimentation.
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B35]" />

                    <span className="text-xs font-black uppercase tracking-[0.25em] text-[#145DA0] dark:text-blue-400">
                      Monaco 2027
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom coordinates */}

          <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-[#7B9298] dark:text-gray-500 lg:left-10">
            18° N / 43° E
          </div>

          <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.3em] text-[#7B9298] dark:text-gray-500 lg:right-10">
            Scroll to explore
          </div>
        </section>

        {/* =========================================================
            INTRO
        ========================================================= */}

        <section className="relative border-t border-[#145DA0]/10 py-24 dark:border-white/10 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#FF6B35]">
                  What we're solving
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="text-6xl font-black tracking-[-0.08em] text-[#145DA0]">
                    03
                  </span>

                  <span className="h-px w-20 bg-[#145DA0]/20 dark:bg-blue-400/20" />
                </div>
              </div>

              <div>
                <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#102F3A] dark:text-white sm:text-5xl lg:text-6xl">
                  The challenge isn't simply to build a boat.
                  <span className="text-[#00A6B8]">
                    {" "}
                    It's to rethink what a boat can become.
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CHALLENGES
        ========================================================= */}

        <section className="relative pb-28 sm:pb-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-16 flex items-end justify-between border-b border-[#145DA0]/10 pb-6 dark:border-white/10">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#145DA0] dark:text-blue-400">
                The three fronts
              </p>

              <p className="hidden text-xs font-bold uppercase tracking-[0.25em] text-[#7B9298] dark:text-gray-500 sm:block">
                Design / Power / Competition
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {challenges.map((item, index) => (
                <ChallengeCard key={item.number} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            MONACO
        ========================================================= */}

        <section className="relative overflow-hidden bg-[#082F49] text-white">
          {/* Huge circle */}

          <div className="pointer-events-none absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full border border-[#00D4E8]/15 sm:h-[700px] sm:w-[700px]" />

          <div className="pointer-events-none absolute right-20 top-40 hidden h-48 w-48 rounded-full border border-[#FF6B35]/20 lg:block" />

          {/* Diagonal line */}

          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full rotate-[-12deg] bg-[#00D4E8]/10" />

          {/* Square */}

          <div className="pointer-events-none absolute bottom-20 right-[15%] hidden h-20 w-20 rotate-12 border border-[#FF6B35]/20 md:block" />

          <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
            <div className="grid gap-20 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="h-px w-12 bg-[#FF6B35]" />

                  <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#75DDE8]">
                    Destination
                  </span>
                </div>

                <h2 className="text-[15vw] font-black leading-[0.78] tracking-[-0.08em] sm:text-[10vw] lg:text-[8rem]">
                  <span className="text-white">MONACO</span>
                </h2>

                <p className="mt-10 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
                  The Monaco Energy Boat Challenge brings together student
                  teams, engineers and innovators from around the world to push
                  the limits of sustainable marine mobility.
                </p>
              </div>

              <div className="relative">
                {/* Compass graphic */}

                <div className="relative mx-auto aspect-square max-w-[320px]">
                  <div className="absolute inset-0 rounded-full border border-[#00D4E8]/20" />

                  <div className="absolute inset-[15%] rounded-full border border-[#00D4E8]/15" />

                  <div className="absolute inset-[30%] rounded-full border border-[#FF6B35]/15" />

                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />

                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B35]" />

                  <div className="absolute left-1/2 top-[18%] h-[32%] w-px origin-bottom -translate-x-1/2 rotate-[35deg] bg-[#00D4E8]/70" />

                  <div className="absolute left-1/2 top-[18%] h-2 w-2 -translate-x-1/2 rounded-full bg-[#00D4E8]" />

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">
                    MARINE / 2027
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer strip */}

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <span>Team Volare</span>
              <span>ICT Mumbai</span>
              <span>Energy / Mobility / Innovation</span>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

/* =========================================================
   CHALLENGE CARD
========================================================= */

function ChallengeCard({ item, index }) {
  const colors = {
    blue: {
      main: "#145DA0",
      light: "rgba(20,93,160,0.07)",
      border: "rgba(20,93,160,0.20)",
    },

    orange: {
      main: "#FF6B35",
      light: "rgba(255,107,53,0.07)",
      border: "rgba(255,107,53,0.20)",
    },

    aqua: {
      main: "#00A6B8",
      light: "rgba(0,166,184,0.07)",
      border: "rgba(0,166,184,0.20)",
    },
  };

  const color = colors[item.accent];

  const darkStyles = {
    blue: {
      border: "rgba(20,93,160,0.35)",
      light: "rgba(20,93,160,0.12)",
    },

    orange: {
      border: "rgba(255,107,53,0.35)",
      light: "rgba(255,107,53,0.12)",
    },

    aqua: {
      border: "rgba(0,166,184,0.35)",
      light: "rgba(0,166,184,0.12)",
    },
  };

  const darkColor = darkStyles[item.accent];

  return (
    <article
      className={`group relative min-h-[460px] overflow-hidden rounded-[1.5rem] border bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-[#132328] dark:shadow-black/20 sm:p-9 ${
        index === 1 ? "lg:mt-16" : ""
      }`}
      style={{
        borderColor: color.border,
      }}
    >
      {/* Background giant number */}

      <div
        className="pointer-events-none absolute -right-6 -top-10 text-[11rem] font-black leading-none tracking-[-0.12em] transition-transform duration-700 group-hover:scale-110 dark:hidden"
        style={{ color: color.light }}
      >
        {item.number}
      </div>

      <div
        className="pointer-events-none absolute -right-6 -top-10 hidden text-[11rem] font-black leading-none tracking-[-0.12em] transition-transform duration-700 group-hover:scale-110 dark:block"
        style={{ color: darkColor.light }}
      >
        {item.number}
      </div>

      {/* Decorative shapes */}

      {item.shape === "circle" && (
        <>
          <div
            className="pointer-events-none absolute bottom-[-80px] right-[-80px] h-64 w-64 rounded-full border-[35px] transition-transform duration-700 group-hover:scale-125 dark:hidden"
            style={{ borderColor: color.light }}
          />

          <div
            className="pointer-events-none absolute bottom-[-80px] right-[-80px] hidden h-64 w-64 rounded-full border-[35px] transition-transform duration-700 group-hover:scale-125 dark:block"
            style={{ borderColor: darkColor.light }}
          />
        </>
      )}

      {item.shape === "square" && (
        <>
          <div
            className="pointer-events-none absolute bottom-[-60px] right-[-60px] h-52 w-52 rotate-12 border-[35px] transition-transform duration-700 group-hover:rotate-45 dark:hidden"
            style={{ borderColor: color.light }}
          />

          <div
            className="pointer-events-none absolute bottom-[-60px] right-[-60px] hidden h-52 w-52 rotate-12 border-[35px] transition-transform duration-700 group-hover:rotate-45 dark:block"
            style={{ borderColor: darkColor.light }}
          />
        </>
      )}

      {item.shape === "triangle" && (
        <>
          <div
            className="pointer-events-none absolute bottom-[-70px] right-[-30px] h-48 w-48 rotate-45 border-[35px] transition-transform duration-700 group-hover:rotate-[65deg] dark:hidden"
            style={{ borderColor: color.light }}
          />

          <div
            className="pointer-events-none absolute bottom-[-70px] right-[-30px] hidden h-48 w-48 rotate-45 border-[35px] transition-transform duration-700 group-hover:rotate-[65deg] dark:block"
            style={{ borderColor: darkColor.light }}
          />
        </>
      )}

      {/* Top */}

      <div className="relative flex items-start justify-between">
        <span
          className="text-sm font-black tracking-[0.2em]"
          style={{ color: color.main }}
        >
          {item.number}
        </span>

        <span
          className="rounded-full border px-3 py-1 text-[9px] font-black tracking-[0.25em]"
          style={{
            color: color.main,
            borderColor: color.border,
            backgroundColor: color.light,
          }}
        >
          {item.tag}
        </span>
      </div>

      {/* Content */}

      <div className="relative mt-32">
        <h3
          className="text-5xl font-black tracking-[-0.07em] sm:text-6xl"
          style={{ color: color.main }}
        >
          {item.title}
        </h3>

        <div
          className="mt-6 h-1 w-16 rounded-full transition-all duration-500 group-hover:w-28"
          style={{ backgroundColor: color.main }}
        />

        <p className="mt-7 max-w-sm text-sm leading-7 text-[#627A81] dark:text-gray-300">
          {item.description}
        </p>
      </div>

      {/* Bottom */}

      <div
        className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t pt-5 dark:border-white/10 sm:bottom-9 sm:left-9 sm:right-9"
        style={{ borderColor: color.border }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8AA0A6] dark:text-gray-500">
          VOLARE / {item.number}
        </span>

        <span
          className="text-xl transition-transform duration-300 group-hover:translate-x-2"
          style={{ color: color.main }}
        >
          →
        </span>
      </div>
    </article>
  );
}
