import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";
import ChallengeCard from "@/components/ChallengeCard";

export default function Challenge() {
  return (
    <PageShell>
      <section className="bg-[#eeeeec] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="02 — THE CHALLENGE"
            title="Race. Innovate. Transform."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <ChallengeCard
              number="01"
              title="Design"
              text="Create a boat where engineering, hydrodynamics and lightweight design work together."
            />
            <ChallengeCard
              number="02"
              title="Power"
              text="Develop an efficient propulsion system capable of delivering performance while respecting sustainability."
            />
            <ChallengeCard
              number="03"
              title="Compete"
              text="Take our creation to the water and prove that innovation can push marine mobility forward."
            />
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                  Our Destination
                </p>
                <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                  Monaco Energy
                  <br />
                  Boat Challenge
                </h2>
                <p className="mt-6 max-w-2xl leading-7 text-white/50">
                  A global platform where student teams, engineers and marine
                  innovators push the boundaries of clean propulsion and
                  sustainable maritime technology.
                </p>
              </div>

              <div className="text-center">
                <div className="text-8xl grayscale">🌊</div>
                <p className="mt-3 text-xs tracking-[0.3em] text-white/40">
                  RACE THE FUTURE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
