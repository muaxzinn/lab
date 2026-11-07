"use client";

import React, { useState, useMemo } from "react";
import {
  Atom,
  Search,
  Sparkles,
  Info,
  Maximize2,
  X,
  Layers,
} from "lucide-react";
import {
  PERIODIC_TABLE_ELEMENTS,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type ChemicalElement,
  type ElementCategory,
  type ElementBlock,
} from "@/lib/periodic-table-data";

type ColorMode = "category" | "electronegativity" | "block";

export function PeriodicTableViewer() {
  const [selectedElement, setSelectedElement] = useState<ChemicalElement>(
    PERIODIC_TABLE_ELEMENTS[5] // Carbon by default
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | "all">("all");
  const [selectedBlock, setSelectedBlock] = useState<ElementBlock | "all">("all");
  const [colorMode, setColorMode] = useState<ColorMode>("category");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered elements for highlighting/dimming
  const activeElementsSet = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const set = new Set<number>();

    for (const el of PERIODIC_TABLE_ELEMENTS) {
      const matchesSearch =
        !q ||
        el.symbol.toLowerCase().includes(q) ||
        el.name.toLowerCase().includes(q) ||
        el.thaiName.toLowerCase().includes(q) ||
        el.atomicNumber.toString() === q ||
        el.category.toLowerCase().includes(q) ||
        el.categoryThai.includes(q);

      const matchesCat = selectedCategory === "all" || el.category === selectedCategory;
      const matchesBlock = selectedBlock === "all" || el.block === selectedBlock;

      if (matchesSearch && matchesCat && matchesBlock) {
        set.add(el.atomicNumber);
      }
    }
    return set;
  }, [searchQuery, selectedCategory, selectedBlock]);

  // Color calculation helper
  const getElementStyle = (el: ChemicalElement) => {
    const isMatching = activeElementsSet.has(el.atomicNumber);
    const isSelected = selectedElement.atomicNumber === el.atomicNumber;

    if (colorMode === "electronegativity") {
      if (el.electronegativity === null) {
        return {
          backgroundColor: isMatching ? "rgba(38, 38, 38, 0.6)" : "rgba(23, 23, 23, 0.3)",
          borderColor: isSelected ? "#38bdf8" : "rgba(82, 82, 82, 0.4)",
          color: isMatching ? "#a3a3a3" : "#525252",
        };
      }
      // Pauling scale roughly 0.7 (Fr) to 3.98 (F)
      const ratio = Math.max(0, Math.min(1, (el.electronegativity - 0.7) / (4.0 - 0.7)));
      // Interpolate from deep cyan (0.7) to emerald (2.0) to vivid rose (3.98)
      const r = Math.round(20 + ratio * 220);
      const g = Math.round(180 - ratio * 120);
      const b = Math.round(240 - ratio * 180);
      const bgAlpha = isMatching ? 0.35 : 0.08;
      const borderAlpha = isSelected ? 1 : isMatching ? 0.6 : 0.2;

      return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${bgAlpha})`,
        borderColor: isSelected ? "#38bdf8" : `rgba(${r}, ${g}, ${b}, ${borderAlpha})`,
        color: isMatching ? "#f5f5f5" : "#737373",
      };
    }

    if (colorMode === "block") {
      const blockColors: Record<ElementBlock, { r: number; g: number; b: number }> = {
        s: { r: 244, g: 63, b: 94 },
        p: { r: 59, g: 130, b: 246 },
        d: { r: 234, g: 179, b: 8 },
        f: { r: 168, g: 85, b: 247 },
      };
      const { r, g, b } = blockColors[el.block];
      const bgAlpha = isMatching ? 0.28 : 0.06;
      const borderAlpha = isSelected ? 1 : isMatching ? 0.5 : 0.15;
      return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${bgAlpha})`,
        borderColor: isSelected ? "#38bdf8" : `rgba(${r}, ${g}, ${b}, ${borderAlpha})`,
        color: isMatching ? "#fafafa" : "#737373",
      };
    }

    // Default category mode
    if (!isMatching) {
      return {
        backgroundColor: "rgba(23, 23, 23, 0.3)",
        borderColor: "rgba(38, 38, 38, 0.4)",
        color: "#525252",
        opacity: 0.35,
      };
    }
    return {
      borderColor: isSelected ? "#38bdf8" : undefined,
    };
  };

  // Grid positioning for an element
  const getGridPosition = (el: ChemicalElement) => {
    // Lanthanides (57 to 71) -> Row 9, Col 3 to 17
    if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
      return {
        gridRow: 9,
        gridColumn: el.atomicNumber - 57 + 3,
      };
    }
    // Actinides (89 to 103) -> Row 10, Col 3 to 17
    if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
      return {
        gridRow: 10,
        gridColumn: el.atomicNumber - 89 + 3,
      };
    }
    // Standard rows 1 to 7
    return {
      gridRow: el.period,
      gridColumn: el.group,
    };
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-cyan-400">
              <Atom className="h-5 w-5 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-semibold text-lg text-neutral-100">
                  Interactive Periodic Table of Elements
                </h2>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/80 text-cyan-300">
                  FEAT-05 &bull; IUPAC 118
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                ตารางธาตุมาตรฐานสากล 118 ธาตุ พร้อมการจัดเรียงอิเล็กตรอน เวเลนซ์ พลังงาน และแนวโน้มทางเคมี
              </p>
            </div>
          </div>

          {/* Quick View Button for mobile or detail expand */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-mono text-neutral-200 transition-colors self-start md:self-auto"
          >
            <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Full Element Inspector</span>
          </button>
        </div>

        {/* Search, Filter & Color Mode Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Symbol (e.g. Au), Name, Thai (ทองคำ), or #79..."
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear element search"
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Color Mode Switcher */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 self-start">
            <span className="text-[11px] font-mono text-neutral-400 px-2 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Color Mode:
            </span>
            <button
              type="button"
              onClick={() => setColorMode("category")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                colorMode === "category"
                  ? "bg-neutral-800 text-neutral-100 font-medium border border-neutral-700 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Categories
            </button>
            <button
              type="button"
              onClick={() => setColorMode("electronegativity")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                colorMode === "electronegativity"
                  ? "bg-neutral-800 text-neutral-100 font-medium border border-neutral-700 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Electronegativity
            </button>
            <button
              type="button"
              onClick={() => setColorMode("block")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                colorMode === "block"
                  ? "bg-neutral-800 text-neutral-100 font-medium border border-neutral-700 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Blocks (s, p, d, f)
            </button>
          </div>

          {/* Block Quick Filters */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 self-start">
            <span className="text-[11px] font-mono text-neutral-400 px-2 flex items-center gap-1">
              <Layers className="h-3 w-3 text-emerald-400" />
              Block:
            </span>
            {(["all", "s", "p", "d", "f"] as const).map((block) => (
              <button
                key={block}
                type="button"
                onClick={() => setSelectedBlock(block)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors uppercase ${
                  selectedBlock === block
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 font-semibold"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {block}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-cyan-950/80 text-cyan-300 border border-cyan-700/80 font-medium"
                : "bg-neutral-950 text-neutral-400 border border-neutral-850 hover:bg-neutral-900 hover:text-neutral-200"
            }`}
          >
            All Categories ({PERIODIC_TABLE_ELEMENTS.length})
          </button>
          {(Object.keys(CATEGORY_LABELS) as ElementCategory[]).map((cat) => {
            const isSel = selectedCategory === cat;
            const style = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(isSel ? "all" : cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-colors border ${
                  isSel
                    ? `${style.badge} font-semibold shadow-sm`
                    : "bg-neutral-950 text-neutral-400 border-neutral-850 hover:bg-neutral-900 hover:text-neutral-200"
                }`}
              >
                {CATEGORY_LABELS[cat].en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid & Preview Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Periodic Table Grid Container (xl:col-span-9) */}
        <div className="xl:col-span-9 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4 sm:p-5 overflow-x-auto shadow-inner">
          <div
            className="grid gap-1.5 min-w-[760px]"
            style={{
              gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
              gridTemplateRows: "repeat(10, minmax(0, auto))",
            }}
          >
            {/* Elements 1 - 118 */}
            {PERIODIC_TABLE_ELEMENTS.map((el) => {
              const isSelected = selectedElement.atomicNumber === el.atomicNumber;
              const pos = getGridPosition(el);
              const customStyle = getElementStyle(el);
              const catClass = colorMode === "category" ? CATEGORY_COLORS[el.category] : null;

              return (
                <button
                  key={el.atomicNumber}
                  type="button"
                  aria-label={`${el.name} (${el.symbol}), atomic number ${el.atomicNumber}, ${el.categoryThai}`}
                  onClick={() => setSelectedElement(el)}
                  style={{
                    gridColumn: pos.gridColumn,
                    gridRow: pos.gridRow,
                    ...customStyle,
                  }}
                  className={`group relative flex flex-col items-center justify-between p-1 rounded-md text-left transition-all aspect-square border ${
                    isSelected
                      ? "ring-2 ring-cyan-400 ring-offset-1 ring-offset-neutral-950 z-20 shadow-lg scale-105"
                      : "hover:scale-105 hover:z-10 hover:border-neutral-500"
                  } ${catClass ? `${catClass.bg} ${catClass.border} ${catClass.text}` : ""}`}
                >
                  <div className="w-full flex justify-between items-center text-[9px] font-mono opacity-80 leading-none">
                    <span>{el.atomicNumber}</span>
                    <span className="text-[8px] opacity-60 hidden sm:inline">
                      {el.electronegativity !== null ? el.electronegativity.toFixed(1) : ""}
                    </span>
                  </div>

                  <span className="text-xs sm:text-sm font-heading font-bold tracking-tight">
                    {el.symbol}
                  </span>

                  <span className="text-[8px] font-sans truncate w-full text-center opacity-85 leading-none">
                    {el.thaiName}
                  </span>
                </button>
              );
            })}

            {/* Lanthanide Series Placeholder Block in Period 6, Group 3 */}
            <div
              style={{ gridRow: 6, gridColumn: 3 }}
              className="flex flex-col items-center justify-center p-1 rounded-md border border-dashed border-indigo-700/60 bg-indigo-950/20 text-indigo-400 text-center"
            >
              <span className="text-[9px] font-mono">57-71</span>
              <span className="text-[10px] font-heading font-bold">La-Lu</span>
            </div>

            {/* Actinide Series Placeholder Block in Period 7, Group 3 */}
            <div
              style={{ gridRow: 7, gridColumn: 3 }}
              className="flex flex-col items-center justify-center p-1 rounded-md border border-dashed border-pink-700/60 bg-pink-950/20 text-pink-400 text-center"
            >
              <span className="text-[9px] font-mono">89-103</span>
              <span className="text-[10px] font-heading font-bold">Ac-Lr</span>
            </div>

            {/* Empty Spacer Row 8 between main table and lanthanides */}
            <div style={{ gridRow: 8, gridColumn: "1 / span 18" }} className="h-4" />
          </div>

          {/* Table Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-emerald-500/80 inline-block" />
                Reactive Nonmetal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-purple-500/80 inline-block" />
                Noble Gas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-rose-500/80 inline-block" />
                Alkali Metal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-sky-500/80 inline-block" />
                Transition Metal
              </span>
            </div>
            <span className="text-neutral-500">
              Showing {activeElementsSet.size} of 118 elements
            </span>
          </div>
        </div>

        {/* Selected Element Quick Inspector Card (xl:col-span-3) */}
        <div className="xl:col-span-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 space-y-5 sticky top-36">
          {/* Header of Inspector */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
                Element Inspector
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-neutral-400 hover:text-cyan-400 p-1"
              title="Full Modal View"
              aria-label="Open Full Element Inspector modal"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Large Hero Symbol */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
            <div
              className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ backgroundColor: CATEGORY_COLORS[selectedElement.category]?.text ?? "#00f0ff" }}
            />
            <div className="w-full flex justify-between text-xs font-mono text-neutral-400 px-1">
              <span>Z = {selectedElement.atomicNumber}</span>
              <span>{selectedElement.atomicMass.toFixed(3)} u</span>
            </div>
            <span className="text-5xl font-heading font-black tracking-tight text-neutral-100">
              {selectedElement.symbol}
            </span>
            <div>
              <p className="text-base font-heading font-semibold text-neutral-200">
                {selectedElement.name}
              </p>
              <p className="text-xs font-sans text-neutral-400">
                {selectedElement.thaiName}
              </p>
            </div>
            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[selectedElement.category]?.badge}`}
            >
              {selectedElement.categoryThai}
            </span>
          </div>

          {/* Bohr Shell Concentric Rings Visualizer */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Atom className="h-3.5 w-3.5 text-cyan-400" />
                Bohr Electron Shells
              </span>
              <span className="text-neutral-500">
                {selectedElement.electronsPerShell.length} Shells
              </span>
            </div>

            {/* SVG Bohr Orbital Rings */}
            <div className="relative flex items-center justify-center py-2">
              <svg viewBox="0 0 160 160" className="h-36 w-36 overflow-visible">
                {/* Nucleus */}
                <circle cx="80" cy="80" r="10" fill="#0284c7" />
                <text
                  x="80"
                  y="83"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#ffffff"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  +{selectedElement.atomicNumber}
                </text>

                {/* Shell Rings and Electrons */}
                {selectedElement.electronsPerShell.map((count, shellIdx) => {
                  const radius = 18 + shellIdx * 9;
                  const step = (2 * Math.PI) / count;

                  return (
                    <g key={shellIdx}>
                      {/* Orbital Ring */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke="rgba(56, 189, 248, 0.25)"
                        strokeWidth="1"
                        strokeDasharray={shellIdx % 2 === 1 ? "2,2" : undefined}
                      />
                      {/* Electrons on this shell */}
                      {Array.from({ length: count }).map((_, electronIdx) => {
                        const angle = electronIdx * step;
                        const ex = 80 + radius * Math.cos(angle);
                        const ey = 80 + radius * Math.sin(angle);
                        return (
                          <circle
                            key={electronIdx}
                            cx={ex}
                            cy={ey}
                            r="2.2"
                            fill="#38bdf8"
                            stroke="#0f172a"
                            strokeWidth="0.5"
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Shell Breakdown Badges */}
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-neutral-400 pt-1">
              {selectedElement.electronsPerShell.map((count, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                >
                  {count}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Properties Table */}
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-neutral-850">
              <span className="text-neutral-500">Electron Config</span>
              <span className="text-neutral-200 text-right">{selectedElement.electronConfiguration}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-850">
              <span className="text-neutral-500">Electronegativity</span>
              <span className="text-neutral-200">
                {selectedElement.electronegativity ?? "N/A (Pauling)"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-850">
              <span className="text-neutral-500">Standard State</span>
              <span className="text-neutral-200 capitalize">{selectedElement.standardState}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-850">
              <span className="text-neutral-500">Oxidation States</span>
              <span className="text-neutral-200">{selectedElement.oxidationStates}</span>
            </div>
          </div>

          {/* Thai Summary */}
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-850 text-xs font-sans text-neutral-400 leading-relaxed">
            {selectedElement.summaryThai}
          </div>
        </div>
      </div>

      {/* Comprehensive Modal Inspector */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-cyan-400">
                  <Atom className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-neutral-100">
                    {selectedElement.name} ({selectedElement.symbol}) &bull; {selectedElement.thaiName}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">
                    Atomic Number: {selectedElement.atomicNumber} &bull; Period {selectedElement.period}, Group {selectedElement.group} ({selectedElement.block}-block)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Element Inspector modal"
                className="h-8 w-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2">
                <p className="text-neutral-400 font-semibold uppercase">Atomic & Electronic Properties</p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Atomic Mass:</span>
                    <span className="text-neutral-200">{selectedElement.atomicMass} u</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Electron Configuration:</span>
                    <span className="text-neutral-200">{selectedElement.electronConfiguration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Electrons per Shell:</span>
                    <span className="text-neutral-200">{selectedElement.electronsPerShell.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Electronegativity:</span>
                    <span className="text-neutral-200">{selectedElement.electronegativity ?? "None"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Oxidation States:</span>
                    <span className="text-neutral-200">{selectedElement.oxidationStates}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2">
                <p className="text-neutral-400 font-semibold uppercase">Physical & Thermal Properties</p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Standard State:</span>
                    <span className="text-neutral-200 capitalize">{selectedElement.standardState}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Density at STP:</span>
                    <span className="text-neutral-200">
                      {selectedElement.density !== null ? `${selectedElement.density} g/cm³` : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Melting Point:</span>
                    <span className="text-neutral-200">
                      {selectedElement.meltingPoint !== null
                        ? `${selectedElement.meltingPoint} K (${(selectedElement.meltingPoint - 273.15).toFixed(1)} °C)`
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Boiling Point:</span>
                    <span className="text-neutral-200">
                      {selectedElement.boilingPoint !== null
                        ? `${selectedElement.boilingPoint} K (${(selectedElement.boilingPoint - 273.15).toFixed(1)} °C)`
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Discovery History */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-1.5 text-xs">
              <span className="font-mono text-neutral-400 font-semibold uppercase block">
                History & Discovery
              </span>
              <p className="font-sans text-neutral-300">
                Discovered in <strong className="font-mono text-cyan-300">{selectedElement.yearDiscovered}</strong> by{" "}
                <strong className="font-sans text-neutral-100">{selectedElement.discoveredBy}</strong>.
              </p>
            </div>

            {/* Descriptions */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-1 text-xs">
                <span className="font-mono text-neutral-500 text-[11px] block">English Scientific Summary</span>
                <p className="font-sans text-neutral-300 leading-relaxed">{selectedElement.summary}</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-1 text-xs">
                <span className="font-mono text-neutral-500 text-[11px] block">คำอธิบายทางวิทยาศาสตร์ภาษาไทย</span>
                <p className="font-sans text-neutral-200 leading-relaxed">{selectedElement.summaryThai}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
