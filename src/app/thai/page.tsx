import type { Metadata } from "next";
import { Languages, Sparkles, Activity } from "lucide-react";
import { ThaiStudioContainer } from "@/components/thai/ThaiStudioContainer";

export const metadata: Metadata = {
  title: "Thai Language Studio | Phonology Engine & Triyang Rules",
  description:
    "Interactive Thai syllable deconstructor with Triyang 3-consonant class analysis, 8 spelling sections, dead/live tones, dynamic SVG pitch contour plots, and morphology lessons.",
};

export default function ThaiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300">
            <Languages className="h-7 w-7 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-100">
                Thai Language Studio & Phonology
              </h1>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-800/80 text-emerald-300 font-medium">
                Linguistics & FEAT-01
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 font-sans mt-1 leading-relaxed">
              สตูดิอสัทศาสตร์ภาษาไทย: ถอดรหัสโครงสร้างพยางค์, วิเคราะห์อักษร 3 หมู่ (ไตรยางศ์), มาตราตัวสะกด 8 แม่ และบทเรียนคำสมาส-คำสนธิ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-300">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>3-Byte UTF-8 Safe</span>
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>5 Pitch Contours</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Thai Phonology Suite */}
      <ThaiStudioContainer />
    </div>
  );
}
