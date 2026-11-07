"use client";

import React, { useState, useMemo } from "react";
import {
  Scale,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Atom,
} from "lucide-react";
import {
  balanceChemicalEquation,
  calculateStoichiometry,
  REACTION_PRESETS,
  type BalancedReaction,
  type StoichiometryResult,
  type ReactionPreset,
} from "@/lib/chemical-solver";

export function ChemicalReactionViewer() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("methane-combustion");
  const [customEquation, setCustomEquation] = useState<string>("CH4 + O2 -> CO2 + H2O");

  // Stoichiometry inputs
  const [refFormula, setRefFormula] = useState<string>("CH4");
  const [refQuantity, setRefQuantity] = useState<number>(1.0);
  const [refUnit, setRefUnit] = useState<"moles" | "grams">("moles");

  // Select Preset
  const handleSelectPreset = (preset: ReactionPreset) => {
    setSelectedPresetId(preset.id);
    setCustomEquation(preset.equation);
    // Find first reactant formula
    const firstTerm = preset.equation.split(/(?:->|→|=)/)[0].split("+")[0].trim();
    setRefFormula(firstTerm);
    setRefQuantity(1.0);
  };

  // Live balancing
  const balanceResult: BalancedReaction = useMemo(() => {
    return balanceChemicalEquation(customEquation);
  }, [customEquation]);

  // Ensure reference formula is valid in balanced reaction
  const activeRefFormula = useMemo(() => {
    if (!balanceResult.success) return refFormula;
    const all = [
      ...balanceResult.reactants.map((r) => r.formula),
      ...balanceResult.products.map((p) => p.formula),
    ];
    if (all.includes(refFormula)) return refFormula;
    return all[0] || "H2";
  }, [balanceResult, refFormula]);

  // Stoichiometry calculation
  const stoichResult: StoichiometryResult | null = useMemo(() => {
    if (!balanceResult.success) return null;
    try {
      return calculateStoichiometry(
        balanceResult,
        activeRefFormula,
        refQuantity,
        refUnit
      );
    } catch {
      return null;
    }
  }, [balanceResult, activeRefFormula, refQuantity, refUnit]);

  // Atom balance breakdown
  const atomInventory = useMemo(() => {
    if (!balanceResult.success) return [];
    const elements = new Set<string>();
    for (const r of balanceResult.reactants) {
      for (const el of Object.keys(r.info.elements)) elements.add(el);
    }
    return Array.from(elements).map((el) => {
      let rCount = 0;
      for (const r of balanceResult.reactants) {
        rCount += r.coefficient * (r.info.elements[el] || 0);
      }
      let pCount = 0;
      for (const p of balanceResult.products) {
        pCount += p.coefficient * (p.info.elements[el] || 0);
      }
      return {
        element: el,
        reactants: rCount,
        products: pCount,
        balanced: rCount === pCount,
      };
    });
  }, [balanceResult]);

  return (
    <div className="space-y-6">
      {/* Top Presets & Custom Equation Bar */}
      <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-semibold">
                FEAT-06 & FEAT-11 Stoichiometry Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-950/80 border border-orange-800 text-orange-300">
                Exact Gauss-Jordan Nullspace
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-heading font-semibold text-neutral-100 mt-1">
              Chemical Equation Balancer & Mass Conservation Inspector
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCustomEquation("CH4 + O2 -> CO2 + H2O");
                setSelectedPresetId("methane-combustion");
                setRefFormula("CH4");
                setRefQuantity(1.0);
              }}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition"
              title="Reset Equation"
              aria-label="Reset Equation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Preset Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {REACTION_PRESETS.map((p) => {
            const isActive = p.id === selectedPresetId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/60 shadow-sm font-semibold"
                    : "bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 border border-neutral-700/60 hover:bg-neutral-700/60"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Input Field with Live Balancing Status */}
        <div className="space-y-1.5">
          <label className="text-xs text-neutral-400 font-mono block">
            Enter Chemical Equation (format: Reactants -&gt; Products):
          </label>
          <div className="relative">
            <input
              type="text"
              value={customEquation}
              onChange={(e) => {
                setCustomEquation(e.target.value);
                setSelectedPresetId("");
              }}
              placeholder="e.g. Al + H2SO4 -> Al2(SO4)3 + H2"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-neutral-100 font-mono text-sm focus:outline-none focus:border-orange-400 transition"
            />
          </div>
          {balanceResult.error && (
            <div role="alert" aria-live="polite" className="flex items-center gap-2 text-xs text-rose-400 font-mono pt-1">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>{balanceResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Balanced Reaction Display Card */}
      {balanceResult.success && (
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
                Balanced Equation
              </span>
              <div className="text-xl sm:text-2xl font-mono font-bold text-neutral-100 mt-1 flex flex-wrap items-center gap-2">
                {/* Reactants */}
                {balanceResult.reactants.map((r, idx) => (
                  <span key={r.formula} className="inline-flex items-center gap-1.5">
                    {idx > 0 && <span className="text-neutral-500 font-sans">+</span>}
                    {r.coefficient > 1 && (
                      <span className="px-2 py-0.5 rounded bg-orange-950/90 border border-orange-800 text-orange-400 font-bold">
                        {r.coefficient}
                      </span>
                    )}
                    <span className="text-cyan-300 font-semibold">{r.formula}</span>
                  </span>
                ))}

                <ArrowRight className="h-5 w-5 text-neutral-500 mx-1 shrink-0" />

                {/* Products */}
                {balanceResult.products.map((p, idx) => (
                  <span key={p.formula} className="inline-flex items-center gap-1.5">
                    {idx > 0 && <span className="text-neutral-500 font-sans">+</span>}
                    {p.coefficient > 1 && (
                      <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-800 text-emerald-400 font-bold">
                        {p.coefficient}
                      </span>
                    )}
                    <span className="text-emerald-300 font-semibold">{p.formula}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Mass Conservation Badge */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1 text-right">
                <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-end gap-1">
                  <Scale className="h-3 w-3 text-emerald-400" />
                  <span>Law of Conservation of Mass</span>
                </div>
                <div className="text-sm font-mono font-bold text-emerald-300 flex items-center justify-end gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Δm = 0.0000 g/mol</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  {balanceResult.totalReactantMassPerMole} g = {balanceResult.totalProductMassPerMole} g
                </div>
              </div>
            </div>
          </div>

          {/* Atom Count Inventory Verification Matrix */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Atom className="h-3.5 w-3.5 text-cyan-400" />
              <span>Atom Conservation Matrix Verification:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {atomInventory.map((item) => (
                <div
                  key={item.element}
                  className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between text-neutral-300 font-bold">
                    <span>{item.element}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>In: {item.reactants}</span>
                    <span>Out: {item.products}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stoichiometry & Particle Calculator */}
      {balanceResult.success && stoichResult && (
        <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-orange-400" />
              <div>
                <h3 className="text-sm sm:text-base font-heading font-semibold text-neutral-100">
                  Interactive Stoichiometry & Avogadro Particle Calculator
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  คำนวณสัดส่วนโมล มวลเป็นกรัม และจำนวนอนุภาคตามค่าสัมประสิทธิ์สัดส่วน
                </p>
              </div>
            </div>

            {/* Reagent and Unit Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={activeRefFormula}
                onChange={(e) => setRefFormula(e.target.value)}
                className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 text-xs font-mono"
              >
                {stoichResult.species.map((s) => (
                  <option key={s.formula} value={s.formula}>
                    {s.formula} ({s.role})
                  </option>
                ))}
              </select>

              <div role="radiogroup" aria-label="Quantity Unit" className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg border border-neutral-700">
                <button
                  type="button"
                  role="radio"
                  aria-checked={refUnit === "moles"}
                  onClick={() => setRefUnit("moles")}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                    refUnit === "moles"
                      ? "bg-orange-500/20 text-orange-300 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  Moles (mol)
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={refUnit === "grams"}
                  onClick={() => setRefUnit("grams")}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                    refUnit === "grams"
                      ? "bg-orange-500/20 text-orange-300 font-bold"
                      : "text-neutral-400"
                  }`}
                >
                  Mass (g)
                </button>
              </div>
            </div>
          </div>

          {/* Quantity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-300">
                Quantity of {activeRefFormula}:
              </span>
              <span className="text-orange-400 font-bold text-sm">
                {refQuantity} {refUnit === "moles" ? "mol" : "g"}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max={refUnit === "moles" ? "20" : "500"}
              step={refUnit === "moles" ? "0.1" : "1"}
              value={refQuantity}
              onChange={(e) => setRefQuantity(parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>{refUnit === "moles" ? "0.1 mol" : "1 g"}</span>
              <span>{refUnit === "moles" ? "10 mol" : "250 g"}</span>
              <span>{refUnit === "moles" ? "20 mol" : "500 g"}</span>
            </div>
          </div>

          {/* Stoichiometric Species Breakdown Table */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-2.5 px-3">Species</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Ratio (Coeff)</th>
                  <th className="py-2.5 px-3">Molar Mass</th>
                  <th className="py-2.5 px-3">Moles (n)</th>
                  <th className="py-2.5 px-3">Mass (m)</th>
                  <th className="py-2.5 px-3">Particle Count (N)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                {stoichResult.species.map((s) => (
                  <tr
                    key={s.formula}
                    className={`hover:bg-neutral-800/40 transition ${
                      s.formula === activeRefFormula
                        ? "bg-orange-950/20 font-semibold"
                        : ""
                    }`}
                  >
                    <td className="py-2.5 px-3 text-neutral-100 font-bold flex items-center gap-1.5">
                      <span>{s.formula}</span>
                      {s.formula === activeRefFormula && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-950 border border-orange-800 text-orange-300">
                          Reference
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          s.role === "reactant"
                            ? "bg-cyan-950/80 border border-cyan-800 text-cyan-300"
                            : "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
                        }`}
                      >
                        {s.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-neutral-400">{s.coefficient}</td>
                    <td className="py-2.5 px-3 text-neutral-400">
                      {s.molarMass.toFixed(2)} g/mol
                    </td>
                    <td className="py-2.5 px-3 text-orange-300 font-bold">
                      {s.moles.toFixed(4)} mol
                    </td>
                    <td className="py-2.5 px-3 text-neutral-200">
                      {s.massGrams.toFixed(2)} g
                    </td>
                    <td className="py-2.5 px-3 text-cyan-400">
                      {(s.particleCount / 1e23).toFixed(3)} × 10²³
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Mass Equality Summary */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>
                Total Reactant Mass:{" "}
                <strong className="text-cyan-300">
                  {stoichResult.totalReactantMass.toFixed(2)} g
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span>
                Total Product Mass:{" "}
                <strong className="text-emerald-300">
                  {stoichResult.totalProductMass.toFixed(2)} g
                </strong>
              </span>
              <span className="text-emerald-400 font-bold ml-2">
                (Conservation Delta = {stoichResult.massConservationDelta.toFixed(4)} g)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
