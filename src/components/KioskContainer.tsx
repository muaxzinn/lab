"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Maximize2,
  Minimize2,
  Lock,
  Unlock,
  Monitor,
  Smartphone,
} from "lucide-react";

export interface KioskContainerProps {
  children: React.ReactNode;
  showTopBar?: boolean;
}

export function KioskContainer({ children, showTopBar = true }: KioskContainerProps) {
  const [isKioskLocked, setIsKioskLocked] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [viewportDims, setViewportDims] = useState<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Track viewport bounds
  useEffect(() => {
    const updateDimensions = () => {
      setViewportDims({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Detect Standalone PWA mode
  useEffect(() => {
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isPWA);
  }, []);

  // Track Fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Popstate Navigation Trapping (Kiosk Lockdown)
  useEffect(() => {
    if (!isKioskLocked) return;

    // Push state into history to trap back gestures on touchscreens
    window.history.pushState({ kioskTrapped: true }, "", window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      // Re-trap navigation back to prevent leaving kiosk page
      window.history.pushState({ kioskTrapped: true }, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isKioskLocked]);

  // Toggle Fullscreen API
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch {
      // User cancelled or browser rejected fullscreen
    }
  }, []);

  return (
    <div
      className={`relative min-h-screen transition-all select-none ${
        isKioskLocked
          ? "overflow-x-hidden touch-pan-x touch-pan-y [overscroll-behavior:none]"
          : ""
      }`}
    >
      {/* Top Kiosk Control Bar */}
      {showTopBar && (
        <div className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: isKioskLocked
                      ? "linear-gradient(135deg, #2ef2a0, #00f0ff)"
                      : "#64748b",
                  }}
                />
                <span className="text-neutral-300 font-medium">
                  {isKioskLocked ? "Kiosk Lockdown: ACTIVE" : "Kiosk Lockdown: BYPASS"}
                </span>
              </div>

              <span className="text-neutral-600 hidden sm:inline">|</span>

              <div className="hidden sm:flex items-center gap-2 text-neutral-400">
                {isStandalone ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Smartphone className="h-3.5 w-3.5" /> PWA Standalone
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-neutral-400">
                    <Monitor className="h-3.5 w-3.5" /> Browser Viewport
                  </span>
                )}
              </div>

              <span className="text-neutral-600 hidden md:inline">|</span>

              <div className="hidden md:flex items-center gap-2 text-neutral-500">
                <span>
                  {viewportDims.width} × {viewportDims.height}
                </span>
                <span>•</span>
                <span>DPR: {viewportDims.dpr.toFixed(1)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsKioskLocked(!isKioskLocked)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                  isKioskLocked
                    ? "bg-neutral-900 border border-neutral-700 text-neutral-300 hover:bg-neutral-850"
                    : "bg-amber-950/50 border border-amber-700/60 text-amber-300 hover:bg-amber-900/60"
                }`}
              >
                {isKioskLocked ? (
                  <>
                    <Lock className="h-3 w-3 text-emerald-400" />
                    <span>Lockdown On</span>
                  </>
                ) : (
                  <>
                    <Unlock className="h-3 w-3 text-amber-400" />
                    <span>Lockdown Off</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 hover:bg-neutral-850 text-neutral-300 transition-colors"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-3 w-3 text-cyan-400" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3 w-3 text-cyan-400" />
                    <span>Fullscreen Kiosk</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Enclosed Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
