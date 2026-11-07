import type { Metadata } from "next";
import { Atom, Activity, Zap } from "lucide-react";
import { PhysicsLabContainer } from "@/components/physics/PhysicsLabContainer";

export const metadata: Metadata = {
  title: "Physics Laboratory | DC Circuit Simulator & Symplectic Mechanics",
  description:
    "Interactive physics simulation suite featuring Modified Nodal Analysis (MNA) DC circuit solver, Ohm's law, and 2-body Keplerian planetary orbit Velocity Verlet integrator.",
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
                Physics Laboratory & Simulation Suite
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-300">
                FEAT-04 & FEAT-02
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              ห้องปฏิบัติการฟิสิกส์: วงจรไฟฟ้ากระแสตรง (MNA Solver) และแบบจำลองวงโคจรเคปเลอร์ (Velocity Verlet) พร้อมตรวจวัดอนุรักษ์พลังงาน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>MNA Linear Solver</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>Energy Conserved</span>
          </span>
        </div>
      </div>

      {/* Main Physics Suite Container */}
      <PhysicsLabContainer />
    </div>
  );
}
