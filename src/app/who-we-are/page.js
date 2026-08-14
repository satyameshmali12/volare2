import PageShell from "@/components/PageShell";
import SectionTitle from "@/components/SectionTitle";

export default function WhoWeAre() {
  return (
    <PageShell>
      <section className="bg-[#f5f5f3] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle eyebrow="01 — WHO WE ARE" title="More Than A Boat." />

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-2xl font-light leading-relaxed text-black/85">
                We are a multidisciplinary team united by one obsession:
                <span className="font-medium text-black">
                  {" "}
                  building something that moves.
                </span>
              </p>

              <p className="mt-7 leading-8 text-black/50">
                Team Volare brings together students from engineering,
                technology and creative disciplines to design and build
                innovative marine systems.
              </p>

              <p className="mt-5 leading-8 text-black/50">
                From propulsion and electronics to aerodynamics, materials,
                software and control systems — every part of our boat is
                designed with a purpose.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  "Engineering",
                  "Innovation",
                  "Electronics",
                  "Sustainability",
                  "Teamwork",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
              <img
                src="/volarelogo.jpeg"
                alt="Team Volare"
                className="aspect-square w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
