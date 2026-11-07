"use client";

import React, { useState } from "react";
import { Zap, Orbit, Compass, ShieldCheck, Telescope, BookOpen } from "lucide-react";
import { CircuitSimulator } from "./CircuitSimulator";
import { VerletSimulationCanvas } from "@/components/VerletSimulationCanvas";
import { SolarSystemViewer3D } from "@/components/3d/SolarSystemViewer3D";
import { LessonViewer } from "@/components/content/LessonViewer";

type PhysicsTab = "circuits" | "orbits" | "solar3d" | "lessons";

export function PhysicsLabContainer() {
  const [activeTab, setActiveTab] = useState<PhysicsTab>("solar3d");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div role="tablist" aria-label="Physics Laboratory Modules" className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "solar3d"}
            onClick={() => setActiveTab("solar3d")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "solar3d"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Telescope className="h-4 w-4 text-cyan-400" />
            <span>3D Solar System (WebGL)</span>
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
            aria-selected={activeTab === "circuits"}
            onClick={() => setActiveTab("circuits")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "circuits"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Zap className="h-4 w-4 text-emerald-400" />
            <span>DC Circuit Simulator</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
              MNA Solver
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "orbits"}
            onClick={() => setActiveTab("orbits")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "orbits"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Orbit className="h-4 w-4 text-blue-400" />
            <span>Verlet 2-Body Kinematics</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400 pr-2">
          {activeTab === "solar3d" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-cyan-400">
              <Compass className="h-3 w-3" />
              <span>Heliocentric Orbital Ephemeris</span>
            </span>
          )}
          {activeTab === "lessons" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-purple-400">
              <BookOpen className="h-3 w-3" />
              <span>Deep KaTeX Step-by-Step</span>
            </span>
          )}
          {activeTab === "circuits" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-emerald-400">
              <ShieldCheck className="h-3 w-3" />
              <span>Kirchhoff KVL & KCL Verified</span>
            </span>
          )}
          {activeTab === "orbits" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-blue-400">
              <Compass className="h-3 w-3" />
              <span>Symplectic Sym(2) Hamiltonian</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Laboratory View */}
      {activeTab === "solar3d" && <SolarSystemViewer3D />}
      {activeTab === "lessons" && (
        <LessonViewer
          discipline="physics"
          onOpenLabAction={(lessonId) => {
            if (lessonId.includes("orbit") || lessonId.includes("newton")) setActiveTab("solar3d");
            else if (lessonId.includes("circuit") || lessonId.includes("kirchhoff")) setActiveTab("circuits");
            else setActiveTab("orbits");
          }}
        />
      )}
      {activeTab === "circuits" && <CircuitSimulator />}
      {activeTab === "orbits" && <VerletSimulationCanvas />}
    </div>
  );
}
