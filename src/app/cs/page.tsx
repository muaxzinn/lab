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
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-300">
            <Binary className="h-7 w-7 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-100">
                Computer Science Laboratory & Digital Logic
              </h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-800/80 text-cyan-300 font-medium">
                FEAT-19 & FEAT-01
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-sans mt-1 leading-relaxed">
              ห้องปฏิบัติการวิทยาการคอมพิวเตอร์: แซนด์บ็อกซ์เกตตรรกะดิจิทัล วงจรบวกเลขฐานสอง ตารางค่าความจริง และบทเรียนตรรกศาสตร์
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-300">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>Topological Propagation</span>
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Auto Truth Table</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Logic Gate Sandbox */}
      <CSLabContainer />
    </div>
  );
}
