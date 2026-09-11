"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "The Challenge", href: "/challenge" },
  { name: "Our Team", href: "/team" },
  // { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className="
          relative mx-auto max-w-7xl
          rounded-2xl
          border border-white/15
          bg-[#242421]/95
          shadow-[0_8px_30px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
        "
      >
        {/* ================= DESKTOP ================= */}
        <div className="hidden h-[76px] items-center justify-between px-5 md:flex">
          {/* LEFT NAV PILL */}
          <div
            className="
              flex items-center gap-1
              rounded-full
              border border-white/20
              bg-[#2d2d29]
              p-1
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  rounded-full
                  px-4 py-2.5
                  text-sm font-medium
                  text-white/70
                  transition-all duration-300
                  hover:bg-white/10
                  hover:text-white
                "
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CENTER LOGO */}
          <Link
            href="/"
            className="
              absolute left-1/2
              -translate-x-1/2
              transition-transform duration-300
              hover:scale-105
            "
          >
            <Image
              src="/volarerect.png"
              alt="Team Volare"
              width={150}
              height={55}
              priority
              className="
                h-auto
                w-[110px]
                object-contain
                sm:w-[125px]
                lg:w-[140px]
              "
            />
          </Link>

          {/* RIGHT CTA */}
          <Link
            href="/contact"
            className="
              rounded-full
              border border-white/25
              bg-white/5
              px-6 py-3
              text-sm font-medium
              text-white
              transition-all duration-300
              hover:bg-white
              hover:text-[#242421]
              hover:border-white
            "
          >
            Let&apos;s work
          </Link>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex h-[68px] items-center justify-between px-5 md:hidden">
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/15
              bg-white/5
              text-white
              transition
              hover:bg-white/10
            "
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="h-[1.5px] w-5 bg-white" />
                <span className="h-[1.5px] w-5 bg-white" />
              </div>
            )}
          </button>

          {/* Mobile Center Logo */}
          <Link
            href="/"
            className="
              absolute left-1/2
              -translate-x-1/2
              transition-transform duration-300
              hover:scale-105
            "
          >
            <Image
              src="/volarerect.png"
              alt="Team Volare"
              width={140}
              height={50}
              priority
              className="
                h-auto
                w-[105px]
                object-contain
              "
            />
          </Link>

          {/* Mobile CTA */}
          <Link
            href="/contact"
            className="
              rounded-full
              border border-white/20
              px-3.5 py-2
              text-xs font-medium
              text-white
              transition
              hover:bg-white
              hover:text-[#242421]
            "
          >
            Let&apos;s work
          </Link>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`
            overflow-hidden
            transition-all duration-300 ease-in-out
            md:hidden
            ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-t border-white/10 px-5 pb-5 pt-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    rounded-xl
                    px-4 py-3.5
                    text-sm
                    text-white/70
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
