"use client";

import React, { useState } from "react";
import { KioskContainer } from "@/components/KioskContainer";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";
import { OfflineStatusBanner } from "./OfflineStatusBanner";

interface KioskShellProps {
  children: React.ReactNode;
}

export function KioskShell({ children }: KioskShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <KioskContainer showTopBar={false}>
      {/* Skip to Main Content Link for WCAG 2.1 AA Bypass Blocks */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-neutral-950 focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
      >
        ข้ามไปยังเนื้อหาหลัก (Skip to main content)
      </a>

      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-neutral-800 selection:text-neutral-200">
        <div className="flex flex-1 min-h-screen">
          {/* Desktop Persistent Sidebar + Mobile Drawer */}
          <AppSidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Main App Canvas */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            {/* Top Unified Header */}
            <AppHeader
              isMobileMenuOpen={isMobileMenuOpen}
              onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            />

            {/* Offline Detection Banner */}
            <OfflineStatusBanner />

            {/* Content Area with responsive padding */}
            <main id="main-content" tabIndex={-1} className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 outline-none">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile/Touch Kiosk Bottom Navbar */}
        <AppNavbar />
      </div>
    </KioskContainer>
  );
}
