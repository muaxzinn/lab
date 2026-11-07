/**
 * Boolean Logic Gate & Digital Circuit Engine
 * Clean-Room Pure TypeScript Implementation (Zero External Dependencies)
 * 
 * Supports:
 * - Basic & Universal Gates: AND, OR, NOT, XOR, NAND, NOR, XNOR, BUFFER
 * - Input Switches (0/1) and Output LEDs (Indicators)
 * - Directed wire routing with multi-pin indexing
 * - Topological signal propagation & cycle-guarded relaxation
 * - Automated Truth Table generation for arbitrary digital logic networks
 * - Secondary & University CS Curriculum Presets (Half Adder, Full Adder, MUX, De Morgan)
 */

export type GateType =
  | "INPUT"
  | "OUTPUT"
  | "AND"
  | "OR"
  | "NOT"
  | "XOR"
  | "NAND"
  | "NOR"
  | "XNOR"
  | "BUFFER";

export interface GateNode {
  id: string;
  type: GateType;
  label: string;
  thaiLabel?: string;
  x: number; // Schematic layout coordinate X
  y: number; // Schematic layout coordinate Y
  state?: boolean; // User state for INPUT, or evaluated state
}

export interface GateWire {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  toPinIndex: number; // 0: Pin A, 1: Pin B, 2: Pin C...
}

export interface LogicCircuit {
  id: string;
  name: string;
  thaiName: string;
  description: string;
  thaiDescription: string;
  booleanExpression?: string;
  nodes: GateNode[];
  wires: GateWire[];
}

export interface EvaluationResult {
  nodeStates: Record<string, boolean>;
  wireStates: Record<string, boolean>;
  outputStates: Record<string, boolean>;
  hasCycles: boolean;
}

export interface TruthTableRow {
  decimalIndex: number;
  inputs: Record<string, boolean>;
  outputs: Record<string, boolean>;
}

/**
 * Evaluate single gate primitive function given its input boolean values.
 */
export function evaluateGatePrimitive(
  type: GateType,
  inputs: boolean[],
  defaultState: boolean = false
): boolean {
  if (inputs.length === 0) {
    switch (type) {
      case "INPUT":
        return defaultState;
      case "OUTPUT":
      case "BUFFER":
        return false;
      case "NOT":
        return true;
      case "AND":
        return false;
      case "OR":
        return false;
      case "XOR":
        return false;
      case "NAND":
        return true;
      case "NOR":
        return true;
      case "XNOR":
        return true;
    }
  }

  const a = inputs[0] ?? false;

  switch (type) {
    case "INPUT":
      return defaultState;
    case "OUTPUT":
    case "BUFFER":
      return a;
    case "NOT":
      return !a;
    case "AND":
      return inputs.every(Boolean);
    case "OR":
      return inputs.some(Boolean);
    case "XOR":
      return inputs.reduce((acc, v) => acc !== v, false);
    case "NAND":
      return !inputs.every(Boolean);
    case "NOR":
      return !inputs.some(Boolean);
    case "XNOR":
      return !inputs.reduce((acc, v) => acc !== v, false);
  }
}

/**
 * Propagate signals through circuit graph using fixed-point relaxation.
 */
export function evaluateCircuit(
  circuit: LogicCircuit,
  overrideInputs?: Record<string, boolean>
): EvaluationResult {
  const nodeStates: Record<string, boolean> = {};

  // Initialize input nodes
  for (const node of circuit.nodes) {
    if (node.type === "INPUT") {
      const val =
        overrideInputs && overrideInputs[node.id] !== undefined
          ? overrideInputs[node.id]
          : node.state ?? false;
      nodeStates[node.id] = val;
    } else {
      nodeStates[node.id] = false;
    }
  }

  // Pre-index incoming wires by toNodeId and toPinIndex
  const incomingMap = new Map<string, Map<number, string>>();
  for (const wire of circuit.wires) {
    if (!incomingMap.has(wire.toNodeId)) {
      incomingMap.set(wire.toNodeId, new Map());
    }
    incomingMap.get(wire.toNodeId)!.set(wire.toPinIndex, wire.fromNodeId);
  }

  // Fixed-point relaxation with max iterations guard
  const MAX_ITERATIONS = 40;
  let hasCycles = false;
  let iteration = 0;
  let changed = true;

  while (changed && iteration < MAX_ITERATIONS) {
    changed = false;
    iteration++;

    for (const node of circuit.nodes) {
      if (node.type === "INPUT") continue;

      const pinMap = incomingMap.get(node.id);
      const inputs: boolean[] = [];

      if (pinMap) {
        // Collect pins in index order 0, 1, 2...
        const maxPin = Math.max(...Array.from(pinMap.keys()), 0);
        for (let p = 0; p <= maxPin; p++) {
          const fromNodeId = pinMap.get(p);
          const pinVal = fromNodeId ? nodeStates[fromNodeId] ?? false : false;
          inputs.push(pinVal);
        }
      }

      const nextVal = evaluateGatePrimitive(node.type, inputs, false);
      if (nodeStates[node.id] !== nextVal) {
        nodeStates[node.id] = nextVal;
        changed = true;
      }
    }
  }

  if (iteration >= MAX_ITERATIONS && changed) {
    hasCycles = true;
  }

  // Record wire states
  const wireStates: Record<string, boolean> = {};
  for (const wire of circuit.wires) {
    wireStates[wire.id] = nodeStates[wire.fromNodeId] ?? false;
  }

  // Record output node states
  const outputStates: Record<string, boolean> = {};
  for (const node of circuit.nodes) {
    if (node.type === "OUTPUT") {
      outputStates[node.id] = nodeStates[node.id] ?? false;
    }
  }

  return {
    nodeStates,
    wireStates,
    outputStates,
    hasCycles,
  };
}

/**
 * Generate full automated truth table for all 2^N input combinations.
 */
export function generateTruthTable(circuit: LogicCircuit): TruthTableRow[] {
  const inputNodes = circuit.nodes.filter((n) => n.type === "INPUT");
  const outputNodes = circuit.nodes.filter((n) => n.type === "OUTPUT");

  const numInputs = inputNodes.length;
  if (numInputs === 0 || numInputs > 8) {
    // Return single row or cap at 256 rows to prevent browser freeze
    const single = evaluateCircuit(circuit);
    return [
      {
        decimalIndex: 0,
        inputs: {},
        outputs: single.outputStates,
      },
    ];
  }

  const numRows = 1 << numInputs; // 2^N
  const rows: TruthTableRow[] = [];

  for (let i = 0; i < numRows; i++) {
    const inputCombo: Record<string, boolean> = {};
    for (let bit = 0; bit < numInputs; bit++) {
      // Big-endian bit ordering: inputNodes[0] is MSB
      const isHigh = Boolean((i >> (numInputs - 1 - bit)) & 1);
      inputCombo[inputNodes[bit].id] = isHigh;
    }

    const res = evaluateCircuit(circuit, inputCombo);

    const outCombo: Record<string, boolean> = {};
    for (const outNode of outputNodes) {
      outCombo[outNode.id] = res.outputStates[outNode.id] ?? false;
    }

    rows.push({
      decimalIndex: i,
      inputs: inputCombo,
      outputs: outCombo,
    });
  }

  return rows;
}

/**
 * Standard High-Yield Computer Science Curriculum Presets
 */
export const CS_LOGIC_PRESETS: readonly LogicCircuit[] = [
  {
    id: "half-adder",
    name: "Half Adder",
    thaiName: "วงจรบวกเลขฐานสองครึ่งตัว (Half Adder)",
    description: "Computes the binary sum of two single-bit inputs using XOR for Sum and AND for Carry.",
    thaiDescription: "คำนวณผลบวกของบิต A และ B โดยใช้ XOR หาผลรวม (Sum) และ AND หาตัวทด (Carry)",
    booleanExpression: "Sum = A ⊕ B, Carry = A · B",
    nodes: [
      { id: "in_a", type: "INPUT", label: "A", thaiLabel: "บิต A", x: 80, y: 100, state: true },
      { id: "in_b", type: "INPUT", label: "B", thaiLabel: "บิต B", x: 80, y: 220, state: false },
      { id: "gate_xor", type: "XOR", label: "XOR", thaiLabel: "เกต XOR", x: 300, y: 100 },
      { id: "gate_and", type: "AND", label: "AND", thaiLabel: "เกต AND", x: 300, y: 220 },
      { id: "out_sum", type: "OUTPUT", label: "Sum (S)", thaiLabel: "ผลรวม (S)", x: 520, y: 100 },
      { id: "out_carry", type: "OUTPUT", label: "Carry (C)", thaiLabel: "ตัวทด (C)", x: 520, y: 220 },
    ],
    wires: [
      { id: "w1", fromNodeId: "in_a", toNodeId: "gate_xor", toPinIndex: 0 },
      { id: "w2", fromNodeId: "in_b", toNodeId: "gate_xor", toPinIndex: 1 },
      { id: "w3", fromNodeId: "in_a", toNodeId: "gate_and", toPinIndex: 0 },
      { id: "w4", fromNodeId: "in_b", toNodeId: "gate_and", toPinIndex: 1 },
      { id: "w5", fromNodeId: "gate_xor", toNodeId: "out_sum", toPinIndex: 0 },
      { id: "w6", fromNodeId: "gate_and", toNodeId: "out_carry", toPinIndex: 0 },
    ],
  },
  {
    id: "full-adder",
    name: "Full Adder (1-Bit)",
    thaiName: "วงจรบวกเลขฐานสองเต็มตัว (Full Adder)",
    description: "Cascaded adder handling two operand bits (A, B) plus an incoming carry bit (Cin).",
    thaiDescription: "วงจรบวกเต็มตัวรองรับบิตตัวตั้ง บิตตัวบวก และตัวทดเข้า (Cin) ได้ผลรวมและตัวทดออก (Cout)",
    booleanExpression: "Sum = A ⊕ B ⊕ Cin, Cout = (A·B) + (Cin · (A ⊕ B))",
    nodes: [
      { id: "in_a", type: "INPUT", label: "A", x: 60, y: 80, state: true },
      { id: "in_b", type: "INPUT", label: "B", x: 60, y: 160, state: true },
      { id: "in_cin", type: "INPUT", label: "Cin", x: 60, y: 260, state: false },
      { id: "xor1", type: "XOR", label: "XOR 1", x: 220, y: 100 },
      { id: "and1", type: "AND", label: "AND 1", x: 220, y: 180 },
      { id: "xor2", type: "XOR", label: "XOR 2", x: 380, y: 120 },
      { id: "and2", type: "AND", label: "AND 2", x: 380, y: 220 },
      { id: "or1", type: "OR", label: "OR 1", x: 480, y: 200 },
      { id: "out_sum", type: "OUTPUT", label: "Sum (S)", x: 580, y: 120 },
      { id: "out_cout", type: "OUTPUT", label: "Cout", x: 580, y: 200 },
    ],
    wires: [
      { id: "w1", fromNodeId: "in_a", toNodeId: "xor1", toPinIndex: 0 },
      { id: "w2", fromNodeId: "in_b", toNodeId: "xor1", toPinIndex: 1 },
      { id: "w3", fromNodeId: "in_a", toNodeId: "and1", toPinIndex: 0 },
      { id: "w4", fromNodeId: "in_b", toNodeId: "and1", toPinIndex: 1 },
      { id: "w5", fromNodeId: "xor1", toNodeId: "xor2", toPinIndex: 0 },
      { id: "w6", fromNodeId: "in_cin", toNodeId: "xor2", toPinIndex: 1 },
      { id: "w7", fromNodeId: "xor1", toNodeId: "and2", toPinIndex: 0 },
      { id: "w8", fromNodeId: "in_cin", toNodeId: "and2", toPinIndex: 1 },
      { id: "w9", fromNodeId: "and2", toNodeId: "or1", toPinIndex: 0 },
      { id: "w10", fromNodeId: "and1", toNodeId: "or1", toPinIndex: 1 },
      { id: "w11", fromNodeId: "xor2", toNodeId: "out_sum", toPinIndex: 0 },
      { id: "w12", fromNodeId: "or1", toNodeId: "out_cout", toPinIndex: 0 },
    ],
  },
  {
    id: "demorgan-theorem",
    name: "De Morgan's Laws Verification",
    thaiName: "การพิสูจน์กฎของเดอมอร์แกน (De Morgan's Laws)",
    description: "Proves that ¬(A ∧ B) is strictly equivalent to (¬A ∨ ¬B) across all binary input states.",
    thaiDescription: "พิสูจน์ว่า NAND(A, B) ให้ผลลัพธ์เหมือนกับ NOT(A) OR NOT(B) ในทุกกรณี",
    booleanExpression: "¬(A · B) ≡ ¬A + ¬B",
    nodes: [
      { id: "in_a", type: "INPUT", label: "A", x: 80, y: 100, state: false },
      { id: "in_b", type: "INPUT", label: "B", x: 80, y: 220, state: false },
      // Branch 1: NAND
      { id: "gate_nand", type: "NAND", label: "NAND", x: 260, y: 100 },
      { id: "out_nand", type: "OUTPUT", label: "NAND Out", x: 440, y: 100 },
      // Branch 2: NOT A, NOT B -> OR
      { id: "not_a", type: "NOT", label: "NOT A", x: 220, y: 190 },
      { id: "not_b", type: "NOT", label: "NOT B", x: 220, y: 250 },
      { id: "gate_or", type: "OR", label: "OR", x: 340, y: 220 },
      { id: "out_demorgan", type: "OUTPUT", label: "(¬A + ¬B) Out", x: 480, y: 220 },
    ],
    wires: [
      { id: "w1", fromNodeId: "in_a", toNodeId: "gate_nand", toPinIndex: 0 },
      { id: "w2", fromNodeId: "in_b", toNodeId: "gate_nand", toPinIndex: 1 },
      { id: "w3", fromNodeId: "gate_nand", toNodeId: "out_nand", toPinIndex: 0 },
      { id: "w4", fromNodeId: "in_a", toNodeId: "not_a", toPinIndex: 0 },
      { id: "w5", fromNodeId: "in_b", toNodeId: "not_b", toPinIndex: 0 },
      { id: "w6", fromNodeId: "not_a", toNodeId: "gate_or", toPinIndex: 0 },
      { id: "w7", fromNodeId: "not_b", toNodeId: "gate_or", toPinIndex: 1 },
      { id: "w8", fromNodeId: "gate_or", toNodeId: "out_demorgan", toPinIndex: 0 },
    ],
  },
  {
    id: "multiplexer-2to1",
    name: "2-to-1 Multiplexer (MUX)",
    thaiName: "วงจรมัลติเพล็กเซอร์ 2 เป็น 1 (2:1 Data Selector)",
    description: "Routes one of two data inputs (D0, D1) to the single output line based on Select control bit (S).",
    thaiDescription: "สวิตช์เลือกข้อมูลดิจิทัล: ส่งผ่าน D0 เมื่อ S=0 และส่งผ่าน D1 เมื่อ S=1",
    booleanExpression: "Y = (¬S · D0) + (S · D1)",
    nodes: [
      { id: "in_d0", type: "INPUT", label: "D0", x: 80, y: 80, state: true },
      { id: "in_s", type: "INPUT", label: "Select (S)", x: 80, y: 160, state: false },
      { id: "in_d1", type: "INPUT", label: "D1", x: 80, y: 240, state: false },
      { id: "not_s", type: "NOT", label: "NOT S", x: 220, y: 130 },
      { id: "and_d0", type: "AND", label: "AND 0", x: 340, y: 90 },
      { id: "and_d1", type: "AND", label: "AND 1", x: 340, y: 230 },
      { id: "or_mux", type: "OR", label: "OR", x: 460, y: 160 },
      { id: "out_y", type: "OUTPUT", label: "Output (Y)", x: 580, y: 160 },
    ],
    wires: [
      { id: "w1", fromNodeId: "in_s", toNodeId: "not_s", toPinIndex: 0 },
      { id: "w2", fromNodeId: "in_d0", toNodeId: "and_d0", toPinIndex: 0 },
      { id: "w3", fromNodeId: "not_s", toNodeId: "and_d0", toPinIndex: 1 },
      { id: "w4", fromNodeId: "in_s", toNodeId: "and_d1", toPinIndex: 0 },
      { id: "w5", fromNodeId: "in_d1", toNodeId: "and_d1", toPinIndex: 1 },
      { id: "w6", fromNodeId: "and_d0", toNodeId: "or_mux", toPinIndex: 0 },
      { id: "w7", fromNodeId: "and_d1", toNodeId: "or_mux", toPinIndex: 1 },
      { id: "w8", fromNodeId: "or_mux", toNodeId: "out_y", toPinIndex: 0 },
    ],
  },
  {
    id: "nor-universal",
    name: "Universal NOR Gate Logic",
    thaiName: "เกตครอบจักรวาล NOR (Universal NOR Gate)",
    description: "Proves that NOR gates alone can construct NOT, OR, and AND functions, demonstrating functional completeness.",
    thaiDescription: "พิสูจน์คุณสมบัติครอบจักรวาลของเกต NOR: สร้างฟังก์ชัน NOT, OR และ AND ได้ด้วยเกต NOR เพียงชนิดเดียว",
    booleanExpression: "NOT = A ⊽ A, OR = ¬(A ⊽ B), AND = (¬A) ⊽ (¬B)",
    nodes: [
      { id: "in_a", type: "INPUT", label: "A", x: 80, y: 90, state: false },
      { id: "in_b", type: "INPUT", label: "B", x: 80, y: 230, state: false },
      // Branch 1: Single NOR
      { id: "nor1", type: "NOR", label: "NOR 1", x: 260, y: 90 },
      { id: "out_nor", type: "OUTPUT", label: "NOR (A⊽B)", x: 440, y: 90 },
      // Branch 2: NOR followed by NOR inverter -> OR
      { id: "nor_inv", type: "NOR", label: "NOR Inv", x: 380, y: 160 },
      { id: "out_or", type: "OUTPUT", label: "OR (A+B)", x: 520, y: 160 },
      // Branch 3: Invert A and B with NOR, then NOR them -> AND
      { id: "nor_not_a", type: "NOR", label: "NOT A", x: 240, y: 220 },
      { id: "nor_not_b", type: "NOR", label: "NOT B", x: 240, y: 280 },
      { id: "nor_and", type: "NOR", label: "NOR AND", x: 380, y: 250 },
      { id: "out_and", type: "OUTPUT", label: "AND (A·B)", x: 520, y: 250 },
    ],
    wires: [
      { id: "w1", fromNodeId: "in_a", toNodeId: "nor1", toPinIndex: 0 },
      { id: "w2", fromNodeId: "in_b", toNodeId: "nor1", toPinIndex: 1 },
      { id: "w3", fromNodeId: "nor1", toNodeId: "out_nor", toPinIndex: 0 },
      { id: "w4", fromNodeId: "nor1", toNodeId: "nor_inv", toPinIndex: 0 },
      { id: "w5", fromNodeId: "nor1", toNodeId: "nor_inv", toPinIndex: 1 },
      { id: "w6", fromNodeId: "nor_inv", toNodeId: "out_or", toPinIndex: 0 },
      { id: "w7", fromNodeId: "in_a", toNodeId: "nor_not_a", toPinIndex: 0 },
      { id: "w8", fromNodeId: "in_a", toNodeId: "nor_not_a", toPinIndex: 1 },
      { id: "w9", fromNodeId: "in_b", toNodeId: "nor_not_b", toPinIndex: 0 },
      { id: "w10", fromNodeId: "in_b", toNodeId: "nor_not_b", toPinIndex: 1 },
      { id: "w11", fromNodeId: "nor_not_a", toNodeId: "nor_and", toPinIndex: 0 },
      { id: "w12", fromNodeId: "nor_not_b", toNodeId: "nor_and", toPinIndex: 1 },
      { id: "w13", fromNodeId: "nor_and", toNodeId: "out_and", toPinIndex: 0 },
    ],
  },
];
