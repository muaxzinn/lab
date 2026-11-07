import type { Metadata } from "next";
import { FlaskConical, Scale, Sparkles } from "lucide-react";
import { ChemistryLabContainer } from "@/components/chemistry/ChemistryLabContainer";

export const metadata: Metadata = {
  title: "Chemistry Workstation | IUPAC Periodic Table & Chemical Stoichiometry",
  description:
    "Interactive chemistry workstation featuring exact Gauss-Jordan chemical equation balancer, stoichiometry particle calculator, and IUPAC 118-element periodic table.",
};

export default function ChemistryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-orange-950/60 border border-orange-800/80 text-orange-300">
            <FlaskConical className="h-7 w-7 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-100">
                Chemistry Workstation & Reaction Suite
              </h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-orange-950 border border-orange-800/80 text-orange-300 font-medium">
                FEAT-05 & FEAT-06
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-sans mt-1 leading-relaxed">
              สถานีปฏิบัติการเคมี: ดุลสมการเคมีด้วยเมทริกซ์และคำนวณปริมาณสารสัมพันธ์ พร้อมตารางธาตุมาตรฐาน IUPAC 118 ธาตุ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-300">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Scale className="h-4 w-4 text-orange-400" />
            <span>Exact Stoichiometry</span>
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Mass Conserved</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Chemistry Suite */}
      <ChemistryLabContainer />
    </div>
  );
}
