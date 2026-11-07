"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";

export function OfflineStatusBanner() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showReconnected, setShowReconnected] = useState<boolean>(false);
  const [swRegistered, setSwRegistered] = useState<boolean>(false);

  useEffect(() => {
    // Check initial online status in browser
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
    }

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Register Service Worker in browser environment
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = async () => {
        try {
          const reg = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });
          setSwRegistered(true);

          // Check for service worker updates
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  // New update is available in background
                }
              });
            }
          });
        } catch {
          // SW registration failed or unsupported in sandbox environment
        }
      };

      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
        return () => {
          window.removeEventListener("load", registerSW);
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        };
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show reconnected toast
  if (showReconnected) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="w-full bg-emerald-950/80 border-b border-emerald-700/60 text-emerald-200 px-4 py-2 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, #2ef2a0, #00f0ff)",
              }}
            />
            <Wifi className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium text-emerald-300 font-sans">
              กลับมาเชื่อมต่อเครือข่ายแล้ว — ระบบอัปเดตข้อมูลแบบเรียลไทม์ (Network connection restored)
            </span>
          </div>
          <span className="hidden sm:inline-block text-emerald-400/80 text-[11px]">
            ONLINE SYNC ACTIVE
          </span>
        </div>
      </aside>
    );
  }

  // Show offline alert banner
  if (!isOnline) {
    return (
      <aside
        role="alert"
        aria-live="assertive"
        className="w-full bg-amber-950/90 border-b border-amber-600/60 text-amber-100 px-4 py-2.5 transition-all duration-300 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
            <WifiOff className="h-4 w-4 text-amber-400 shrink-0" />
            <div className="font-sans">
              <span className="font-semibold text-amber-200">
                โหมดออฟไลน์: ใช้งานผ่าน Service Worker Cache
              </span>
              <span className="text-amber-300/80 ml-1.5 hidden md:inline">
                (คุณสามารถใช้งาน 8 โมดูลและการจำลองวิทยาศาสตร์ที่บันทึกไว้ในแคชได้ตามปกติ)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-amber-900/60 border border-amber-700/60 text-amber-300 uppercase tracking-wider">
              {swRegistered ? "SW CACHE READY" : "OFFLINE MODE"}
            </span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.reload();
                }
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700/80 transition"
              aria-label="ลองเชื่อมต่อเครือข่ายอีกครั้ง"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return null;
}
