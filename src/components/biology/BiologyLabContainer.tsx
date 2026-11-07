"use client";

import React, { useState } from "react";
import { Dna, Layers, BookOpen, Sparkles } from "lucide-react";
import { CellStructureViewer } from "./CellStructureViewer";
import { CellViewer3D } from "@/components/3d/CellViewer3D";
import { LessonViewer } from "@/components/content/LessonViewer";

type BiologyTab = "cell3d" | "lessons" | "organelles";

export function BiologyLabContainer() {
  const [activeTab, setActiveTab] = useState<BiologyTab>("cell3d");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div role="tablist" aria-label="Biology Laboratory Modules" className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "cell3d"}
            onClick={() => setActiveTab("cell3d")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "cell3d"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Dna className="h-4 w-4 text-purple-400" />
            <span>3D Cutaway Cytology (WebGL)</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
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
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>Interactive Lessons (FEAT-01)</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
              Curriculum
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "organelles"}
            onClick={() => setActiveTab("organelles")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "organelles"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>12 Organelle Matrix & 2D Slices</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400 pr-2">
          {activeTab === "cell3d" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-purple-400">
              <Dna className="h-3 w-3" />
              <span>Plant & Animal 3D Raycasting</span>
            </span>
          )}
          {activeTab === "lessons" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-emerald-400">
              <BookOpen className="h-3 w-3" />
              <span>Endomembrane & Central Dogma</span>
            </span>
          )}
          {activeTab === "organelles" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-cyan-400">
              <Sparkles className="h-3 w-3" />
              <span>Cytology Cross-Section Mode</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === "cell3d" && <CellViewer3D />}
      {activeTab === "lessons" && (
        <LessonViewer
          discipline="biology"
          onOpenLabAction={(lessonId) => {
            if (
              lessonId.includes("organelle") ||
              lessonId.includes("membrane") ||
              lessonId.includes("energetics") ||
              lessonId.includes("atp")
            ) {
              setActiveTab("cell3d");
            } else {
              setActiveTab("organelles");
            }
          }}
        />
      )}
      {activeTab === "organelles" && <CellStructureViewer />}
    </div>
  );
}
