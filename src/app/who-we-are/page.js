import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <PageShell>
      <main className="bg-[#f5f5f3] text-black">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-10 lg:pb-28 lg:pt-32">
            <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h1 className="max-w-4xl text-6xl font-medium tracking-[-0.06em] leading-[0.9] sm:text-7xl lg:text-[7.5rem]">
                  More
                  <br />
                  Than
                  <br />
                  <span className="text-black/35">A Boat.</span>
                </h1>
              </div>

              <div className="max-w-md lg:pb-3">
                <p className="text-xl leading-relaxed text-black/70">
                  We are a multidisciplinary student team turning engineering,
                  technology and creativity into something that moves.
                </p>

                <div className="mt-8 h-px w-full bg-black/10" />

                <p className="mt-5 text-sm leading-7 text-black/45">
                  From propulsion and electronics to software, materials and
                  control systems — every component has a purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN IMAGE */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2200&q=85"
              alt="Boat moving through water"
              className="h-[55vh] min-h-[420px] w-full object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-8 left-8 max-w-xl text-white sm:bottom-12 sm:left-12">
              <p className="text-xs font-semibold tracking-[0.25em] text-white/60">
                TEAM VOLARE
              </p>

              <p className="mt-3 text-3xl font-light tracking-tight sm:text-5xl">
                Engineering ideas that refuse to stay still.
              </p>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionTitle eyebrow="OUR MINDSET" title="Built by curiosity." />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-3xl font-light leading-tight tracking-tight sm:text-4xl">
                Volare is where different engineering disciplines come together
                to solve one ambitious problem.
              </p>

              <p className="mt-8 max-w-2xl text-base leading-8 text-black/50">
                A boat is only the final result. Behind it is a chain of
                decisions — how efficiently it moves, how its energy is managed,
                how its electronics communicate, how its structure handles the
                forces and how software brings everything together.
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-black/50">
                We learn by building, testing, breaking and building again.
                Every iteration takes us closer to creating a faster, smarter
                and more sustainable marine system.
              </p>
            </div>
          </div>
        </section>

        {/* DISCIPLINES */}
        <section className="border-y border-black/10 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="mt-4 text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
                  Many disciplines.
                  <br />
                  <span className="text-black/30">One machine.</span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-black/45">
                Every subsystem contributes to the performance of the final
                vessel.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <DisciplineCard
                number="01"
                title="Mechanical"
                description="Structure, hydrodynamics, propulsion and mechanical systems."
                image="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80"
              />

              <DisciplineCard
                number="02"
                title="Electronics"
                description="Sensors, power systems, embedded electronics and control."
                image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              />

              <DisciplineCard
                number="03"
                title="Software"
                description="Data, automation, telemetry and intelligent control systems."
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              />

              <DisciplineCard
                number="04"
                title="Materials"
                description="Lightweight, strong and efficient material selection."
                image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
              />

              <DisciplineCard
                number="05"
                title="Energy"
                description="Optimising how energy is generated, stored and consumed."
                image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80"
              />

              <DisciplineCard
                number="06"
                title="Design"
                description="Turning technical requirements into a cohesive machine."
                image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
              />
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid gap-12 md:grid-cols-3">
              <Stat
                number="01"
                label="Team"
                text="Different minds working toward the same goal."
              />

              <Stat
                number="∞"
                label="Iterations"
                text="Build. Test. Fail. Improve. Repeat."
              />

              <Stat
                number="01"
                label="Mission"
                text="Push the boundaries of student engineering."
              />
            </div>
          </div>
        </section>

        {/* TEAM IMAGE / CLOSING */}
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85"
                alt="Engineering team collaborating"
                className="h-[500px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-black/40">
                03 — THE PEOPLE
              </p>

              <h2 className="mt-5 text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
                Different
                <br />
                people.
                <br />
                <span className="text-black/30">Same direction.</span>
              </h2>

              <p className="mt-8 max-w-lg leading-8 text-black/50">
                What makes Volare special isn't just the technology. It is the
                people behind it — students who bring different skills,
                perspectives and ideas to the same table.
              </p>

              <div className="mt-10">
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-4 text-sm font-medium"
                >
                  Meet the team
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:bg-black group-hover:text-white">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL STATEMENT */}
        <section className="border-t border-black/10">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <p className="max-w-5xl text-4xl font-light leading-tight tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              We don't just want to participate.
              <br />
              <span className="text-black/30">
                We want to build something worth remembering.
              </span>
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

/* -------------------------------- */
/* DISCIPLINE CARD                  */
/* -------------------------------- */

function DisciplineCard({ number, title, description, image }) {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f5f5f3]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Subtle overlay — NOT grayscale */}
        <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />

        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
          {number}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-medium tracking-tight">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-black/45">{description}</p>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* STAT                              */
/* -------------------------------- */

function Stat({ number, label, text }) {
  return (
    <div className="border-t border-white/15 pt-6">
      <div className="text-5xl font-light tracking-tight">{number}</div>

      <div className="mt-8 text-xs font-semibold tracking-[0.25em] text-white/50">
        {label}
      </div>

      <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">{text}</p>
    </div>
  );
}
