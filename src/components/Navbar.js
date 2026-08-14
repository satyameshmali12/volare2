"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "The Challenge", href: "/challenge" },
  { name: "Our Team", href: "/team" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl"
      style={{ backgroundColor: "#4f4e4e" }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <img src="/volarerect.png" alt="Team Volare" className="w-[150px]" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm text-white/60 transition hover:text-white"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white transition hover:bg-white hover:text-neutral-950"
          >
            Join Us
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="text-2xl text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-neutral-950 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-left text-white/70 transition hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
