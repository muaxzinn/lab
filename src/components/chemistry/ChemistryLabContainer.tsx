"use client";

import React, { useState } from "react";
import { Atom, Scale, Sparkles, ShieldCheck } from "lucide-react";
import { PeriodicTableViewer } from "./PeriodicTableViewer";
import { ChemicalReactionViewer } from "./ChemicalReactionViewer";

export function ChemistryLabContainer() {
  const [activeTab, setActiveTab] = useState<"periodic" | "reactions">("reactions");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("reactions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "reactions"
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Scale className="h-4 w-4 text-orange-400" />
            <span>Chemical Equation Balancer & Stoichiometry</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-950 border border-orange-800 text-orange-300">
              FEAT-06 & 11
            </span>
          </button>

          <button
            onClick={() => setActiveTab("periodic")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "periodic"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Atom className="h-4 w-4 text-amber-400" />
            <span>IUPAC Periodic Table (118 Elements)</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
              FEAT-05
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 pr-2">
          {activeTab === "reactions" ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-orange-400">
              <ShieldCheck className="h-3 w-3" />
              <span>Mass & Atom Conservation Verified</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-amber-400">
              <Sparkles className="h-3 w-3" />
              <span>Bohr Orbitals & Heatmap</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === "reactions" ? (
        <ChemicalReactionViewer />
      ) : (
        <PeriodicTableViewer />
      )}
    </div>
  );
}
