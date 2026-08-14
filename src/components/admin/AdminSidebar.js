"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Mail,
  Settings,
  Database,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    name: "Database",
    href: "/admin/database",
    icon: Database,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside
      className="
        group
        fixed
        left-0
        top-0
        z-50
        h-screen
        w-16
        hover:w-64
        bg-[#111827]
        text-white
        transition-all
        duration-300
        ease-in-out
        overflow-hidden
        shadow-xl
      "
    >
      {/* Logo */}
      <div className="h-16 flex items-center border-b border-white/10">
        <div className="min-w-16 h-16 flex items-center justify-center">
          <ShieldCheck size={25} />
        </div>

        <span
          className="
            whitespace-nowrap
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-200
            font-semibold
            text-lg
          "
        >
          Team Volare
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex
                items-center
                h-12
                rounded-lg
                hover:bg-white/10
                transition
                mb-2
              "
            >
              <div className="min-w-12 flex justify-center">
                <Icon size={21} />
              </div>

              <span
                className="
                  whitespace-nowrap
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-200
                  ml-2
                  text-sm
                "
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-5 left-2 right-2">
        <button
          className="
            flex
            items-center
            h-12
            w-full
            rounded-lg
            hover:bg-red-500/20
            transition
          "
        >
          <div className="min-w-12 flex justify-center">
            <LogOut size={21} />
          </div>

          <span
            className="
              whitespace-nowrap
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-200
              ml-2
              text-sm
            "
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
