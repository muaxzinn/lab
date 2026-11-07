"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Atom,
  FlaskConical,
  Dna,
  Binary,
  Languages,
  Calculator,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

type CategoryFilter = "all" | "physical" | "bio-chem" | "math-cs" | "linguistics";

interface StudioCard {
  id: string;
  title: string;
  thaiTitle: string;
  path: string;
  categories: CategoryFilter[];
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  description: string;
  thaiDescription: string;
  techTags: string[];
  gradient: string;
  borderHover: string;
  accentBadge: string;
}

const STUDIO_CARDS: StudioCard[] = [
  {
    id: "physics",
    title: "Physics Laboratory",
    thaiTitle: "ห้องปฏิบัติการฟิสิกส์และดาราศาสตร์",
    path: "/physics",
    categories: ["physical"],
    icon: Atom,
    tag: "3D WebGL & MNA",
    description: "Interactive Keplerian Solar System in 3D WebGL, DC circuit MNA linear solver, and 2-body symplectic Verlet orbital mechanics.",
    thaiDescription: "แบบจำลองระบบสุริยะ 3D WebGL พร้อมวงโคจรเคปเลอร์, ตัวจำลองวงจรไฟฟ้ากระแสตรง MNA Solver และกลศาสตร์ 2 วัตถุ Velocity Verlet",
    techTags: ["3D Solar System", "Three.js", "Verlet Physics", "Interactive Lessons"],
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/60 hover:shadow-emerald-950/30",
    accentBadge: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
  },
  {
    id: "chemistry",
    title: "Chemistry Workstation",
    thaiTitle: "สถานีปฏิบัติการเคมีและตารางธาตุ",
    path: "/chemistry",
    categories: ["physical", "bio-chem"],
    icon: FlaskConical,
    tag: "3D WebGL & IUPAC",
    description: "Interactive 3D molecular viewer (Ball & Stick / vdW), IUPAC 118-element periodic table, and exact Gauss-Jordan reaction balancing.",
    thaiDescription: "แบบจำลองโมเลกุล 3D WebGL (Ball & Stick / vdW), ตารางธาตุมาตรฐาน IUPAC 118 ธาตุ และตัวดุลสมการเคมีด้วยเมทริกซ์ Gauss-Jordan",
    techTags: ["3D Molecules", "IUPAC 118", "Stoichiometry", "Interactive Lessons"],
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderHover: "hover:border-amber-500/60 hover:shadow-amber-950/30",
    accentBadge: "text-amber-400 bg-amber-950/60 border-amber-800/60",
  },
  {
    id: "biology",
    title: "Cytology & Biology",
    thaiTitle: "ห้องปฏิบัติการชีววิทยาและเซลล์",
    path: "/biology",
    categories: ["bio-chem"],
    icon: Dna,
    tag: "3D Cutaway Cytology",
    description: "3D cutaway eukaryotic plant and animal cell explorer with raycasting organelle inspection and deep endomembrane lessons.",
    thaiDescription: "แบบจำลองเซลล์ยูแคริโอต 3D WebGL ผ่าครึ่ง (Cross-section) ตรวจสอบออร์แกเนลล์ 12 ชนิด พร้อมบทเรียนระบบเอนโดเมมเบรนและ Central Dogma",
    techTags: ["3D Cytology", "12 Organelles", "Endosymbiosis", "Interactive Lessons"],
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    borderHover: "hover:border-purple-500/60 hover:shadow-purple-950/30",
    accentBadge: "text-purple-400 bg-purple-950/60 border-purple-800/60",
  },
  {
    id: "math",
    title: "Mathematics Laboratory",
    thaiTitle: "ห้องปฏิบัติการคณิตศาสตร์และสมการ",
    path: "/math",
    categories: ["math-cs"],
    icon: Calculator,
    tag: "Mafs 2D & AST",
    description: "Interactive 2D Cartesian function plotting with Mafs, KaTeX mathematical typesetting, and sandboxed Math.js AST variable evaluation.",
    thaiDescription: "กราฟฟังก์ชัน 2 มิติแบบโต้ตอบด้วย Mafs v0.21, ระบบประเมินค่าตัวแปร Math.js AST แซนด์บ็อกซ์ และบทเรียนแคลคูลัสเชิงอนุพันธ์และปริพันธ์รีมันน์",
    techTags: ["Mafs v0.21", "KaTeX LaTeX", "Calculus Limits", "Interactive Lessons"],
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    borderHover: "hover:border-cyan-500/60 hover:shadow-cyan-950/30",
    accentBadge: "text-cyan-400 bg-cyan-950/60 border-cyan-800/60",
  },
  {
    id: "cs",
    title: "Computer Science Studio",
    thaiTitle: "สตูดิโอวิทยาการคอมพิวเตอร์",
    path: "/cs",
    categories: ["math-cs"],
    icon: Binary,
    tag: "Topological Logic",
    description: "Interactive digital logic gate sandbox, topological DAG signal propagation, automated truth tables, and Big-O algorithm analysis.",
    thaiDescription: "แซนด์บ็อกซ์เกตตรรกะดิจิทัลเชิงโต้ตอบ (AND, OR, NOT, XOR, NAND) การแพร่กระจายสัญญาณแบบ DAG ตารางค่าความจริงอัตโนมัติ และสัญกรณ์ Big-O",
    techTags: ["DAG Evaluator", "Boolean Logic", "Binary Adders", "Interactive Lessons"],
    gradient: "from-sky-500/10 via-indigo-500/5 to-transparent",
    borderHover: "hover:border-sky-500/60 hover:shadow-sky-950/30",
    accentBadge: "text-sky-400 bg-sky-950/60 border-sky-800/60",
  },
  {
    id: "thai",
    title: "Thai Language Studio",
    thaiTitle: "สตูดิอสัทศาสตร์ภาษาไทย",
    path: "/thai",
    categories: ["linguistics"],
    icon: Languages,
    tag: "3-Byte UTF-8 Safe",
    description: "Syllable deconstruction engine with Triyang 3-consonant class classification, 8 spelling sections, and dynamic SVG tone pitch plots.",
    thaiDescription: "ระบบแยกพยางค์ อักษร 3 หมู่ (ไตรยางศ์), กฎคำเป็นคำตาย, เส้นเสียงวรรณยุกต์ 5 เสียงแบบเวกเตอร์ SVG และกลไกคำสมาส-คำสนธิ",
    techTags: ["Triyang Engine", "5 Tone Contours", "Kam Samas/Sondhi", "Interactive Lessons"],
    gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
    borderHover: "hover:border-teal-500/60 hover:shadow-teal-950/30",
    accentBadge: "text-teal-400 bg-teal-950/60 border-teal-800/60",
  },
  {
    id: "practice",
    title: "Universal Practice Engine",
    thaiTitle: "ระบบแบบฝึกหัดและการประเมินผล",
    path: "/practice",
    categories: ["linguistics"],
    icon: BookOpen,
    tag: "Instant Auto-Grading",
    description: "Comprehensive question bank across 5 core disciplines with instant auto-grading, step-by-step solutions, and streak tracking.",
    thaiDescription: "คลังแบบฝึกหัด 5 หมวดวิชา ตรวจคำตอบอัตโนมัติ 4 รูปแบบ (ปรนัย, หลายคำตอบ, เติมคำ, ตัวเลข) พร้อมคำอธิบายเฉลยและระบบนับแต้ม",
    techTags: ["4 Question Types", "Auto-Grading", "Step Breakdown", "KaTeX Formulas"],
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    borderHover: "hover:border-violet-500/60 hover:shadow-violet-950/30",
    accentBadge: "text-violet-400 bg-violet-950/60 border-violet-800/60",
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "physical", label: "วิทยาศาสตร์กายภาพ" },
  { id: "bio-chem", label: "ชีววิทยาและเคมี" },
  { id: "math-cs", label: "คณิตศาสตร์และคอมพิวเตอร์" },
  { id: "linguistics", label: "ภาษาศาสตร์และการฝึกฝน" },
] as const;

export function StudioHub() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredCards = useMemo(() => {
    if (activeCategory === "all") return STUDIO_CARDS;
    return STUDIO_CARDS.filter((card) => card.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="space-y-12">
      {/* Studio Header & Introduction */}
      <section className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ background: "linear-gradient(135deg, #2ef2a0, #00f0ff)" }}
          />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Learning Architecture • Studio Hub
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold text-neutral-100 tracking-tight leading-tight">
          Next-Generation Scientific & Educational Workbenches
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed">
          แพลตฟอร์มการเรียนรู้และห้องทดลองเชิงโต้ตอบระดับสูง ผสานแบบจำลอง 3D WebGL, การคำนวณฟิสิกส์จลนศาสตร์,
          การจำลองเกตตรรกะดิจิทัล และบทเรียนทฤษฎีเจาะลึกทีละขั้นตอน
        </p>
      </section>

      {/* Category Filter Pills */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-neutral-800/80">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-sans transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-neutral-900 border border-cyan-800/80 text-cyan-300 font-semibold shadow-sm"
                    : "bg-neutral-950 border border-neutral-800/70 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subject Studio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.id}
                href={card.path}
                className={`group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-gradient-to-b ${card.gradient} bg-neutral-950/80 p-6 shadow-lg transition-all duration-300 ${card.borderHover} hover:-translate-y-0.5`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200 group-hover:text-cyan-300 group-hover:border-cyan-800/80 transition-colors">
                      <IconComponent className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${card.accentBadge}`}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title & Thai Subtitle */}
                  <div>
                    <h2 className="text-lg font-heading font-semibold text-neutral-100 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h2>
                    <span className="text-xs font-sans text-neutral-400 block mt-0.5">
                      {card.thaiTitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs font-sans text-neutral-400 leading-relaxed line-clamp-3">
                    {card.thaiDescription}
                  </p>
                </div>

                {/* Tech Tags & Launch Footer */}
                <div className="pt-5 mt-5 border-t border-neutral-800/80 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {card.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900/90 border border-neutral-800 text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300 pt-1">
                    <span>เปิดห้องปฏิบัติการ</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Architecture Highlights Bar */}
      <section className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-100 block">
              7
            </span>
            <span className="text-xs font-sans text-neutral-400">
              สาขาวิชาครบวงจร
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-semibold text-cyan-300 block">
              3D WebGL
            </span>
            <span className="text-xs font-sans text-neutral-400">
              โมเลกุล ดาราศาสตร์ และเซลล์
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-semibold text-emerald-300 block">
              KaTeX
            </span>
            <span className="text-xs font-sans text-neutral-400">
              สมการคณิตศาสตร์และสูตรคำนวณ
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-semibold text-purple-300 block">
              FEAT-01
            </span>
            <span className="text-xs font-sans text-neutral-400">
              บทเรียนและทฤษฎีเจาะลึก
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
