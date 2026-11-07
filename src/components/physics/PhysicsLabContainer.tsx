"use client";

import React, { useState } from "react";
import { Zap, Orbit, Compass, ShieldCheck } from "lucide-react";
import { CircuitSimulator } from "./CircuitSimulator";
import { VerletSimulationCanvas } from "@/components/VerletSimulationCanvas";

export function PhysicsLabContainer() {
  const [activeTab, setActiveTab] = useState<"circuits" | "orbits">("circuits");

  return (
    <div className="space-y-6">
      {/* Module Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-xl bg-neutral-900/80 border border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("circuits")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "circuits"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Zap className="h-4 w-4 text-emerald-400" />
            <span>DC Circuit Simulator (FEAT-04)</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
              MNA Solver
            </span>
          </button>

          <button
            onClick={() => setActiveTab("orbits")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              activeTab === "orbits"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            <Orbit className="h-4 w-4 text-cyan-400" />
            <span>Keplerian Orbital Mechanics</span>
            <span className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
              Velocity Verlet
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 pr-2">
          {activeTab === "circuits" ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-emerald-400">
              <ShieldCheck className="h-3 w-3" />
              <span>Kirchhoff KVL & KCL Verified</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-cyan-400">
              <Compass className="h-3 w-3" />
              <span>Symplectic Sym(2) Hamiltonian</span>
            </span>
          )}
        </div>
      </div>

      {/* Active Laboratory View */}
      {activeTab === "circuits" ? (
        <CircuitSimulator />
      ) : (
        <VerletSimulationCanvas />
      )}
    </div>
  );
}
