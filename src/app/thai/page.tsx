import type { Metadata } from "next";
import { Languages, Sparkles, Activity } from "lucide-react";
import { ThaiPhonologyVisualizer } from "@/components/ThaiPhonologyVisualizer";

export const metadata: Metadata = {
  title: "Thai Language Studio | Phonology Engine & Triyang Rules",
  description:
    "Interactive Thai syllable deconstructor with Triyang 3-consonant class analysis, 8 spelling sections, dead/live tones, and dynamic SVG pitch contour trajectory plots.",
};

export default function ThaiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300">
            <Languages className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-100">
                Thai Language Studio & Phonology
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/80 text-emerald-300">
                Linguistics Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              สตูดิอสัทศาสตร์ภาษาไทย: ถอดรหัสโครงสร้างพยางค์, วิเคราะห์อักษร 3 หมู่ (ไตรยางศ์), มาตราตัวสะกด 8 แม่ และเส้นเสียงวรรณยุกต์แบบ SVG
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>3-Byte UTF-8 Safe</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span>5 Pitch Contours</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Thai Phonology Visualizer */}
      <ThaiPhonologyVisualizer />
    </div>
  );
}
