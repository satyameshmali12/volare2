import Link from "next/link";

import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import TeamRole from "@/components/TeamRole";
import Feature from "@/components/Feature";

export default function Team() {
  return (
    <PageShell>
      <section className="bg-[#f5f5f3] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="03 — THE CREW"
            title="The People Behind The Boat."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-neutral-200">
              <img
                src="/teamvolare.jpeg"
                alt="Team Volare"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm tracking-[0.3em] text-white/60">
                  TEAM VOLARE
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  One crew.
                  <br />
                  One mission.
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-lg leading-8 text-black/60">
                Behind every successful launch is a team willing to spend
                countless hours designing, testing, failing and trying again.
              </p>

              <div className="mt-10 space-y-5">
                {/* MECHANICAL */}
                <Link href="/team/mechanical" className="block">
                  <TeamRole
                    title="Mechanical"
                    text="Structures, hull and mechanical systems"
                  />
                </Link>

                {/* ELECTRICAL */}
                <Link href="/team/electrical" className="block">
                  <TeamRole
                    title="Electrical"
                    text="Power, electronics and control"
                  />
                </Link>

                {/* SOFTWARE */}
                <Link href="/team/software" className="block">
                  <TeamRole
                    title="Software"
                    text="Automation, telemetry and data"
                  />
                </Link>

                {/* RESEARCH */}
                <Link href="/team/research" className="block">
                  <TeamRole
                    title="Research"
                    text="Energy, chemistry and optimization"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-28">
            <SectionTitle
              eyebrow="04 — OUR CREATION"
              title="Built With Purpose."
            />

            <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
              <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-black/10 bg-neutral-200">
                <img
                  src="/proposedcatarman.jpeg"
                  alt="Proposed Catarman"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-sm tracking-[0.3em] text-white/60">
                    TEAM VOLARE
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    Proposed
                    <br />
                    Catarman
                  </h2>
                </div>
              </div>

              <div>
                <p className="text-3xl font-semibold leading-tight">
                  Every component has a reason.
                </p>

                <p className="mt-6 leading-8 text-black/50">
                  Our boat is more than a vehicle. It is a platform where
                  different engineering disciplines meet.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-6">
                  <Feature title="Propulsion" icon="⚡" />
                  <Feature title="Hydrodynamics" icon="〰" />
                  <Feature title="Electronics" icon="◉" />
                  <Feature title="Control" icon="⌁" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
