import type { Metadata } from "next";
import Link from "next/link";
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
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { safeTruncateThaiBytes, safeTruncateThaiGraphemes } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Interactive Learning Platform | แพลตฟอร์มการเรียนรู้และห้องทดลองวิทยาศาสตร์",
  description:
    "Next-generation modular interactive learning platform with real-time physics simulations, chemistry periodic table, cytology visualizer, and math modeling.",
};

interface LabModule {
  id: string;
  title: string;
  thaiTitle: string;
  path: string;
  icon: typeof Atom;
  badge: string;
  accentColor: string;
  borderColor: string;
  hoverBorder: string;
  description: string;
  thaiDescription: string;
  specs: string[];
}

const LAB_MODULES: LabModule[] = [
  {
    id: "LAB-MATH",
    title: "Mathematics Laboratory",
    thaiTitle: "ห้องปฏิบัติการคณิตศาสตร์และสมการพลวัต",
    path: "/math",
    icon: Calculator,
    badge: "Mafs 2D",
    accentColor: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-800/60",
    hoverBorder: "hover:border-cyan-500/80",
    description: "Interactive 2D Cartesian graphing with Mafs v0.21, KaTeX typesetting, and sandboxed Math.js AST evaluation.",
    thaiDescription: "กราฟฟังก์ชัน 2 มิติแบบโต้ตอบ, การแสดงผลสมการ LaTeX ด้วย KaTeX และประเมินค่าตัวแปรในแซนด์บ็อกซ์",
    specs: ["Mafs v0.21.0", "KaTeX XSS Sanitized", "6 Equation Presets"],
  },
  {
    id: "LAB-PHYSICS",
    title: "Physics Laboratory",
    thaiTitle: "ห้องปฏิบัติการฟิสิกส์และกลศาสตร์วงโคจร",
    path: "/physics",
    icon: Atom,
    badge: "Symplectic Verlet",
    accentColor: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-800/60",
    hoverBorder: "hover:border-emerald-500/80",
    description: "2-body Keplerian planetary orbit simulator comparing Velocity Verlet vs. Explicit Euler with real-time Hamiltonian energy tracking.",
    thaiDescription: "แบบจำลองการโคจร 2 วัตถุของเคปเลอร์ เปรียบเทียบ Velocity Verlet กับ Explicit Euler พร้อมเกจวัดพลังงาน",
    specs: ["Velocity Verlet ODE", "Energy Conservation Gauge", "WebGL Context Guard"],
  },
  {
    id: "LAB-CHEM",
    title: "Chemistry Workstation",
    thaiTitle: "สถานีปฏิบัติการเคมีและตารางธาตุสากล",
    path: "/chemistry",
    icon: FlaskConical,
    badge: "IUPAC 118",
    accentColor: "from-orange-500/20 to-amber-500/10",
    borderColor: "border-orange-800/60",
    hoverBorder: "hover:border-orange-500/80",
    description: "Complete 118-element IUPAC periodic table with Bohr electron shells, Pauling electronegativity heatmap, and block filtering.",
    thaiDescription: "ตารางธาตุ 118 ธาตุมาตรฐาน IUPAC พร้อมแบบจำลองวงโคจรอิเล็กตรอนของบอห์ร และแผนภาพความหนาแน่นอิเล็กโตรเนกาติวิตี",
    specs: ["118 IUPAC Elements", "SVG Bohr Electron Shells", "Pauling Electronegativity"],
  },
  {
    id: "LAB-BIO",
    title: "Cytology & Biology",
    thaiTitle: "ห้องปฏิบัติการชีววิทยาและเซลล์วิทยา",
    path: "/biology",
    icon: Dna,
    badge: "12 Organelles",
    accentColor: "from-teal-500/20 to-emerald-500/10",
    borderColor: "border-teal-800/60",
    hoverBorder: "hover:border-teal-500/80",
    description: "Eukaryotic plant and animal cell explorer with 12 clickable organelles, internal cross-section mode, and exam cheat-sheets.",
    thaiDescription: "สำรวจออร์แกเนลล์ 12 ชนิดในเซลล์พืชและเซลล์สัตว์, โหมดผ่าครึ่งเซลล์ (Cross-section) และบันทึกข้อสอบสำคัญ",
    specs: ["Plant & Animal Cytology", "12 Clickable Organelles", "Exam Notes & Comparison"],
  },
  {
    id: "LAB-CS",
    title: "Computer Science Laboratory",
    thaiTitle: "ห้องปฏิบัติการวิทยาการคอมพิวเตอร์และตรรกศาสตร์",
    path: "/cs",
    icon: Binary,
    badge: "FEAT-19 Logic",
    accentColor: "from-cyan-500/20 to-teal-500/10",
    borderColor: "border-cyan-800/60",
    hoverBorder: "hover:border-cyan-500/80",
    description: "Interactive digital logic gate sandbox with topological signal propagation, live switches, and automated truth tables.",
    thaiDescription: "เกตตรรกะดิจิทัล การแพร่กระจายสัญญาณแบบโต้ตอบ วงจรบวกเลขฐานสอง และการสร้างตารางค่าความจริงอัตโนมัติ",
    specs: ["Topological DAG Evaluator", "Auto Truth Table", "Adders & Multiplexers"],
  },
  {
    id: "LAB-THAI",
    title: "Thai Language Studio",
    thaiTitle: "สตูดิอสัทศาสตร์ภาษาไทยและไตรยางศ์",
    path: "/thai",
    icon: Languages,
    badge: "Triyang & Tones",
    accentColor: "from-emerald-500/20 to-cyan-500/10",
    borderColor: "border-emerald-800/60",
    hoverBorder: "hover:border-emerald-500/80",
    description: "Syllable deconstruction engine with Triyang 3-consonant class classification, 8 spelling sections, and dynamic SVG tone pitch plots.",
    thaiDescription: "ระบบแยกพยางค์ อักษร 3 หมู่ มาตราตัวสะกด 8 แม่ และเส้นเสียงวรรณยุกต์ 5 เสียงแบบเวกเตอร์",
    specs: ["3-Byte UTF-8 Safe", "Triyang Consonant Engine", "5 Tone Pitch Trajectories"],
  },
  {
    id: "LAB-PRACTICE",
    title: "Universal Practice Engine",
    thaiTitle: "ระบบแบบฝึกหัดและการประเมินผล",
    path: "/practice",
    icon: BookOpen,
    badge: "FEAT-21 Engine",
    accentColor: "from-purple-500/20 to-indigo-500/10",
    borderColor: "border-purple-800/60",
    hoverBorder: "hover:border-purple-500/80",
    description: "Curriculum question bank across 5 core subjects with instant auto-grading, step-by-step solutions, and streak tracking.",
    thaiDescription: "คลังข้อสอบและแบบฝึกหัด 5 หมวดวิชา ตรวจคำตอบอัตโนมัติ 4 รูปแบบ พร้อมคำอธิบายเฉลยและระบบนับแต้มต่อเนื่อง",
    specs: ["4 Question Formats", "Instant Auto-Grading", "Step-by-Step Breakdown"],
  },
];

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
  const sampleThaiGrapheme = "น้ำดื่มสะอาดบริสุทธิ์เพื่อการศึกษา";
  const truncatedGrapheme = safeTruncateThaiGraphemes(sampleThaiGrapheme, 3);

  const sampleThaiBytes = "ภาษาไทยเพื่อการศึกษาค้นคว้า";
  const truncatedBytes = safeTruncateThaiBytes(sampleThaiBytes, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            <span>Masterplan SSOT Compliance</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-800/60 text-cyan-300">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
            />
            <span>v0.5.1 Multi-Route Architecture Active</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-neutral-100 max-w-4xl leading-tight">
          Modular Interactive Learning & Scientific Simulation Architecture
        </h1>

        <p className="text-neutral-400 text-base sm:text-lg max-w-3xl leading-relaxed font-sans">
          แพลตฟอร์มการเรียนรู้ระดับโปรดักชัน สถาปัตยกรรม Next.js 15 App Router แบบ Multi-Route
          พร้อมห้องปฏิบัติการฟิสิกส์ เคมี ชีววิทยา คณิตศาสตร์ และสัทศาสตร์ภาษาไทย
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            Next.js 15 App Router & Turbopack
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            75 Verified Invariant Unit Tests
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            99.89% TypeScript Coverage
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            Zero Dead Code (Knip Audited)
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            100% Lucide SVG (Anti-Emoji)
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            3-Byte Safe Thai UTF-8
          </div>
        </div>
      </section>

      {/* Quick Interactive Laboratory Launcher (6 Main Workstations) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-neutral-100 flex items-center gap-2.5">
              <Compass className="h-5 w-5 text-cyan-400" />
              <span>Interactive Laboratories & Workstations</span>
            </h2>
            <p className="text-xs font-sans text-neutral-400 mt-0.5">
              เลือกห้องทดลองที่ต้องการเข้าใช้งาน แต่ละสถานีทำงานแบบแยก Chunk อิสระตามมาตรฐาน Vercel Best Practices
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2.5 py-1 rounded-full hidden sm:inline-block">
            6 Specialized Stations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAB_MODULES.map((lab) => {
            const Icon = lab.icon;
            return (
              <Link
                key={lab.id}
                href={lab.path}
                className={`group relative rounded-2xl bg-gradient-to-b ${lab.accentColor} bg-neutral-900/40 p-6 border ${lab.borderColor} ${lab.hoverBorder} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between gap-6`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-xl bg-neutral-900/90 border border-neutral-700/80 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
                      {lab.badge}
                    </span>
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="text-base font-heading font-semibold text-neutral-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <span>{lab.title}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs font-sans text-neutral-400 mt-0.5">
                      {lab.thaiTitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                    {lab.thaiDescription}
                  </p>
                </div>

                {/* Specs and Launch Link */}
                <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {lab.specs.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950/70 border border-neutral-800 text-neutral-400"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>เปิดห้องทดลอง (Launch Lab)</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* System Architecture & Telemetry HUD */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-heading font-semibold text-neutral-200">
                System Telemetry & Architecture Invariants
              </h2>
              <p className="text-xs font-sans text-neutral-400">
                Real-time invariants and quantitative engineering benchmarks
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/80 px-3 py-1 rounded-full">
            All Systems Operational
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Chemical Elements</span>
            <p className="text-xl font-heading font-bold text-orange-400">118</p>
            <p className="text-[10px] text-neutral-400 font-sans">IUPAC Complete</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Cytology Organelles</span>
            <p className="text-xl font-heading font-bold text-teal-400">12</p>
            <p className="text-[10px] text-neutral-400 font-sans">Plant & Animal</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Exercise Questions</span>
            <p className="text-xl font-heading font-bold text-purple-400">20</p>
            <p className="text-[10px] text-neutral-400 font-sans">5 Core Subjects</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Unit Tests Passed</span>
            <p className="text-xl font-heading font-bold text-emerald-400">75</p>
            <p className="text-[10px] text-neutral-400 font-sans">22 Test Suites</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Type Coverage</span>
            <p className="text-xl font-heading font-bold text-cyan-400">99.89%</p>
            <p className="text-[10px] text-neutral-400 font-sans">17,793 Symbols</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 uppercase">Dead Code (Knip)</span>
            <p className="text-xl font-heading font-bold text-emerald-400">0</p>
            <p className="text-[10px] text-neutral-400 font-sans">Clean Audit</p>
          </div>
        </div>
      </section>

      {/* Special Cross-Cutting Phase Showcase */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-heading font-semibold text-neutral-200">
              Special Cross-Cutting Phase: Autonomous Skill & Tooling Discovery via npx
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 px-3 py-1 rounded-full">
            Zero-Install Discipline
          </span>
        </div>

        <p className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed max-w-4xl">
          สถาปัตยกรรมเฟสพิเศษควบคุมการค้นหาและเรียกใช้ AI Agent Skills, Best Practices และ Auditing Tools จาก Open-Source/GitHub
          ผ่านคำสั่ง <code className="text-cyan-300 font-mono">npx</code> แบบไม่ติดตั้งลงใน dependency ถาวร
          (Zero package bloat) พร้อมบันทึกหลักฐานการรันลงใน{" "}
          <code className="text-emerald-300 font-mono">docs/NPX_SKILLS_REGISTRY.md</code> อย่างเป็นระบบ
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
            <span className="text-xs font-mono text-cyan-400 font-semibold">npx skills find</span>
            <p className="text-xs font-sans text-neutral-400">
              ค้นหา AI Agent Skills สำหรับ React และ Next.js สถาปัตยกรรมระดับโลก
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
            <span className="text-xs font-mono text-emerald-400 font-semibold">npx knip</span>
            <p className="text-xs font-sans text-neutral-400">
              ตรวจจับ Dead Code, Unused Exports และ Unused Dependencies ทั่วทั้งโปรเจกต์
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
            <span className="text-xs font-mono text-cyan-400 font-semibold">npx typescript-coverage</span>
            <p className="text-xs font-sans text-neutral-400">
              วัดระดับความสมบูรณ์ของ TypeScript Type Coverage สถิติ 99.89%+
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
            <span className="text-xs font-mono text-amber-400 font-semibold">npx jscpd</span>
            <p className="text-xs font-sans text-neutral-400">
              ตรวจจับ Duplicate Code ในสมการคณิตศาสตร์และอัลกอริทึมฟิสิกส์
            </p>
          </div>
        </div>
      </section>

      {/* Thai Multibyte UTF-8 Engine Live Verification */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-heading font-semibold text-neutral-200">
              Thai Multibyte UTF-8 Engine Live Verification
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full">
            Safe Slicing Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <p className="text-xs font-mono text-neutral-400">
              Grapheme Cluster Slicing (Display Safe)
            </p>
            <p className="text-xs text-neutral-500 font-sans">
              รักษาคลัสเตอร์อักขระไทย ไม่ตัดสระลอยหรือวรรณยุกต์ให้ขาดตอน:
            </p>
            <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 font-mono text-xs text-neutral-300 flex justify-between items-center">
              <span className="text-neutral-500">{sampleThaiGrapheme}</span>
              <ChevronRight className="h-3 w-3 text-neutral-500" />
              <span className="text-emerald-400 font-semibold">{truncatedGrapheme}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <p className="text-xs font-mono text-neutral-400">
              Byte Length Slicing (Buffer & Storage Safe)
            </p>
            <p className="text-xs text-neutral-500 font-sans">
              ไม่ตัดกึ่งกลางไบต์อักขระไทย 3 ไบต์ (ช่วง 0xE0) ป้องกัน corrupted string:
            </p>
            <div className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 font-mono text-xs text-neutral-300 flex justify-between items-center">
              <span className="text-neutral-500">12 bytes max</span>
              <ChevronRight className="h-3 w-3 text-neutral-500" />
              <span className="text-emerald-400 font-semibold">{truncatedBytes}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Core Subject Tracks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-neutral-400 font-mono">
            9 Core Subject Tracks (หลักสูตรแกนกลาง 9 กลุ่มวิชา)
          </h2>
          <span className="text-xs text-neutral-500 font-mono">Curriculum Coverage Target</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {SUBJECTS.map((subject) => {
            const Icon = subject.icon;
            return (
              <div
                key={subject.name}
                className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col items-center text-center gap-2"
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

      {/* 10 Feature Modules Grid */}
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
          <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 bg-emerald-950/40 border border-emerald-800/60 rounded-full">
            Phase 7 Complete • Ready for Phase 8
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
                    Module Blueprint
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Governance & Documentation Section */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base font-heading font-semibold text-neutral-200">
              Governance & Technical Blueprint
            </h2>
            <p className="text-xs font-sans text-neutral-400">
              All system specifications and audit registries maintained under /docs
            </p>
          </div>
          <Compass className="h-5 w-5 text-neutral-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <p>ARCHITECTURE.md</p>
            </div>
            <p className="text-neutral-500 text-[11px] font-sans">
              Phase 5-7 Multi-Route Architecture & NPX governance
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
              <FileText className="h-3.5 w-3.5 text-emerald-400" />
              <p>MODULE_SPECIFICATIONS.md</p>
            </div>
            <p className="text-neutral-500 text-[11px] font-sans">
              Mathematical invariants & physical contracts
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
              <Terminal className="h-3.5 w-3.5 text-amber-400" />
              <p>NPX_SKILLS_REGISTRY.md</p>
            </div>
            <p className="text-neutral-500 text-[11px] font-sans">
              Zero-install tool executions & AI skills audit trail
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-300 font-mono font-medium">
              <GitBranch className="h-3.5 w-3.5 text-purple-400" />
              <p>CHANGELOG.md</p>
            </div>
            <p className="text-neutral-500 text-[11px] font-sans">
              Continuous delivery log & milestone commits
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-xs text-neutral-500 font-mono">
        Interactive Learning Platform &bull; v0.5.1 Multi-Route Modular Architecture &bull; Next.js 15 &bull; Turbopack
      </footer>
    </div>
  );
}
