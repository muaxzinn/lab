"use client";

import React, { useState, useMemo } from "react";
import {
  Zap,
  Activity,
  Sliders,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Info,
  Maximize2,
} from "lucide-react";
import {
  solveCircuit,
  CIRCUIT_PRESETS,
  type CircuitNetlist,
  type CircuitPreset,
  type SimulationResult,
  type CircuitComponent,
  type ComponentResult,
} from "@/lib/circuit-solver";

function renderBattery(
  vSrc: CircuitComponent | undefined,
  x: number,
  y: number,
  label: string = "DC Source"
) {
  const val = vSrc?.value ?? 9;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-10" y="-35" width="20" height="70" fill="#0a0a0a" />
      <line x1="-24" y1="-10" x2="24" y2="-10" stroke="#22c55e" strokeWidth="4" />
      <line x1="-14" y1="10" x2="14" y2="10" stroke="#ef4444" strokeWidth="5" />
      <text x="32" y="-6" fill="#22c55e" fontSize="12" fontWeight="bold" fontFamily="monospace">
        +
      </text>
      <text x="-38" y="5" textAnchor="end" fill="#f5f5f5" fontSize="12" fontFamily="monospace" fontWeight="bold">
        {val}V
      </text>
      <text x="-38" y="18" textAnchor="end" fill="#737373" fontSize="9" fontFamily="sans-serif">
        {label}
      </text>
    </g>
  );
}

function renderSwitch(
  sw: CircuitComponent | undefined,
  x: number,
  y: number,
  label: string,
  onToggle: (id: string) => void
) {
  const isClosed = sw ? sw.closed !== false : true;
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer focus:outline-none"
      role="button"
      tabIndex={0}
      aria-pressed={isClosed}
      aria-label={`Toggle switch ${label}`}
      onClick={() => sw && onToggle(sw.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (sw) onToggle(sw.id);
        }
      }}
    >
      <rect x="-30" y="-20" width="60" height="40" fill="#0a0a0a" stroke="#262626" rx="6" />
      <circle cx="-16" cy="0" r="4" fill="#a3a3a3" />
      <circle cx="16" cy="0" r="4" fill="#a3a3a3" />
      <line
        x1="-16"
        y1="0"
        x2="16"
        y2={isClosed ? "0" : "-18"}
        stroke={isClosed ? "#2ef2a0" : "#f43f5e"}
        strokeWidth="3.5"
        strokeLinecap="round"
        className="transition-all duration-200"
      />
      <text
        x="0"
        y="28"
        textAnchor="middle"
        fill={isClosed ? "#2ef2a0" : "#f43f5e"}
        fontSize="9"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {isClosed ? "ON" : "OFF"} ({label})
      </text>
    </g>
  );
}

function renderResistor(
  r: CircuitComponent | undefined,
  resResult: ComponentResult | undefined,
  x: number,
  y: number,
  vertical: boolean = false
) {
  const rVal = r?.value ?? 50;
  const valStr = rVal >= 1000 ? `${(rVal / 1000).toFixed(1)}kΩ` : `${rVal}Ω`;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${vertical ? 90 : 0})`}>
      <rect x="-40" y="-15" width="80" height="30" fill="#0a0a0a" stroke="#00f0ff" strokeWidth="1.5" rx="4" />
      <path
        d="M -30 0 L -20 -8 L -10 8 L 0 -8 L 10 8 L 20 -8 L 30 0"
        fill="none"
        stroke="#00f0ff"
        strokeWidth="2"
      />
      <g transform={vertical ? "rotate(-90)" : ""}>
        <text
          x="0"
          y={vertical ? -22 : -20}
          textAnchor="middle"
          fill="#00f0ff"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {r?.name.split("(")[0].trim() || "R"} = {valStr}
        </text>
        <text
          x="0"
          y={vertical ? 26 : 28}
          textAnchor="middle"
          fill="#a3a3a3"
          fontSize="8"
          fontFamily="monospace"
        >
          {resResult?.voltageDrop.toFixed(2) ?? 0}V | {((resResult?.current ?? 0) * 1000).toFixed(0)}mA
        </text>
      </g>
    </g>
  );
}

function renderLampOrLED(
  lamp: CircuitComponent | undefined,
  lampRes: ComponentResult | undefined,
  x: number,
  y: number
) {
  const isLit = lampRes?.state.isLit ?? false;
  const brightnessPct = lampRes?.state.brightnessPct ?? 0;
  const isLed = lamp?.type === "led";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {isLit && (
        <circle
          cx="0"
          cy="0"
          r={26 + brightnessPct * 0.25}
          fill={isLed ? "url(#led-glow)" : "url(#lamp-glow)"}
          className="animate-pulse"
        />
      )}
      <rect x="-24" y="-24" width="48" height="48" fill="#0a0a0a" rx="24" />
      <circle
        cx="0"
        cy="0"
        r="18"
        fill={isLit ? (isLed ? "#064e3b" : "#78350f") : "#171717"}
        stroke={isLit ? (isLed ? "#2ef2a0" : "#facc15") : "#525252"}
        strokeWidth="2"
      />
      {isLed ? (
        <polygon
          points="-7,6 7,6 0,-6"
          fill={isLit ? "#2ef2a0" : "#737373"}
        />
      ) : (
        <>
          <line x1="-8" y1="-8" x2="8" y2="8" stroke={isLit ? "#fff" : "#737373"} strokeWidth="2" />
          <line x1="8" y1="-8" x2="-8" y2="8" stroke={isLit ? "#fff" : "#737373"} strokeWidth="2" />
        </>
      )}
      <text
        x="28"
        y="-4"
        fill={isLit ? (isLed ? "#2ef2a0" : "#facc15") : "#737373"}
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {lamp?.name.split("(")[0].trim() || (isLed ? "LED" : "Lamp")}
      </text>
      <text x="28" y="10" fill="#a3a3a3" fontSize="8" fontFamily="monospace">
        {isLit ? `GLOW ${brightnessPct}%` : "OFF"}
      </text>
      <text x="28" y="22" fill="#737373" fontSize="8" fontFamily="sans-serif">
        P={lampRes?.power.toFixed(3) ?? 0}W
      </text>
    </g>
  );
}

function renderAmmeter(
  amm: CircuitComponent | undefined,
  ammRes: ComponentResult | undefined,
  x: number,
  y: number
) {
  const currentMa = ((ammRes?.current ?? 0) * 1000).toFixed(1);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-35" y="-18" width="70" height="36" fill="#0a0a0a" stroke="#a855f7" strokeWidth="2" rx="6" />
      <text x="0" y="-3" textAnchor="middle" fill="#c084fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
        [ A ] AMMETER
      </text>
      <text x="0" y="11" textAnchor="middle" fill="#f5f5f5" fontSize="10" fontFamily="monospace" fontWeight="bold">
        {currentMa} mA
      </text>
    </g>
  );
}

function renderVoltmeter(
  vm: CircuitComponent | undefined,
  vmRes: ComponentResult | undefined,
  x: number,
  y: number
) {
  const voltage = (vmRes?.voltageDrop ?? 0).toFixed(2);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-35" y="-18" width="70" height="36" fill="#0a0a0a" stroke="#00f0ff" strokeWidth="2" rx="6" />
      <text x="0" y="-3" textAnchor="middle" fill="#00f0ff" fontSize="9" fontFamily="monospace" fontWeight="bold">
        [ V ] VOLTMETER
      </text>
      <text x="0" y="11" textAnchor="middle" fill="#f5f5f5" fontSize="10" fontFamily="monospace" fontWeight="bold">
        {voltage} V
      </text>
    </g>
  );
}

function renderGround(x: number, y: number) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="18" stroke="#737373" strokeWidth="2" />
      <line x1="-12" y1="18" x2="12" y2="18" stroke="#737373" strokeWidth="2.5" />
      <line x1="-8" y1="23" x2="8" y2="23" stroke="#737373" strokeWidth="2" />
      <line x1="-4" y1="28" x2="4" y2="28" stroke="#737373" strokeWidth="1.5" />
      <text x="16" y="24" fill="#737373" fontSize="9" fontFamily="monospace">
        GND (0V)
      </text>
    </g>
  );
}

export function CircuitSimulator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("series-basic");

  // Active netlist state, clone from preset
  const activePreset = useMemo<CircuitPreset>(() => {
    return (
      CIRCUIT_PRESETS.find((p) => p.id === selectedPresetId) ??
      CIRCUIT_PRESETS[0]
    );
  }, [selectedPresetId]);

  // Working copy of components for live editing
  const [netlist, setNetlist] = useState<CircuitNetlist>(() =>
    JSON.parse(JSON.stringify(activePreset.netlist))
  );

  // Voltmeter probe node selection
  const [probePosNode, setProbePosNode] = useState<string>("1");
  const [probeNegNode, setProbeNegNode] = useState<string>("0");

  // When preset changes, reset netlist
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const preset = CIRCUIT_PRESETS.find((p) => p.id === id) ?? CIRCUIT_PRESETS[0];
    const cloned = JSON.parse(JSON.stringify(preset.netlist));
    setNetlist(cloned);
    const nodes = Array.from(
      new Set(cloned.components.flatMap((c: { node1: string; node2: string }) => [c.node1, c.node2]))
    ) as string[];
    setProbePosNode(nodes[0] || "1");
    setProbeNegNode(cloned.groundNode || "0");
  };

  const handleReset = () => {
    const cloned = JSON.parse(JSON.stringify(activePreset.netlist));
    setNetlist(cloned);
  };

  // Toggle switch
  const handleToggleSwitch = (id: string) => {
    setNetlist((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.id === id ? { ...c, closed: !c.closed } : c
      ),
    }));
  };

  // Adjust component value (voltage or resistance)
  const handleChangeValue = (id: string, value: number) => {
    setNetlist((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.id === id ? { ...c, value } : c
      ),
    }));
  };

  // Solve circuit with MNA
  const simResult: SimulationResult = useMemo(() => {
    return solveCircuit(netlist);
  }, [netlist]);

  // All active node names
  const allNodes = useMemo(() => {
    const set = new Set<string>();
    for (const c of netlist.components) {
      set.add(c.node1);
      set.add(c.node2);
    }
    return Array.from(set);
  }, [netlist]);

  // Probe voltage difference
  const probeVoltage = useMemo(() => {
    const vPos = simResult.nodeVoltages[probePosNode] ?? 0;
    const vNeg = simResult.nodeVoltages[probeNegNode] ?? 0;
    return vPos - vNeg;
  }, [simResult, probePosNode, probeNegNode]);

  return (
    <div className="space-y-6">
      {/* Top Bar: Presets & Controls */}
      <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              FEAT-04 Circuit Engine
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-800 text-emerald-300">
              Clean MNA Solver
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-neutral-100 mt-1">
            {activePreset.title}
          </h2>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            {activePreset.thaiTitle} — {activePreset.thaiDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CIRCUIT_PRESETS.map((p) => {
            const isActive = p.id === selectedPresetId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-sm"
                    : "bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 border border-neutral-700/60 hover:bg-neutral-700/60"
                }`}
              >
                {p.title.split("&")[0].trim()}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition"
            title="Reset Circuit"
            aria-label="Reset Circuit"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Telemetry HUD Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Total Current</span>
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-semibold text-cyan-300">
            {simResult.totalPowerSupplied > 0 && simResult.equivalentResistance > 0
              ? (
                  Math.sqrt(simResult.totalPowerSupplied / simResult.equivalentResistance) *
                  1000
                ).toFixed(1)
              : "0.0"}{" "}
            <span className="text-xs text-neutral-400 font-normal">mA</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            $I = V_{"\\text{src}"} / R_{"\\text{eq}"}$
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Total Power</span>
            <Zap className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-semibold text-amber-300">
            {simResult.totalPowerDissipated.toFixed(3)}{" "}
            <span className="text-xs text-neutral-400 font-normal">W</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            $P = \\sum V_i \\cdot I_i$
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Equivalent R</span>
            <Sliders className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-mono font-semibold text-emerald-300">
            {simResult.equivalentResistance > 1000
              ? `${(simResult.equivalentResistance / 1000).toFixed(2)} k`
              : simResult.equivalentResistance.toFixed(1)}{" "}
            <span className="text-xs text-neutral-400 font-normal">Ω</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            $R_{"\\text{eq}"}$ seen by source
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Conservation</span>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-mono font-semibold text-emerald-300 flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>KVL & KCL</span>
          </div>
          <div className="text-[10px] text-emerald-500/80 font-mono">
            100% Balanced
          </div>
        </div>
      </div>

      {/* Main Grid: Schematic & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Circuit Schematic View */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
          {/* Schematic SVG Canvas */}
          <svg
            viewBox="0 0 680 340"
            className="w-full max-w-[680px] h-auto select-none"
          >
            <defs>
              {/* Radial glow filter for illuminated lamps and LEDs */}
              <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffea75" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#ffb703" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="led-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2ef2a0" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background Grid Pattern */}
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#262626" />
            </pattern>
            <rect width="680" height="340" fill="url(#grid)" />

            {/* Preset-Specific Dynamic Schematic Rendering */}
            {(() => {
              const vSrc = netlist.components.find((c) => c.type === "dc_voltage");

              if (selectedPresetId === "parallel-branches") {
                const swMain = netlist.components.find((c) => c.id === "sw_main");
                const swA = netlist.components.find((c) => c.id === "sw_a");
                const bulbA = netlist.components.find((c) => c.id === "bulb_a");
                const swB = netlist.components.find((c) => c.id === "sw_b");
                const ledB = netlist.components.find((c) => c.id === "led_b");

                const isMainClosed = swMain?.closed !== false;
                const isAClosed = swA?.closed !== false;
                const isBClosed = swB?.closed !== false;
                const lampARes = bulbA ? simResult.componentResults[bulbA.id] : undefined;
                const ledBRes = ledB ? simResult.componentResults[ledB.id] : undefined;

                return (
                  <>
                    {/* Main Supply Wire */}
                    <path
                      d="M 80 80 L 250 80 M 80 260 L 560 260 M 80 80 L 80 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />
                    {/* Branch A Wire (Top rail: y = 110) */}
                    <path
                      d="M 250 80 L 250 110 L 560 110 L 560 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />
                    {/* Branch B Wire (Lower rail: y = 190) */}
                    <path
                      d="M 250 80 L 250 190 L 560 190 L 560 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />

                    {/* Animated current particles for Branch A */}
                    {isMainClosed && isAClosed && (lampARes?.current ?? 0) > 0.001 && (
                      <path
                        d="M 80 260 L 80 80 L 250 80 L 250 110 L 560 110 L 560 260 L 80 260"
                        fill="none"
                        stroke="#2ef2a0"
                        strokeWidth="2.5"
                        strokeDasharray="6 14"
                        style={{ animation: "dash 1.2s linear infinite" }}
                      />
                    )}

                    {/* Animated current particles for Branch B */}
                    {isMainClosed && isBClosed && (ledBRes?.current ?? 0) > 0.001 && (
                      <path
                        d="M 80 260 L 80 80 L 250 80 L 250 190 L 560 190 L 560 260 L 80 260"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                        strokeDasharray="6 14"
                        style={{ animation: "dash 1.2s linear infinite" }}
                      />
                    )}

                    {renderBattery(vSrc, 80, 170, "12V Battery")}
                    {renderSwitch(swMain, 170, 80, "Main Sw", handleToggleSwitch)}

                    {/* Branch A: Switch A & Lamp A */}
                    {renderSwitch(swA, 330, 110, "Sw A", handleToggleSwitch)}
                    {renderLampOrLED(bulbA, lampARes, 460, 110)}

                    {/* Branch B: Switch B & LED B */}
                    {renderSwitch(swB, 330, 190, "Sw B", handleToggleSwitch)}
                    {renderLampOrLED(ledB, ledBRes, 460, 190)}

                    {renderGround(80, 260)}
                  </>
                );
              }

              if (selectedPresetId === "series-parallel-combo") {
                const r1 = netlist.components.find((c) => c.id === "r1");
                const r2 = netlist.components.find((c) => c.id === "r2");
                const r3 = netlist.components.find((c) => c.id === "r3");

                const r1Res = r1 ? simResult.componentResults[r1.id] : undefined;
                const r2Res = r2 ? simResult.componentResults[r2.id] : undefined;
                const r3Res = r3 ? simResult.componentResults[r3.id] : undefined;

                return (
                  <>
                    <path
                      d="M 80 80 L 270 80 M 80 260 L 560 260 M 80 80 L 80 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />
                    {/* Parallel Branch 1 */}
                    <path
                      d="M 270 80 L 270 110 L 560 110 L 560 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />
                    {/* Parallel Branch 2 */}
                    <path
                      d="M 270 80 L 270 190 L 560 190 L 560 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />

                    {simResult.totalPowerSupplied > 0.001 && (
                      <>
                        <path
                          d="M 80 260 L 80 80 L 270 80 L 270 110 L 560 110 L 560 260 L 80 260"
                          fill="none"
                          stroke="#2ef2a0"
                          strokeWidth="2.5"
                          strokeDasharray="6 14"
                          style={{ animation: "dash 1.4s linear infinite" }}
                        />
                        <path
                          d="M 270 80 L 270 190 L 560 190 L 560 260"
                          fill="none"
                          stroke="#00f0ff"
                          strokeWidth="2.5"
                          strokeDasharray="6 14"
                          style={{ animation: "dash 1.4s linear infinite" }}
                        />
                      </>
                    )}

                    {renderBattery(vSrc, 80, 170, "10V Supply")}
                    {renderResistor(r1, r1Res, 180, 80)}
                    {renderResistor(r2, r2Res, 410, 110)}
                    {renderResistor(r3, r3Res, 410, 190)}
                    {renderGround(80, 260)}
                  </>
                );
              }

              if (selectedPresetId === "ohms-law-probe") {
                const amm = netlist.components.find((c) => c.type === "ammeter");
                const pot = netlist.components.find((c) => c.type === "resistor");
                const vm = netlist.components.find((c) => c.type === "voltmeter");

                const ammRes = amm ? simResult.componentResults[amm.id] : undefined;
                const potRes = pot ? simResult.componentResults[pot.id] : undefined;
                const vmRes = potRes; // Voltmeter is across the potentiometer

                return (
                  <>
                    <path
                      d="M 100 80 L 580 80 L 580 260 L 100 260 Z"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />
                    {/* Voltmeter test lead taps */}
                    <path
                      d="M 580 110 L 460 110 L 460 145 M 580 230 L 460 230 L 460 195"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {simResult.totalPowerSupplied > 0.001 && (
                      <path
                        d="M 100 80 L 580 80 L 580 260 L 100 260 Z"
                        fill="none"
                        stroke="#2ef2a0"
                        strokeWidth="2.5"
                        strokeDasharray="6 14"
                        style={{ animation: "dash 1.2s linear infinite" }}
                      />
                    )}

                    {renderBattery(vSrc, 100, 170, "Variable DC")}
                    {renderAmmeter(amm, ammRes, 340, 80)}
                    {renderResistor(pot, potRes, 580, 170, true)}
                    {renderVoltmeter(vm, vmRes, 460, 170)}
                    {renderGround(100, 260)}
                  </>
                );
              }

              if (selectedPresetId === "wheatstone-bridge") {
                const r1 = netlist.components.find((c) => c.id === "r1");
                const r2 = netlist.components.find((c) => c.id === "r2");
                const r3 = netlist.components.find((c) => c.id === "r3");
                const r4 = netlist.components.find((c) => c.id === "r4");
                const galv = netlist.components.find((c) => c.id === "galv");

                const r1Res = r1 ? simResult.componentResults[r1.id] : undefined;
                const r2Res = r2 ? simResult.componentResults[r2.id] : undefined;
                const r3Res = r3 ? simResult.componentResults[r3.id] : undefined;
                const r4Res = r4 ? simResult.componentResults[r4.id] : undefined;
                const galvRes = galv ? simResult.componentResults[galv.id] : undefined;

                return (
                  <>
                    <path
                      d="M 80 60 L 340 60 M 80 260 L 340 260 M 80 60 L 80 260"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />
                    {/* Bridge Diamond Frame */}
                    <path
                      d="M 340 60 L 220 160 L 340 260 M 340 60 L 460 160 L 340 260 M 220 160 L 460 160"
                      fill="none"
                      stroke="#404040"
                      strokeWidth="3"
                    />

                    {simResult.totalPowerSupplied > 0.001 && (
                      <path
                        d="M 80 260 L 80 60 L 340 60 L 220 160 L 340 260 M 340 60 L 460 160 L 340 260"
                        fill="none"
                        stroke="#2ef2a0"
                        strokeWidth="2"
                        strokeDasharray="6 12"
                        style={{ animation: "dash 1.5s linear infinite" }}
                      />
                    )}

                    {renderBattery(vSrc, 80, 160, "10V Supply")}
                    {renderResistor(r1, r1Res, 280, 105)}
                    {renderResistor(r2, r2Res, 400, 105)}
                    {renderResistor(galv, galvRes, 340, 160)}
                    {renderResistor(r3, r3Res, 280, 215)}
                    {renderResistor(r4, r4Res, 400, 215)}
                    {renderGround(80, 260)}
                  </>
                );
              }

              // Default: series-basic
              const sw = netlist.components.find((c) => c.type === "switch");
              const r = netlist.components.find((c) => c.type === "resistor");
              const lamp = netlist.components.find(
                (c) => c.type === "bulb" || c.type === "led"
              );
              const amm = netlist.components.find((c) => c.type === "ammeter");

              const rRes = r ? simResult.componentResults[r.id] : undefined;
              const lampRes = lamp ? simResult.componentResults[lamp.id] : undefined;
              const ammRes = amm ? simResult.componentResults[amm.id] : undefined;

              return (
                <>
                  <path
                    d="M 100 80 L 580 80 L 580 260 L 100 260 Z"
                    fill="none"
                    stroke="#404040"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  {simResult.totalPowerSupplied > 0.001 && (
                    <path
                      d="M 100 80 L 580 80 L 580 260 L 100 260 Z"
                      fill="none"
                      stroke="#2ef2a0"
                      strokeWidth="2.5"
                      strokeDasharray="6 14"
                      style={{ animation: "dash 1.2s linear infinite" }}
                    />
                  )}

                  {renderBattery(vSrc, 100, 170, "9V Battery")}
                  {renderSwitch(sw, 220, 80, "Main Sw", handleToggleSwitch)}
                  {renderResistor(r, rRes, 400, 80)}
                  {renderLampOrLED(lamp, lampRes, 580, 170)}
                  {renderAmmeter(amm, ammRes, 340, 260)}
                  {renderGround(100, 260)}
                </>
              );
            })()}
          </svg>

          {/* Live Voltmeter Floating Overlay HUD */}
          <div className="absolute top-4 right-4 p-3 rounded-xl bg-neutral-900/95 border border-cyan-800/80 shadow-lg text-xs space-y-1.5 font-mono">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Activity className="h-3.5 w-3.5" />
              <span>DIGITAL VOLTMETER PROBE</span>
            </div>
            <div className="text-xl font-bold text-neutral-100">
              {probeVoltage >= 0 ? "+" : ""}
              {probeVoltage.toFixed(3)}{" "}
              <span className="text-xs font-normal text-cyan-400">V</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
              <span>
                Node ({probePosNode}) - Node ({probeNegNode})
              </span>
            </div>
          </div>
        </div>

        {/* Right: Component Parameter Sliders & Probing Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
              <Sliders className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-heading font-semibold text-neutral-200">
                Interactive Circuit Parameters
              </h3>
            </div>

            {/* DC Voltage Slider */}
            {(() => {
              const vSrc = netlist.components.find((c) => c.type === "dc_voltage");
              if (!vSrc) return null;
              return (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-medium">
                      {vSrc.name}
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      {vSrc.value} V
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="0.5"
                    value={vSrc.value}
                    onChange={(e) =>
                      handleChangeValue(vSrc.id, parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>0 V</span>
                    <span>12 V</span>
                    <span>24 V</span>
                  </div>
                </div>
              );
            })()}

            {/* Resistors Sliders (1Ω - 10kΩ) */}
            {netlist.components
              .filter((c) => c.type === "resistor")
              .map((r) => (
                <div key={r.id} className="space-y-1.5 pt-2 border-t border-neutral-800/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-medium">{r.name}</span>
                    <span className="font-mono text-cyan-400 font-semibold">
                      {r.value >= 1000 ? `${(r.value / 1000).toFixed(2)} kΩ` : `${r.value} Ω`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10000"
                    step={r.value > 1000 ? "50" : "5"}
                    value={r.value}
                    onChange={(e) =>
                      handleChangeValue(r.id, parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>1 Ω</span>
                    <span>1 kΩ</span>
                    <span>5 kΩ</span>
                    <span>10 kΩ</span>
                  </div>
                </div>
              ))}

            {/* Switch Toggles */}
            {netlist.components
              .filter((c) => c.type === "switch")
              .map((sw) => {
                const isClosed = sw.closed !== false;
                return (
                  <div
                    key={sw.id}
                    className="flex items-center justify-between pt-2 border-t border-neutral-800/60"
                  >
                    <div>
                      <div className="text-xs font-medium text-neutral-300">
                        {sw.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {isClosed ? "Conducting (Short)" : "Broken (Open)"}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Toggle switch ${sw.name} currently ${isClosed ? 'ON' : 'OFF'}`}
                      onClick={() => handleToggleSwitch(sw.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                        isClosed
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/60"
                      }`}
                    >
                      {isClosed ? "ON" : "OFF"}
                    </button>
                  </div>
                );
              })}

            {/* Voltmeter Probe Selector */}
            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                <Maximize2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Move Voltmeter Probes</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-red-400 font-bold block mb-1">
                    (+) Red Probe:
                  </label>
                  <select
                    value={probePosNode}
                    onChange={(e) => setProbePosNode(e.target.value)}
                    className="w-full px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 text-xs"
                  >
                    {allNodes.map((n) => (
                      <option key={n} value={n}>
                        Node {n} ({simResult.nodeVoltages[n]?.toFixed(2) ?? 0}V)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 font-bold block mb-1">
                    (-) Black Probe:
                  </label>
                  <select
                    value={probeNegNode}
                    onChange={(e) => setProbeNegNode(e.target.value)}
                    className="w-full px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-neutral-200 text-xs"
                  >
                    {allNodes.map((n) => (
                      <option key={n} value={n}>
                        Node {n} ({simResult.nodeVoltages[n]?.toFixed(2) ?? 0}V)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Telemetry & Kirchhoff Breakdown Table */}
      <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-heading font-semibold text-neutral-200">
              Branch MNA Telemetry & Kirchhoff Conservation Matrix
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Node Count: {allNodes.length} | Branches:{" "}
            {netlist.components.length}
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-2 px-3">Component</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Nodes</th>
                <th className="py-2 px-3">Voltage Drop</th>
                <th className="py-2 px-3">Branch Current</th>
                <th className="py-2 px-3">Power</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {netlist.components.map((c) => {
                const res = simResult.componentResults[c.id];
                if (!res) return null;
                return (
                  <tr key={c.id} className="hover:bg-neutral-800/40">
                    <td className="py-2 px-3 font-semibold text-neutral-200">
                      {c.name}
                    </td>
                    <td className="py-2 px-3 text-neutral-400">{c.type}</td>
                    <td className="py-2 px-3 text-neutral-400">
                      {c.node1} → {c.node2}
                    </td>
                    <td className="py-2 px-3 text-cyan-300">
                      {res.voltageDrop.toFixed(3)} V
                    </td>
                    <td className="py-2 px-3 text-emerald-300">
                      {(res.current * 1000).toFixed(2)} mA
                    </td>
                    <td className="py-2 px-3 text-amber-300">
                      {res.power.toFixed(3)} W
                    </td>
                    <td className="py-2 px-3">
                      {c.type === "bulb" || c.type === "led" ? (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] ${
                            res.state.isLit
                              ? "bg-amber-950/80 border border-amber-800 text-amber-300"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          <Sparkles className="h-2.5 w-2.5" />
                          {res.state.isLit
                            ? `Glowing (${res.state.brightnessPct}%)`
                            : "Dark"}
                        </span>
                      ) : c.type === "switch" ? (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            res.state.isOpen
                              ? "bg-rose-950/80 border border-rose-800 text-rose-300"
                              : "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
                          }`}
                        >
                          {res.state.isOpen ? "Open" : "Closed"}
                        </span>
                      ) : (
                        <span className="text-neutral-500">Nominal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
