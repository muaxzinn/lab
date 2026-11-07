"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Atom,
  ChevronRight,
  Layers,
  X,
} from "lucide-react";
import { NAV_ROUTES, type NavRoute } from "./nav-data";

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AppSidebar({ isOpen = false, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  // Group routes by category
  const categories = useMemo(() => {
    const map = new Map<string, NavRoute[]>();
    for (const route of NAV_ROUTES) {
      const current = map.get(route.category) || [];
      current.push(route);
      map.set(route.category, current);
    }
    return Array.from(map.entries());
  }, []);

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-neutral-950 border-r border-neutral-800 p-4 overflow-y-auto no-scrollbar">
      {/* Brand & Platform Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-cyan-300 group-hover:border-cyan-500/80 transition-all shadow-sm">
              <Atom className="h-5 w-5 stroke-[1.8] group-hover:rotate-45 transition-transform duration-300" />
              <span
                className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full"
                style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
              />
            </div>
            <div>
              <span className="font-heading font-semibold text-sm tracking-tight text-neutral-100 block">
                Interactive Lab
              </span>
              <span className="text-[11px] text-neutral-400 font-sans block">
                ห้องทดลองเชิงโต้ตอบ
              </span>
            </div>
          </Link>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation Categories */}
        <nav aria-label="Main Navigation" className="space-y-5">
          {categories.map(([categoryName, routes]) => (
            <div key={categoryName} className="space-y-1.5">
              <div className="flex items-center gap-2 px-2 pb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
                <Layers className="h-3 w-3" />
                <span>{categoryName}</span>
              </div>

              <div className="space-y-1">
                {routes.map((route) => {
                  const Icon = route.icon;
                  const isActive =
                    route.path === "/"
                      ? pathname === "/"
                      : pathname === route.path || pathname.startsWith(`${route.path}/`);

                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={onClose}
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all ${
                        isActive
                          ? "bg-neutral-900 text-neutral-100 border border-cyan-800/60 shadow-sm"
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 border border-transparent"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                          style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
                        />
                      )}

                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`h-4 w-4 flex-shrink-0 transition-colors ${
                            isActive
                              ? "text-cyan-400 stroke-[2]"
                              : "text-neutral-500 group-hover:text-neutral-300 stroke-[1.75]"
                          }`}
                        />
                        <div className="truncate text-left">
                          <span
                            className={`block truncate font-heading ${
                              isActive ? "font-semibold text-neutral-100" : "font-normal"
                            }`}
                          >
                            {route.label}
                          </span>
                          <span className="block text-[10px] text-neutral-500 font-sans truncate">
                            {route.thaiLabel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {route.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                              isActive
                                ? "bg-cyan-950/80 border border-cyan-700/80 text-cyan-300"
                                : "bg-neutral-850 border border-neutral-800 text-neutral-400"
                            }`}
                          >
                            {route.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`h-3 w-3 transition-transform ${
                            isActive
                              ? "text-cyan-400 translate-x-0.5"
                              : "text-neutral-600 group-hover:text-neutral-400"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Platform Status Footer */}
      <div className="pt-4 border-t border-neutral-800/80 space-y-2 font-mono text-[11px]">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-neutral-900/50 border border-neutral-850 text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Studio Engine</span>
          </span>
          <span className="text-neutral-500 text-[10px]">v1.1.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside aria-label="Desktop Sidebar" className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
          className="fixed inset-0 z-50 lg:hidden flex bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="w-72 max-w-[85vw] h-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
