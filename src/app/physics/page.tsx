import type { Metadata } from "next";
import { Atom, Compass, Activity } from "lucide-react";
import { VerletSimulationCanvas } from "@/components/VerletSimulationCanvas";

export const metadata: Metadata = {
  title: "Physics Laboratory | Symplectic Orbital Mechanics & Kinematics",
  description:
    "Real-time 2-body Keplerian planetary orbit simulation comparing Velocity Verlet against Explicit Euler with real-time Hamiltonian energy conservation tracking.",
};

export default function PhysicsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300">
            <Atom className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-100">
                Physics Laboratory & Kinematics
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-300">
                FEAT-02 Simulation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              ห้องปฏิบัติการฟิสิกส์: การจำลองวงโคจรเคปเลอร์ 2 มิติ เปรียบเทียบ Velocity Verlet กับ Explicit Euler และตรวจวัดพลังงานฮามิลโทเนียน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>Symplectic ODE</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Hamiltonian Conserved</span>
          </span>
        </div>
      </div>

      {/* Main Physics Simulation Canvas */}
      <VerletSimulationCanvas />
    </div>
  );
}
