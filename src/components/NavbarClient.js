"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ScrollBoatProgress from "./ScrollBoatProgress";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "The Challenge", href: "/challenge" },
  { name: "Our Team", href: "/team" },
  { name: "Contact", href: "/contact" },
  { name: "Intro Video", href: "/introvideo" },
];

export default function NavbarClient({ isSuperAdmin }) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  function toggleTheme() {
    setDarkMode((current) => {
      const next = !current;

      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return next;
    });
  }

  /* =========================================================
     AUTH
  ========================================================= */

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/users/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          setLoggedIn(false);
          setShow(false);
          return;
        }

        const data = await response.json();

        const userType = data.userType;

        setLoggedIn(
          userType === "member" ||
            userType === "sponsor" ||
            userType === "superadmin",
        );

        setShow(userType === "superadmin");
      } catch (error) {
        console.error("Navbar auth check failed:", error);
        setLoggedIn(false);
        setShow(false);
      }
    }

    checkAuth();
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* =========================================================
     ADMIN PAGE
  ========================================================= */

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navigationItems = show
    ? [{ name: "Admin", href: "/admin" }, ...navItems]
    : navItems;

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 dark:bg-grey">
        <ScrollBoatProgress />

        <nav
          className="
            relative mx-auto max-w-7xl
            rounded-2xl
            border border-white/10
            bg-[#242421]/95
            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
          "
        >
          {/* =================================================
              DESKTOP
          ================================================= */}

          <div className="hidden h-[76px] items-center md:flex">
            {/* LEFT */}

            <div className="flex items-center px-5">
              <Link
                href="/updates"
                className="
                  rounded-full
                  border border-white/10
                  bg-white/5
                  px-5 py-2.5
                  text-sm font-medium
                  text-white
                  transition-all duration-300
                  hover:bg-white/10
                "
              >
                Volare Hub
              </Link>
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

            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-3 px-5">
              {/* THEME TOGGLE */}

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-lg
                  text-white
                  transition-all duration-300
                  hover:bg-white/10
                  active:scale-95
                "
              >
                {darkMode ? "☀" : "☾"}
              </button>

              {/* HAMBURGER */}

              <button
                type="button"
                aria-label="Open navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  transition-all duration-300
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

          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="flex h-[68px] items-center px-4 md:hidden">
            {/* LEFT */}

            <Link
              href="/updates"
              className="
                rounded-full
                border border-white/10
                bg-white/5
                px-3.5 py-2
                text-xs font-medium
                text-white
                transition
                hover:bg-white/10
              "
            >
              Volare Hub
            </Link>

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
                width={140}
                height={50}
                priority
                className="h-auto w-[105px] object-contain"
              />
            </Link>

            {/* RIGHT */}

            <div className="ml-auto flex items-center gap-2">
              {/* THEME */}

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
                  text-base
                  text-white
                  transition
                  hover:bg-white/10
                  active:scale-95
                "
              >
                {darkMode ? "☀" : "☾"}
              </button>

              {/* HAMBURGER */}

              <button
                type="button"
                aria-label="Open navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/5
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
          </div>
        </nav>
      </header>
      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        onClick={() => setMenuOpen(false)}
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
      />

      {/* =====================================================
          SIDE MENU
      ===================================================== */}

      <aside
        className={`
          fixed right-0 top-0 z-[70]
          h-full w-[340px]
          max-w-[88vw]

          border-l
          border-gray-200
          bg-white

          shadow-[-20px_0_60px_rgba(0,0,0,0.12)]

          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          dark:border-gray-800
          dark:bg-[#111719]
          dark:shadow-[-20px_0_60px_rgba(0,0,0,0.4)]

          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* MENU HEADER */}

          <div
            className="
              flex items-center justify-between
              border-b border-gray-100
              px-6 py-6
              dark:border-gray-800
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                "
              >
                Team Volare
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-black
                  tracking-tight
                  text-gray-950
                  dark:text-white
                "
              >
                Navigation
              </h2>
            </div>

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

                dark:bg-gray-800
                dark:text-gray-200
                dark:hover:bg-gray-700

                active:scale-95
              "
            >
              ×
            </button>
          </div>

          {/* NAVIGATION */}

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item, index) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      group
                      flex items-center justify-between
                      rounded-2xl
                      px-4 py-4
                      transition-all duration-300

                      ${
                        active
                          ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`
                          text-[10px]
                          font-bold
                          ${
                            active
                              ? "text-white/40 dark:text-gray-500"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>

                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* HUB */}

            <div
              className="
                mt-6
                border-t
                border-gray-100
                pt-6
                dark:border-gray-800
              "
            >
              <p
                className="
                  mb-3 px-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                "
              >
                Volare Space
              </p>

              <Link
                href="/updates"
                onClick={() => setMenuOpen(false)}
                className="
                  group
                  flex items-center justify-between
                  rounded-2xl
                  bg-gray-100
                  px-4 py-4
                  text-gray-900
                  transition-all duration-300

                  hover:bg-gray-950
                  hover:text-white

                  dark:bg-gray-800
                  dark:text-white
                  dark:hover:bg-white
                  dark:hover:text-gray-950
                "
              >
                <div>
                  <p className="text-sm font-bold">Volare Hub</p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Project updates & resources
                  </p>
                </div>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/technical-hub"
                onClick={() => setMenuOpen(false)}
                className="
                  mt-2
                  group
                  flex items-center justify-between
                  rounded-2xl
                  bg-gray-100
                  px-4 py-4
                  text-gray-900
                  transition-all duration-300

                  hover:bg-gray-950
                  hover:text-white

                  dark:bg-gray-800
                  dark:text-white
                  dark:hover:bg-white
                  dark:hover:text-gray-950
                "
              >
                <div>
                  <p className="text-sm font-bold">Technical Hub</p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Project updates & resources
                  </p>
                </div>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
              border-t
              border-gray-100
              px-6 py-5
              dark:border-gray-800
            "
          >
            {/* THEME SWITCH */}

            <button
              type="button"
              onClick={toggleTheme}
              className="
                mb-3
                flex w-full
                items-center justify-between
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                px-4 py-4
                text-gray-900
                transition-all duration-300
                hover:bg-gray-100

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-white
                dark:hover:bg-gray-700
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{darkMode ? "☀" : "☾"}</span>

                <div className="text-left">
                  <p className="text-sm font-bold">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Switch appearance
                  </p>
                </div>
              </div>

              <div
                className={`
                  relative
                  h-6 w-11
                  rounded-full
                  transition-colors duration-300
                  ${darkMode ? "bg-[#00A896]" : "bg-gray-300"}
                `}
              >
                <div
                  className={`
                    absolute top-1
                    h-4 w-4
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-transform duration-300
                    ${darkMode ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </div>
            </button>

            {/* LOGIN */}

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

                  dark:bg-white
                  dark:text-gray-950
                  dark:hover:bg-gray-200

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
