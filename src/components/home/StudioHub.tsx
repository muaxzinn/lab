"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  Play,
  Orbit,
  Atom,
  FlaskConical,
  Zap,
  Dna,
  Calculator,
  Binary,
  Languages,
  BookOpen,
  Radio,
  Eye,
  Sparkles,
  Compass,
  Globe,
  Sun,
  Telescope,
  Activity,
  Layers,
  Gauge,
  Rocket,
  Flame,
  Boxes,
  GitBranch,
  Code,
  GraduationCap,
} from "lucide-react";
import {
  CATEGORIES,
  SIMULATION_ITEMS,
  filterSimulations,
  getSimulationEmbedUrl,
  type SimulationCategory,
  type SimulationItem,
} from "@/lib/simulation-catalog";
import { SimulationModalPlayer } from "@/components/simulations/SimulationModalPlayer";

// Core 8 Studios with crystal-clear features and direct routes
interface CoreStudio {
  id: string;
  title: string;
  thaiTitle: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  badgeColor: string;
  description: string;
  highlights: string[];
}

const CORE_STUDIOS: CoreStudio[] = [
  {
    id: "astronomy",
    title: "Astronomy & Astrophysics",
    thaiTitle: "ดาราศาสตร์และระบบสุริยะ 3D",
    path: "/physics",
    icon: Orbit,
    badge: "3D WebGL",
    badgeColor: "text-cyan-400 bg-cyan-950/50 border-cyan-800/60",
    description: "แบบจำลองระบบสุริยะ 3 มิติ พร้อมวงโคจรตามกฎเคปเลอร์ และการสังเกตการณ์ท้องฟ้า",
    highlights: ["ดวงอาทิตย์เรืองแสงและดาวเคราะห์ 8 ดวง", "ตัวเร่งเวลาจำลอง 1x–100x", "14 ซิมูเลชันดาราศาสตร์ OpenLyceum"],
  },
  {
    id: "physics",
    title: "Physics & Mechanics",
    thaiTitle: "ฟิสิกส์จลนศาสตร์และคลื่น",
    path: "/physics",
    icon: Atom,
    badge: "Verlet Physics",
    badgeColor: "text-emerald-400 bg-emerald-950/50 border-emerald-800/60",
    description: "การคำนวณการเคลื่อนที่ 2 มิติ แรงโน้มถ่วง แรงเสียดทาน และการสั่นพ้องของคลื่น",
    highlights: ["จลนศาสตร์ 2 มิติ Verlet 60 FPS", "พื้นเอียงและแรงเสียดทาน The Ramp", "ปรากฏการณ์ดอปเปลอร์และคลื่นนิ่ง"],
  },
  {
    id: "chemistry",
    title: "Chemistry & Molecular Lab",
    thaiTitle: "เคมีและโครงสร้างโมเลกุล 3D",
    path: "/chemistry",
    icon: FlaskConical,
    badge: "3D Molecules",
    badgeColor: "text-amber-400 bg-amber-950/50 border-amber-800/60",
    description: "สำรวจโครงสร้างโมเลกุล 3 มิติ ตารางธาตุมาตรฐาน 118 ธาตุ และการดุลสมการเคมี",
    highlights: ["โมเลกุล 3D จริงจาก PubChem/PDB", "ตารางธาตุ 118 ธาตุและออร์บิทัล", "ตัวดุลสมการเคมี Gauss-Jordan"],
  },
  {
    id: "circuits",
    title: "Circuits & Electromagnetism",
    thaiTitle: "ไฟฟ้า แม่เหล็ก และวงจร",
    path: "/physics",
    icon: Zap,
    badge: "MNA Solver",
    badgeColor: "text-yellow-400 bg-yellow-950/50 border-yellow-800/60",
    description: "ระบบวิเคราะห์วงจรไฟฟ้ากระแสตรง MNA Solver และพฤติกรรมสนามแม่เหล็กไฟฟ้า",
    highlights: ["คำนวณศักย์ไฟฟ้าและกระแสทุกโหนด", "แผนภาพเฟสเซอร์วงจร RLC", "ตัวเก็บประจุและสนามไฟฟ้า 2 มิติ"],
  },
  {
    id: "biology",
    title: "Cytology & Cell Biology",
    thaiTitle: "ชีววิทยาและเซลล์วิทยา 3D",
    path: "/biology",
    icon: Dna,
    badge: "3D Cytology",
    badgeColor: "text-purple-400 bg-purple-950/50 border-purple-800/60",
    description: "แบบจำลองเซลล์ยูแคริโอต 3 มิติผ่าครึ่ง ตรวจสอบหน้าที่ของออร์แกเนลล์สำคัญ",
    highlights: ["สำรวจเซลล์พืชและเซลล์สัตว์ 3D", "ออร์แกเนลล์ 12 ชนิดพร้อมไรโบโซม", "บทเรียนระบบเอนโดเมมเบรน"],
  },
  {
    id: "math",
    title: "Mathematics & Calculus",
    thaiTitle: "คณิตศาสตร์และแคลคูลัส 2D",
    path: "/math",
    icon: Calculator,
    badge: "Mafs 2D Canvas",
    badgeColor: "text-sky-400 bg-sky-950/50 border-sky-800/60",
    description: "กระดานวาดกราฟฟังก์ชันคณิตศาสตร์ 2 มิติเชิงโต้ตอบ เส้นสัมผัส และปริพันธ์",
    highlights: ["วาดกราฟคาร์ทีเซียนแบบเรียลไทม์", "ความชันเส้นสัมผัสและแคลคูลัส", "สมการ KaTeX และประเมินค่าตัวแปร"],
  },
  {
    id: "cs",
    title: "Computer Science Studio",
    thaiTitle: "วิทยาการคอมพิวเตอร์และตรรกะ",
    path: "/cs",
    icon: Binary,
    badge: "Logic Gates",
    badgeColor: "text-indigo-400 bg-indigo-950/50 border-indigo-800/60",
    description: "แซนด์บ็อกซ์เกตตรรกะดิจิทัล วงจรบวกไบนารี และการวิเคราะห์ขั้นตอนวิธี",
    highlights: ["ประกอบเกต AND, OR, NOT, XOR, NAND", "วงจรบวกไบนารี Half & Full Adder", "การวิเคราะห์สัญกรณ์ Big-O"],
  },
  {
    id: "thai",
    title: "Thai Linguistics & Practice",
    thaiTitle: "สัทศาสตร์ภาษาไทยและการฝึกฝน",
    path: "/thai",
    icon: Languages,
    badge: "Phonology Engine",
    badgeColor: "text-rose-400 bg-rose-950/50 border-rose-800/60",
    description: "ระบบแยกพยางค์ อักษรสามหมู่ไตรยางศ์ เส้นเสียงวรรณยุกต์ และคลังแบบฝึกหัด",
    highlights: ["กฎการผันเสียงวรรณยุกต์คำเป็น-คำตาย", "เส้นเสียงวรรณยุกต์ 5 เสียง SVG", "คลังแบบฝึกหัดตรวจคำตอบอัตโนมัติ"],
  },
];

// Mapping icon names to Lucide icon components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Orbit,
  Compass,
  Globe,
  Sun,
  Telescope,
  Activity,
  Layers,
  Atom,
  Gauge,
  Rocket,
  Flame,
  Radio,
  Eye,
  Sparkles,
  Zap,
  Boxes,
  FlaskConical,
  Dna,
  Calculator,
  Binary,
  GitBranch,
  Code,
  Languages,
  BookOpen,
  GraduationCap,
};

function renderItemIcon(iconName: string, className = "h-4 w-4") {
  const IconComponent = ICON_MAP[iconName] || Atom;
  return <IconComponent className={className} />;
}

export function StudioHub() {
  const [activeTab, setActiveTab] = useState<"studios" | "simulations">("studios");
  const [activeCategory, setActiveCategory] = useState<SimulationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // State for active live simulation modal player
  const [activeSim, setActiveSim] = useState<{
    item: SimulationItem;
    embedUrl: string;
  } | null>(null);

  const filteredItems = useMemo(() => {
    return filterSimulations(SIMULATION_ITEMS, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  const handleLaunchSimulation = (item: SimulationItem) => {
    const embedUrl = getSimulationEmbedUrl(item);
    if (embedUrl) {
      setActiveSim({ item, embedUrl });
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Clean & Confident Header */}
      <header className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400 uppercase">
          <span>Interactive Science Platform</span>
          <span>•</span>
          <span className="text-cyan-400">OpenLyceum & WebGL Fleet</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-medium text-neutral-100 tracking-tight">
          ห้องปฏิบัติการและแบบจำลองวิทยาศาสตร์
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-2xl leading-relaxed">
          แพลตฟอร์มการเรียนรู้และทดลองวิทยาศาสตร์เชิงโต้ตอบระดับสูง รวมห้องปฏิบัติการ 3D WebGL
          และคลังซิมูเลชัน 61 รายการที่เปิดทดลองได้ทันที
        </p>
      </header>

      {/* Main View Mode Switcher (Two Clean Tabs) */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("studios")}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-sans transition-all ${
            activeTab === "studios"
              ? "bg-neutral-800 text-neutral-100 font-medium shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          ห้องปฏิบัติการหลัก (8 Studios)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("simulations")}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-sans transition-all flex items-center gap-2 ${
            activeTab === "simulations"
              ? "bg-neutral-800 text-cyan-300 font-medium shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <span>คลังแบบจำลองทั้งหมด</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 text-cyan-400 border border-neutral-800">
            60+ ซิมูเลชัน
          </span>
        </button>
      </div>

      {/* VIEW 1: Core 8 Studios (Clean, Spacious, Beautiful Cards) */}
      {activeTab === "studios" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_STUDIOS.map((studio) => {
              const Icon = studio.icon;
              return (
                <div
                  key={studio.id}
                  className="flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700/80 p-6 transition-all duration-200"
                >
                  <div className="space-y-4">
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
                        <Icon className="h-5 w-5 stroke-[1.8]" />
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${studio.badgeColor}`}
                      >
                        {studio.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="text-base sm:text-lg font-heading font-medium text-neutral-100">
                        {studio.thaiTitle}
                      </h2>
                      <span className="text-xs font-mono text-neutral-500 block mt-0.5">
                        {studio.title}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                      {studio.description}
                    </p>

                    {/* Highlights Bullet List */}
                    <ul className="space-y-1.5 pt-2 border-t border-neutral-850 text-xs font-sans text-neutral-400">
                      {studio.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-cyan-400 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Launch Studio Action */}
                  <div className="pt-5 mt-4">
                    <Link
                      href={studio.path}
                      className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-medium bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 text-neutral-200 hover:text-white transition-colors"
                    >
                      <span>เข้าสู่ห้องปฏิบัติการ</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* VIEW 2: Complete Simulation Fleet (Searchable & Directly Playable) */}
      {activeTab === "simulations" && (
        <section className="space-y-6">
          {/* Search & Category Filter Controls */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อแบบจำลอง เช่น The Ramp, Doppler, วงโคจร..."
                className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm font-sans bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-700 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-neutral-500 hover:text-neutral-300"
                  aria-label="ล้างคำค้นหา"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-800">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-sans transition-all ${
                      isActive
                        ? "bg-neutral-800 text-cyan-300 font-medium"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                    }`}
                  >
                    <span>{cat.thaiLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulation Count */}
          <div className="text-xs text-neutral-400">
            พบ {filteredItems.length} แบบจำลองทางวิทยาศาสตร์
          </div>

          {/* Clean Simulation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const embedUrl = getSimulationEmbedUrl(item);

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-neutral-800/70 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700/80 p-5 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                        {renderItemIcon(item.iconName)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-neutral-400 bg-neutral-900 border-neutral-800">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500 border border-neutral-800">
                          {item.source}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-heading font-medium text-neutral-100">
                        {item.thaiTitle}
                      </h3>
                      <span className="text-xs font-mono text-neutral-500 block truncate">
                        {item.title}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.thaiDescription}
                    </p>
                  </div>

                  {/* Action row */}
                  <div className="pt-4 mt-4 border-t border-neutral-850 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-sans">
                      {item.categoryLabel}
                    </span>

                    {embedUrl ? (
                      <button
                        type="button"
                        onClick={() => handleLaunchSimulation(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950/60 border border-cyan-800 text-cyan-300 hover:bg-cyan-900/80 transition-colors"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>เปิดจำลองทันที</span>
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-850 border border-neutral-750 text-neutral-300 hover:text-white transition-colors"
                      >
                        <span>เปิดห้องแล็บ</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Live Interactive Simulation Modal Player */}
      <SimulationModalPlayer
        item={activeSim ? activeSim.item : null}
        embedUrl={activeSim ? activeSim.embedUrl : null}
        onClose={() => setActiveSim(null)}
      />
    </div>
  );
}
