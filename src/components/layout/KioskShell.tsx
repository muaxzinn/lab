"use client";

import React, { useState } from "react";
import { KioskContainer } from "@/components/KioskContainer";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";

interface KioskShellProps {
  children: React.ReactNode;
}

export function KioskShell({ children }: KioskShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <KioskContainer showTopBar={false}>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col [overscroll-behavior:none] selection:bg-neutral-800 selection:text-neutral-200">
        <div className="flex flex-1 min-h-screen">
          {/* Desktop Persistent Sidebar + Mobile Drawer */}
          <AppSidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Main App Canvas */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Unified Header */}
            <AppHeader
              isMobileMenuOpen={isMobileMenuOpen}
              onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            />

            {/* Content Area with bottom padding for mobile navbar */}
            <main className="flex-1 pb-20 lg:pb-10">
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
