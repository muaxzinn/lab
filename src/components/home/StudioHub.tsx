"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowUpRight,
  ChevronRight,
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
} from "lucide-react";
import {
  CATEGORIES,
  SIMULATION_ITEMS,
  filterSimulations,
  type SimulationCategory,
  type SimulationItem,
} from "@/lib/simulation-catalog";

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

function renderItemIcon(iconName: string, className = "h-5 w-5") {
  const IconComponent = ICON_MAP[iconName] || Atom;
  return <IconComponent className={className} />;
}

function getBadgeStyle(badge: SimulationItem["badge"]) {
  switch (badge) {
    case "3D WebGL":
      return "text-cyan-400 bg-cyan-950/40 border-cyan-800/50";
    case "Interactive Lab":
      return "text-emerald-400 bg-emerald-950/40 border-emerald-800/50";
    case "Simulation":
      return "text-amber-400 bg-amber-950/40 border-amber-800/50";
    case "Guided Inquiry":
      return "text-purple-400 bg-purple-950/40 border-purple-800/50";
    default:
      return "text-neutral-400 bg-neutral-900 border-neutral-800";
  }
}

export function StudioHub() {
  const [activeCategory, setActiveCategory] = useState<SimulationCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return filterSimulations(SIMULATION_ITEMS, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  const activeCategoryMeta = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  }, [activeCategory]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Minimalist Studio Header */}
      <header className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400 uppercase">
          <span>Interactive Learning Architecture</span>
          <span>•</span>
          <span className="text-cyan-400">Scientific Simulation Fleet</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-neutral-100 tracking-tight">
          ห้องปฏิบัติการและแบบจำลองวิทยาศาสตร์เชิงโต้ตอบ
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-3xl leading-relaxed">
          รวมศูนย์ซิมูเลชันทางวิทยาศาสตร์ 61 รายการจาก OpenLyceum และ 8 เวิร์กเบนช์ 3D WebGL,
          ฟิสิกส์จลนศาสตร์, เคมีเชิงคำนวณ, ชีววิทยา และตรรกศาสตร์ดิจิทัล จัดหมวดหมู่อย่างเป็นระบบ
        </p>
      </header>

      {/* Search Bar & Category Navigation Controls */}
      <div className="space-y-4">
        {/* Minimal Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อการทดลอง, หัวข้อ หรือทฤษฎี..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm font-sans bg-neutral-900/60 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-700/80 focus:ring-1 focus:ring-cyan-700/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-neutral-500 hover:text-neutral-300 transition-colors"
              aria-label="ล้างคำค้นหา"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Minimal Category Tabs (Segmented Pills) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-800/60">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-sans transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-neutral-800 text-cyan-300 font-medium shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60"
                }`}
              >
                <span>{cat.thaiLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Description & Count */}
      <div className="flex items-center justify-between text-xs text-neutral-400 border-l-2 border-cyan-800/80 pl-3">
        <span>{activeCategoryMeta.description}</span>
        <span className="font-mono text-neutral-500">
          {filteredItems.length} รายการ
        </span>
      </div>

      {/* Clean Minimalist Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-neutral-800/60 bg-neutral-900/20 text-neutral-400 text-sm">
          ไม่พบรายการจำลองที่ตรงกับคำค้นหา &ldquo;{searchQuery}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="group flex flex-col justify-between rounded-xl border border-neutral-800/70 bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-neutral-700/80 p-5 transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Header row: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-cyan-300 group-hover:border-cyan-900/60 transition-colors">
                    {renderItemIcon(item.iconName, "h-4 w-4 stroke-[1.8]")}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getBadgeStyle(
                        item.badge
                      )}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-500">
                      {item.source}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-base font-heading font-medium text-neutral-100 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h2>
                  <span className="text-xs font-sans text-neutral-400 block mt-0.5">
                    {item.thaiTitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs font-sans text-neutral-400 leading-relaxed line-clamp-2">
                  {item.thaiDescription}
                </p>
              </div>

              {/* Action footer */}
              <div className="pt-4 mt-4 border-t border-neutral-800/50 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-cyan-400 transition-colors">
                <span className="text-[11px]">{item.categoryLabel}</span>
                <div className="flex items-center gap-1">
                  <span>เข้าสู่ห้องทดลอง</span>
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
