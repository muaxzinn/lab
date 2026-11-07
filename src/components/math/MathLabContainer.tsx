"use client";

import React, { useState } from "react";
import { Calculator, BookOpen, LineChart, Sparkles } from "lucide-react";
import { FormulaViewer } from "@/components/FormulaViewer";
import { LessonViewer } from "@/components/content/LessonViewer";

type MathTab = "graphing" | "lessons";

export function MathLabContainer() {
  const [activeTab, setActiveTab] = useState<MathTab>("graphing");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div role="tablist" aria-label="Mathematics Laboratory Modules" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "graphing"}
            onClick={() => setActiveTab("graphing")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "graphing"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <LineChart className="h-4 w-4 text-cyan-400" />
            <span>2D Cartesian Graphing Sandbox</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
              Mafs v0.21
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
          {activeTab === "graphing" ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-cyan-400">
              <Calculator className="h-3 w-3" />
              <span>Math.js AST Dynamic Evaluation</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-purple-400">
              <Sparkles className="h-3 w-3" />
              <span>Calculus & Riemann Derivations</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Tab View */}
      {activeTab === "graphing" && <FormulaViewer />}
      {activeTab === "lessons" && (
        <LessonViewer
          discipline="mathematics"
          onOpenLabAction={() => {
            setActiveTab("graphing");
          }}
        />
      )}
    </div>
  );
}
