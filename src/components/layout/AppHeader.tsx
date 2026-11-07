"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  Maximize2,
  Minimize2,
  Search,
  X,
  Menu,
  Sparkles,
  Command,
} from "lucide-react";
import { getBreadcrumbs, getNavRouteByPath, searchNavRoutes, type NavRoute } from "./nav-data";

interface AppHeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export function AppHeader({ onToggleMobileMenu, isMobileMenuOpen = false }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);
  const currentRoute = useMemo(() => getNavRouteByPath(pathname), [pathname]);
  const searchResults = useMemo(() => searchNavRoutes(searchQuery), [searchQuery]);

  // Track Fullscreen state with WebKit vendor prefix support
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Toggle Fullscreen with WebKit vendor prefix support
  const toggleFullscreen = useCallback(async () => {
    try {
      const doc = document as Document & {
        webkitFullscreenElement?: Element;
        webkitExitFullscreen?: () => Promise<void>;
      };
      const docEl = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      };

      const isFs = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
      if (!isFs) {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      }
    } catch {
      // User cancelled or browser rejected
    }
  }, []);

  const handleSelectRoute = useCallback(
    (route: NavRoute) => {
      setIsSearchOpen(false);
      setSearchQuery("");
      router.push(route.path);
    },
    [router]
  );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/85 backdrop-blur-md">
        <div className="flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6">
          {/* Left: Mobile Menu Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-850 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[2]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[2]" />
              )}
            </button>

            {/* Breadcrumb Trail with enhanced tablet sizing */}
            <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-sm font-mono">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.path}>
                    {idx > 0 && (
                      <ChevronRight className="h-4 w-4 text-neutral-600 shrink-0" />
                    )}
                    {isLast ? (
                      <span className="font-semibold text-neutral-200 flex items-center gap-1.5 truncate max-w-[160px] sm:max-w-[280px]">
                        <span className="truncate">{crumb.label}</span>
                        <span className="hidden sm:inline text-neutral-500 font-normal">
                          ({crumb.thaiLabel})
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="text-neutral-400 hover:text-cyan-400 transition-colors truncate max-w-[120px]"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Right: Active Subject Badge, Quick Search, Fullscreen Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Subject Indicator */}
            {currentRoute && (
              <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-neutral-900/80 border border-neutral-800">
                <span
                  className="h-2 w-2 rounded-full shrink-0 animate-pulse"
                  style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
                />
                <span className="text-neutral-300 font-medium">{currentRoute.label}</span>
                {currentRoute.badge && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-cyan-300">
                    {currentRoute.badge}
                  </span>
                )}
              </div>
            )}

            {/* Quick Navigation Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search navigation"
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all text-xs sm:text-sm font-mono min-h-[44px]"
            >
              <Search className="h-4 w-4 text-cyan-400" />
              <span className="hidden sm:inline">Search Labs...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[11px] text-neutral-400">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>

            {/* Fullscreen Kiosk Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Kiosk"}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-cyan-300 hover:border-cyan-800/80 transition-all text-xs font-mono"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Fullscreen Kiosk</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Quick Search Modal / Overlay */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick Navigation Search"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-neutral-700 bg-neutral-900 p-4 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 focus-within:border-cyan-500/80 transition-colors">
              <Search className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                aria-label="Search laboratories or modules"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    e.preventDefault();
                    handleSelectRoute(searchResults[0]);
                  }
                }}
                placeholder="ค้นหาห้องทดลอง วิชา หรือสมการ (e.g. math, vercel, periodic, cell)..."
                autoFocus
                className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 outline-none font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search input"
                  className="p-1 rounded text-neutral-500 hover:text-neutral-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-neutral-500">
                  No laboratories or modules match &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                searchResults.map((route) => {
                  const Icon = route.icon;
                  const isCurrent = route.path === pathname;
                  return (
                    <button
                      key={route.path}
                      type="button"
                      onClick={() => handleSelectRoute(route)}
                      className={`w-full text-left p-3 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                        isCurrent
                          ? "bg-cyan-950/40 border border-cyan-800/60 text-cyan-200"
                          : "hover:bg-neutral-800/80 text-neutral-200 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${
                            isCurrent
                              ? "bg-cyan-900/60 text-cyan-300"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-heading font-semibold text-neutral-100 truncate">
                              {route.label}
                            </span>
                            <span className="text-[11px] font-sans text-neutral-400 truncate">
                              {route.thaiLabel}
                            </span>
                          </div>
                          <p className="text-[11px] font-sans text-neutral-400 truncate mt-0.5">
                            {route.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 font-mono text-[10px]">
                        {route.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-cyan-300">
                            {route.badge}
                          </span>
                        )}
                        <ChevronRight className="h-3.5 w-3.5 text-neutral-500" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>Multi-Route Educational Architecture</span>
              </span>
              <span>7 Interactive Modules</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
