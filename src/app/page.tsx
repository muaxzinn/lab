"use client";

import React, { useState } from "react";
import {
  Atom,
  FlaskConical,
  Dna,
  Binary,
  Compass,
  BookOpen,
  Layers,
  Award,
  Activity,
  CheckCircle2,
  Globe2,
  Languages,
  Telescope,
  Calculator,
  Microscope,
  Check,
  ChevronRight,
  ShieldCheck,
  Boxes,
  Sparkles,
  FileText,
  GitBranch,
  Terminal,
} from "lucide-react";
import { safeTruncateThaiBytes, safeTruncateThaiGraphemes } from "@/lib/utils";
import { FormulaViewer } from "@/components/FormulaViewer";
import { VerletSimulationCanvas } from "@/components/VerletSimulationCanvas";
import { ThaiPhonologyVisualizer } from "@/components/ThaiPhonologyVisualizer";
import { PeriodicTableViewer } from "@/components/chemistry/PeriodicTableViewer";
import { CellStructureViewer } from "@/components/biology/CellStructureViewer";
import { ExerciseEngine } from "@/components/exercises/ExerciseEngine";
import { KioskContainer } from "@/components/KioskContainer";

type ActiveTab = "overview" | "math-physics" | "chem-bio" | "thai" | "exercises";
type MathPhysicsSubTab = "math" | "physics";
type ChemBioSubTab = "periodic-table" | "cell-structure";

const FEATURE_MODULES = [
  {
    id: "FEAT-01",
    name: "Interactive Learning Content",
    thaiName: "สื่อการเรียนรู้แบบโต้ตอบ",
    icon: BookOpen,
    description: "Step-by-step interactive lessons, concept maps, and expandable explanations.",
    status: "PHASE 5-6 READY",
  },
  {
    id: "FEAT-02",
    name: "Scientific Simulations",
    thaiName: "ระบบจำลองทางวิทยาศาสตร์",
    icon: Atom,
    description: "Real-time physics, chemistry, and biology physics engines with dynamic variables.",
    status: "PHASE 5-6 READY",
  },
  {
    id: "FEAT-03",
    name: "Virtual Laboratory",
    thaiName: "ห้องปฏิบัติการเสมือนจริง",
    icon: FlaskConical,
    description: "Workbench for experiments, apparatus selection, observation logs, and safety guides.",
    status: "SPECIFIED",
  },
  {
    id: "FEAT-04",
    name: "2D / 3D Visualization",
    thaiName: "แบบจำลองภาพ 2 มิติและ 3 มิติ",
    icon: Boxes,
    description: "WebGL molecular and anatomical structures with orbit, slice, and layer controls.",
    status: "SPECIFIED",
  },
  {
    id: "FEAT-05",
    name: "Interactive Periodic Table & Trends",
    thaiName: "ตารางธาตุและแนวโน้มทางเคมี",
    icon: Atom,
    description: "IUPAC 118 elements with electron configuration shells, atomic mass, and electronegativity.",
    status: "PHASE 7 INTEGRATED",
  },
  {
    id: "FEAT-06",
    name: "Educational Demonstrations",
    thaiName: "ระบบสาธิตหลักการศึกษา",
    icon: Layers,
    description: "Animated process walkthroughs, algorithmic sorting, and state transitions.",
    status: "SPECIFIED",
  },
  {
    id: "FEAT-07",
    name: "Cell Structure & Organelle Inspector",
    thaiName: "โครงสร้างเซลล์และออร์แกเนลล์",
    icon: Dna,
    description: "Plant and animal eukaryotic cells with cross-section clipping and biochemical function popovers.",
    status: "PHASE 7 INTEGRATED",
  },
  {
    id: "FEAT-08",
    name: "Assessment & Examination",
    thaiName: "ระบบการทดสอบและประเมินผล",
    icon: Award,
    description: "Timed exams, randomized test banks, automated grading, and score analytics.",
    status: "SPECIFIED",
  },
  {
    id: "FEAT-09",
    name: "Learning Progress Tracking",
    thaiName: "การติดตามความก้าวหน้าการเรียนรู้",
    icon: CheckCircle2,
    description: "Comprehensive student analytics, skill radar, and curriculum mastery matrices.",
    status: "SPECIFIED",
  },
  {
    id: "FEAT-21",
    name: "Universal Practice & Exercise Engine",
    thaiName: "ระบบแบบฝึกหัดและการฝึกฝน",
    icon: Activity,
    description: "Multi-subject curriculum question engine with instant grading, hint reveal, and KaTeX formulas.",
    status: "PHASE 7 INTEGRATED",
  },
];

const SUBJECTS = [
  { name: "Physics", thaiName: "ฟิสิกส์", icon: Atom },
  { name: "Chemistry", thaiName: "เคมี", icon: FlaskConical },
  { name: "Biology", thaiName: "ชีววิทยา", icon: Dna },
  { name: "Mathematics", thaiName: "คณิตศาสตร์", icon: Calculator },
  { name: "General Science", thaiName: "วิทยาศาสตร์ทั่วไป", icon: Microscope },
  { name: "Astronomy", thaiName: "ดาราศาสตร์", icon: Telescope },
  { name: "Computer Science", thaiName: "วิทยาการคอมพิวเตอร์", icon: Binary },
  { name: "English", thaiName: "ภาษาอังกฤษ", icon: Globe2 },
  { name: "Thai Language", thaiName: "ภาษาไทย", icon: Languages },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [mathPhysicsSubTab, setMathPhysicsSubTab] = useState<MathPhysicsSubTab>("math");
  const [chemBioSubTab, setChemBioSubTab] = useState<ChemBioSubTab>("periodic-table");

  const sampleThaiGrapheme = "น้ำดื่มสะอาดบริสุทธิ์เพื่อการศึกษา";
  const truncatedGrapheme = safeTruncateThaiGraphemes(sampleThaiGrapheme, 3);

  const sampleThaiBytes = "ภาษาไทยเพื่อการศึกษาค้นคว้า";
  const truncatedBytes = safeTruncateThaiBytes(sampleThaiBytes, 12);

  return (
    <KioskContainer>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800 selection:text-neutral-200">
        {/* Top Header */}
        <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md sticky top-10 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-200">
                <Atom className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div>
                <span className="font-heading font-semibold text-sm tracking-tight text-neutral-100 block">
                  Interactive Learning Platform
                </span>
                <span className="text-xs text-neutral-400 block font-normal font-sans">
                  แพลตฟอร์มการเรียนรู้และห้องทดลองเชิงโต้ตอบ
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-900 border border-neutral-800 text-neutral-300">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
                />
                Phase 7: Scientific & Learning Modules Active
              </span>
            </div>
          </div>
        </header>

        {/* Tab Navigation Navigation Bar */}
        <div className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-[104px] z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-neutral-850 text-neutral-100 border border-neutral-700 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
              }`}
            >
              <Compass className="h-3.5 w-3.5 text-cyan-400" />
              <span>Platform Overview & Architecture</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("math-physics")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "math-physics"
                  ? "bg-neutral-850 text-neutral-100 border border-cyan-700/60 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
              }`}
            >
              <Calculator className="h-3.5 w-3.5 text-cyan-400" />
              <span>Mathematics & Physics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("chem-bio")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "chem-bio"
                  ? "bg-neutral-850 text-neutral-100 border border-orange-700/60 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
              }`}
            >
              <FlaskConical className="h-3.5 w-3.5 text-orange-400" />
              <span>Chemistry & Biology</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("thai")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "thai"
                  ? "bg-neutral-850 text-neutral-100 border border-emerald-700/60 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
              }`}
            >
              <Languages className="h-3.5 w-3.5 text-emerald-400" />
              <span>Thai Phonology Engine</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("exercises")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === "exercises"
                  ? "bg-neutral-850 text-neutral-100 border border-purple-700/60 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-purple-400" />
              <span>Exercises & Practice (FEAT-21)</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {/* TAB 1: MATHEMATICS & PHYSICS */}
          {activeTab === "math-physics" && (
            <div className="space-y-6">
              {/* Sub-tab switcher */}
              <div className="flex items-center gap-2 bg-neutral-900/60 p-1.5 rounded-xl border border-neutral-800 w-fit">
                <button
                  type="button"
                  onClick={() => setMathPhysicsSubTab("math")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                    mathPhysicsSubTab === "math"
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-700/80 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Dynamic Math Sandbox (KaTeX & Mafs)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMathPhysicsSubTab("physics")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                    mathPhysicsSubTab === "physics"
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Symplectic Physics Orbit Simulator</span>
                </button>
              </div>

              {mathPhysicsSubTab === "math" && <FormulaViewer />}
              {mathPhysicsSubTab === "physics" && <VerletSimulationCanvas />}
            </div>
          )}

          {/* TAB 2: CHEMISTRY & BIOLOGY */}
          {activeTab === "chem-bio" && (
            <div className="space-y-6">
              {/* Sub-tab switcher */}
              <div className="flex items-center gap-2 bg-neutral-900/60 p-1.5 rounded-xl border border-neutral-800 w-fit">
                <button
                  type="button"
                  onClick={() => setChemBioSubTab("periodic-table")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                    chemBioSubTab === "periodic-table"
                      ? "bg-orange-950/80 text-orange-300 border border-orange-700/80 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Atom className="h-3.5 w-3.5" />
                  <span>Interactive Periodic Table (FEAT-05)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChemBioSubTab("cell-structure")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all ${
                    chemBioSubTab === "cell-structure"
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Dna className="h-3.5 w-3.5" />
                  <span>Cell & Organelle Visualizer (FEAT-07)</span>
                </button>
              </div>

              {chemBioSubTab === "periodic-table" && <PeriodicTableViewer />}
              {chemBioSubTab === "cell-structure" && <CellStructureViewer />}
            </div>
          )}

          {/* TAB 3: THAI PHONOLOGY */}
          {activeTab === "thai" && <ThaiPhonologyVisualizer />}

          {/* TAB 4: INTERACTIVE EXERCISES & PRACTICE */}
          {activeTab === "exercises" && <ExerciseEngine />}

          {/* TAB 5: PLATFORM OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-16">
              {/* Hero Section */}
              <section className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Masterplan SSOT Compliance | Firman Agentic OS Rigor</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-neutral-100 max-w-4xl">
                  Next-Generation Interactive Learning & Scientific Simulation Architecture
                </h1>
                <p className="text-neutral-400 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
                  ระบบแพลตฟอร์มการเรียนรู้ระดับโปรดักชัน รองรับการจำลองฟิสิกส์ เคมี ชีววิทยา คณิตศาสตร์เสมือนจริง
                  และการวัดผลอย่างแม่นยำตามหลักสูตรแกนกลาง 9 กลุ่มวิชา
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Next.js 15 App Router
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    TypeScript & Tailwind CSS
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Lucide Vector Iconography
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Multi-byte Thai UTF-8 Safe
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Sarabun & Prompt Typography
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Kiosk Lockdown Enclosure
                  </div>
                </div>
              </section>

              {/* Special Cross-Cutting Phase Showcase */}
              <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="h-4 w-4 text-cyan-400" />
                    <h2 className="text-sm font-heading font-semibold text-neutral-200">
                      Special Cross-Cutting Phase: Autonomous Skill & Tooling Discovery via npx
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 px-2.5 py-0.5 rounded-full">
                    Zero-Install Discipline
                  </span>
                </div>

                <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                  สถาปัตยกรรมเฟสพิเศษควบคุมการค้นหาและเรียกใช้ Skills, Scaffolding และ Auditing Tools จาก Open-Source/GitHub
                  ผ่านคำสั่ง <code className="text-cyan-300 font-mono">npx</code> แบบไม่ติดตั้งลงใน dependency ถาวร
                  (Zero package bloat) พร้อมบันทึกหลักฐานการรันลงใน{" "}
                  <code className="text-emerald-300 font-mono">docs/NPX_SKILLS_REGISTRY.md</code> อย่างเป็นระบบ
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-cyan-400">npx knip</span>
                    <p className="text-[11px] font-sans text-neutral-400">
                      ตรวจจับ Dead Code, Unused Exports และ Unused Dependencies โดยไม่มี Dependency Pollution
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-emerald-400">npx typescript-coverage-report</span>
                    <p className="text-[11px] font-sans text-neutral-400">
                      วัดระดับความสมบูรณ์ของ TypeScript Type Coverage ตรวจสอบความปลอดภัยเชิงสถิติ (99.76%+)
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-amber-400">npx jscpd</span>
                    <p className="text-[11px] font-sans text-neutral-400">
                      ตรวจจับ Duplicate Code ในสมการคณิตศาสตร์และอัลกอริทึมฟิสิกส์เพื่อป้องกันการพัฒนาซ้ำซ้อน
                    </p>
                  </div>
                </div>
              </section>

              {/* Thai UTF-8 Safety Engine Showcase */}
              <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <h2 className="text-sm font-heading font-semibold text-neutral-200">
                      Thai Multibyte UTF-8 Engine Live Verification
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    Safe Slicing Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-lg bg-neutral-950/80 border border-neutral-800/80 space-y-2">
                    <p className="text-xs font-mono text-neutral-400">
                      Grapheme Cluster Slicing (Display Safe)
                    </p>
                    <p className="text-xs text-neutral-500 font-sans">
                      Preserves compound clusters without detaching floating vowels or tone marks:
                    </p>
                    <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 font-mono text-xs text-neutral-300 flex justify-between items-center">
                      <span className="text-neutral-500">{sampleThaiGrapheme}</span>
                      <ChevronRight className="h-3 w-3 text-neutral-500" />
                      <span className="text-emerald-400 font-semibold">{truncatedGrapheme}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-neutral-950/80 border border-neutral-800/80 space-y-2">
                    <p className="text-xs font-mono text-neutral-400">
                      Byte Length Slicing (Buffer & Storage Safe)
                    </p>
                    <p className="text-xs text-neutral-500 font-sans">
                      Never cuts midway through a 3-byte sequence (0xE0 range) under strict byte caps:
                    </p>
                    <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 font-mono text-xs text-neutral-300 flex justify-between items-center">
                      <span className="text-neutral-500">12 bytes max</span>
                      <ChevronRight className="h-3 w-3 text-neutral-500" />
                      <span className="text-emerald-400 font-semibold">{truncatedBytes}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Subjects Bar */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                    9 Core Subject Areas
                  </h2>
                  <span className="text-xs text-neutral-500 font-mono">Full Coverage Target</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                  {SUBJECTS.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <div
                        key={subject.name}
                        className="p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col items-center text-center gap-2"
                      >
                        <Icon className="h-5 w-5 text-neutral-400 stroke-[1.75]" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-heading font-medium text-neutral-200">
                            {subject.name}
                          </p>
                          <p className="text-[11px] font-sans text-neutral-500">
                            {subject.thaiName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Feature Modules Grid */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-neutral-200">
                      10 Core Feature Modules
                    </h2>
                    <p className="text-xs font-sans text-neutral-500">
                      Tracking status from Section 2 & 10 of masterplan.md
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 bg-emerald-950/40 border border-emerald-800/60 rounded">
                    Phase 7 Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FEATURE_MODULES.map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={feat.id}
                        className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
                                <Icon className="h-4 w-4 stroke-[1.75]" />
                              </div>
                              <div>
                                <h3 className="text-sm font-heading font-semibold text-neutral-200">
                                  {feat.name}
                                </h3>
                                <span className="text-xs font-sans text-neutral-500">
                                  {feat.thaiName}
                                </span>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                              {feat.status}
                            </span>
                          </div>
                          <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-850 text-xs text-neutral-500 font-mono">
                          <span>{feat.id}</span>
                          <span className="flex items-center gap-1 text-cyan-400">
                            Architecture Blueprint
                            <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Governance & Documentation Section */}
              <section className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-base font-heading font-semibold text-neutral-200">
                      Governance & Technical Blueprint
                    </h2>
                    <p className="text-xs font-sans text-neutral-400">
                      All system specifications and audit registries maintained in the repository under /docs
                    </p>
                  </div>
                  <Compass className="h-5 w-5 text-neutral-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                      <FileText className="h-3.5 w-3.5 text-cyan-400" />
                      <p>ARCHITECTURE.md</p>
                    </div>
                    <p className="text-neutral-500 text-[11px] font-sans">
                      Phase 5 System architecture & NPX cross-cutting protocol
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                      <FileText className="h-3.5 w-3.5 text-emerald-400" />
                      <p>MODULE_SPECIFICATIONS.md</p>
                    </div>
                    <p className="text-neutral-500 text-[11px] font-sans">
                      Interface contracts, equations & security boundaries
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                      <Terminal className="h-3.5 w-3.5 text-amber-400" />
                      <p>NPX_SKILLS_REGISTRY.md</p>
                    </div>
                    <p className="text-neutral-500 text-[11px] font-sans">
                      Zero-install tool executions & quality audit trail
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                      <GitBranch className="h-3.5 w-3.5 text-purple-400" />
                      <p>CHANGELOG.md</p>
                    </div>
                    <p className="text-neutral-500 text-[11px] font-sans">
                      Continuous delivery & milestone commits
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 py-8 text-center text-xs text-neutral-500 font-mono">
          Interactive Learning Platform &bull; Phase 7 Production &bull; Node v26 &bull; Next.js 15
        </footer>
      </div>
    </KioskContainer>
  );
}
