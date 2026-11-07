"use client";

import React, { useState, useMemo } from "react";
import {
  Languages,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Volume2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import {
  deconstructThaiSyllable,
  ThaiSyllableAnalysis,
  ToneSound,
} from "@/lib/thai-phonology";

interface SyllablePreset {
  syllable: string;
  category: string;
  expectedTone: string;
}

const PRESET_SYLLABLES: SyllablePreset[] = [
  { syllable: "กาง", category: "อักษรกลาง (คำเป็น)", expectedTone: "เสียงสามัญ" },
  { syllable: "ก่า", category: "อักษรกลาง + ไม้เอก", expectedTone: "เสียงเอก" },
  { syllable: "ก้า", category: "อักษรกลาง + ไม้โท", expectedTone: "เสียงโท" },
  { syllable: "ก๊า", category: "อักษรกลาง + ไม้ตรี", expectedTone: "เสียงตรี" },
  { syllable: "ก๋า", category: "อักษรกลาง + ไม้จัตวา", expectedTone: "เสียงจัตวา" },
  { syllable: "กัด", category: "อักษรกลาง (คำตายสั้น)", expectedTone: "เสียงเอก" },
  { syllable: "ขาว", category: "อักษรสูง (คำเป็น)", expectedTone: "เสียงจัตวา" },
  { syllable: "ข่า", category: "อักษรสูง + ไม้เอก", expectedTone: "เสียงเอก" },
  { syllable: "ข้า", category: "อักษรสูง + ไม้โท", expectedTone: "เสียงโท" },
  { syllable: "ขัด", category: "อักษรสูง (คำตาย)", expectedTone: "เสียงเอก" },
  { syllable: "คาน", category: "อักษรต่ำ (คำเป็น)", expectedTone: "เสียงสามัญ" },
  { syllable: "ค่าน", category: "อักษรต่ำ + ไม้เอก", expectedTone: "เสียงโท" },
  { syllable: "ค้าน", category: "อักษรต่ำ + ไม้โท", expectedTone: "เสียงตรี" },
  { syllable: "คะ", category: "อักษรต่ำ (คำตายสั้น)", expectedTone: "เสียงตรี" },
  { syllable: "คาด", category: "อักษรต่ำ (คำตายยาว)", expectedTone: "เสียงโท" },
  { syllable: "หมอน", category: "อักษรนำ (ห นำ ม)", expectedTone: "เสียงจัตวา" },
  { syllable: "หวาน", category: "อักษรนำ (ห นำ ว)", expectedTone: "เสียงจัตวา" },
  { syllable: "อย่า", category: "อักษรนำ (อ นำ ย)", expectedTone: "เสียงเอก" },
  { syllable: "กราบ", category: "คำควบกล้ำ (กร-)", expectedTone: "เสียงเอก" },
  { syllable: "พลอย", category: "คำควบกล้ำ (พล-)", expectedTone: "เสียงสามัญ" },
  { syllable: "ตัว", category: "สระ อัว (แม่ ก กา)", expectedTone: "เสียงสามัญ" },
  { syllable: "พวก", category: "สระ อัว ลดรูป (คำตาย)", expectedTone: "เสียงโท" },
  { syllable: "เสีย", category: "สระ เอีย (แม่ ก กา)", expectedTone: "เสียงจัตวา" },
  { syllable: "เสือ", category: "สระ เอือ (แม่ ก กา)", expectedTone: "เสียงจัตวา" },
  { syllable: "เชิด", category: "สระ เออ แปลงรูป (คำตายยาว)", expectedTone: "เสียงโท" },
  { syllable: "สัตว์", category: "ทัณฑฆาต (ตัวการันต์)", expectedTone: "เสียงเอก" },
  { syllable: "เกาะ", category: "สระ เอาะ (คำตายสั้น)", expectedTone: "เสียงเอก" },
];

/**
 * SVG Pitch Contour Component for Thai 5 Tones
 */
function ToneContourSvg({ tone }: { tone: ToneSound }) {
  // Acoustic pitch curves normalized to 0-100 viewBox
  const contours: Record<ToneSound, { path: string; label: string; color: string }> = {
    common: {
      path: "M 15 50 Q 50 48 85 46",
      label: "Mid / Common (33)",
      color: "#38bdf8",
    },
    low: {
      path: "M 15 65 Q 50 72 85 78",
      label: "Low (21)",
      color: "#a78bfa",
    },
    falling: {
      path: "M 15 30 Q 40 22 85 80",
      label: "Falling (51)",
      color: "#fb923c",
    },
    high: {
      path: "M 15 35 Q 50 25 85 18",
      label: "High (45)",
      color: "#f43f5e",
    },
    rising: {
      path: "M 15 75 Q 45 85 85 22",
      label: "Rising (24)",
      color: "#2ef2a0",
    },
  };

  const current = contours[tone] ?? contours.common;

  return (
    <div className="relative w-full h-24 rounded-lg bg-neutral-950 border border-neutral-800 p-2 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
        <span>High Pitch</span>
        <span className="text-neutral-400 font-sans">{current.label}</span>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-14 overflow-visible">
        {/* Background pitch guide lines */}
        <line x1="10" y1="20" x2="90" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
        <line x1="10" y1="80" x2="90" y2="80" stroke="#1e293b" strokeDasharray="3 3" />

        {/* Tone trajectory contour */}
        <path
          d={current.path}
          fill="none"
          stroke={current.color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Start and end points */}
        <circle cx={current.path.split(" ")[1]} cy={current.path.split(" ")[2]} r="3" fill={current.color} />
      </svg>

      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
        <span>Low Pitch</span>
        <span>Acoustic Frequency Track</span>
      </div>
    </div>
  );
}

export function ThaiPhonologyVisualizer() {
  const [inputSyllable, setInputSyllable] = useState<string>("หมอน");

  const analysis: ThaiSyllableAnalysis = useMemo(() => {
    return deconstructThaiSyllable(inputSyllable);
  }, [inputSyllable]);

  // UTF-8 Byte & Grapheme Metrics
  const metrics = useMemo(() => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(inputSyllable);
    const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
    const graphemeCount = Array.from(segmenter.segment(inputSyllable)).length;
    return {
      bytes: bytes.length,
      graphemes: graphemeCount,
    };
  }, [inputSyllable]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400">
            <Languages className="h-5 w-5 stroke-[1.75]" />
          </div>
          <div>
            <h2 className="text-base font-heading font-semibold text-neutral-100 flex items-center gap-2">
              Thai Phonology & Syllable Deconstructor
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                3-Byte UTF-8 Safe
              </span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              ระบบวิเคราะห์โครงสร้างพยางค์ภาษาไทย ไตรยางศ์ มาตราตัวสะกด คำเป็น/คำตาย และการผันวรรณยุกต์
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Lobe 3 Multibyte Safe</span>
        </div>
      </div>

      {/* Syllable Input & Presets */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputSyllable}
              onChange={(e) => setInputSyllable(e.target.value)}
              placeholder="พิมพ์คำหรือพยางค์ภาษาไทย..."
              maxLength={15}
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-base font-heading text-neutral-100 focus:outline-none focus:border-emerald-500 placeholder:text-neutral-600"
            />
            <div className="absolute right-3 top-2.5 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <span>{metrics.bytes} Bytes</span>
              <span>•</span>
              <span>{metrics.graphemes} Graphemes</span>
            </div>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              Curriculum Examples (ตัวอย่างทดสอบตามหลักเกณฑ์)
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 rounded-lg bg-neutral-950/60 border border-neutral-800">
            {PRESET_SYLLABLES.map((p) => (
              <button
                key={p.syllable}
                type="button"
                onClick={() => setInputSyllable(p.syllable)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  inputSyllable === p.syllable
                    ? "bg-emerald-950 border border-emerald-600 text-emerald-300 font-semibold"
                    : "bg-neutral-900 border border-neutral-800/80 text-neutral-300 hover:border-neutral-700"
                }`}
              >
                <span>{p.syllable}</span>
                <span className="text-[10px] text-neutral-500 font-sans">({p.expectedTone})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Initial Consonant & Triyang */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>1. Initial Consonant</span>
            <Layers className="h-3.5 w-3.5 text-neutral-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-semibold text-neutral-100">
              {analysis.initialConsonant || "—"}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {analysis.leadingType === "ho_nam"
                ? "ห นำ"
                : analysis.leadingType === "o_nam"
                ? "อ นำ"
                : analysis.leadingType === "cluster"
                ? "คำควบกล้ำ"
                : "พยัญชนะเดี่ยว"}
            </span>
          </div>
          <div className="pt-2 border-t border-neutral-850 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500 font-sans">ไตรยางศ์:</span>
              <span
                className={`font-semibold font-sans ${
                  analysis.initialClass === "mid"
                    ? "text-cyan-400"
                    : analysis.initialClass === "high"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {analysis.initialClass === "mid"
                  ? "อักษรกลาง (9 ตัว)"
                  : analysis.initialClass === "high"
                  ? "อักษรสูง (11 ตัว)"
                  : analysis.initialSubClass === "low_single"
                  ? "อักษรต่ำเดี่ยว (10 ตัว)"
                  : "อักษรต่ำคู่ (14 ตัว)"}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Vowel & Length */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>2. Vowel Structure</span>
            <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-semibold text-neutral-100">
              {analysis.vowel || "—"}
            </span>
          </div>
          <div className="pt-2 border-t border-neutral-850 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500 font-sans">ความยาวเสียง:</span>
              <span
                className={`font-semibold font-sans ${
                  analysis.vowelLength === "short" ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {analysis.vowelLength === "short" ? "สระเสียงสั้น" : "สระเสียงยาว"}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Spelling Section & Live/Dead Status */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>3. Final & Syllable Type</span>
            <Activity className="h-3.5 w-3.5 text-neutral-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-semibold text-neutral-100">
              {analysis.finalConsonant || "—"}
            </span>
            <span className="text-xs font-sans text-neutral-400">
              ({analysis.spellingSection})
            </span>
          </div>
          <div className="pt-2 border-t border-neutral-850 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500 font-sans">สถานะพยางค์:</span>
              <span
                className={`font-semibold font-sans px-1.5 py-0.5 rounded text-[11px] ${
                  analysis.syllableType === "live"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                    : "bg-rose-950 text-rose-400 border border-rose-800/60"
                }`}
              >
                {analysis.syllableType === "live" ? "คำเป็น (Sonorant)" : "คำตาย (Stop)"}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Tone Mark & Tone Sound */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>4. Calculated Tone Sound</span>
            <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-semibold text-emerald-400">
              {analysis.toneNameThai}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              ({analysis.toneNameEn})
            </span>
          </div>
          <div className="pt-2 border-t border-neutral-850 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500 font-sans">รูปวรรณยุกต์:</span>
              <span className="text-neutral-300 font-sans">
                {analysis.toneMarkSymbol || "ไม่มีรูปกำกับ"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tone Contour & Phonological Deduction Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Pitch Contour Curve */}
        <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-200">
              <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
              Acoustic Pitch Contour
            </span>
            <span className="text-[11px] text-emerald-400">เสียง{analysis.toneNameThai}</span>
          </div>

          <ToneContourSvg tone={analysis.calculatedTone} />

          <p className="text-[11px] font-sans text-neutral-500 leading-relaxed">
            เส้นโค้งระดับความถี่เสียง (F0 Fundamental Frequency Track) จำลองลักษณะทางสัทศาสตร์ภาษาไทย
          </p>
        </div>

        {/* Right: Step-by-Step Rule Derivation */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
              Phonological Rule Derivation (ขั้นตอนการอนุมานเสียงตามกฎไตรยางศ์)
            </span>
            <span className="text-[11px] text-neutral-500 font-sans">หลักเกณฑ์ราชบัณฑิตยสภา</span>
          </div>

          <div className="space-y-2">
            {analysis.explanation.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-start gap-3 text-xs"
              >
                <div className="h-5 w-5 rounded-full bg-neutral-800 flex items-center justify-center font-mono text-[10px] text-neutral-400 shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 font-sans text-neutral-300 leading-relaxed">
                  {step}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>Syllable: &quot;{analysis.rawSyllable}&quot;</span>
            <span className="flex items-center gap-1 text-emerald-400">
              Derivation Complete <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
