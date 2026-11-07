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
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-2 sm:px-4">
      {/* Clean & Confident Header with tablet/phone responsive scaling */}
      <header className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-neutral-400 uppercase">
          <span>Interactive Science Platform</span>
          <span>•</span>
          <span className="text-cyan-400">OpenLyceum & WebGL Fleet</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-neutral-100 tracking-tight leading-tight">
          ห้องปฏิบัติการและแบบจำลองวิทยาศาสตร์
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-sans max-w-3xl leading-relaxed">
          แพลตฟอร์มการเรียนรู้และทดลองวิทยาศาสตร์เชิงโต้ตอบระดับสูง รวมห้องปฏิบัติการ 3D WebGL
          และคลังซิมูเลชัน 61 รายการที่เปิดทดลองได้ทันที
        </p>
      </header>

      {/* Main View Mode Switcher (Touch-friendly for tablets and mobile) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("studios")}
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-sm sm:text-base font-sans transition-all min-h-[48px] flex items-center justify-center ${
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
          className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl text-sm sm:text-base font-sans transition-all flex items-center justify-center gap-2 min-h-[48px] ${
            activeTab === "simulations"
              ? "bg-neutral-800 text-cyan-300 font-medium shadow-xs"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <span>คลังแบบจำลองทั้งหมด</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-950 text-cyan-400 border border-neutral-800">
            60+ ซิมูเลชัน
          </span>
        </button>
      </div>

      {/* VIEW 1: Core 8 Studios (Spacious & High-Readability for Tablet & Mobile) */}
      {activeTab === "studios" && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
            {CORE_STUDIOS.map((studio) => {
              const Icon = studio.icon;
              return (
                <div
                  key={studio.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-neutral-700/80 p-6 sm:p-7 md:p-8 transition-all duration-200 shadow-sm"
                >
                  <div className="space-y-5">
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200">
                        <Icon className="h-6 w-6 stroke-[1.8]" />
                      </div>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full border font-medium ${studio.badgeColor}`}
                      >
                        {studio.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-100">
                        {studio.thaiTitle}
                      </h2>
                      <span className="text-xs sm:text-sm font-mono text-neutral-400 block mt-1">
                        {studio.title}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base font-sans text-neutral-300 leading-relaxed">
                      {studio.description}
                    </p>

                    {/* Highlights Bullet List with enlarged text for tablets */}
                    <ul className="space-y-2.5 pt-3 border-t border-neutral-800 text-sm sm:text-base font-sans text-neutral-300">
                      {studio.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Launch Studio Action (Large Touch Target) */}
                  <div className="pt-6 mt-4">
                    <Link
                      href={studio.path}
                      className="inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-sans font-medium bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 text-neutral-100 hover:text-white transition-colors min-h-[50px] shadow-xs active:scale-[0.99]"
                    >
                      <span>เข้าสู่ห้องปฏิบัติการ</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาแบบจำลอง เช่น The Ramp, Doppler, วงโคจร..."
                className="w-full pl-12 pr-11 py-3.5 rounded-2xl text-base font-sans bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-all min-h-[50px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-200"
                  aria-label="ล้างคำค้นหา"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Pills with touch-scrolling & large tap targets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-neutral-800">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm sm:text-base font-sans transition-all min-h-[44px] ${
                      isActive
                        ? "bg-neutral-800 text-cyan-300 font-medium shadow-xs"
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
          <div className="text-sm sm:text-base text-neutral-400 font-sans">
            พบ <span className="text-neutral-200 font-medium font-mono">{filteredItems.length}</span> แบบจำลองทางวิทยาศาสตร์
          </div>

          {/* Clean Simulation Cards Grid with spacious typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const embedUrl = getSimulationEmbedUrl(item);

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/30 hover:bg-neutral-900/60 hover:border-neutral-700/80 p-6 transition-all shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200">
                        {renderItemIcon(item.iconName, "h-5 w-5")}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full border text-neutral-400 bg-neutral-900 border-neutral-800">
                          {item.badge}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 border border-neutral-800">
                          {item.source}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-heading font-semibold text-neutral-100">
                        {item.thaiTitle}
                      </h3>
                      <span className="text-xs sm:text-sm font-mono text-neutral-400 block truncate mt-0.5">
                        {item.title}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-sans text-neutral-300 line-clamp-2 leading-relaxed">
                      {item.thaiDescription}
                    </p>
                  </div>

                  {/* Action row with large touch buttons */}
                  <div className="pt-5 mt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm text-neutral-400 font-sans">
                      {item.categoryLabel}
                    </span>

                    {embedUrl ? (
                      <button
                        type="button"
                        onClick={() => handleLaunchSimulation(item)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-medium bg-cyan-950/70 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 transition-colors min-h-[46px] active:scale-[0.99]"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>เปิดจำลองทันที</span>
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans font-medium bg-neutral-850 border border-neutral-750 text-neutral-200 hover:text-white transition-colors min-h-[46px] active:scale-[0.99]"
                      >
                        <span>เปิดห้องแล็บ</span>
                        <ArrowRight className="h-4 w-4" />
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
