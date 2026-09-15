"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "The Challenge", href: "/challenge" },
  { name: "Our Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    setMounted(true);

    async function checkAuth() {
      try {
        const response = await fetch("/api/updates", {
          cache: "no-store",
        });

        if (!response.ok) {
          setLoggedIn(false);
          return;
        }

        const data = await response.json();

        setLoggedIn(
          data.userType === "member" ||
            data.userType === "sponsor" ||
            data.userType === "superadmin",
        );
      } catch (error) {
        console.error("Navbar auth check failed:", error);
        setLoggedIn(false);
      }
    }

    checkAuth();
  }, [pathname]);

  /* ================= CLOSE MENU ON ROUTE CHANGE ================= */

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* ================= ADMIN ================= */

  if (isAdmin) {
    return null;
  }

  return (
    <>
      {/* ========================================================= */}
      {/*                         NAVBAR                            */}
      {/* ========================================================= */}

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
          {/* ===================================================== */}
          {/*                         DESKTOP                       */}
          {/* ===================================================== */}

          <div className="hidden h-[76px] items-center md:flex">
            {/* ================= LEFT ================= */}

            <div className="flex items-center px-5">
              <Link
                href="/updates"
                className="
                  rounded-full
                  border border-white/20
                  bg-white/5
                  px-5 py-2.5
                  text-sm font-medium
                  text-white
                  transition-all duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-[#242421]
                "
              >
                Volare Hub
              </Link>
            </div>

            {/* ================= CENTER LOGO ================= */}

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

            {/* ================= RIGHT ================= */}

            <div className="ml-auto flex items-center px-5">
              <button
                type="button"
                aria-label="Open navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  bg-white/5
                  text-white
                  transition-all duration-300
                  hover:border-white/25
                  hover:bg-white/10
                  active:scale-95
                "
              >
                <div className="flex flex-col gap-1.5">
                  <span className="h-[1.5px] w-5 bg-white" />
                  <span className="h-[1.5px] w-5 bg-white" />
                </div>
              </button>
            </div>
          </div>

          {/* ===================================================== */}
          {/*                         MOBILE                        */}
          {/* ===================================================== */}

          <div className="flex h-[68px] items-center px-4 md:hidden">
            {/* ================= LEFT - HUB ================= */}

            <Link
              href="/updates"
              className="
                rounded-full
                border border-white/20
                bg-white/5
                px-3.5 py-2
                text-xs font-medium
                text-white
                transition
                hover:border-white
                hover:bg-white
                hover:text-[#242421]
              "
            >
              Volare Hub
            </Link>

            {/* ================= CENTER LOGO ================= */}

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

            {/* ================= RIGHT - HAMBURGER ================= */}

            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="
                ml-auto
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-white/15
                bg-white/5
                text-white
                transition
                hover:bg-white/10
                active:scale-95
              "
            >
              <div className="flex flex-col gap-1.5">
                <span className="h-[1.5px] w-5 bg-white" />
                <span className="h-[1.5px] w-5 bg-white" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ========================================================= */}
      {/*                         OVERLAY                           */}
      {/* ========================================================= */}

      <div
        className={`
          fixed inset-0 z-[60]
          bg-black/30
          backdrop-blur-[2px]
          transition-opacity duration-300
          ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* ========================================================= */}
      {/*                    RIGHT SIDE MENU                        */}
      {/* ========================================================= */}

      <aside
        className={`
          fixed right-0 top-0 z-[70]
          h-full w-[340px]
          max-w-[88vw]
          border-l border-gray-200
          bg-white
          shadow-[-20px_0_60px_rgba(0,0,0,0.12)]
          transition-transform duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* ===================================================== */}
          {/*                         MENU HEADER                    */}
          {/* ===================================================== */}

          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Team Volare
              </p>

              <h2 className="mt-1 text-xl font-black tracking-tight text-gray-950">
                Navigation
              </h2>
            </div>

            {/* CLOSE BUTTON */}

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-gray-100
                text-xl
                text-gray-700
                transition
                hover:bg-gray-200
                active:scale-95
              "
            >
              ×
            </button>
          </div>

          {/* ===================================================== */}
          {/*                      NAVIGATION LINKS                  */}
          {/* ===================================================== */}

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      group flex items-center justify-between
                      rounded-2xl
                      px-4 py-4
                      transition-all duration-300
                      ${
                        active
                          ? "bg-gray-950 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`
                          text-[10px]
                          font-bold
                          ${active ? "text-white/40" : "text-gray-300"}
                        `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>

                    <span
                      className="
                        text-lg
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* =================================================== */}
            {/*                         HUB                         */}
            {/* =================================================== */}

            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Volare Space
              </p>

              <Link
                href="/updates"
                onClick={() => setMenuOpen(false)}
                className="
                  group flex items-center justify-between
                  rounded-2xl
                  bg-gray-100
                  px-4 py-4
                  text-gray-900
                  transition-all duration-300
                  hover:bg-gray-950
                  hover:text-white
                "
              >
                <div>
                  <p className="text-sm font-bold">Volare Hub</p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Project updates & resources
                  </p>
                </div>

                <span
                  className="
                    text-lg
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* ===================================================== */}
          {/*                         MENU FOOTER                    */}
          {/* ===================================================== */}

          <div className="border-t border-gray-100 px-6 py-5">
            {mounted && !loggedIn && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  flex w-full
                  items-center justify-center
                  rounded-full
                  bg-gray-950
                  px-5 py-3.5
                  text-sm font-bold
                  text-white
                  transition
                  hover:bg-gray-800
                  active:scale-[0.98]
                "
              >
                Login to Volare Hub
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
