import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <PageShell>
      <main className="bg-[#f5f5f3] text-[#163F46]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full border border-[#00B4D8]/10" />
          <div className="absolute -right-10 top-40 h-[350px] w-[350px] rounded-full border border-[#00A896]/10" />

          <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-10 lg:pb-28 lg:pt-32">
            <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-[#0077B6]">
                  WHO WE ARE
                </p>

                <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[7.5rem]">
                  <span className="text-[#0077B6]">More</span>
                  <br />
                  <span className="text-[#00B4D8]">Than</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00A896] via-[#0077B6] to-[#6C63FF] bg-clip-text text-transparent">
                    A Boat.
                  </span>
                </h1>
              </div>

              <div className="max-w-md lg:pb-3">
                <p className="text-xl font-medium leading-relaxed text-[#315A63]">
                  We are a multidisciplinary student team turning{" "}
                  <span className="font-bold text-[#0077B6]">engineering</span>,
                  technology and creativity into something that moves.
                </p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#0077B6]/30 via-[#00B4D8]/20 to-transparent" />

                <p className="mt-5 text-sm leading-7 text-[#527078]">
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

            <div className="absolute inset-0 bg-gradient-to-t from-[#003B4A]/70 via-[#003B4A]/10 to-transparent" />

            <div className="absolute bottom-8 left-8 max-w-xl text-white sm:bottom-12 sm:left-12">
              <p className="text-xs font-bold tracking-[0.25em] text-[#6DE2E6]">
                TEAM VOLARE
              </p>

              <p className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                Engineering ideas that{" "}
                <span className="text-[#7DE8D5]">refuse to stay still.</span>
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
              <p className="bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#00A896] bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-4xl">
                Volare is where different engineering disciplines come together
                to solve one ambitious problem.
              </p>

              <p className="mt-8 max-w-2xl text-base leading-8 text-[#527078]">
                A boat is only the final result. Behind it is a chain of
                decisions — how efficiently it moves, how its energy is managed,
                how its electronics communicate, how its structure handles the
                forces and how software brings everything together.
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#527078]">
                We learn by building, testing, breaking and building again.
                Every iteration takes us closer to creating a faster, smarter
                and more sustainable marine system.
              </p>
            </div>
          </div>
        </section>

        {/* DISCIPLINES */}
        <section className="border-y border-[#0077B6]/10 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00A896]">
                  WHAT WE BUILD
                </p>

                <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
                  <span className="text-[#0077B6]">Many disciplines.</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00B4D8] to-[#00A896] bg-clip-text text-transparent">
                    One machine.
                  </span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[#527078]">
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
                accent="blue"
              />

              <DisciplineCard
                number="02"
                title="Electronics"
                description="Sensors, power systems, embedded electronics and control."
                image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                accent="cyan"
              />

              <DisciplineCard
                number="03"
                title="Software"
                description="Data, automation, telemetry and intelligent control systems."
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                accent="violet"
              />

              <DisciplineCard
                number="04"
                title="Materials"
                description="Lightweight, strong and efficient material selection."
                image="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
                accent="teal"
              />

              <DisciplineCard
                number="05"
                title="Energy"
                description="Optimising how energy is generated, stored and consumed."
                image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80"
                accent="blue"
              />

              <DisciplineCard
                number="06"
                title="Design"
                description="Turning technical requirements into a cohesive machine."
                image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                accent="cyan"
              />
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="bg-[#eef8f7]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0077B6]">
                THE JOURNEY
              </p>

              <h2 className="mt-4 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
                <span className="text-[#0077B6]">Small team.</span>
                <br />
                <span className="bg-gradient-to-r from-[#00B4D8] to-[#00A896] bg-clip-text text-transparent">
                  Big ambition.
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Stat
                number="01"
                label="Team"
                text="Different minds working toward the same goal."
                accent="blue"
              />

              <Stat
                number="∞"
                label="Iterations"
                text="Build. Test. Fail. Improve. Repeat."
                accent="teal"
              />

              <Stat
                number="01"
                label="Mission"
                text="Push the boundaries of student engineering."
                accent="violet"
              />
            </div>
          </div>
        </section>

        {/* TEAM IMAGE / CLOSING */}
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border border-[#0077B6]/10">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85"
                alt="Engineering team collaborating"
                className="h-[500px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-[#00A896]">
                03 — THE PEOPLE
              </p>

              <h2 className="mt-5 text-5xl font-black tracking-[-0.05em] sm:text-6xl">
                <span className="text-[#0077B6]">Different</span>
                <br />
                <span className="text-[#00B4D8]">people.</span>
                <br />
                <span className="bg-gradient-to-r from-[#00A896] to-[#6C63FF] bg-clip-text text-transparent">
                  Same direction.
                </span>
              </h2>

              <p className="mt-8 max-w-lg leading-8 text-[#527078]">
                What makes Volare special isn't just the technology. It is the
                people behind it — students who bring different skills,
                perspectives and ideas to the same table.
              </p>

              <div className="mt-10">
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-4 text-sm font-bold text-[#0077B6]"
                >
                  Meet the team
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0077B6]/25 text-[#0077B6] transition-all duration-300 group-hover:border-[#00A896] group-hover:bg-[#00A896] group-hover:text-white">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL STATEMENT */}
        <section className="border-t border-[#0077B6]/10">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <p className="max-w-5xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              <span className="text-[#0077B6]">
                We don't just want to participate.
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#00B4D8] via-[#00A896] to-[#6C63FF] bg-clip-text text-transparent">
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

function DisciplineCard({ number, title, description, image, accent }) {
  const accents = {
    blue: "text-[#0077B6] border-[#0077B6]/20",
    cyan: "text-[#00B4D8] border-[#00B4D8]/20",
    teal: "text-[#00A896] border-[#00A896]/20",
    violet: "text-[#6C63FF] border-[#6C63FF]/20",
  };

  return (
    <div
      className={`group overflow-hidden rounded-[1.5rem] border bg-[#f5f5f3] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accents[accent]}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />

        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-black">
          {number}
        </span>
      </div>

      <div className="p-6">
        <h3
          className={`text-2xl font-black tracking-tight ${accents[accent].split(" ")[0]}`}
        >
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#527078]">{description}</p>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* STAT                             */
/* -------------------------------- */

function Stat({ number, label, text, accent }) {
  const colors = {
    blue: {
      number: "text-[#0077B6]",
      line: "border-[#0077B6]/20",
      label: "text-[#0077B6]",
    },
    teal: {
      number: "text-[#00A896]",
      line: "border-[#00A896]/20",
      label: "text-[#00A896]",
    },
    violet: {
      number: "text-[#6C63FF]",
      line: "border-[#6C63FF]/20",
      label: "text-[#6C63FF]",
    },
  };

  return (
    <div className={`border-t-2 pt-6 ${colors[accent].line}`}>
      <div
        className={`text-6xl font-black tracking-tight ${colors[accent].number}`}
      >
        {number}
      </div>

      <div
        className={`mt-8 text-xs font-black tracking-[0.25em] ${colors[accent].label}`}
      >
        {label}
      </div>

      <p className="mt-3 max-w-xs text-sm leading-6 text-[#527078]">{text}</p>
    </div>
  );
}
