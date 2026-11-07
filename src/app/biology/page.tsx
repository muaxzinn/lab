import type { Metadata } from "next";
import { Dna, Layers, ShieldCheck } from "lucide-react";
import { BiologyLabContainer } from "@/components/biology/BiologyLabContainer";

export const metadata: Metadata = {
  title: "Cytology & Biology | Plant & Animal Cell Structure Visualizer",
  description:
    "Interactive eukaryotic plant and animal cell explorer with 3D WebGL cutaway cytology, 12 organelles, examination notes, and curriculum lessons.",
};

export default function BiologyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-800/80 text-purple-300">
            <Dna className="h-7 w-7 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-100">
                Cytology & Cellular Biology
              </h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-950 border border-purple-800/80 text-purple-300 font-medium">
                FEAT-07 & 3D WebGL
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-sans mt-1 leading-relaxed">
              ชีววิทยาของเซลล์: แบบจำลองเซลล์ 3D WebGL ผ่าครึ่ง, สำรวจออร์แกเนลล์ 12 ชนิดในเซลล์พืชและเซลล์สัตว์ และบทเรียนเจาะลึก
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-300">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Layers className="h-4 w-4 text-purple-400" />
            <span>3D Cutaway Cytology</span>
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>Plant & Animal Invariants</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Cell Suite */}
      <BiologyLabContainer />
    </div>
  );
}
