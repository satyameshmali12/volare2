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
          {/* CREW */}
          <SectionTitle
            eyebrow="THE CREW"
            title="The People Behind The Boat."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* TEAM IMAGE */}
            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#0077B6]/10 bg-[#e6eeee]">
              <img
                src="/teamvolare.jpeg"
                alt="Team Volare"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#003B4A]/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-bold tracking-[0.3em] text-[#6DE2E6]">
                  TEAM VOLARE
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  One crew.
                  <br />
                  <span className="text-[#7DE8D5]">One mission.</span>
                </h2>
              </div>
            </div>

            {/* ROLES */}
            <div className="flex flex-col justify-center">
              <p className="text-lg leading-8 text-[#315A63]">
                Behind every successful launch is a team willing to spend
                countless hours designing, testing, failing and trying again.
              </p>

              <div className="mt-10 space-y-5">
                <Link href="/team/mechanical" className="block">
                  <TeamRole
                    title="Mechanical"
                    text="Structures, hull and mechanical systems"
                  />
                </Link>

                <Link href="/team/electrical" className="block">
                  <TeamRole
                    title="Electrical"
                    text="Power, electronics and control"
                  />
                </Link>

                <Link href="/team/software" className="block">
                  <TeamRole
                    title="Software"
                    text="Automation, telemetry and data"
                  />
                </Link>

                <Link href="/team/research" className="block">
                  <TeamRole
                    title="Research"
                    text="Energy, chemistry and optimization"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* CREATION */}
          <div className="mt-28">
            <SectionTitle eyebrow="OUR CREATION" title="Built With Purpose." />

            <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
              {/* BOAT IMAGE */}
              <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#00A896]/10 bg-[#e6eeee]">
                <img
                  src="/proposedcatarman.jpeg"
                  alt="Proposed Catarman"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#003B4A]/80 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-sm font-bold tracking-[0.3em] text-[#6DE2E6]">
                    TEAM VOLARE
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    Proposed
                    <br />
                    <span className="text-[#7DE8D5]">Catarman</span>
                  </h2>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="bg-gradient-to-r from-[#0077B6] to-[#00A896] bg-clip-text text-3xl font-black leading-tight text-transparent">
                  Every component has a reason.
                </p>

                <p className="mt-6 leading-8 text-[#527078]">
                  Our boat is more than a vehicle. It is a platform where
                  different engineering disciplines meet.
                </p>

                {/* FEATURES */}
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-[#0077B6]/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#0077B6]/30">
                    <Feature title="Propulsion" icon="⚡" />
                  </div>

                  <div className="rounded-2xl border border-[#00B4D8]/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#00B4D8]/30">
                    <Feature title="Hydrodynamics" icon="〰" />
                  </div>

                  <div className="rounded-2xl border border-[#00A896]/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#00A896]/30">
                    <Feature title="Electronics" icon="◉" />
                  </div>

                  <div className="rounded-2xl border border-[#6C63FF]/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-[#6C63FF]/30">
                    <Feature title="Control" icon="⌁" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
