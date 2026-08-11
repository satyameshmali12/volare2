"use client";

import { useState } from "react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Who We Are", id: "about" },
  { name: "The Challenge", id: "challenge" },
  { name: "Our Team", id: "team" },
  { name: "Contact", id: "contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#03141f] text-white">
      {/* ================= NAVBAR ================= */}

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#03141f]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* LOGO */}

          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
          >
            <div>
              <img
                src="/volarerect.png"
                alt="Team Volare"
                style={{ width: "150px" }}
              />
            </div>
            {/* <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10">
              <span className="text-xl">⚓</span>
            </div>

            <div className="text-left">
              <p className="font-bold tracking-[0.25em] text-white">VOLARE</p>
              <p className="text-[9px] tracking-[0.35em] text-cyan-300">
                MARINE TECHNOLOGY
              </p>
            </div> */}
          </button>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative text-sm text-white/70 transition hover:text-white"
              >
                {item.name}

                <span className="absolute -bottom-2 left-0 h-[1px] w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-full border border-cyan-300/40 px-5 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300 hover:text-[#03141f]"
            >
              Join Us
            </button>
          </div>

          {/* MOBILE BUTTON */}

          <button
            className="text-2xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#03141f]/95 px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-white/80"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        {/* Background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#075985_0%,transparent_35%),linear-gradient(180deg,#03141f,#020b12)]" />

        {/* Decorative circles */}

        <div className="absolute right-[-15%] top-[15%] h-[500px] w-[500px] rounded-full border border-cyan-300/10" />
        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full border border-cyan-300/10" />

        {/* Content */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
              Team Volare • Marine Innovation
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-9xl">
              ENGINEERING
              <br />
              <span className="text-cyan-300">THE FUTURE</span>
              <br />
              OF WATER.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              We are a student-driven marine technology team building innovative
              boats through engineering, chemistry, electronics, design and
              relentless experimentation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("challenge")}
                className="rounded-full bg-cyan-300 px-7 py-3 font-semibold text-[#03141f] transition hover:scale-105 hover:bg-cyan-200"
              >
                Explore Our Mission →
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="rounded-full border border-white/20 px-7 py-3 text-white transition hover:border-cyan-300 hover:text-cyan-300"
              >
                Who We Are
              </button>
            </div>
          </div>

          {/* Bottom stats */}

          <div className="mt-20 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            <Stat number="01" label="Marine Team" />
            <Stat number="∞" label="Ideas" />
            <Stat number="100%" label="Student Driven" />
            <Stat number="2027" label="Next Challenge" />
          </div>
        </div>

        {/* Animated wave */}

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block h-24 w-[calc(100%+1.3px)]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1150,20 1200,50 L1200,120 L0,120 Z"
              className="fill-[#061d2a]"
            />
          </svg>
        </div>

        {/* Floating boat */}

        <div className="absolute bottom-28 right-[10%] hidden animate-[float_4s_ease-in-out_infinite] lg:block">
          <div className="text-7xl drop-shadow-[0_0_25px_rgba(103,232,249,0.5)]">
            🚤
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}

      <section id="about" className="relative bg-[#061d2a] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle eyebrow="01 — WHO WE ARE" title="More Than A Boat." />

          <div
            className="mt-16 grid items-center gap-12 lg:grid-cols-2"
            style={{ display: "flex" }}
          >
            {/* LEFT — TEXT */}
            <div>
              <p className="text-2xl font-light leading-relaxed text-white/90">
                We are a multidisciplinary team united by one obsession:
                <span className="text-cyan-300">
                  {" "}
                  building something that moves.
                </span>
              </p>

              <p className="mt-7 leading-8 text-white/50">
                Team Volare brings together students from engineering,
                technology and creative disciplines to design and build
                innovative marine systems.
              </p>

              <p className="mt-5 leading-8 text-white/50">
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
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — LOGO */}
            {/* <div className="flex min-h-[350px] w-full items-center justify-center lg:min-h-[450px]">
              <div className="flex h-[40vh] w-[80vw] max-w-[500px] items-center justify-center overflow-hidden rounded-3xl bg-white/5 p-4 sm:w-[60vw] lg:h-[450px] lg:w-[35vw]">
                <img
                  src="/volarelogo.jpeg"
                  alt="Team Volare"
                  className="h-full w-full object-contain"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ================= CHALLENGE ================= */}

      <section
        id="challenge"
        className="relative overflow-hidden bg-[#03141f] py-28"
      >
        {/* Decorative wave */}

        <div className="absolute right-[-200px] top-20 h-[500px] w-[500px] rounded-full border border-cyan-300/10" />

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

          <div className="mt-16 overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-950/60 to-blue-950/30 p-8 sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                  Our Destination
                </p>

                <h3 className="mt-4 text-4xl font-bold sm:text-5xl">
                  Monaco Energy
                  <br />
                  Boat Challenge
                </h3>

                <p className="mt-6 max-w-2xl leading-7 text-white/50">
                  A global platform where student teams, engineers and marine
                  innovators push the boundaries of clean propulsion and
                  sustainable maritime technology.
                </p>
              </div>

              <div className="text-center">
                <div className="text-8xl">🌊</div>
                <p className="mt-3 text-xs tracking-[0.3em] text-white/40">
                  RACE THE FUTURE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOAT ================= */}

      <section className="relative bg-[#061d2a] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="03 — OUR CREATION"
            title="Built For The Water."
          />

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            {/* Boat placeholder */}

            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
              {/* Replace /public/team.jpg */}

              <img
                src="/proposedcatarman.jpeg"
                alt="Team Volare"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#03141f] via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8">
                <p className="text-sm tracking-[0.3em] text-cyan-300">
                  TEAM VOLARE
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Proposed
                  <br />
                  Catarman
                </h3>
              </div>
            </div>

            <div>
              <p className="text-3xl font-semibold leading-tight">
                Every component has a reason.
              </p>

              <p className="mt-6 leading-8 text-white/50">
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
      </section>

      {/* ================= TEAM ================= */}

      <section id="team" className="relative bg-[#03141f] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle
            eyebrow="04 — THE CREW"
            title="The People Behind The Boat."
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* TEAM PHOTO */}

            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
              {/* Replace /public/team.jpg */}

              <img
                src="/teamvolare.jpeg"
                alt="Team Volare"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#03141f] via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8">
                <p className="text-sm tracking-[0.3em] text-cyan-300">
                  TEAM VOLARE
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  One crew.
                  <br />
                  One mission.
                </h3>
              </div>
            </div>

            {/* TEAM DESCRIPTION */}

            <div className="flex flex-col justify-center">
              <p className="text-lg leading-8 text-white/60">
                Behind every successful launch is a team willing to spend
                countless hours designing, testing, failing and trying again.
              </p>

              <div className="mt-10 space-y-5">
                <TeamRole
                  title="Mechanical"
                  text="Structures, hull and mechanical systems"
                />

                <TeamRole
                  title="Electrical"
                  text="Power, electronics and control"
                />

                <TeamRole
                  title="Software"
                  text="Automation, telemetry and data"
                />

                <TeamRole
                  title="Research"
                  text="Energy, chemistry and optimization"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOGO ================= */}

      <section className="relative overflow-hidden bg-cyan-300 py-24 text-[#03141f]">
        <div className="absolute -right-20 -top-40 h-96 w-96 rounded-full border-[40px] border-[#03141f]/5" />

        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em]">
            Our Identity
          </p>

          <div className="mx-auto mt-8 flex h-36 w-36 items-center justify-center rounded-full border-4 border-[#03141f]">
            <span className="text-6xl">⚓</span>
          </div>

          <h2 className="mt-8 text-5xl font-black tracking-tight sm:text-7xl">
            VOLARE
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[#03141f]/70">
            Driven by curiosity. Powered by engineering. Built for the sea.
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="relative overflow-hidden bg-[#03141f] py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionTitle eyebrow="05 — CONTACT" title="Let's Build Something." />

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="max-w-lg text-lg leading-8 text-white/50">
                Interested in collaborating, sponsoring our project, joining the
                team or simply learning more about what we do?
              </p>

              <div className="mt-10 space-y-6">
                <ContactItem
                  icon="✉"
                  title="Email"
                  value="teamvolare@example.com"
                />

                <ContactItem icon="◎" title="Instagram" value="@teamvolare" />

                <ContactItem icon="◉" title="Location" value="Mumbai, India" />
              </div>
            </div>

            <form
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5">
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-cyan-300"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-cyan-300"
                />

                <textarea
                  rows="5"
                  placeholder="Tell us what's on your mind..."
                  className="resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-cyan-300"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-cyan-300 py-4 font-semibold text-[#03141f] transition hover:bg-cyan-200"
                >
                  Send Message →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom wave */}

        <div className="mt-28 opacity-20">
          <svg
            viewBox="0 0 1200 120"
            className="h-24 w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,70 C200,10 350,120 600,60 C850,0 1000,100 1200,40 L1200,120 L0,120 Z"
              className="fill-cyan-300"
            />
          </svg>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 bg-[#020b12] py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 sm:flex-row sm:items-center lg:px-10">
          <div>
            <p className="font-bold tracking-[0.3em]">TEAM VOLARE</p>

            <p className="mt-2 text-xs text-white/30">
              Engineering the future of water.
            </p>
          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Team Volare. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ================= GLOBAL ANIMATION ================= */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }

          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        ::selection {
          background: #67e8f9;
          color: #03141f;
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SectionTitle({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.35em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
        {title}
      </h2>

      <div className="mt-7 h-[2px] w-20 bg-cyan-300" />
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-cyan-300">{number}</p>

      <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>
    </div>
  );
}

function ChallengeCard({ number, title, text }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]">
      <span className="text-sm text-cyan-300">{number}</span>

      <h3 className="mt-10 text-3xl font-bold">{title}</h3>

      <p className="mt-5 leading-7 text-white/40">{text}</p>

      <div className="mt-8 h-[1px] w-full bg-white/10 transition group-hover:bg-cyan-300/30" />
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/5 text-cyan-300">
        {icon}
      </div>

      <p className="font-medium">{title}</p>
    </div>
  );
}

function TeamRole({ title, text }) {
  return (
    <div className="border-b border-white/10 pb-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{title}</p>

        <span className="text-cyan-300">→</span>
      </div>

      <p className="mt-2 text-sm text-white/40">{text}</p>
    </div>
  );
}

function ContactItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 text-cyan-300">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-white/30">
          {title}
        </p>

        <p className="mt-1 text-white/80">{value}</p>
      </div>
    </div>
  );
}
