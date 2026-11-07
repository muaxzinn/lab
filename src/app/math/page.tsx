import type { Metadata } from "next";
import { Calculator, Sparkles, Activity } from "lucide-react";
import { MathLabContainer } from "@/components/math/MathLabContainer";

export const metadata: Metadata = {
  title: "Interactive Mathematics | Mafs 2D & Formula Sandbox",
  description:
    "Interactive 2D Cartesian function plotting with Mafs, LaTeX formula typesetting with KaTeX, and deep calculus curriculum lessons.",
};

export default function MathPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-300">
            <Calculator className="h-7 w-7 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-100">
                Mathematics & Dynamic Modeling
              </h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-800/80 text-cyan-300 font-medium">
                FEAT-01 & Mafs 2D
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-sans mt-1 leading-relaxed">
              ห้องปฏิบัติการคณิตศาสตร์: กราฟฟังก์ชัน 2 มิติด้วย Mafs, แสดงสมการ LaTeX ด้วย KaTeX และบทเรียนแคลคูลัสแบบโต้ตอบ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-300">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Mafs v0.21.0</span>
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>Math.js AST Sandbox</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Mathematics Sandbox */}
      <MathLabContainer />
    </div>
  );
}
