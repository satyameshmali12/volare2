import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";

const challenges = [
  {
    number: "01",
    title: "DESIGN",
    description:
      "Create a boat where engineering, hydrodynamics and lightweight design work together as one system.",
    tag: "ENGINEERING",
    shape: "circle",
  },
  {
    number: "02",
    title: "POWER",
    description:
      "Develop an efficient propulsion system capable of delivering performance while respecting sustainability.",
    tag: "PROPULSION",
    shape: "square",
  },
  {
    number: "03",
    title: "COMPETE",
    description:
      "Take our creation to the water and prove that innovation can push marine mobility forward.",
    tag: "PERFORMANCE",
    shape: "triangle",
  },
];

export default function Challenge() {
  return (
    <PageShell>
      <main className="overflow-hidden bg-[#eeeeec] text-neutral-950">
        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative min-h-[85vh] overflow-hidden">
          {/* Technical background */}
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)",
                backgroundSize: "55px 55px",
              }}
            />
          </div>

          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full border-[1px] border-neutral-950/10 sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute right-16 top-48 hidden h-40 w-40 rounded-full border border-neutral-950/10 lg:block" />

          <div className="pointer-events-none absolute bottom-20 left-[-70px] h-48 w-48 rotate-45 border border-neutral-950/10" />

          {/* Small floating square */}
          <div className="pointer-events-none absolute right-[20%] top-[32%] h-3 w-3 bg-neutral-950" />

          <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
            <div className="w-full">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-12 bg-neutral-950" />
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
                  Team Volare / The Challenge
                </p>
              </div>

              <div className="grid items-end gap-12 lg:grid-cols-[1fr_280px]">
                <div>
                  <h1 className="max-w-5xl text-[11vw] font-black leading-[0.82] tracking-[-0.07em] sm:text-[8vw] lg:text-[6.5rem]">
                    RACE.
                    <br />
                    <span className="text-neutral-400">INNOVATE.</span>
                    <br />
                    TRANSFORM.
                  </h1>
                </div>

                <div className="relative pb-2 lg:pb-4">
                  <div className="absolute -left-6 top-0 h-full w-px bg-neutral-950/15" />

                  <p className="text-sm leading-6 text-neutral-500">
                    Building a new generation of marine mobility through
                    engineering, technology and relentless experimentation.
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-neutral-950" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em]">
                      Monaco 2027
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom coordinates */}
          <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.3em] text-neutral-400 lg:left-10">
            18° N / 43° E
          </div>

          <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.3em] text-neutral-400 lg:right-10">
            Scroll to explore
          </div>
        </section>

        {/* =========================================================
            INTRO
        ========================================================= */}
        <section className="relative border-t border-neutral-950/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-400">
                  What we're solving
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="text-6xl font-black tracking-[-0.08em]">
                    03
                  </span>
                  <span className="h-px w-20 bg-neutral-950/20" />
                </div>
              </div>

              <div>
                <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  The challenge isn't simply to build a boat.
                  <span className="text-neutral-400">
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
            <div className="mb-16 flex items-end justify-between border-b border-neutral-950/10 pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
                The three fronts
              </p>

              <p className="hidden text-xs uppercase tracking-[0.25em] text-neutral-400 sm:block">
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
            MONACO SECTION
        ========================================================= */}
        <section className="relative overflow-hidden bg-neutral-950 text-white">
          {/* Huge circle */}
          <div className="pointer-events-none absolute -right-40 top-[-100px] h-[500px] w-[500px] rounded-full border border-white/10 sm:h-[700px] sm:w-[700px]" />

          <div className="pointer-events-none absolute right-20 top-40 hidden h-48 w-48 rounded-full border border-white/10 lg:block" />

          {/* Diagonal line */}
          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full rotate-[-12deg] bg-white/10" />

          {/* Square */}
          <div className="pointer-events-none absolute bottom-20 right-[15%] hidden h-20 w-20 rotate-12 border border-white/10 md:block" />

          <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
            <div className="grid gap-20 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <div className="mb-10 flex items-center gap-4">
                  <span className="h-px w-12 bg-white/40" />
                  <span className="text-xs uppercase tracking-[0.35em] text-white/40">
                    Destination
                  </span>
                </div>

                <h2 className="text-[15vw] font-black leading-[0.78] tracking-[-0.08em] sm:text-[10vw] lg:text-[8rem]">
                  MONACO
                </h2>

                <p className="mt-10 max-w-2xl text-lg leading-8 text-white/45 sm:text-xl">
                  The Monaco Energy Boat Challenge brings together student
                  teams, engineers and innovators from around the world to push
                  the limits of sustainable marine mobility.
                </p>
              </div>

              <div className="relative">
                {/* 2D compass-like graphic */}
                <div className="relative mx-auto aspect-square max-w-[320px]">
                  <div className="absolute inset-0 rounded-full border border-white/15" />

                  <div className="absolute inset-[15%] rounded-full border border-white/10" />

                  <div className="absolute inset-[30%] rounded-full border border-white/10" />

                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />

                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

                  <div className="absolute left-1/2 top-[18%] h-[32%] w-px origin-bottom -translate-x-1/2 rotate-[35deg] bg-white/60" />

                  <div className="absolute left-1/2 top-[18%] h-2 w-2 -translate-x-1/2 rounded-full bg-white" />

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/30">
                    MARINE / 2027
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-[10px] uppercase tracking-[0.3em] text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-10">
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
  return (
    <article
      className={`group relative min-h-[460px] overflow-hidden border border-neutral-950/10 bg-[#f5f5f3] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-neutral-950/30 sm:p-9 ${
        index === 1 ? "lg:mt-16" : ""
      }`}
    >
      {/* Background giant number */}
      <div className="pointer-events-none absolute -right-6 -top-10 text-[11rem] font-black leading-none tracking-[-0.12em] text-neutral-950/[0.035] transition-transform duration-700 group-hover:scale-110">
        {item.number}
      </div>

      {/* Decorative shape */}
      {item.shape === "circle" && (
        <div className="pointer-events-none absolute bottom-[-80px] right-[-80px] h-64 w-64 rounded-full border-[35px] border-neutral-950/[0.035] transition-transform duration-700 group-hover:scale-125" />
      )}

      {item.shape === "square" && (
        <div className="pointer-events-none absolute bottom-[-60px] right-[-60px] h-52 w-52 rotate-12 border-[35px] border-neutral-950/[0.035] transition-transform duration-700 group-hover:rotate-45" />
      )}

      {item.shape === "triangle" && (
        <div className="pointer-events-none absolute bottom-[-70px] right-[-30px] h-48 w-48 rotate-45 border-[35px] border-neutral-950/[0.035] transition-transform duration-700 group-hover:rotate-[65deg]" />
      )}

      {/* Top */}
      <div className="relative flex items-start justify-between">
        <span className="text-sm font-bold tracking-[0.2em]">
          {item.number}
        </span>

        <span className="border border-neutral-950/15 px-3 py-1 text-[9px] font-bold tracking-[0.25em] text-neutral-400">
          {item.tag}
        </span>
      </div>

      {/* Content */}
      <div className="relative mt-32">
        <h3 className="text-5xl font-black tracking-[-0.07em] sm:text-6xl">
          {item.title}
        </h3>

        <div className="mt-6 h-px w-16 bg-neutral-950 transition-all duration-500 group-hover:w-28" />

        <p className="mt-7 max-w-sm text-sm leading-7 text-neutral-500">
          {item.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-neutral-950/10 pt-5 sm:left-9 sm:right-9 sm:bottom-9">
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
          VOLARE / {item.number}
        </span>

        <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </div>
    </article>
  );
}
