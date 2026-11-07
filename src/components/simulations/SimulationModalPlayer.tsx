"use client";

import React, { useEffect, useCallback } from "react";
import { X, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import type { SimulationItem } from "@/lib/simulation-catalog";

interface SimulationModalPlayerProps {
  item: SimulationItem | null;
  embedUrl: string | null;
  onClose: () => void;
}

export function SimulationModalPlayer({
  item,
  embedUrl,
  onClose,
}: SimulationModalPlayerProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!item) return;

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is active
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, handleKeyDown]);

  if (!item || !embedUrl) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="simulation-modal-title"
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      {/* Modal Shell Container */}
      <div className="flex flex-col w-full h-full max-w-7xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-3 min-w-0">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <div className="min-w-0">
              <h2
                id="simulation-modal-title"
                className="text-sm sm:text-base font-heading font-medium text-neutral-100 truncate"
              >
                {item.thaiTitle}
              </h2>
              <span className="text-xs font-mono text-neutral-400 block truncate">
                {item.title} • {item.source}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-800 border border-neutral-700 hover:bg-neutral-750 text-neutral-200 transition-colors"
              title="เปิดในแท็บใหม่"
            >
              <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">เปิดแท็บใหม่</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-750 text-neutral-300 transition-colors hidden md:inline-flex"
              title={isFullscreen ? "ย่อขนาด" : "ขยายขนาด"}
              aria-label={isFullscreen ? "ย่อขนาด" : "ขยายขนาด"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
              aria-label="ปิดแบบจำลอง"
              title="ปิด (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Live Simulation Iframe Canvas */}
        <div className="flex-1 w-full relative bg-neutral-950">
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title={`${item.title} Simulation`}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400 font-sans">
          <span className="truncate max-w-2xl">{item.thaiDescription}</span>
          <span className="hidden sm:inline font-mono text-[11px] text-neutral-500">
            กด Esc เพื่อปิดแบบจำลอง
          </span>
        </div>
      </div>
    </div>
  );
}
