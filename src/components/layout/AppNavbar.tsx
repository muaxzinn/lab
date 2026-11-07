"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ROUTES } from "./nav-data";

export function AppNavbar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Kiosk Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800/80 px-2 py-1.5"
    >
      <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar max-w-lg mx-auto">
        {NAV_ROUTES.map((route) => {
          const Icon = route.icon;
          const isActive =
            route.path === "/"
              ? pathname === "/"
              : pathname === route.path || pathname.startsWith(`${route.path}/`);

          return (
            <Link
              key={route.path}
              href={route.path}
              className={`relative flex flex-col items-center justify-center min-w-[56px] py-1.5 px-2 rounded-xl text-center transition-all ${
                isActive
                  ? "text-cyan-300 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {/* Active top dot with Mint/Cyan gradient */}
              {isActive && (
                <span
                  className="absolute top-0.5 h-1 w-5 rounded-full"
                  style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
                />
              )}

              <Icon
                className={`h-4 w-4 mb-1 transition-transform ${
                  isActive ? "scale-110 stroke-[2.2] text-cyan-400" : "stroke-[1.75]"
                }`}
              />

              <span className="text-[10px] font-heading truncate max-w-[64px]">
                {route.label.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
