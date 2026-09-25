import Link from "next/link";
import Contact from "@/components/Contact";

const competitionCategories = [
  {
    number: "01",
    title: "Energy Class",
    tag: "TEAM VOLARE",
    description:
      "Teams develop propulsion, cockpit and onboard systems around an identical catamaran hull, putting engineering innovation at the centre of performance.",
    accent: "text-[#0077B6] dark:text-[#00B4D8]",
  },
  {
    number: "02",
    title: "AI Class",
    tag: "AUTONOMOUS",
    description:
      "Fully autonomous zero-emission vessels that combine artificial intelligence with sustainable marine propulsion.",
    accent: "text-[#6C63FF] dark:text-[#8B83FF]",
  },
  {
    number: "03",
    title: "SeaLab Class",
    tag: "VESSEL DESIGN",
    description:
      "A platform for complete vessel design and the development of next-generation sustainable marine technologies.",
    accent: "text-[#00A896] dark:text-[#00C9B1]",
  },
  {
    number: "04",
    title: "Open Sea Xperience",
    tag: "INDUSTRY",
    description:
      "An exhibition of market-ready sustainable boats and technologies developed by industry.",
    accent: "text-[#E67E22] dark:text-[#F59E0B]",
  },
];

const keyFeatures = [
  {
    number: "01",
    title: "Lightweight Structure",
    description:
      "A lightweight, high-strength platform designed around advanced composite materials.",
  },
  {
    number: "02",
    title: "CFD-Driven Design",
    description:
      "Hydrodynamic and aerodynamic optimisation to improve efficiency and overall performance.",
  },
  {
    number: "03",
    title: "Custom Telemetry",
    description:
      "An in-house telemetry ecosystem powered by our own secondary battery system.",
  },
  {
    number: "04",
    title: "Propulsion",
    description:
      "An in-house propeller developed specifically around our propulsion system.",
  },
  {
    number: "05",
    title: "Intelligent Software",
    description:
      "Real-time monitoring, predictive analysis and performance optimisation through software.",
  },
];

const energyLimits = [
  ["25 kW", "Nominal power limit"],
  ["10 kWh", "Maximum onboard energy"],
  ["100%", "Zero-emission propulsion"],
];

export default function Home() {
  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        className="
          relative overflow-hidden
          bg-[#f5f5f3] text-[#111111]
          transition-colors duration-500
          dark:bg-[#101418] dark:text-white
        "
      >
        {/* Decorative circles */}
        <div
          className="
            absolute right-[-10%] top-[8%]
            h-[500px] w-[500px]
            rounded-full
            border border-[#00B4D8]/10
            dark:border-[#00B4D8]/20
          "
        />

        <div
          className="
            absolute right-[0%] top-[18%]
            h-[350px] w-[350px]
            rounded-full
            border border-[#0077B6]/10
            dark:border-[#00B4D8]/20
          "
        />

        <div
          className="
            relative z-10 mx-auto w-full max-w-7xl
            px-6 pb-24 pt-32
            lg:px-10 lg:pb-32 lg:pt-40
          "
        >
          <div className="max-w-5xl">
            <p
              className="
                mb-6 text-sm font-bold uppercase
                tracking-[0.4em]
                text-[#0077B6]
                dark:text-[#00B4D8]
              "
            >
              Team Volare
              <span className="text-[#00A896]"> • </span>
              Marine Innovation
            </p>

            <h1
              className="
                text-5xl font-black leading-[0.92]
                tracking-tight
                sm:text-6xl lg:text-7xl
              "
            >
              <span className="text-[#0077B6] dark:text-[#00B4D8]">
                BUILDING
              </span>

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#00B4D8]
                  via-[#0077B6]
                  to-[#00A896]
                  bg-clip-text text-transparent
                "
              >
                TOMORROW,
              </span>

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#00A896]
                  via-[#00B4D8]
                  to-[#0077B6]
                  bg-clip-text text-transparent
                "
              >
                ONE WAVE AT A TIME
              </span>
            </h1>

            <p
              className="
                mt-8 max-w-2xl
                text-base leading-7
                text-[#315A63]
                sm:text-lg
                dark:text-gray-300
              "
            >
              We are a student-driven marine technology team developing
              innovative boats through{" "}
              <span className="font-semibold text-[#0077B6] dark:text-[#00B4D8]">
                engineering
              </span>
              , <span className="font-semibold text-[#00A896]">chemistry</span>,{" "}
              <span className="font-semibold text-[#00B4D8]">electronics</span>,{" "}
              <span className="font-semibold text-[#6C63FF]">software</span> and
              relentless experimentation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/challenge"
                className="
                  rounded-full
                  bg-gradient-to-r
                  from-[#0077B6] to-[#00A896]
                  px-7 py-3
                  font-semibold text-white
                  shadow-lg shadow-[#0077B6]/15
                  transition-all duration-300
                  hover:scale-105
                "
              >
                Explore Our Mission →
              </Link>

              <Link
                href="/who-we-are"
                className="
                  rounded-full
                  border border-[#0077B6]/30
                  px-7 py-3
                  font-semibold text-[#0077B6]
                  transition-all duration-300
                  hover:border-[#00A896]
                  hover:bg-[#00A896]
                  hover:text-white
                  dark:border-[#00B4D8]/40
                  dark:text-[#00B4D8]
                "
              >
                Who We Are
              </Link>
            </div>
          </div>

          {/* HERO STATS */}
          <div
            className="
              mt-20 grid max-w-4xl
              grid-cols-2 gap-8
              border-t border-[#0077B6]/15
              pt-8
              sm:grid-cols-4
              dark:border-[#00B4D8]/20
            "
          >
            {[
              ["01", "Marine Team", "text-[#0077B6] dark:text-[#00B4D8]"],
              ["1000+", "People", "text-[#00A896]"],
              ["20+", "Countries", "text-[#6C63FF]"],
              ["2027", "Our Target", "text-[#00B4D8]"],
            ].map(([number, label, color]) => (
              <div key={label}>
                <p className={`text-2xl font-black ${color}`}>{number}</p>

                <p
                  className="
                    mt-1 text-xs font-semibold
                    uppercase tracking-wider
                    text-[#527078]
                    dark:text-gray-400
                  "
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MONACO ENERGY BOAT CHALLENGE
      ========================================================= */}
      <section
        className="
          bg-white py-24
          text-[#111111]
          transition-colors duration-500
          dark:bg-[#0D1115] dark:text-white
          lg:py-32
        "
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            {/* LEFT */}
            <div>
              <p
                className="
                  text-xs font-bold uppercase
                  tracking-[0.35em]
                  text-[#0077B6]
                  dark:text-[#00B4D8]
                "
              >
                The Challenge
              </p>

              <h2
                className="
                  mt-5 text-4xl font-black
                  leading-tight sm:text-5xl
                "
              >
                Where marine technology
                <span className="text-[#00B4D8]"> meets the water.</span>
              </h2>

              <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#00B4D8] to-[#00A896]" />
            </div>

            {/* RIGHT */}
            <div
              className="
                space-y-6 text-base leading-8
                text-[#52656B]
                dark:text-gray-300
              "
            >
              <p>
                The{" "}
                <span className="font-semibold text-[#0077B6] dark:text-[#00B4D8]">
                  Monaco Energy Boat Challenge
                </span>{" "}
                is an international platform for developing, testing and
                validating next-generation zero-emission marine technologies.
              </p>

              <p>
                Organised annually by the{" "}
                <span className="font-semibold">Yacht Club de Monaco</span>, the
                challenge brings together more than 1,000 people from over 20
                countries — including students, researchers, universities,
                startups and leading industry organisations.
              </p>

              <p>
                More than a race, it creates a space where{" "}
                <span className="font-semibold text-[#00A896]">
                  academia and industry collaborate
                </span>{" "}
                to accelerate the transition towards cleaner marine
                transportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOUR COMPETITION CATEGORIES
      ========================================================= */}
      <section
        className="
          bg-[#f5f5f3] py-24
          transition-colors duration-500
          dark:bg-[#101418]
          lg:py-32
        "
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p
              className="
                text-xs font-bold uppercase
                tracking-[0.35em]
                text-[#0077B6]
                dark:text-[#00B4D8]
              "
            >
              Four Competition Categories
            </p>

            <h2
              className="
                mt-5 text-4xl font-black
                text-[#111111]
                sm:text-5xl
                dark:text-white
              "
            >
              Four paths.
              <br />
              <span className="text-[#00B4D8]">One sustainable future.</span>
            </h2>

            <p
              className="
                mt-6 max-w-2xl leading-7
                text-[#52656B]
                dark:text-gray-400
              "
            >
              Each category approaches sustainable marine technology from a
              different engineering perspective.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {competitionCategories.map((category) => (
              <div
                key={category.title}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-[#0077B6]/10
                  bg-white p-7
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#00B4D8]/40
                  dark:border-white/10
                  dark:bg-[#151B20]
                  dark:hover:border-[#00B4D8]/40
                "
              >
                <div className="flex items-start justify-between">
                  <span className={`text-3xl font-black ${category.accent}`}>
                    {category.number}
                  </span>

                  <span
                    className="
                      rounded-full
                      border border-[#0077B6]/15
                      px-3 py-1
                      text-[10px] font-bold
                      tracking-widest
                      text-[#527078]
                      dark:border-white/10
                      dark:text-gray-400
                    "
                  >
                    {category.tag}
                  </span>
                </div>

                <h3
                  className="
                    mt-10 text-2xl font-black
                    text-[#111111]
                    dark:text-white
                  "
                >
                  {category.title}
                </h3>

                <p
                  className="
                    mt-4 leading-7
                    text-[#52656B]
                    dark:text-gray-400
                  "
                >
                  {category.description}
                </p>

                <div
                  className="
                    absolute bottom-0 left-0 h-1 w-0
                    bg-gradient-to-r
                    from-[#00B4D8] to-[#00A896]
                    transition-all duration-500
                    group-hover:w-full
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ENERGY CLASS
      ========================================================= */}
      <section
        className="
          relative overflow-hidden
          bg-[#101418] py-24
          text-white
          lg:py-32
        "
      >
        {/* Decorative ring */}
        <div
          className="
            absolute -right-40 top-1/2
            h-[500px] w-[500px]
            -translate-y-1/2
            rounded-full
            border border-[#00B4D8]/10
          "
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    rounded-full
                    bg-[#00B4D8]/10
                    px-4 py-2
                    text-xs font-bold
                    tracking-widest
                    text-[#00B4D8]
                  "
                >
                  TEAM VOLARE
                </span>

                <span className="h-px w-12 bg-[#00B4D8]/40" />

                <span className="text-xs uppercase tracking-widest text-gray-500">
                  Energy Class
                </span>
              </div>

              <h2
                className="
                  mt-7 text-4xl font-black
                  leading-tight sm:text-5xl
                "
              >
                Same hull.
                <br />
                <span className="text-[#00B4D8]">Different engineering.</span>
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300">
                Every Energy Class team receives an identical catamaran hull.
                That means performance is determined by what happens inside and
                around the hull — propulsion, powertrain, energy management and
                onboard systems.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400">
                Strict regulations turn the challenge into an engineering
                optimisation problem. Every watt, kilogram and component
                matters.
              </p>
            </div>

            {/* LIMITS */}
            <div className="grid gap-4">
              {energyLimits.map(([value, label]) => (
                <div
                  key={value}
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.03]
                    p-6
                    transition-all duration-300
                    hover:border-[#00B4D8]/40
                    hover:bg-[#00B4D8]/5
                  "
                >
                  <p className="text-4xl font-black text-[#00B4D8]">{value}</p>

                  <p className="mt-2 text-sm uppercase tracking-widest text-gray-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM VOLARE BOAT
      ========================================================= */}
      <section
        className="
          overflow-hidden
          bg-white py-24
          text-[#111111]
          transition-colors duration-500
          dark:bg-[#0D1115] dark:text-white
          lg:py-32
        "
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
            {/* BOAT VISUAL */}
            <div
              className="
                relative flex min-h-[280px]
                items-center justify-center
                overflow-hidden rounded-3xl
                bg-[#f5f5f3]
                dark:bg-[#151B20]
              "
            >
              <div
                className="
                  absolute h-[300px] w-[300px]
                  rounded-full
                  border border-[#00B4D8]/10
                  dark:border-[#00B4D8]/20
                "
              />

              <img
                src="/boat-progress.png"
                alt="Team Volare electric racing boat concept"
                className="
                  relative z-10
                  w-[80%] max-w-[520px]
                  object-contain
                  drop-shadow-[0_12px_25px_rgba(0,180,216,0.18)]
                "
              />

              <div
                className="
                  absolute bottom-8 left-10 right-10
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#00B4D8]/50
                  to-transparent
                "
              />
            </div>

            {/* CONTENT */}
            <div>
              <p
                className="
                  text-xs font-bold uppercase
                  tracking-[0.35em]
                  text-[#0077B6]
                  dark:text-[#00B4D8]
                "
              >
                Our Platform
              </p>

              <h2
                className="
                  mt-5 text-4xl font-black
                  leading-tight sm:text-5xl
                "
              >
                Designing for
                <br />
                <span className="text-[#00B4D8]">continuous improvement.</span>
              </h2>

              <p
                className="
                  mt-7 leading-8
                  text-[#52656B]
                  dark:text-gray-300
                "
              >
                Team Volare's proposed catamaran is being developed as a
                high-efficiency electric racing platform for the Monaco Energy
                Boat Challenge.
              </p>

              <p
                className="
                  mt-5 leading-8
                  text-[#52656B]
                  dark:text-gray-400
                "
              >
                The project is currently in the preliminary CAD stage. The
                concept will continue to evolve through CFD, structural analysis
                and physical testing.
              </p>

              <div
                className="
                  mt-8 border-l-2
                  border-[#00B4D8]
                  pl-5
                "
              >
                <p
                  className="
                    text-sm font-semibold
                    leading-7
                    text-[#315A63]
                    dark:text-gray-300
                  "
                >
                  Our approach combines mechanical engineering with in-house
                  electrical and software development to create a lightweight,
                  data-driven and reliable racing platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY FEATURES
      ========================================================= */}
      <section
        className="
          bg-[#f5f5f3] py-24
          transition-colors duration-500
          dark:bg-[#101418]
          lg:py-32
        "
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            {/* HEADER */}
            <div>
              <p
                className="
                  text-xs font-bold uppercase
                  tracking-[0.35em]
                  text-[#0077B6]
                  dark:text-[#00B4D8]
                "
              >
                Engineering Focus
              </p>

              <h2
                className="
                  mt-5 text-4xl font-black
                  leading-tight sm:text-5xl
                "
              >
                Every system
                <br />
                <span className="text-[#00A896]">works together.</span>
              </h2>

              <p
                className="
                  mt-6 max-w-md leading-7
                  text-[#52656B]
                  dark:text-gray-400
                "
              >
                From the shape of the hull to the software analysing every run,
                our platform is being developed as one connected engineering
                system.
              </p>
            </div>

            {/* FEATURES */}
            <div className="divide-y divide-[#0077B6]/10 dark:divide-white/10">
              {keyFeatures.map((feature) => (
                <div
                  key={feature.number}
                  className="
                    group grid
                    gap-5 py-7
                    sm:grid-cols-[70px_1fr]
                  "
                >
                  <span
                    className="
                      text-sm font-black
                      text-[#00B4D8]
                    "
                  >
                    {feature.number}
                  </span>

                  <div>
                    <h3
                      className="
                        text-xl font-black
                        text-[#111111]
                        transition-colors
                        group-hover:text-[#0077B6]
                        dark:text-white
                        dark:group-hover:text-[#00B4D8]
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-2 max-w-2xl
                        leading-7
                        text-[#52656B]
                        dark:text-gray-400
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL STATEMENT
      ========================================================= */}
      <section
        className="
          relative overflow-hidden
          bg-[#0077B6] py-24
          text-white
          lg:py-32
        "
      >
        <div
          className="
            absolute -right-32 -top-32
            h-96 w-96
            rounded-full
            border border-white/10
          "
        />

        <div
          className="
            absolute -bottom-40 -left-20
            h-96 w-96
            rounded-full
            border border-white/10
          "
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/60">
            Team Volare • Monaco 2027
          </p>

          <h2
            className="
              mt-6 text-4xl font-black
              leading-tight
              sm:text-5xl lg:text-6xl
            "
          >
            We are not just building
            <br />a boat.
          </h2>

          <p
            className="
              mx-auto mt-7 max-w-2xl
              text-lg leading-8
              text-white/80
            "
          >
            We are building a platform where mechanical engineering, electrical
            systems, software and data come together on the water.
          </p>

          <Link
            href="/updates"
            className="
              mt-9 inline-flex
              rounded-full
              bg-white
              px-8 py-3
              font-bold
              text-[#0077B6]
              transition-all duration-300
              hover:scale-105
            "
          >
            Follow Our Journey →
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <Contact />
    </>
  );
}
