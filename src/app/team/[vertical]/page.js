import Link from "next/link";

const ALLOWED_VERTICALS = ["mechanical", "electrical", "software", "research"];

const verticalInfo = {
  mechanical: {
    title: "Mechanical",
    description:
      "Designing the structures, hull and mechanical systems that bring Team Volare's boat to life.",
  },

  electrical: {
    title: "Electrical",
    description:
      "Building the power, electronics and control systems that keep the boat running.",
  },

  software: {
    title: "Software",
    description:
      "Developing automation, telemetry, control systems and the software behind the boat.",
  },

  research: {
    title: "Research",
    description:
      "Exploring energy, materials, chemistry and optimization to push the project further.",
  },
};

async function getTeamMembers(vertical) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/team?vertical=${vertical}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team members");
  }

  return response.json();
}

export default async function TeamVerticalPage({ params }) {
  const { vertical } = await params;

  const normalizedVertical = vertical.toLowerCase();

  if (!ALLOWED_VERTICALS.includes(normalizedVertical)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f3] px-6 text-black">
        <div className="text-center">
          {/* <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Team Volare
          </p> */}

          <h1 className="mt-4 text-5xl font-black tracking-tight">404</h1>

          <p className="mt-3 text-sm text-black/50">
            This team vertical does not exist.
          </p>

          <Link
            href="/team"
            className="mt-7 inline-block rounded-full bg-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-black/80"
          >
            Back to Team
          </Link>
        </div>
      </main>
    );
  }

  const data = await getTeamMembers(normalizedVertical);
  const info = verticalInfo[normalizedVertical];

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-black">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section
        className="border-b border-black/10 mx-6"
        style={{ paddingTop: "100px" }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Small breadcrumb */}
          {/* <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-black/40">
            <Link href="/team" className="transition hover:text-black">
              Team
            </Link>

            <span>/</span>

            <span>{info.title}</span>
          </div> */}

          {/* Title */}
          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              {/* <p className="text-xs font-medium uppercase tracking-[0.35em] text-black/40">
                Team Volare
              </p> */}

              <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] sm:text-5xl md:text-6xl">
                {info.title}
              </h1>
            </div>
          </div>
          {/* <div>
            <p className="max-w-md text-sm leading-6 text-black/50 md:text-right">
              {info.description}
            </p>
          </div> */}

          {/* Member count */}
          <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              Our Team
            </span>

            <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              {data.count} {data.count === 1 ? "Member" : "Members"}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM GRID
      ====================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {data.members.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-white px-6 py-20 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-black/35">
                No members found
              </p>

              <p className="mt-3 text-sm text-black/40">
                There are currently no members in this vertical.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-x-3
                gap-y-8
                sm:grid-cols-2
                sm:gap-x-5
                sm:gap-y-10
                lg:grid-cols-3
                lg:gap-x-6
                lg:gap-y-14
                xl:grid-cols-4
                "
            >
              {data.members.map((member) => (
                <article key={member._id} className="group min-w-0">
                  {/* =================================================
                      PROFILE IMAGE
                  ================================================== */}

                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-200 sm:rounded-2xl1">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          ease-out
                          group-hover:scale-[1.04]
                        "
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                        <span className="text-4xl font-black text-black/10 sm:text-6xl">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Bottom gradient */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-70" />

                    {/* Vertical badge */}
                    <div className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur-md sm:left-3 sm:top-3 sm:px-3">
                      <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-black/60 sm:text-[9px]">
                        {member.vertical}
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      MEMBER INFO
                  ================================================== */}

                  <div className="pt-3 sm:pt-4">
                    <h2 className="truncate text-sm font-bold tracking-tight sm:text-base lg:text-lg">
                      {member.name}
                    </h2>

                    <p className="mt-1 truncate text-[11px] text-black/45 sm:text-xs">
                      {member.role}
                    </p>

                    {/* Bio - desktop/tablet only */}
                    {member.bio && (
                      <p className="mt-3 hidden line-clamp-2 text-xs leading-5 text-black/40 sm:block">
                        {member.bio}
                      </p>
                    )}

                    {/* Social links */}
                    {(member.linkedin || member.github) && (
                      <div className="mt-3 flex gap-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              rounded-full
                              border
                              border-black/10
                              px-2.5
                              py-1.5
                              text-[8px]
                              uppercase
                              tracking-[0.15em]
                              text-black/50
                              transition
                              hover:border-black
                              hover:bg-black
                              hover:text-white
                              sm:px-3
                            "
                          >
                            LinkedIn
                          </a>
                        )}

                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              rounded-full
                              border
                              border-black/10
                              px-2.5
                              py-1.5
                              text-[8px]
                              uppercase
                              tracking-[0.15em]
                              text-black/50
                              transition
                              hover:border-black
                              hover:bg-black
                              hover:text-white
                              sm:px-3
                            "
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BACK TO TEAM
      ====================================================== */}

      <section className="border-t border-black/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between">
          <Link
            href="/team"
            className="
              group
              flex
              items-center
              gap-3
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-black/50
              transition
              hover:text-black
            "
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            All Verticals
          </Link>

          <span className="text-[10px] uppercase tracking-[0.25em] text-black/25">
            Team Volare
          </span>
        </div>
      </section>
    </main>
  );
}
