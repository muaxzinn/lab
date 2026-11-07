"use client";

import React, { useState, useMemo } from "react";
import {
  Binary,
  Cpu,
  RotateCcw,
  Sparkles,
  Table,
} from "lucide-react";
import {
  evaluateCircuit,
  generateTruthTable,
  CS_LOGIC_PRESETS,
  type LogicCircuit,
  type EvaluationResult,
  type TruthTableRow,
} from "@/lib/logic-gate-engine";

export function LogicGateSandbox() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("half-adder");

  const activePreset = useMemo<LogicCircuit>(() => {
    return (
      CS_LOGIC_PRESETS.find((p) => p.id === selectedPresetId) ??
      CS_LOGIC_PRESETS[0]
    );
  }, [selectedPresetId]);

  // Working copy of circuit with mutable input switch states
  const [circuit, setCircuit] = useState<LogicCircuit>(() =>
    JSON.parse(JSON.stringify(activePreset))
  );

  const [activeTab, setActiveTab] = useState<"schematic" | "truth-table">("schematic");

  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    const p = CS_LOGIC_PRESETS.find((item) => item.id === id) ?? CS_LOGIC_PRESETS[0];
    setCircuit(JSON.parse(JSON.stringify(p)));
  };

  const handleReset = () => {
    setCircuit(JSON.parse(JSON.stringify(activePreset)));
  };

  // Toggle input switch
  const handleToggleInput = (nodeId: string) => {
    setCircuit((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.id === nodeId && n.type === "INPUT" ? { ...n, state: !n.state } : n
      ),
    }));
  };

  // Evaluate live circuit
  const evalResult: EvaluationResult = useMemo(() => {
    return evaluateCircuit(circuit);
  }, [circuit]);

  // Generate automated truth table
  const truthTable: TruthTableRow[] = useMemo(() => {
    return generateTruthTable(circuit);
  }, [circuit]);

  const inputNodes = useMemo(() => {
    return circuit.nodes.filter((n) => n.type === "INPUT");
  }, [circuit]);

  const outputNodes = useMemo(() => {
    return circuit.nodes.filter((n) => n.type === "OUTPUT");
  }, [circuit]);

  // Check which truth table row matches current input state
  const activeTableRowIndex = useMemo(() => {
    for (let r = 0; r < truthTable.length; r++) {
      const row = truthTable[r];
      const match = inputNodes.every((inp) => row.inputs[inp.id] === evalResult.nodeStates[inp.id]);
      if (match) return r;
    }
    return -1;
  }, [truthTable, inputNodes, evalResult]);

  return (
    <div className="space-y-6">
      {/* Top Presets & Controls */}
      <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              FEAT-19 Digital Logic Sandbox
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 border border-cyan-800 text-cyan-300">
              Topological Propagation
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-neutral-100 mt-1">
            {circuit.name}
          </h2>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            {circuit.thaiName} — {circuit.thaiDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CS_LOGIC_PRESETS.map((p) => {
            const isActive = p.id === selectedPresetId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-sm font-semibold"
                    : "bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 border border-neutral-700/60 hover:bg-neutral-700/60"
                }`}
              >
                {p.name}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition"
            title="Reset Logic Circuit"
            aria-label="Reset Logic Circuit"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Boolean Formula & Telemetry HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Boolean Expression</span>
            <Binary className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="text-sm sm:text-base font-mono font-semibold text-cyan-300 truncate">
            {circuit.booleanExpression || "F(inputs)"}
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            Standard Logic Canonical Form
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Input Switches State</span>
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-sm sm:text-base font-mono font-semibold text-emerald-300 flex items-center gap-2">
            {inputNodes.map((inp) => (
              <span key={inp.id} className="inline-flex items-center gap-1">
                <span className="text-neutral-400">{inp.label}:</span>
                <span
                  className={
                    evalResult.nodeStates[inp.id]
                      ? "text-emerald-400 font-bold"
                      : "text-neutral-500"
                  }
                >
                  {evalResult.nodeStates[inp.id] ? "1" : "0"}
                </span>
              </span>
            ))}
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            {inputNodes.length} Independent Inputs ({1 << inputNodes.length} states)
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span className="font-mono">Output LED Probes</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div className="text-sm sm:text-base font-mono font-semibold text-amber-300 flex items-center gap-3">
            {outputNodes.map((out) => (
              <span key={out.id} className="inline-flex items-center gap-1">
                <span className="text-neutral-400">{out.label}:</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-xs font-bold ${
                    evalResult.outputStates[out.id]
                      ? "bg-amber-950/80 border border-amber-800 text-amber-300"
                      : "bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {evalResult.outputStates[out.id] ? "HIGH (1)" : "LOW (0)"}
                </span>
              </span>
            ))}
          </div>
          <div className="text-[10px] text-neutral-500 font-mono">
            Acyclic Deterministic DAG
          </div>
        </div>
      </div>

      {/* View Switcher: Interactive Schematic vs Truth Table */}
      <div role="tablist" aria-label="Logic Gate Views" className="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "schematic"}
          onClick={() => setActiveTab("schematic")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === "schematic"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-semibold"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Cpu className="h-3.5 w-3.5" />
          <span>Interactive Schematic Diagram</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "truth-table"}
          onClick={() => setActiveTab("truth-table")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeTab === "truth-table"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-semibold"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          <Table className="h-3.5 w-3.5" />
          <span>Automated Truth Table ({truthTable.length} Rows)</span>
        </button>
      </div>

      {/* Main View Area */}
      {activeTab === "schematic" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Schematic SVG View */}
          <div className="lg:col-span-8 p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden select-none">
            <svg
              viewBox="0 0 680 340"
              className="w-full max-w-[680px] h-auto"
            >
              <defs>
                <pattern
                  id="cs-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="#222" />
                </pattern>
                <radialGradient id="led-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2ef2a0" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="680" height="340" fill="url(#cs-grid)" />

              {/* Render Wires */}
              {circuit.wires.map((wire) => {
                const fromNode = circuit.nodes.find((n) => n.id === wire.fromNodeId);
                const toNode = circuit.nodes.find((n) => n.id === wire.toNodeId);
                if (!fromNode || !toNode) return null;

                const isHigh = evalResult.wireStates[wire.id] ?? false;

                // Simple routed orthogonal curve
                const startX = fromNode.x + 30;
                const startY = fromNode.y;
                const endX = toNode.x - 30;
                const pinOffset = (wire.toPinIndex - 0.5) * 16;
                const endY = toNode.y + pinOffset;

                const midX = (startX + endX) / 2;

                const pathData = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

                return (
                  <g key={wire.id}>
                    {/* Shadow / Base Wire */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isHigh ? "#064e3b" : "#262626"}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* Active Wire Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isHigh ? "#2ef2a0" : "#404040"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Signal Particle Flow when HIGH */}
                    {isHigh && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                        strokeDasharray="4 8"
                        style={{
                          animation: "dash 1.2s linear infinite",
                        }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Render Nodes (Inputs, Gates, Outputs) */}
              {circuit.nodes.map((node) => {
                const nodeVal = evalResult.nodeStates[node.id] ?? false;

                if (node.type === "INPUT") {
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-pointer"
                      onClick={() => handleToggleInput(node.id)}
                    >
                      <rect
                        x="-30"
                        y="-20"
                        width="60"
                        height="40"
                        rx="8"
                        fill={nodeVal ? "#064e3b" : "#171717"}
                        stroke={nodeVal ? "#2ef2a0" : "#525252"}
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#f5f5f5"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {node.label}
                      </text>
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill={nodeVal ? "#2ef2a0" : "#737373"}
                        fontSize="12"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        [{nodeVal ? "1" : "0"}]
                      </text>
                    </g>
                  );
                }

                if (node.type === "OUTPUT") {
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                    >
                      {/* Halo glow when HIGH */}
                      {nodeVal && (
                        <circle
                          cx="0"
                          cy="0"
                          r="26"
                          fill="url(#led-halo)"
                          className="animate-pulse"
                        />
                      )}
                      <rect
                        x="-30"
                        y="-20"
                        width="60"
                        height="40"
                        rx="8"
                        fill={nodeVal ? "#064e3b" : "#171717"}
                        stroke={nodeVal ? "#2ef2a0" : "#525252"}
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#f5f5f5"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {node.label}
                      </text>
                      <text
                        x="0"
                        y="12"
                        textAnchor="middle"
                        fill={nodeVal ? "#2ef2a0" : "#737373"}
                        fontSize="12"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {nodeVal ? "HIGH" : "LOW"}
                      </text>
                    </g>
                  );
                }

                // Standard Logic Gate Symbol
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                  >
                    <rect
                      x="-26"
                      y="-22"
                      width="52"
                      height="44"
                      rx="6"
                      fill="#0f172a"
                      stroke={nodeVal ? "#00f0ff" : "#334155"}
                      strokeWidth="2"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {node.label}
                    </text>
                    <text
                      x="0"
                      y="12"
                      textAnchor="middle"
                      fill={nodeVal ? "#00f0ff" : "#64748b"}
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {nodeVal ? "= 1" : "= 0"}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-3 left-4 text-[10px] text-neutral-500 font-mono">
              Tip: Click on input boxes [A], [B], [Cin] to toggle bits 0 ↔ 1
            </div>
          </div>

          {/* Right: Switch Control Desk */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                <Cpu className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-heading font-semibold text-neutral-200">
                  Digital Input Console
                </h3>
              </div>

              {inputNodes.map((inp) => {
                const isHigh = evalResult.nodeStates[inp.id] ?? false;
                return (
                  <div
                    key={inp.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950 border border-neutral-800"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-neutral-200">
                        Input Line: {inp.label}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-sans">
                        {inp.thaiLabel || "สัญญาณบิต"}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Toggle input line ${inp.label} current state ${isHigh ? '1 high' : '0 low'}`}
                      onClick={() => handleToggleInput(inp.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                        isHigh
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-sm"
                          : "bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-700"
                      }`}
                    >
                      {isHigh ? "1 (HIGH)" : "0 (LOW)"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quick Output Inspector */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h3 className="text-sm font-heading font-semibold text-neutral-200">
                  Monitored Output Lines
                </h3>
              </div>

              {outputNodes.map((out) => {
                const isHigh = evalResult.outputStates[out.id] ?? false;
                return (
                  <div
                    key={out.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950 border border-neutral-800"
                  >
                    <span className="text-xs font-mono font-semibold text-neutral-200">
                      {out.label}
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                        isHigh
                          ? "bg-amber-950/80 border border-amber-800 text-amber-300"
                          : "bg-neutral-800 text-neutral-500"
                      }`}
                    >
                      {isHigh ? "LOGIC 1" : "LOGIC 0"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Automated Truth Table View */
        <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-heading font-semibold text-neutral-200">
                Complete Exhaustive Truth Table ({1 << inputNodes.length} Combinations)
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                ตารางค่าความจริงครบทุกกรณี — แถวสีเขียวเน้นค่าที่ตรงกับสวิตช์ในปัจจุบัน
              </p>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-center text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-2.5 px-3">State #</th>
                  {inputNodes.map((inp) => (
                    <th key={inp.id} className="py-2.5 px-3 text-cyan-300">
                      Input {inp.label}
                    </th>
                  ))}
                  <th className="py-2.5 px-2 text-neutral-600">→</th>
                  {outputNodes.map((out) => (
                    <th key={out.id} className="py-2.5 px-3 text-amber-300">
                      Output {out.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                {truthTable.map((row) => {
                  const isCurrent = row.decimalIndex === activeTableRowIndex;
                  return (
                    <tr
                      key={row.decimalIndex}
                      className={`transition ${
                        isCurrent
                          ? "bg-emerald-950/40 text-emerald-200 font-bold border-l-4 border-l-emerald-400"
                          : "hover:bg-neutral-900/50"
                      }`}
                    >
                      <td className="py-2.5 px-3 text-neutral-500">
                        #{row.decimalIndex}
                      </td>
                      {inputNodes.map((inp) => (
                        <td key={inp.id} className="py-2.5 px-3">
                          <span
                            className={
                              row.inputs[inp.id]
                                ? "text-cyan-400 font-bold"
                                : "text-neutral-500"
                            }
                          >
                            {row.inputs[inp.id] ? "1" : "0"}
                          </span>
                        </td>
                      ))}
                      <td className="py-2.5 px-2 text-neutral-600">→</td>
                      {outputNodes.map((out) => (
                        <td key={out.id} className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] ${
                              row.outputs[out.id]
                                ? "bg-amber-950/80 border border-amber-800 text-amber-300 font-bold"
                                : "bg-neutral-900 text-neutral-500"
                            }`}
                          >
                            {row.outputs[out.id] ? "1" : "0"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
