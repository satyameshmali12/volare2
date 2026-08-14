import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t border-black/10 py-10 text-white"
      style={{ backgroundColor: "#4f4e4e" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 sm:flex-row sm:items-center lg:px-10">
        <div>
          <p className="font-bold tracking-[0.3em]">TEAM VOLARE</p>
          <p className="mt-2 text-xs text-white/40">
            Engineering the future through innovation.
          </p>
        </div>

        <div className="flex gap-5 text-xs text-white/50">
          <Link href="/who-we-are" className="hover:text-white">
            Who We Are
          </Link>
          <Link href="/challenge" className="hover:text-white">
            Challenge
          </Link>
          <Link href="/team" className="hover:text-white">
            Team
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Team Volare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
