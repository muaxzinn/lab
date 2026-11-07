import type { Metadata } from "next";
import { Binary, Cpu, Sparkles } from "lucide-react";
import { CSLabContainer } from "@/components/cs/CSLabContainer";

export const metadata: Metadata = {
  title: "Computer Science Laboratory | Logic Gates & Boolean Digital Sandbox",
  description:
    "Interactive digital logic circuit simulator featuring AND, OR, NOT, XOR, NAND, NOR gates, live signal propagation, automated truth tables, and curriculum lessons.",
};

export default function ComputerSciencePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-300">
            <Binary className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-100">
                Computer Science Laboratory & Digital Logic
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/80 text-cyan-300">
                FEAT-19 & FEAT-01
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              ห้องปฏิบัติการวิทยาการคอมพิวเตอร์: แซนด์บ็อกซ์เกตตรรกะดิจิทัล วงจรบวกเลขฐานสอง ตารางค่าความจริง และบทเรียนตรรกศาสตร์
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>Topological Propagation</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Auto Truth Table</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Logic Gate Sandbox */}
      <CSLabContainer />
    </div>
  );
}
