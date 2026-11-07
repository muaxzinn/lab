"use client";

import React, { useState } from "react";
import { Atom, Scale, Sparkles, ShieldCheck, Boxes, BookOpen } from "lucide-react";
import { PeriodicTableViewer } from "./PeriodicTableViewer";
import { ChemicalReactionViewer } from "./ChemicalReactionViewer";
import { MolecularViewer3D } from "@/components/3d/MolecularViewer3D";
import { LessonViewer } from "@/components/content/LessonViewer";

type ChemistryTab = "molecules3d" | "lessons" | "reactions" | "periodic";

export function ChemistryLabContainer() {
  const [activeTab, setActiveTab] = useState<ChemistryTab>("molecules3d");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div role="tablist" aria-label="Chemistry Laboratory Modules" className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "molecules3d"}
            onClick={() => setActiveTab("molecules3d")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "molecules3d"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Boxes className="h-4 w-4 text-cyan-400" />
            <span>3D Molecular Lab (WebGL)</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
              Three.js
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "lessons"}
            onClick={() => setActiveTab("lessons")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "lessons"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <BookOpen className="h-4 w-4 text-purple-400" />
            <span>Interactive Lessons (FEAT-01)</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
              Curriculum
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "reactions"}
            onClick={() => setActiveTab("reactions")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "reactions"
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Scale className="h-4 w-4 text-orange-400" />
            <span>Chemical Balancer & Stoichiometry</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "periodic"}
            onClick={() => setActiveTab("periodic")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "periodic"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Atom className="h-4 w-4 text-amber-400" />
            <span>IUPAC Periodic Table (118)</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400 pr-2">
          {activeTab === "molecules3d" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-cyan-400">
              <Boxes className="h-3 w-3" />
              <span>Ball & Stick / Space-Filling vdW</span>
            </span>
          )}
          {activeTab === "lessons" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-purple-400">
              <BookOpen className="h-3 w-3" />
              <span>Orbitals & VSEPR Step-by-Step</span>
            </span>
          )}
          {activeTab === "reactions" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-orange-400">
              <ShieldCheck className="h-3 w-3" />
              <span>Mass & Atom Conservation</span>
            </span>
          )}
          {activeTab === "periodic" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-amber-400">
              <Sparkles className="h-3 w-3" />
              <span>Bohr Orbitals & Heatmap</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === "molecules3d" && <MolecularViewer3D />}
      {activeTab === "lessons" && (
        <LessonViewer
          discipline="chemistry"
          onOpenLabAction={(lessonId) => {
            if (
              lessonId.includes("vsepr") ||
              lessonId.includes("orbital") ||
              lessonId.includes("organic") ||
              lessonId.includes("biomolecule")
            ) {
              setActiveTab("molecules3d");
            } else if (
              lessonId.includes("equilibrium") ||
              lessonId.includes("stoichiometry") ||
              lessonId.includes("reaction")
            ) {
              setActiveTab("reactions");
            } else {
              setActiveTab("periodic");
            }
          }}
        />
      )}
      {activeTab === "reactions" && <ChemicalReactionViewer />}
      {activeTab === "periodic" && <PeriodicTableViewer />}
    </div>
  );
}
