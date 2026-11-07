"use client";

import React, { useState } from "react";
import {
  Dna,
  Layers,
  AlertCircle,
  Eye,
  EyeOff,
  Split,
  Zap,
} from "lucide-react";

export type CellType = "plant" | "animal";

export interface Organelle {
  id: string;
  name: string;
  thaiName: string;
  presence: "both" | "plant-only" | "animal-only";
  color: string;
  borderColor: string;
  glowColor: string;
  category: "genetic" | "energy" | "endomembrane" | "structural";
  function: string;
  functionThai: string;
  structuralDetails: string;
  examKeyPointThai: string;
  coordinates: {
    plant: { cx: number; cy: number; r?: number; rx?: number; ry?: number; rotation?: number };
    animal: { cx: number; cy: number; r?: number; rx?: number; ry?: number; rotation?: number };
  };
}

export const ORGANELLES: Organelle[] = [
  {
    id: "nucleus",
    name: "Nucleus & Nucleolus",
    thaiName: "นิวเคลียสและนิวคลีโอลัส",
    presence: "both",
    color: "#818cf8",
    borderColor: "#4f46e5",
    glowColor: "rgba(129, 140, 248, 0.4)",
    category: "genetic",
    function: "Houses genomic DNA, regulates gene expression, and synthesizes ribosomal RNA (rRNA) inside the nucleolus.",
    functionThai: "บรรจุสารพันธุกรรม (DNA) ควบคุมการแสดงออกของยีน และสังเคราะห์ rRNA ภายในนิวคลีโอลัส",
    structuralDetails: "Double nuclear membrane with nuclear pores, chromatin fibers, and dense nucleolus core.",
    examKeyPointThai: "เยื่อหุ้มนิวเคลียสเป็นเยื่อ 2 ชั้น (Double membrane) มีรูนิวเคลียร์พอร์ควบคุมการเข้าออกของ mRNA",
    coordinates: {
      plant: { cx: 210, cy: 190, r: 42 },
      animal: { cx: 200, cy: 190, r: 45 },
    },
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    thaiName: "ไมโทคอนเดรีย",
    presence: "both",
    color: "#f87171",
    borderColor: "#dc2626",
    glowColor: "rgba(248, 113, 113, 0.4)",
    category: "energy",
    function: "Powerhouse of the cell; produces ATP energy currency through the Krebs cycle and oxidative phosphorylation.",
    functionThai: "แหล่งผลิตพลังงานหลักของเซลล์ สังเคราะห์โมเลกุล ATP ผ่านวัฏจักรเครบส์และกระบวนการออกซิเดทีฟฟอสฟอรีเลชัน",
    structuralDetails: "Outer membrane, folded inner cristae membrane increasing surface area, and mitochondrial matrix with mtDNA.",
    examKeyPointThai: "มีดีเอ็นเอและไรโบโซม 70S ของตนเอง ตามทฤษฎี Endosymbiotic Theory สามารถจำลองตัวเองได้",
    coordinates: {
      plant: { cx: 120, cy: 260, rx: 26, ry: 15, rotation: -25 },
      animal: { cx: 120, cy: 130, rx: 28, ry: 16, rotation: 35 },
    },
  },
  {
    id: "chloroplast",
    name: "Chloroplast",
    thaiName: "คลอโรพลาสต์",
    presence: "plant-only",
    color: "#4ade80",
    borderColor: "#16a34a",
    glowColor: "rgba(74, 222, 128, 0.4)",
    category: "energy",
    function: "Conducts photosynthesis by absorbing sunlight via chlorophyll pigments to convert CO2 and water into glucose.",
    functionThai: "ทำหน้าที่สังเคราะห์ด้วยแสง ดูดกลืนพลังงานแสงผ่านคลอโรฟิลล์เพื่อเปลี่ยน CO2 และน้ำเป็นน้ำตาลกลูโคส",
    structuralDetails: "Double membrane enclosing stroma fluid and stacked thylakoid discs (grana).",
    examKeyPointThai: "พบเฉพาะในเซลล์พืชและสาหร่าย ไม่พบในเซลล์สัตว์ มีเอนไซม์ RuBisCO อยู่ในสโตรมา",
    coordinates: {
      plant: { cx: 290, cy: 120, rx: 30, ry: 18, rotation: 15 },
      animal: { cx: 0, cy: 0, rx: 0, ry: 0 },
    },
  },
  {
    id: "vacuole",
    name: "Vacuole (Central Vacuole)",
    thaiName: "แวคิวโอล (เซนทรัลแวคิวโอล)",
    presence: "both",
    color: "#38bdf8",
    borderColor: "#0284c7",
    glowColor: "rgba(56, 189, 248, 0.4)",
    category: "structural",
    function: "Stores water, ions, nutrients, and waste products; generates turgor pressure against the plant cell wall.",
    functionThai: "กักเก็บน้ำ แร่ธาตุ สารอาหาร และสร้างแรงดันเต่ง (Turgor pressure) ดันผนังเซลล์ให้พืชตั้งตรง",
    structuralDetails: "Enclosed by a specialized selectively permeable tonoplast membrane.",
    examKeyPointThai: "ในเซลล์พืชมีขนาดใหญ่มากเรียกว่า Central Vacuole ส่วนในเซลล์สัตว์มีขนาดเล็กหรือไม่มีเลย",
    coordinates: {
      plant: { cx: 150, cy: 140, rx: 48, ry: 38, rotation: 10 },
      animal: { cx: 270, cy: 130, rx: 16, ry: 14, rotation: -10 },
    },
  },
  {
    id: "rough-er",
    name: "Rough Endoplasmic Reticulum (RER)",
    thaiName: "เอนโดพลาสมิกเรติคูลัมแบบขรุขระ (RER)",
    presence: "both",
    color: "#fb923c",
    borderColor: "#ea580c",
    glowColor: "rgba(251, 146, 60, 0.4)",
    category: "endomembrane",
    function: "Studded with ribosomes; synthesizes, folds, and modifies secretory and membrane proteins.",
    functionThai: "มีไรโบโซมเกาะที่ผิวด้านนอก ทำหน้าที่สังเคราะห์ โปรตีนพับตัว และส่งต่อไปยังกอลจิคอมเพล็กซ์",
    structuralDetails: "Interconnected flattened membrane cisternae continuous with the outer nuclear envelope.",
    examKeyPointThai: "โปรตีนที่สังเคราะห์จาก RER จะถูกส่งออกนอกเซลล์หรือใช้เป็นโปรตีนบนเยื่อหุ้มเซลล์",
    coordinates: {
      plant: { cx: 220, cy: 245, rx: 35, ry: 14, rotation: -10 },
      animal: { cx: 210, cy: 250, rx: 40, ry: 16, rotation: 5 },
    },
  },
  {
    id: "smooth-er",
    name: "Smooth Endoplasmic Reticulum (SER)",
    thaiName: "เอนโดพลาสมิกเรติคูลัมแบบเรียบ (SER)",
    presence: "both",
    color: "#facc15",
    borderColor: "#ca8a04",
    glowColor: "rgba(250, 204, 21, 0.4)",
    category: "endomembrane",
    function: "Synthesizes lipids, phospholipids, and steroid hormones; metabolizes carbohydrates and detoxifies drugs.",
    functionThai: "สังเคราะห์ไขมัน ฟอสโฟลิพิด ฮอร์โมนสเตียรอยด์ กำจัดสารพิษในเซลล์ตับ และสะสมแคลเซียมไอออน",
    structuralDetails: "Tubular network lacking ribosomes on its surface.",
    examKeyPointThai: "พบมากในเซลล์ตับ (กำจัดสารพิษ) และเซลล์ต่อมหมวกไตชั้นนอก/อัณฑะ/รังไข่ (สร้างสเตียรอยด์)",
    coordinates: {
      plant: { cx: 270, cy: 210, rx: 25, ry: 12, rotation: 40 },
      animal: { cx: 270, cy: 215, rx: 28, ry: 14, rotation: 45 },
    },
  },
  {
    id: "golgi",
    name: "Golgi Apparatus",
    thaiName: "กอลจิคอมเพล็กซ์ / กอลจิบอดี",
    presence: "both",
    color: "#c084fc",
    borderColor: "#9333ea",
    glowColor: "rgba(192, 132, 252, 0.4)",
    category: "endomembrane",
    function: "Modifies, sorts, tags with carbohydrates (glycosylation), and packages proteins into vesicles for secretion.",
    functionThai: "ดัดแปลง เติมหมู่น้ำตาล (Glycosylation) คัดแยก และบรรจุโปรตีนลงในถุงเวสิเคิลเพื่อส่งออก",
    structuralDetails: "Stack of curved cisternae with distinct cis-entry face and trans-exit face.",
    examKeyPointThai: "มีทิศทางการทำงานจาก Cis face (รับถุงจาก RER) ไปยัง Trans face (ปล่อยเวสิเคิลออก)",
    coordinates: {
      plant: { cx: 120, cy: 195, rx: 24, ry: 14, rotation: -35 },
      animal: { cx: 130, cy: 220, rx: 28, ry: 15, rotation: -20 },
    },
  },
  {
    id: "lysosome",
    name: "Lysosome",
    thaiName: "ไลโซโซม",
    presence: "animal-only",
    color: "#f43f5e",
    borderColor: "#be123c",
    glowColor: "rgba(244, 63, 94, 0.4)",
    category: "endomembrane",
    function: "Acidic organelle containing acid hydrolase enzymes; digests cellular waste, foreign bacteria, and performs autophagy.",
    functionThai: "ถุงบรรจุเอนไซม์ไฮโดรเลสที่มีฤทธิ์เป็นกรด ย่อยสลายสารอาหาร เชื้อโรค และกำจัดออร์แกเนลล์ที่เสื่อมสภาพ",
    structuralDetails: "Single lipid membrane maintaining internal pH ~4.5 to 5.0.",
    examKeyPointThai: "เด่นชัดในเซลล์สัตว์โดยเฉพาะเม็ดเลือดขาว (Phagocytosis) และกระบวนการ Autophagy",
    coordinates: {
      plant: { cx: 0, cy: 0, r: 0 },
      animal: { cx: 280, cy: 175, r: 12 },
    },
  },
  {
    id: "centrosome",
    name: "Centrosome & Centrioles",
    thaiName: "เซนโทรโซมและเซนทริโอล",
    presence: "animal-only",
    color: "#2dd4bf",
    borderColor: "#0f766e",
    glowColor: "rgba(45, 212, 191, 0.4)",
    category: "structural",
    function: "Microtubule-organizing center (MTOC); organizes spindle fibers during mitosis and meiosis cell division.",
    functionThai: "ศูนย์ควบคุมการสร้างไมโครทิวบูล (MTOC) สร้างเส้นใยสปินเดิลเพื่อดึงโครโมโซมขณะแบ่งเซลล์",
    structuralDetails: "Pair of cylindrical centrioles arranged perpendicularly in a 9x3 triplet microtubule pattern.",
    examKeyPointThai: "พบเฉพาะในเซลล์สัตว์และโพรทิสต์บางชนิด เซลล์พืชชั้นสูงไม่มีเซนทริโอลแต่มี MTOC บริเวณขั้วเซลล์",
    coordinates: {
      plant: { cx: 0, cy: 0, r: 0 },
      animal: { cx: 190, cy: 120, r: 14 },
    },
  },
  {
    id: "cell-wall",
    name: "Cell Wall",
    thaiName: "ผนังเซลล์",
    presence: "plant-only",
    color: "#22c55e",
    borderColor: "#15803d",
    glowColor: "rgba(34, 197, 94, 0.4)",
    category: "structural",
    function: "Rigid outer layer composed of cellulose microfibrils providing structural support, tensile protection, and shape.",
    functionThai: "ชั้นนอกสุดที่มีความแข็งแรง ประกอบด้วยเส้นใยเซลลูโลส ช่วยคงรูปทรงของเซลล์และป้องกันเซลล์แตกเมื่อแช่ในน้ำ",
    structuralDetails: "Primary wall with cellulose and pectin, secondary wall with lignin in woody tissues.",
    examKeyPointThai: "เป็นสารจำพวกคาร์โบไฮเดรต (เซลลูโลส) ยอมให้สารผ่านเข้าออกได้อย่างอิสระ (Freely permeable)",
    coordinates: {
      plant: { cx: 200, cy: 200, rx: 175, ry: 145 },
      animal: { cx: 0, cy: 0 },
    },
  },
  {
    id: "plasma-membrane",
    name: "Plasma Membrane",
    thaiName: "เยื่อหุ้มเซลล์ (พลาสมาเมมเบรน)",
    presence: "both",
    color: "#06b6d4",
    borderColor: "#0891b2",
    glowColor: "rgba(6, 182, 212, 0.4)",
    category: "structural",
    function: "Selectively permeable phospholipid bilayer regulating transport of substances into and out of the cell.",
    functionThai: "เยื่อเลือกผ่านฟอสโฟลิพิด 2 ชั้น (Bilayer) ควบคุมการลำเลียงสารเข้าและออกจากเซลล์ และรับสัญญาณภายนอก",
    structuralDetails: "Fluid mosaic model with embedded transport proteins, cholesterol, and glycoproteins.",
    examKeyPointThai: "จัดเป็นเยื่อเลือกผ่าน (Semi-permeable membrane) ประกอบด้วยฟอสโฟลิพิดหันส่วนหัวชอบน้ำออกด้านนอก",
    coordinates: {
      plant: { cx: 200, cy: 200, rx: 165, ry: 135 },
      animal: { cx: 200, cy: 200, rx: 160, ry: 140 },
    },
  },
];

export function CellStructureViewer() {
  const [cellType, setCellType] = useState<CellType>("plant");
  const [selectedOrganelle, setSelectedOrganelle] = useState<Organelle>(ORGANELLES[0]);
  const [isCrossSection, setIsCrossSection] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  // Available organelles for active cell type
  const activeOrganelles = ORGANELLES.filter(
    (o) => o.presence === "both" || (cellType === "plant" ? o.presence === "plant-only" : o.presence === "animal-only")
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400">
              <Dna className="h-5 w-5 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-semibold text-lg text-neutral-100">
                  Interactive Cell & Organelle Visualizer
                </h2>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-300">
                  FEAT-07 &bull; Plant & Animal Cytology
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                สำรวจโครงสร้างเซลล์พืชและเซลล์สัตว์ ภาพตัดขวางออร์แกเนลล์ หน้าที่ทางชีวเคมี และข้อสอบสำคัญ
              </p>
            </div>
          </div>

          {/* Cell Type Toggle & Comparison */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setCellType("plant");
                  setSelectedOrganelle(ORGANELLES[0]);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  cellType === "plant"
                    ? "bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Plant Cell (เซลล์พืช)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCellType("animal");
                  setSelectedOrganelle(ORGANELLES[0]);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  cellType === "animal"
                    ? "bg-sky-950/90 text-sky-300 border border-sky-700/80 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Animal Cell (เซลล์สัตว์)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowComparison(!showComparison)}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                showComparison
                  ? "bg-purple-950/80 text-purple-300 border-purple-700"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
              title="Toggle Plant vs Animal Comparison Table"
            >
              <Split className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </button>
          </div>
        </div>

        {/* View Controls: Cross-Section Toggle & Category Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">View Mode:</span>
            <button
              type="button"
              onClick={() => setIsCrossSection(!isCrossSection)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-neutral-700 transition-colors"
            >
              {isCrossSection ? (
                <>
                  <Eye className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Internal Cross-Section Active</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Surface Membrane View</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-neutral-500 text-[11px]">Quick Jump:</span>
            {activeOrganelles.map((org) => {
              const isSelected = selectedOrganelle.id === org.id;
              return (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => setSelectedOrganelle(org)}
                  style={{
                    borderColor: isSelected ? org.borderColor : undefined,
                    color: isSelected ? org.color : undefined,
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors border ${
                    isSelected
                      ? "bg-neutral-800 font-semibold"
                      : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {org.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison Drawer / Collapsible Table */}
      {showComparison && (
        <div className="rounded-2xl border border-purple-800/60 bg-purple-950/20 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-purple-800/40 pb-2">
            <h3 className="text-sm font-heading font-semibold text-purple-200 flex items-center gap-2">
              <Split className="h-4 w-4 text-purple-400" />
              Plant vs. Animal Cell Core Differences (จุดเปรียบเทียบในข้อสอบชีววิทยา)
            </h3>
            <button
              type="button"
              onClick={() => setShowComparison(false)}
              className="text-purple-400 hover:text-purple-200 text-xs"
            >
              Close
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-purple-800/40 text-purple-300">
                  <th className="py-2 pr-4">Feature / Organelle</th>
                  <th className="py-2 px-4 text-emerald-300">Plant Cell (เซลล์พืช)</th>
                  <th className="py-2 px-4 text-sky-300">Animal Cell (เซลล์สัตว์)</th>
                  <th className="py-2 pl-4 text-neutral-400">Biological Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30 text-neutral-300 font-sans">
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-medium text-neutral-200">Cell Wall (ผนังเซลล์)</td>
                  <td className="py-2.5 px-4 text-emerald-400">Present (มีเซลลูโลส)</td>
                  <td className="py-2.5 px-4 text-rose-400">Absent (ไม่มี)</td>
                  <td className="py-2.5 pl-4 text-xs text-neutral-400">ป้องกันเซลล์แตกเมื่ออยู่ในสารละลาย Hypotonic</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-medium text-neutral-200">Chloroplast (คลอโรพลาสต์)</td>
                  <td className="py-2.5 px-4 text-emerald-400">Present (สังเคราะห์ด้วยแสง)</td>
                  <td className="py-2.5 px-4 text-rose-400">Absent (ไม่มี)</td>
                  <td className="py-2.5 pl-4 text-xs text-neutral-400">สร้างสารอินทรีย์จากพลังงานแสงอาทิตย์ (Autotroph)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-medium text-neutral-200">Vacuole Size</td>
                  <td className="py-2.5 px-4 text-emerald-400">Large Central Vacuole</td>
                  <td className="py-2.5 px-4 text-sky-400">Small vacuoles or none</td>
                  <td className="py-2.5 pl-4 text-xs text-neutral-400">รักษาแรงดันเต่งและกักเก็บสารสะสมในพืช</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-medium text-neutral-200">Centrioles (เซนทริโอล)</td>
                  <td className="py-2.5 px-4 text-rose-400">Absent (ยกเว้นพืชชั้นต่ำ)</td>
                  <td className="py-2.5 px-4 text-sky-400">Present (มีเซนโทรโซม)</td>
                  <td className="py-2.5 pl-4 text-xs text-neutral-400">สร้างเส้นใยสปินเดิลดึงโครโมโซมขณะแบ่งเซลล์</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-mono font-medium text-neutral-200">Shape & Flexibility</td>
                  <td className="py-2.5 px-4 text-emerald-400">Rigid, polygonal / rectangular</td>
                  <td className="py-2.5 px-4 text-sky-400">Flexible, spherical / irregular</td>
                  <td className="py-2.5 pl-4 text-xs text-neutral-400">เซลล์สัตว์มีความยืดหยุ่นเพื่อการเคลื่อนไหวและ Phagocytosis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Interactive Stage: SVG Canvas (Left) & Inspector Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Cell Canvas (lg:col-span-7) */}
        <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute h-64 w-64 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-700"
            style={{
              backgroundColor: selectedOrganelle.color,
              top: "20%",
              left: "25%",
            }}
          />

          {/* Canvas Title Overlay */}
          <div className="w-full flex justify-between items-center text-xs font-mono text-neutral-400 pb-2 z-10 border-b border-neutral-900 mb-2">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span
                className="h-2 w-2 rounded-full inline-block"
                style={{ backgroundColor: cellType === "plant" ? "#22c55e" : "#0284c7" }}
              />
              {cellType === "plant" ? "Eukaryotic Plant Cell Model" : "Eukaryotic Animal Cell Model"}
            </span>
            <span className="text-neutral-500">Interactive Vector SVG &bull; 0 VRAM Leak</span>
          </div>

          {/* SVG Biological Diagram */}
          <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full select-none cursor-pointer overflow-visible"
            >
              <defs>
                {/* Radial Glow Filters for clickable highlights */}
                <radialGradient id="plantCytoplasm" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14532d" stopOpacity="0.4" />
                  <stop offset="90%" stopColor="#064e3b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0.6" />
                </radialGradient>
                <radialGradient id="animalCytoplasm" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0369a1" stopOpacity="0.3" />
                  <stop offset="85%" stopColor="#075985" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#082f49" stopOpacity="0.5" />
                </radialGradient>
              </defs>

              {/* 1. PLANT CELL BOUNDARIES */}
              {cellType === "plant" && (
                <g>
                  {/* Outer Cell Wall */}
                  <rect
                    x="25"
                    y="50"
                    width="350"
                    height="300"
                    rx="35"
                    ry="35"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth={selectedOrganelle.id === "cell-wall" ? "6" : "4"}
                    strokeDasharray={isCrossSection ? undefined : "6,4"}
                    className="transition-all duration-300"
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "cell-wall")!)}
                  />
                  {/* Plasma Membrane */}
                  <rect
                    x="35"
                    y="60"
                    width="330"
                    height="280"
                    rx="28"
                    ry="28"
                    fill="url(#plantCytoplasm)"
                    stroke="#06b6d4"
                    strokeWidth={selectedOrganelle.id === "plasma-membrane" ? "4" : "2"}
                    className="transition-all duration-300"
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "plasma-membrane")!)}
                  />
                </g>
              )}

              {/* 2. ANIMAL CELL BOUNDARIES */}
              {cellType === "animal" && (
                <g>
                  {/* Flexible Plasma Membrane */}
                  <ellipse
                    cx="200"
                    cy="200"
                    rx="160"
                    ry="145"
                    fill="url(#animalCytoplasm)"
                    stroke="#06b6d4"
                    strokeWidth={selectedOrganelle.id === "plasma-membrane" ? "5" : "2.5"}
                    className="transition-all duration-300"
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "plasma-membrane")!)}
                  />
                </g>
              )}

              {/* 3. INTERNAL ORGANELLES (Cross-section view) */}
              {isCrossSection && (
                <>
                  {/* Large Central Vacuole (Plant Only) */}
                  {cellType === "plant" && (
                    <g
                      onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "vacuole")!)}
                      className="cursor-pointer transition-transform hover:opacity-95"
                    >
                      <path
                        d="M 110,110 C 120,70 190,80 200,120 C 210,160 170,190 130,180 C 90,170 95,130 110,110 Z"
                        fill="rgba(56, 189, 248, 0.25)"
                        stroke="#38bdf8"
                        strokeWidth={selectedOrganelle.id === "vacuole" ? "3" : "1.5"}
                      />
                      <text
                        x="150"
                        y="140"
                        fontSize="9"
                        fill="#bae6fd"
                        fontFamily="monospace"
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        Vacuole
                      </text>
                    </g>
                  )}

                  {/* Nucleus & Nucleolus */}
                  <g
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "nucleus")!)}
                    className="cursor-pointer"
                  >
                    {/* Nuclear Envelope */}
                    <circle
                      cx={cellType === "plant" ? "240" : "200"}
                      cy={cellType === "plant" ? "200" : "190"}
                      r={cellType === "plant" ? "42" : "45"}
                      fill="rgba(99, 102, 241, 0.35)"
                      stroke="#818cf8"
                      strokeWidth={selectedOrganelle.id === "nucleus" ? "3.5" : "2"}
                      strokeDasharray="4,2"
                    />
                    {/* Chromatin Threads */}
                    <path
                      d={
                        cellType === "plant"
                          ? "M 225,185 Q 240,210 255,190 T 235,215"
                          : "M 185,175 Q 200,200 215,180 T 195,205"
                      }
                      fill="none"
                      stroke="rgba(199, 210, 254, 0.6)"
                      strokeWidth="1.5"
                    />
                    {/* Dense Nucleolus */}
                    <circle
                      cx={cellType === "plant" ? "245" : "205"}
                      cy={cellType === "plant" ? "195" : "185"}
                      r="14"
                      fill="#6366f1"
                      stroke="#4f46e5"
                      strokeWidth="1.5"
                    />
                    <text
                      x={cellType === "plant" ? "245" : "205"}
                      y={cellType === "plant" ? "228" : "218"}
                      fontSize="9"
                      fill="#e0e7ff"
                      fontFamily="monospace"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      Nucleus
                    </text>
                  </g>

                  {/* Mitochondria #1 */}
                  <g
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "mitochondria")!)}
                    className="cursor-pointer"
                  >
                    <ellipse
                      cx={cellType === "plant" ? "110" : "110"}
                      cy={cellType === "plant" ? "255" : "130"}
                      rx="26"
                      ry="15"
                      transform={`rotate(-25, ${cellType === "plant" ? "110, 255" : "110, 130"})`}
                      fill="rgba(239, 68, 68, 0.35)"
                      stroke="#f87171"
                      strokeWidth={selectedOrganelle.id === "mitochondria" ? "3" : "1.5"}
                    />
                    {/* Cristae folding */}
                    <path
                      d={
                        cellType === "plant"
                          ? "M 95,255 Q 110,250 115,260 T 125,253"
                          : "M 95,130 Q 110,125 115,135 T 125,128"
                      }
                      fill="none"
                      stroke="#fca5a5"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* Mitochondria #2 (Animal cell has extra mitochondria) */}
                  {cellType === "animal" && (
                    <g
                      onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "mitochondria")!)}
                      className="cursor-pointer"
                    >
                      <ellipse
                        cx="290"
                        cy="255"
                        rx="24"
                        ry="14"
                        transform="rotate(35, 290, 255)"
                        fill="rgba(239, 68, 68, 0.35)"
                        stroke="#f87171"
                        strokeWidth={selectedOrganelle.id === "mitochondria" ? "3" : "1.5"}
                      />
                    </g>
                  )}

                  {/* Chloroplasts (Plant Only) */}
                  {cellType === "plant" && (
                    <g
                      onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "chloroplast")!)}
                      className="cursor-pointer"
                    >
                      {/* Chloroplast 1 */}
                      <ellipse
                        cx="295"
                        cy="115"
                        rx="28"
                        ry="17"
                        transform="rotate(20, 295, 115)"
                        fill="rgba(34, 197, 94, 0.35)"
                        stroke="#4ade80"
                        strokeWidth={selectedOrganelle.id === "chloroplast" ? "3" : "1.5"}
                      />
                      {/* Thylakoids stacks inside */}
                      <line x1="282" y1="115" x2="292" y2="115" stroke="#22c55e" strokeWidth="2.5" />
                      <line x1="298" y1="115" x2="308" y2="115" stroke="#22c55e" strokeWidth="2.5" />

                      {/* Chloroplast 2 */}
                      <ellipse
                        cx="295"
                        cy="275"
                        rx="26"
                        ry="16"
                        transform="rotate(-25, 295, 275)"
                        fill="rgba(34, 197, 94, 0.35)"
                        stroke="#4ade80"
                        strokeWidth={selectedOrganelle.id === "chloroplast" ? "3" : "1.5"}
                      />
                      <line x1="285" y1="275" x2="295" y2="275" stroke="#22c55e" strokeWidth="2.5" />
                      <line x1="300" y1="275" x2="308" y2="275" stroke="#22c55e" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* Endoplasmic Reticulum (RER & SER) */}
                  <g
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "rough-er")!)}
                    className="cursor-pointer"
                  >
                    <path
                      d={
                        cellType === "plant"
                          ? "M 205,245 C 220,260 250,260 265,245 S 250,230 235,240"
                          : "M 165,235 C 180,255 210,255 225,235 S 210,225 195,235"
                      }
                      fill="none"
                      stroke="#fb923c"
                      strokeWidth={selectedOrganelle.id === "rough-er" ? "4" : "2.5"}
                    />
                    {/* Ribosome dots on RER */}
                    <circle cx="215" cy="248" r="1.5" fill="#f97316" />
                    <circle cx="230" cy="254" r="1.5" fill="#f97316" />
                    <circle cx="245" cy="250" r="1.5" fill="#f97316" />
                  </g>

                  {/* Smooth ER (SER) */}
                  <g
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "smooth-er")!)}
                    className="cursor-pointer"
                  >
                    <path
                      d={
                        cellType === "plant"
                          ? "M 265,170 C 275,180 290,175 285,160"
                          : "M 245,150 C 260,165 275,160 270,145"
                      }
                      fill="none"
                      stroke="#facc15"
                      strokeWidth={selectedOrganelle.id === "smooth-er" ? "3.5" : "2"}
                    />
                  </g>

                  {/* Golgi Complex */}
                  <g
                    onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "golgi")!)}
                    className="cursor-pointer"
                  >
                    <path
                      d={
                        cellType === "plant"
                          ? "M 105,185 Q 120,195 105,205 M 110,182 Q 125,195 110,208 M 115,180 Q 130,195 115,210"
                          : "M 115,210 Q 130,220 115,230 M 120,207 Q 135,220 120,233 M 125,205 Q 140,220 125,235"
                      }
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth={selectedOrganelle.id === "golgi" ? "3.5" : "2"}
                    />
                    {/* Secretory Vesicles */}
                    <circle cx="138" cy="225" r="3" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1" />
                    <circle cx="145" cy="235" r="2.5" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1" />
                  </g>

                  {/* Centrosome & Centrioles (Animal Only) */}
                  {cellType === "animal" && (
                    <g
                      onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "centrosome")!)}
                      className="cursor-pointer"
                    >
                      <rect x="185" y="115" width="12" height="5" fill="#2dd4bf" rx="1" />
                      <rect x="188" y="112" width="5" height="12" fill="#2dd4bf" rx="1" />
                      <circle
                        cx="191"
                        cy="117"
                        r={selectedOrganelle.id === "centrosome" ? "14" : "10"}
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    </g>
                  )}

                  {/* Lysosome (Animal Only) */}
                  {cellType === "animal" && (
                    <g
                      onClick={() => setSelectedOrganelle(ORGANELLES.find((o) => o.id === "lysosome")!)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="275"
                        cy="175"
                        r="12"
                        fill="rgba(244, 63, 94, 0.4)"
                        stroke="#f43f5e"
                        strokeWidth={selectedOrganelle.id === "lysosome" ? "3" : "1.5"}
                      />
                      <circle cx="272" cy="173" r="2" fill="#fecdd3" />
                      <circle cx="277" cy="177" r="1.5" fill="#fecdd3" />
                    </g>
                  )}
                </>
              )}
            </svg>
          </div>

          <span className="text-[11px] font-sans text-neutral-500 pt-2 text-center">
            Click any organelle in the cell diagram above to inspect details
          </span>
        </div>

        {/* Organelle Inspector Drawer (lg:col-span-5) */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 rounded-full inline-block"
                style={{ backgroundColor: selectedOrganelle.color }}
              />
              <h3 className="text-sm font-heading font-semibold text-neutral-100">
                Organelle Specification
              </h3>
            </div>
            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                selectedOrganelle.presence === "plant-only"
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/80"
                  : selectedOrganelle.presence === "animal-only"
                  ? "bg-sky-950/80 text-sky-300 border-sky-700/80"
                  : "bg-neutral-800 text-neutral-300 border-neutral-700"
              }`}
            >
              {selectedOrganelle.presence === "plant-only"
                ? "Plant Only (เฉพาะพืช)"
                : selectedOrganelle.presence === "animal-only"
                ? "Animal Only (เฉพาะสัตว์)"
                : "Both (พบในทั้งสองเซลล์)"}
            </span>
          </div>

          {/* Organelle Title & Category */}
          <div className="space-y-1">
            <h4 className="text-xl font-heading font-bold text-neutral-100">
              {selectedOrganelle.name}
            </h4>
            <p className="text-sm font-sans text-neutral-300">
              {selectedOrganelle.thaiName}
            </p>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block pt-1">
              Category: {selectedOrganelle.category}
            </span>
          </div>

          {/* Biological Function (Thai) */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Zap className="h-3.5 w-3.5" />
              <span>หน้าที่ทางชีววิทยา (Cellular Function)</span>
            </div>
            <p className="text-xs font-sans text-neutral-200 leading-relaxed">
              {selectedOrganelle.functionThai}
            </p>
          </div>

          {/* Structural Details */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Layers className="h-3.5 w-3.5" />
              <span>โครงสร้างจุลภาค (Ultrastructure)</span>
            </div>
            <p className="text-xs font-sans text-neutral-400 leading-relaxed">
              {selectedOrganelle.structuralDetails}
            </p>
          </div>

          {/* High-Yield Exam Note */}
          <div className="rounded-xl border border-amber-800/60 bg-amber-950/20 p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>จุดเน้นสำคัญในข้อสอบ (High-Yield Concept)</span>
            </div>
            <p className="text-xs font-sans text-amber-200/90 leading-relaxed">
              {selectedOrganelle.examKeyPointThai}
            </p>
          </div>

          {/* English Summary */}
          <div className="text-[11px] font-mono text-neutral-500 pt-1 border-t border-neutral-850">
            {selectedOrganelle.function}
          </div>
        </div>
      </div>
    </div>
  );
}
