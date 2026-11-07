"use client";

import React, { useState } from "react";
import { Languages, BookOpen, Sparkles, Activity } from "lucide-react";
import { ThaiPhonologyVisualizer } from "@/components/ThaiPhonologyVisualizer";
import { LessonViewer } from "@/components/content/LessonViewer";

type ThaiTab = "phonology" | "lessons";

export function ThaiStudioContainer() {
  const [activeTab, setActiveTab] = useState<ThaiTab>("phonology");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div role="tablist" aria-label="Thai Language Modules" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "phonology"}
            onClick={() => setActiveTab("phonology")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "phonology"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Languages className="h-4 w-4 text-emerald-400" />
            <span>Syllable Deconstructor & Pitch Trajectories</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
              Triyang
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
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 pr-2">
          {activeTab === "phonology" ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-emerald-400">
              <Activity className="h-3 w-3" />
              <span>3-Byte UTF-8 Safe Thai Phonology</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-purple-400">
              <Sparkles className="h-3 w-3" />
              <span>Triyang & Kam Samas/Sondhi Rules</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === "phonology" && <ThaiPhonologyVisualizer />}
      {activeTab === "lessons" && <LessonViewer discipline="thai" />}
    </div>
  );
}
