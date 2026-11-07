"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Variable,
  Layers,
  LineChart,
} from "lucide-react";
import { Mafs, Coordinates, Plot, Theme, Point } from "mafs";
import {
  renderSanitizedLatex,
  safeEvaluateMath,
  validateExpressionSecurity,
} from "@/lib/math-sanitizer";

export interface FormulaPreset {
  id: string;
  name: string;
  thaiName: string;
  subject: string;
  description: string;
  latex: string;
  expression: string;
  resultSymbol: string;
  resultUnit: string;
  plotConfig?: {
    xParam: string;
    xLabel: string;
    yLabel: string;
    viewBox: { x: [number, number]; y: [number, number] };
    fn: (x: number, vars: Record<string, number>) => number;
  };
  variables: Record<
    string,
    {
      label: string;
      unit: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
    }
  >;
}

const PRESETS: FormulaPreset[] = [
  {
    id: "kinetic-energy",
    name: "Kinetic Energy",
    thaiName: "พลังงานจลน์",
    subject: "Physics",
    description: "Energy possessed by an object due to its motion. Proportional to mass and velocity squared.",
    latex: "E_k = \\frac{1}{2} m v^2",
    expression: "0.5 * m * v^2",
    resultSymbol: "E_k",
    resultUnit: "J (Joules)",
    plotConfig: {
      xParam: "v",
      xLabel: "Velocity v (m/s)",
      yLabel: "Kinetic Energy E_k (J)",
      viewBox: { x: [-2, 35], y: [-50, 1500] },
      fn: (x, vars) => 0.5 * (vars.m ?? 10) * x * x,
    },
    variables: {
      m: { label: "Mass (m)", unit: "kg", min: 0.1, max: 20, step: 0.1, defaultValue: 3 },
      v: { label: "Velocity (v)", unit: "m/s", min: 0, max: 30, step: 0.5, defaultValue: 12 },
    },
  },
  {
    id: "wave-speed",
    name: "Wave Speed Equation",
    thaiName: "อัตราเร็วของคลื่น",
    subject: "Physics",
    description: "Relationship between mechanical or electromagnetic wave speed, frequency, and wavelength.",
    latex: "v = f \\cdot \\lambda",
    expression: "f * lambda",
    resultSymbol: "v",
    resultUnit: "m/s",
    plotConfig: {
      xParam: "f",
      xLabel: "Frequency f (Hz)",
      yLabel: "Wave Speed v (m/s)",
      viewBox: { x: [-2, 60], y: [-5, 150] },
      fn: (x, vars) => x * (vars.lambda ?? 2.5),
    },
    variables: {
      f: { label: "Frequency (f)", unit: "Hz", min: 1, max: 50, step: 1, defaultValue: 15 },
      lambda: { label: "Wavelength (λ)", unit: "m", min: 0.1, max: 10, step: 0.1, defaultValue: 3.5 },
    },
  },
  {
    id: "harmonic-oscillator",
    name: "Harmonic Oscillator Period",
    thaiName: "คาบการแกว่งฮาร์มอนิกอย่างง่าย",
    subject: "Physics",
    description: "Period of oscillation of a mass-spring system in simple harmonic motion.",
    latex: "T = 2\\pi \\sqrt{\\frac{m}{k}}",
    expression: "2 * pi * sqrt(m / k)",
    resultSymbol: "T",
    resultUnit: "s (Seconds)",
    plotConfig: {
      xParam: "m",
      xLabel: "Mass m (kg)",
      yLabel: "Period T (s)",
      viewBox: { x: [-1, 20], y: [-0.5, 6] },
      fn: (x, vars) => 2 * Math.PI * Math.sqrt(Math.max(x, 0.001) / Math.max(vars.k ?? 40, 0.1)),
    },
    variables: {
      m: { label: "Mass (m)", unit: "kg", min: 0.1, max: 20, step: 0.1, defaultValue: 2.5 },
      k: { label: "Spring Constant (k)", unit: "N/m", min: 1, max: 200, step: 1, defaultValue: 40 },
    },
  },
  {
    id: "ohms-law",
    name: "Ohm's Law (Voltage)",
    thaiName: "กฎของโอห์ม (แรงดันไฟฟ้า)",
    subject: "Physics",
    description: "Potential difference across an electrical conductor carrying current I with resistance R.",
    latex: "V = I \\cdot R",
    expression: "I * R",
    resultSymbol: "V",
    resultUnit: "V (Volts)",
    plotConfig: {
      xParam: "I",
      xLabel: "Current I (A)",
      yLabel: "Voltage V (V)",
      viewBox: { x: [-1, 25], y: [-5, 250] },
      fn: (x, vars) => x * (vars.R ?? 10),
    },
    variables: {
      I: { label: "Current (I)", unit: "A", min: 0.1, max: 20, step: 0.1, defaultValue: 5 },
      R: { label: "Resistance (R)", unit: "Ω", min: 1, max: 50, step: 1, defaultValue: 10 },
    },
  },
  {
    id: "ideal-gas-law",
    name: "Ideal Gas Law (Pressure)",
    thaiName: "ความดันแก๊สอุดมคติ",
    subject: "Chemistry",
    description: "Pressure exerted by n moles of gas in volume V at temperature T.",
    latex: "P = \\frac{n R T}{V}",
    expression: "n * 8.314 * T / V",
    resultSymbol: "P",
    resultUnit: "Pa (Pascals)",
    plotConfig: {
      xParam: "V",
      xLabel: "Volume V (m³)",
      yLabel: "Pressure P (Pa)",
      viewBox: { x: [-0.1, 2.2], y: [-50000, 600000] },
      fn: (x, vars) => ((vars.n ?? 2) * 8.314 * (vars.T ?? 300)) / Math.max(x, 0.01),
    },
    variables: {
      n: { label: "Amount (n)", unit: "mol", min: 0.5, max: 10, step: 0.5, defaultValue: 2 },
      T: { label: "Temperature (T)", unit: "K", min: 100, max: 600, step: 5, defaultValue: 300 },
      V: { label: "Volume (V)", unit: "m³", min: 0.05, max: 2.0, step: 0.01, defaultValue: 0.2 },
    },
  },
  {
    id: "gravitational-force",
    name: "Newton's Universal Gravitation",
    thaiName: "แรงโน้มถ่วงสากล",
    subject: "Astronomy",
    description: "Attractive gravitational force between two point masses separated by distance r.",
    latex: "F = G \\frac{m_1 m_2}{r^2}",
    expression: "6.6743e-11 * m1 * m2 / (r^2)",
    resultSymbol: "F",
    resultUnit: "N (Newtons)",
    variables: {
      m1: { label: "Mass 1 (m1)", unit: "kg", min: 1e5, max: 1e12, step: 1e5, defaultValue: 5e9 },
      m2: { label: "Mass 2 (m2)", unit: "kg", min: 1e3, max: 1e8, step: 1e3, defaultValue: 2e6 },
      r: { label: "Distance (r)", unit: "m", min: 10, max: 5000, step: 10, defaultValue: 250 },
    },
  },
];

export function FormulaViewer() {
  const [activePresetId, setActivePresetId] = useState<string>("kinetic-energy");
  const activePreset = useMemo(() => {
    return PRESETS.find((p) => p.id === activePresetId) ?? PRESETS[0];
  }, [activePresetId]);

  // Initial variable values
  const [variableValues, setVariableValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const [key, v] of Object.entries(PRESETS[0].variables)) {
      initial[key] = v.defaultValue;
    }
    return initial;
  });

  const handlePresetChange = (preset: FormulaPreset) => {
    setActivePresetId(preset.id);
    const updated: Record<string, number> = {};
    for (const [key, v] of Object.entries(preset.variables)) {
      updated[key] = v.defaultValue;
    }
    setVariableValues(updated);
  };

  const handleVariableChange = (key: string, val: number) => {
    setVariableValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleReset = () => {
    const resetVals: Record<string, number> = {};
    for (const [key, v] of Object.entries(activePreset.variables)) {
      resetVals[key] = v.defaultValue;
    }
    setVariableValues(resetVals);
  };

  // Render LaTeX using sanitized KaTeX engine
  const renderedLatexHtml = useMemo(() => {
    try {
      return renderSanitizedLatex(activePreset.latex, { displayMode: true });
    } catch {
      return `<span class="text-rose-400">Failed to render LaTeX formula</span>`;
    }
  }, [activePreset.latex]);

  // Evaluate Math expression securely
  const evaluationResult = useMemo(() => {
    try {
      validateExpressionSecurity(activePreset.expression);
      const res = safeEvaluateMath(activePreset.expression, variableValues);
      return { value: res, error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Calculation error";
      return { value: null, error: msg };
    }
  }, [activePreset.expression, variableValues]);

  // Format result nicely
  const formattedResult = useMemo(() => {
    if (evaluationResult.error !== null || evaluationResult.value === null) {
      return "—";
    }
    const val = evaluationResult.value;
    if (!Number.isFinite(val)) {
      return "Undefined (∞)";
    }
    if (Math.abs(val) >= 1e6 || (Math.abs(val) > 0 && Math.abs(val) < 1e-3)) {
      return val.toExponential(4);
    }
    return Number(val.toFixed(4)).toString();
  }, [evaluationResult]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-cyan-400">
            <Calculator className="h-5 w-5 stroke-[1.75]" />
          </div>
          <div>
            <h2 className="text-base font-heading font-semibold text-neutral-100 flex items-center gap-2">
              Dynamic Math & Formula Sandbox
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                KaTeX + Math.js + Mafs
              </span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              การประมวลผลสูตรคณิตศาสตร์และวิทยาศาสตร์เชิงโต้ตอบแบบเรียลไทม์พร้อมกราฟพิกัด 2 มิติ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 border border-neutral-700/80 text-xs font-mono text-neutral-300 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-400" />
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-neutral-400" />
            Curriculum Presets
          </span>
          <span className="text-neutral-500 font-sans">เลือกสมการที่ต้องการทดสอบ</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESETS.map((p) => {
            const isActive = p.id === activePresetId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isActive}
                aria-label={`Select formula preset ${p.name} (${p.thaiName})`}
                onClick={() => handlePresetChange(p)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isActive
                    ? "bg-neutral-800/90 border-cyan-500/80 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                    : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400 font-medium">
                    {p.subject}
                  </span>
                  {isActive && <Sparkles className="h-3 w-3 text-cyan-400" />}
                </div>
                <div>
                  <p className="text-xs font-heading font-medium text-neutral-200 line-clamp-1">
                    {p.name}
                  </p>
                  <p className="text-[11px] font-sans text-neutral-500 line-clamp-1">
                    {p.thaiName}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Formula Rendering & Result Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Formula Card & Sliders */}
        <div className="lg:col-span-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-mono font-medium text-neutral-300">
                Formula Representation
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="h-3 w-3" />
              AST Sandbox Verified
            </div>
          </div>

          {/* KaTeX Formula Box */}
          <div className="p-6 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center min-h-[100px] overflow-x-auto text-neutral-100">
            <div
              className="text-lg sm:text-xl font-heading"
              dangerouslySetInnerHTML={{ __html: renderedLatexHtml }}
            />
          </div>

          <p className="text-xs font-sans text-neutral-400 leading-relaxed">
            {activePreset.description}
          </p>

          {/* Interactive Variables Sliders */}
          <div className="space-y-4 pt-2 border-t border-neutral-850">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-neutral-400" />
                Variable Parameters
              </span>
              <span className="text-neutral-500 font-sans">ปรับค่าตัวแปรเพื่อคำนวณผลลัพธ์</span>
            </div>

            <div className="space-y-3">
              {Object.entries(activePreset.variables).map(([key, config]) => {
                const currentVal = variableValues[key] ?? config.defaultValue;
                return (
                  <div
                    key={key}
                    className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-300 font-medium">{config.label}</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={currentVal}
                          step={config.step}
                          aria-label={`${config.label} numeric input`}
                          onChange={(e) => {
                            const parsed = parseFloat(e.target.value);
                            if (!Number.isNaN(parsed)) {
                              handleVariableChange(key, parsed);
                            }
                          }}
                          className="w-24 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-700 text-right text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                        />
                        <span className="text-neutral-500 text-[11px] w-8">{config.unit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      value={currentVal}
                      aria-label={`${config.label} slider`}
                      onChange={(e) => handleVariableChange(key, parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 bg-neutral-800 rounded h-1 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Calculated Metric Box */}
        <div className="rounded-xl bg-neutral-950/80 border border-neutral-800/80 p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Variable className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-medium text-neutral-300">
                  Computed Solution
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                Precision: 4 d.p.
              </span>
            </div>

            {/* Big Output Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono text-neutral-400 block">
                {activePreset.resultSymbol} Value:
              </span>
              <div className="flex items-baseline gap-2 overflow-x-auto">
                <span className="text-3xl sm:text-4xl font-mono font-semibold text-emerald-400 tracking-tight">
                  {formattedResult}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {activePreset.resultUnit}
                </span>
              </div>
            </div>

            {evaluationResult.error && (
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-xs font-mono text-rose-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{evaluationResult.error}</span>
              </div>
            )}

            {/* Computation Scope Inspection */}
            <div className="p-3 rounded-lg bg-neutral-900/50 border border-neutral-800 text-xs space-y-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                Sandbox Variable Map
              </span>
              <div className="space-y-1 font-mono text-[11px]">
                {Object.entries(variableValues).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-neutral-400">
                    <span className="text-neutral-500">{k} =</span>
                    <span className="text-neutral-200">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-850 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
            <span>Engine: Math.js AST</span>
            <span className="text-cyan-400">XSS Sanitized</span>
          </div>
        </div>
      </div>

      {/* Interactive 2D Function Plot via Mafs */}
      {activePreset.plotConfig && (
        <div className="rounded-xl bg-neutral-950/80 border border-neutral-800/80 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-mono font-medium text-neutral-200">
                Interactive 2D Function Graph ({activePreset.plotConfig.xLabel} vs. {activePreset.plotConfig.yLabel})
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 px-2 py-0.5 rounded-full">
              Powered by Mafs
            </span>
          </div>

          <div className="w-full h-[240px] rounded-lg overflow-hidden border border-neutral-850 bg-neutral-950/90 flex items-center justify-center">
            <Mafs
              viewBox={activePreset.plotConfig.viewBox}
              preserveAspectRatio="contain"
              height={240}
            >
              <Coordinates.Cartesian />
              <Plot.OfX
                y={(x) => activePreset.plotConfig?.fn(x, variableValues) ?? 0}
                color={Theme.blue}
              />
              {(() => {
                const curX = variableValues[activePreset.plotConfig.xParam] ?? 0;
                const curY = activePreset.plotConfig.fn(curX, variableValues);
                if (Number.isFinite(curX) && Number.isFinite(curY)) {
                  return <Point x={curX} y={curY} color={Theme.green} />;
                }
                return null;
              })()}
            </Mafs>
          </div>
        </div>
      )}
    </div>
  );
}
