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
  FileCode2,
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
} from "lucide-react";
import { safeTruncateThaiBytes, safeTruncateThaiGraphemes } from "@/lib/utils";

const FEATURE_MODULES = [
  {
    id: "FEAT-01",
    name: "Interactive Learning Content",
    thaiName: "สื่อการเรียนรู้แบบโต้ตอบ",
    icon: BookOpen,
    description: "Step-by-step interactive lessons, concept maps, and expandable explanations.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-02",
    name: "Scientific Simulations",
    thaiName: "ระบบจำลองทางวิทยาศาสตร์",
    icon: Atom,
    description: "Real-time physics, chemistry, and biology physics engines with dynamic variables.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-03",
    name: "Virtual Laboratory",
    thaiName: "ห้องปฏิบัติการเสมือนจริง",
    icon: FlaskConical,
    description: "Workbench for experiments, apparatus selection, observation logs, and safety guides.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-04",
    name: "2D / 3D Visualization",
    thaiName: "แบบจำลองภาพ 2 มิติและ 3 มิติ",
    icon: Boxes,
    description: "WebGL molecular and anatomical structures with orbit, slice, and layer controls.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-05",
    name: "Interactive Mathematics",
    thaiName: "คณิตศาสตร์เชิงโต้ตอบ",
    icon: Calculator,
    description: "Dynamic equation editor, KaTeX formulas, 2D/3D graphing, and calculus visualizers.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-06",
    name: "Educational Demonstrations",
    thaiName: "ระบบสาธิตหลักการศึกษา",
    icon: Layers,
    description: "Animated process walkthroughs, algorithmic sorting, and state transitions.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-07",
    name: "Exercises & Practice",
    thaiName: "ระบบแบบฝึกหัดและการฝึกฝน",
    icon: Activity,
    description: "Multi-format question engine with instant feedback, hints, and step solutions.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-08",
    name: "Assessment & Examination",
    thaiName: "ระบบการทดสอบและประเมินผล",
    icon: Award,
    description: "Timed exams, randomized test banks, automated grading, and score analytics.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-09",
    name: "Learning Progress Tracking",
    thaiName: "การติดตามความก้าวหน้าการเรียนรู้",
    icon: CheckCircle2,
    description: "Comprehensive student analytics, skill radar, and curriculum mastery matrices.",
    status: "DISCOVERY",
  },
  {
    id: "FEAT-10",
    name: "Content Management System",
    thaiName: "ระบบจัดการเนื้อหาและการเผยแพร่",
    icon: FileCode2,
    description: "Modular syllabus schema, versioning, preview sandboxes, and asset registry.",
    status: "DISCOVERY",
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
  const sampleThaiGrapheme = "น้ำดื่มสะอาดบริสุทธิ์เพื่อการศึกษา";
  const truncatedGrapheme = safeTruncateThaiGraphemes(sampleThaiGrapheme, 3);

  const sampleThaiBytes = "ภาษาไทยเพื่อการศึกษาค้นคว้า";
  const truncatedBytes = safeTruncateThaiBytes(sampleThaiBytes, 12);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800 selection:text-neutral-200">
      {/* Top Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-50">
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
              Phase 0: Workspace Initialized
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
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
              <p className="text-xs font-mono text-neutral-400">Grapheme Cluster Slicing (Display Safe)</p>
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
              <p className="text-xs font-mono text-neutral-400">Byte Length Slicing (Buffer & Storage Safe)</p>
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
                    <p className="text-xs font-heading font-medium text-neutral-200">{subject.name}</p>
                    <p className="text-[11px] font-sans text-neutral-500">{subject.thaiName}</p>
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
            <span className="text-xs font-mono text-neutral-400 px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded">
              Status: 10 in DISCOVERY
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
                          <span className="text-xs font-sans text-neutral-500">{feat.thaiName}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-400">
                        {feat.status}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-850 text-xs text-neutral-500 font-mono">
                    <span>{feat.id}</span>
                    <span className="flex items-center gap-1 text-neutral-400">
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
                Governance Documents: Section 10 Baseline
              </h2>
              <p className="text-xs font-sans text-neutral-400">
                All tracking and architecture documents are maintained in the repository under /docs
              </p>
            </div>
            <Compass className="h-5 w-5 text-neutral-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                <FileText className="h-3.5 w-3.5 text-neutral-400" />
                <p>WORKSPACE_ASSESSMENT</p>
              </div>
              <p className="text-neutral-500 text-[11px] font-sans">Runtime & environment baseline</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                <FileText className="h-3.5 w-3.5 text-neutral-400" />
                <p>REQUIREMENTS</p>
              </div>
              <p className="text-neutral-500 text-[11px] font-sans">Deconstructed requirements FR & NFR</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                <FileText className="h-3.5 w-3.5 text-neutral-400" />
                <p>FEATURE_MATRIX</p>
              </div>
              <p className="text-neutral-500 text-[11px] font-sans">24 feature tracks across 9 subjects</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" />
                <p>AGENT_RULES</p>
              </div>
              <p className="text-neutral-500 text-[11px] font-sans">Multi-agent protocol & constraints</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
                <GitBranch className="h-3.5 w-3.5 text-neutral-400" />
                <p>CHANGELOG</p>
              </div>
              <p className="text-neutral-500 text-[11px] font-sans">Phase 0 initialization history</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-xs text-neutral-500 font-mono">
        Interactive Learning Platform &bull; Phase 0 Initialized &bull; Node v26 &bull; Next.js 15
      </footer>
    </div>
  );
}
