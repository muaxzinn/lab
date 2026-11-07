import type { Metadata } from "next";
import { BookOpen, CheckCircle2, Award } from "lucide-react";
import { ExerciseEngine } from "@/components/exercises/ExerciseEngine";

export const metadata: Metadata = {
  title: "Universal Practice Engine | Multi-Subject Exercises & Adaptive Quizzing",
  description:
    "Curriculum question bank across Mathematics, Physics, Chemistry, Biology, and Thai with instant auto-grading, step-by-step solution breakdowns, and streak tracking.",
};

export default function PracticePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Laboratory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-800">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/80 text-purple-300">
            <BookOpen className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-100">
                Universal Practice & Exercise Engine
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-800/80 text-purple-300">
                FEAT-21 Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5">
              ระบบฝึกฝนและทำโจทย์: คลังข้อสอบครอบคลุม 5 หมวดวิชา, ตรวจคำตอบอัตโนมัติ 4 รูปแบบ (ปรนัย, หลายตัวเลือก, เติมคำ, คำนวณตัวเลข) พร้อมเฉลยละเอียด
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
            <span>Instant Auto-Grading</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800">
            <Award className="h-3.5 w-3.5 text-cyan-400" />
            <span>Streak & Analytics</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Exercise Engine */}
      <ExerciseEngine />
    </div>
  );
}
