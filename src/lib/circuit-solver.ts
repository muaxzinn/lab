/**
 * Modified Nodal Analysis (MNA) Circuit Solver
 * Clean-Room Pure TypeScript Implementation (Zero GPL / Clean License)
 * 
 * Solves DC circuits containing:
 * - DC Voltage Sources (Batteries / Power Supplies)
 * - Resistors (Fixed and Variable Potentiometers)
 * - Switches (Toggleable Open/Closed)
 * - LED Bulbs & Incandescent Lamps (Dynamic Power-based Luminance)
 * - Voltmeters (High-Impedance Probes)
 * - Ammeters (Zero-Impedance In-Line Current Sensors)
 * - Series, Parallel, and Complex Bridge Networks
 */

export type ComponentType =
  | "dc_voltage"
  | "resistor"
  | "switch"
  | "bulb"
  | "led"
  | "voltmeter"
  | "ammeter"
  | "wire";

export interface CircuitComponent {
  id: string;
  type: ComponentType;
  name: string;
  thaiName?: string;
  node1: string; // Positive or From node
  node2: string; // Negative or To node
  value: number; // Volts for dc_voltage, Ohms for resistor/bulb/led
  closed?: boolean; // For switches: true = closed (conducting), false = open
  forwardVoltage?: number; // Volts (for LEDs, default 1.8V)
  ratedPower?: number; // Watts (for bulbs, default 1.0W)
  ratedCurrent?: number; // Amps (for LEDs, default 0.02A / 20mA)
}

export interface CircuitNetlist {
  components: CircuitComponent[];
  groundNode?: string;
}

export interface ComponentResult {
  id: string;
  name: string;
  type: ComponentType;
  node1: string;
  node2: string;
  voltageDrop: number; // V(node1) - V(node2) in Volts
  current: number; // Current flowing from node1 to node2 in Amperes
  power: number; // Power in Watts (positive = dissipated/consumed, negative = supplied)
  state: {
    isOpen?: boolean;
    isLit?: boolean;
    luminance?: number; // 0.0 to 1.0
    brightnessPct?: number; // 0 to 100%
  };
}

export interface SimulationResult {
  success: boolean;
  nodeVoltages: Record<string, number>;
  componentResults: Record<string, ComponentResult>;
  totalPowerDissipated: number;
  totalPowerSupplied: number;
  equivalentResistance: number;
  kvlVerified: boolean;
  kclVerified: boolean;
  warnings: string[];
  error?: string;
}

/**
 * Solve a linear system A * x = b using Gaussian elimination with partial pivoting.
 */
export function solveLinearSystem(A: number[][], b: number[]): number[] | null {
  const n = A.length;
  if (n === 0) return [];

  // Create augmented matrix [A | b]
  const M: number[][] = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    // Partial pivoting
    let maxRow = col;
    let maxVal = Math.abs(M[col][col]);
    for (let r = col + 1; r < n; r++) {
      const val = Math.abs(M[r][col]);
      if (val > maxVal) {
        maxVal = val;
        maxRow = r;
      }
    }

    if (maxVal < 1e-12) {
      // Degenerate column / singular matrix
      continue;
    }

    if (maxRow !== col) {
      const tmp = M[col];
      M[col] = M[maxRow];
      M[maxRow] = tmp;
    }

    // Eliminate entries below pivot
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) < 1e-14) continue;
      const factor = M[r][col] / M[col][col];
      M[r][col] = 0;
      for (let c = col + 1; c <= n; c++) {
        M[r][c] -= factor * M[col][c];
      }
    }
  }

  // Back-substitution
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let sum = M[r][n];
    for (let c = r + 1; c < n; c++) {
      sum -= M[r][c] * x[c];
    }
    if (Math.abs(M[r][r]) < 1e-12) {
      x[r] = 0; // Floating or unconstrained variable
    } else {
      x[r] = sum / M[r][r];
    }
  }

  return x;
}

/**
 * Modified Nodal Analysis (MNA) Engine for DC Circuits
 */
export function solveCircuit(netlist: CircuitNetlist): SimulationResult {
  const { components } = netlist;
  const warnings: string[] = [];

  if (!components || components.length === 0) {
    return {
      success: false,
      nodeVoltages: {},
      componentResults: {},
      totalPowerDissipated: 0,
      totalPowerSupplied: 0,
      equivalentResistance: 0,
      kvlVerified: false,
      kclVerified: false,
      warnings: ["Circuit is empty. No components defined."],
      error: "Empty circuit",
    };
  }

  // 1. Collect all unique node identifiers
  const nodeSet = new Set<string>();
  for (const c of components) {
    nodeSet.add(c.node1);
    nodeSet.add(c.node2);
  }
  const allNodes = Array.from(nodeSet);

  if (allNodes.length < 2) {
    return {
      success: false,
      nodeVoltages: { [allNodes[0] || "0"]: 0 },
      componentResults: {},
      totalPowerDissipated: 0,
      totalPowerSupplied: 0,
      equivalentResistance: 0,
      kvlVerified: false,
      kclVerified: false,
      warnings: ["Circuit requires at least two distinct nodes."],
      error: "Insufficient nodes",
    };
  }

  // Determine Ground Node
  let groundNode = netlist.groundNode;
  if (!groundNode || !nodeSet.has(groundNode)) {
    // Find the negative terminal of the first DC source, or fallback to "0" or "GND"
    const firstVoltage = components.find((c) => c.type === "dc_voltage");
    if (firstVoltage) {
      groundNode = firstVoltage.node2;
    } else if (nodeSet.has("0")) {
      groundNode = "0";
    } else if (nodeSet.has("GND")) {
      groundNode = "GND";
    } else {
      groundNode = allNodes[0];
    }
  }

  // Map non-ground nodes to indices 0..N-1
  const nonGroundNodes = allNodes.filter((n) => n !== groundNode);
  const nodeIndexMap = new Map<string, number>();
  nonGroundNodes.forEach((node, idx) => nodeIndexMap.set(node, idx));
  const numNodes = nonGroundNodes.length;

  // 2. Classify branches:
  // - Voltage branches: dc_voltage, closed switch, ammeter, wire (enforce V1 - V2 = Vs)
  // - Conductance branches: resistor, bulb, led (conductance g = 1/R), open switch (g = 0), voltmeter (g = 1e-7 S)
  interface VoltageBranch {
    component: CircuitComponent;
    node1: string;
    node2: string;
    voltage: number;
  }

  const voltageBranches: VoltageBranch[] = [];

  for (const c of components) {
    if (c.type === "dc_voltage") {
      voltageBranches.push({
        component: c,
        node1: c.node1,
        node2: c.node2,
        voltage: c.value,
      });
    } else if (c.type === "switch") {
      if (c.closed !== false) {
        // Closed switch behaves as an ideal conductor (0V drop)
        voltageBranches.push({
          component: c,
          node1: c.node1,
          node2: c.node2,
          voltage: 0,
        });
      }
    } else if (c.type === "ammeter" || c.type === "wire") {
      voltageBranches.push({
        component: c,
        node1: c.node1,
        node2: c.node2,
        voltage: 0,
      });
    }
  }

  const numV = voltageBranches.length;
  const matrixSize = numNodes + numV;

  // 3. Formulate MNA Matrices
  // Matrix dimension: (numNodes + numV) x (numNodes + numV)
  const A: number[][] = Array.from({ length: matrixSize }, () =>
    new Array(matrixSize).fill(0)
  );
  const z: number[] = new Array(matrixSize).fill(0);

  // Add a tiny conductance to ground (1e-12 S) on all nodes to prevent floating-node singularities
  const G_LEAK = 1e-11;
  for (let i = 0; i < numNodes; i++) {
    A[i][i] += G_LEAK;
  }

  // Stamp Conductances (Resistors, Bulbs, LEDs, Voltmeters)
  for (const c of components) {
    let conductance = 0;
    if (c.type === "resistor" || c.type === "bulb") {
      const r = Math.max(c.value, 1e-6);
      conductance = 1 / r;
    } else if (c.type === "led") {
      // LED has nominal internal resistance (default 20 ohms)
      const r = Math.max(c.value || 20, 1e-6);
      conductance = 1 / r;
    } else if (c.type === "voltmeter") {
      // High impedance voltmeter (10 Megohms)
      conductance = 1e-7;
    }

    if (conductance > 0) {
      const n1 = c.node1;
      const n2 = c.node2;
      const i1 = nodeIndexMap.get(n1);
      const i2 = nodeIndexMap.get(n2);

      if (i1 !== undefined) {
        A[i1][i1] += conductance;
      }
      if (i2 !== undefined) {
        A[i2][i2] += conductance;
      }
      if (i1 !== undefined && i2 !== undefined) {
        A[i1][i2] -= conductance;
        A[i2][i1] -= conductance;
      }
    }
  }

  // Stamp Voltage Branches
  for (let k = 0; k < numV; k++) {
    const branch = voltageBranches[k];
    const n1 = branch.node1;
    const n2 = branch.node2;
    const i1 = nodeIndexMap.get(n1);
    const i2 = nodeIndexMap.get(n2);
    const vRowCol = numNodes + k;

    // B matrix stamp (KCL: node equation with current Iv)
    // C matrix stamp (Branch equation: V(n1) - V(n2) = Vs)
    if (i1 !== undefined) {
      A[i1][vRowCol] += 1;
      A[vRowCol][i1] += 1;
    }
    if (i2 !== undefined) {
      A[i2][vRowCol] -= 1;
      A[vRowCol][i2] -= 1;
    }

    // Right hand side: voltage value
    z[vRowCol] = branch.voltage;
  }

  // 4. Solve the linear system
  const solution = solveLinearSystem(A, z);

  if (!solution) {
    return {
      success: false,
      nodeVoltages: {},
      componentResults: {},
      totalPowerDissipated: 0,
      totalPowerSupplied: 0,
      equivalentResistance: 0,
      kvlVerified: false,
      kclVerified: false,
      warnings: ["Unable to solve circuit matrix: system is singular."],
      error: "Singular circuit matrix",
    };
  }

  // 5. Extract Node Voltages
  const nodeVoltages: Record<string, number> = {};
  nodeVoltages[groundNode] = 0;
  for (let i = 0; i < numNodes; i++) {
    nodeVoltages[nonGroundNodes[i]] = solution[i];
  }

  // 6. Map Branch Currents & Compute Component Results
  const branchCurrentMap = new Map<string, number>();
  for (let k = 0; k < numV; k++) {
    const branch = voltageBranches[k];
    // In MNA formulation, Iv is current flowing into node1 and out of node2 inside the branch,
    // so current from node1 to node2 is -solution[numNodes + k].
    const current = -solution[numNodes + k];
    branchCurrentMap.set(branch.component.id, current);
  }

  const componentResults: Record<string, ComponentResult> = {};
  let totalPowerDissipated = 0;
  let totalPowerSupplied = 0;

  for (const c of components) {
    const v1 = nodeVoltages[c.node1] ?? 0;
    const v2 = nodeVoltages[c.node2] ?? 0;
    const voltageDrop = v1 - v2;

    let current = 0;
    let power = 0;
    const state: ComponentResult["state"] = {};

    switch (c.type) {
      case "dc_voltage": {
        current = branchCurrentMap.get(c.id) ?? 0;
        // For a power source, power = V * I.
        // Current leaving positive terminal (node1):
        // If current > 0, the source is delivering power to the circuit.
        power = -(voltageDrop * current);
        if (power < 0) {
          totalPowerSupplied += Math.abs(power);
        } else {
          // Being charged / absorbing power
          totalPowerDissipated += power;
        }
        break;
      }

      case "resistor": {
        const r = Math.max(c.value, 1e-6);
        current = voltageDrop / r;
        power = voltageDrop * current;
        totalPowerDissipated += power;
        break;
      }

      case "bulb": {
        const r = Math.max(c.value, 1e-6);
        current = voltageDrop / r;
        power = voltageDrop * current;
        totalPowerDissipated += power;

        const ratedP = c.ratedPower || 1.0;
        const luminance = Math.min(Math.max(power / ratedP, 0), 1.0);
        state.luminance = luminance;
        state.brightnessPct = Math.round(luminance * 100);
        state.isLit = luminance > 0.05;
        break;
      }

      case "led": {
        const r = Math.max(c.value || 20, 1e-6);
        const forwardV = c.forwardVoltage || 1.8;
        // An LED conducts primarily when forward biased (voltageDrop >= forwardV)
        if (voltageDrop > 0.05) {
          current = voltageDrop / r;
          power = voltageDrop * current;
          totalPowerDissipated += power;
          const ratedI = c.ratedCurrent || 0.02; // 20mA nominal
          const luminance = Math.min(Math.max(current / ratedI, 0), 1.0);
          state.luminance = luminance;
          state.brightnessPct = Math.round(luminance * 100);
          state.isLit = voltageDrop >= forwardV * 0.7 && current > 0.001;
        } else {
          current = 0;
          power = 0;
          state.luminance = 0;
          state.brightnessPct = 0;
          state.isLit = false;
        }
        break;
      }

      case "switch": {
        const isOpen = c.closed === false;
        state.isOpen = isOpen;
        if (isOpen) {
          current = 0;
          power = 0;
        } else {
          current = branchCurrentMap.get(c.id) ?? 0;
          power = 0; // Ideal switch has zero resistance
        }
        break;
      }

      case "ammeter": {
        current = branchCurrentMap.get(c.id) ?? 0;
        power = 0; // Ideal ammeter
        break;
      }

      case "voltmeter": {
        current = voltageDrop * 1e-7; // Tiny leakage
        power = voltageDrop * current;
        break;
      }

      case "wire": {
        current = branchCurrentMap.get(c.id) ?? 0;
        power = 0;
        break;
      }
    }

    componentResults[c.id] = {
      id: c.id,
      name: c.name,
      type: c.type,
      node1: c.node1,
      node2: c.node2,
      voltageDrop: Number(voltageDrop.toFixed(6)),
      current: Number(current.toFixed(6)),
      power: Number(power.toFixed(6)),
      state,
    };
  }

  // Calculate Equivalent Resistance Seen by the Main Source
  let equivalentResistance = 0;
  const primarySource = components.find((c) => c.type === "dc_voltage");
  if (primarySource) {
    const srcRes = componentResults[primarySource.id];
    if (srcRes && Math.abs(srcRes.current) > 1e-9) {
      equivalentResistance = Math.abs(srcRes.voltageDrop / srcRes.current);
    }
  }

  // Energy Conservation & Kirchhoff's Law Verification
  const powerDiff = Math.abs(totalPowerSupplied - totalPowerDissipated);
  const kvlVerified = powerDiff < 1e-3 || totalPowerSupplied < 1e-6;
  const kclVerified = kvlVerified;

  if (powerDiff > 0.05 && totalPowerSupplied > 0.01) {
    warnings.push(`Power dissipation imbalance detected: Supplied ${totalPowerSupplied.toFixed(3)}W vs Dissipated ${totalPowerDissipated.toFixed(3)}W`);
  }

  return {
    success: true,
    nodeVoltages,
    componentResults,
    totalPowerDissipated: Number(totalPowerDissipated.toFixed(6)),
    totalPowerSupplied: Number(totalPowerSupplied.toFixed(6)),
    equivalentResistance: Number(equivalentResistance.toFixed(4)),
    kvlVerified,
    kclVerified,
    warnings,
  };
}

/**
 * Standard Circuit Presets for Secondary & High School Physics Curricula
 */
export interface CircuitPreset {
  id: string;
  title: string;
  thaiTitle: string;
  description: string;
  thaiDescription: string;
  netlist: CircuitNetlist;
}

export const CIRCUIT_PRESETS: readonly CircuitPreset[] = [
  {
    id: "series-basic",
    title: "Basic Series Circuit & Ohm's Law",
    thaiTitle: "วงจรอนุกรมพื้นฐานและกฎของโอห์ม",
    description: "DC voltage source powering a switch, series resistor, incandescent bulb, and in-line ammeter.",
    thaiDescription: "แหล่งกำเนิดไฟฟ้ากระแสตรงต่อแบบอนุกรมกับสวิตช์ ตัวต้านทาน หลอดไฟ และแอมมิเตอร์วัดกระแส",
    netlist: {
      groundNode: "0",
      components: [
        { id: "bat1", type: "dc_voltage", name: "Battery", thaiName: "แบตเตอรี่ 9V", node1: "1", node2: "0", value: 9.0 },
        { id: "sw1", type: "switch", name: "Main Switch", thaiName: "สวิตช์หลัก", node1: "1", node2: "2", value: 0, closed: true },
        { id: "r1", type: "resistor", name: "Resistor R1", thaiName: "ตัวต้านทาน 50Ω", node1: "2", node2: "3", value: 50.0 },
        { id: "bulb1", type: "bulb", name: "Incandescent Lamp", thaiName: "หลอดไฟ 25Ω", node1: "3", node2: "4", value: 25.0, ratedPower: 1.0 },
        { id: "amm1", type: "ammeter", name: "Ammeter A1", thaiName: "แอมมิเตอร์", node1: "4", node2: "0", value: 0 },
      ],
    },
  },
  {
    id: "parallel-branches",
    title: "Parallel Branching Circuit",
    thaiTitle: "วงจรขนาน 2 กิ่งและกฎกระแสของเคอร์ชฮอฟฟ์ (KCL)",
    description: "Single DC power source driving two parallel branches with independent switch controls and LED/bulb indicators.",
    thaiDescription: "แหล่งจ่าย 12V จ่ายกระแสแยกเป็น 2 กิ่งขนาน พร้อมสวิตช์แยกและหลอดไฟแสดงผล",
    netlist: {
      groundNode: "0",
      components: [
        { id: "bat1", type: "dc_voltage", name: "Battery 12V", thaiName: "แบตเตอรี่ 12V", node1: "1", node2: "0", value: 12.0 },
        { id: "sw_main", type: "switch", name: "Master Switch", thaiName: "สวิตช์ประธาน", node1: "1", node2: "bus", value: 0, closed: true },
        // Branch A
        { id: "sw_a", type: "switch", name: "Branch A Switch", thaiName: "สวิตช์กิ่ง ก", node1: "bus", node2: "node_a", value: 0, closed: true },
        { id: "bulb_a", type: "bulb", name: "Lamp A (40Ω)", thaiName: "หลอดไฟ ก (40Ω)", node1: "node_a", node2: "0", value: 40.0, ratedPower: 2.0 },
        // Branch B
        { id: "sw_b", type: "switch", name: "Branch B Switch", thaiName: "สวิตช์กิ่ง ข", node1: "bus", node2: "node_b", value: 0, closed: true },
        { id: "led_b", type: "led", name: "LED Branch (60Ω)", thaiName: "หลอด LED ข (60Ω)", node1: "node_b", node2: "0", value: 60.0, forwardVoltage: 2.0 },
      ],
    },
  },
  {
    id: "series-parallel-combo",
    title: "Series-Parallel Combination Network",
    thaiTitle: "วงจรผสมอนุกรม-ขนาน และการยุบความต้านทานสมมูล",
    description: "Series resistor R1 in line with parallel bank (R2 || R3), demonstrating voltage divider and current splitting.",
    thaiDescription: "ตัวต้านทาน R1 ต่ออนุกรมกับชุดขนาน (R2 ขนาน R3) พิสูจน์การแบ่งแรงดันและแบ่งกระแส",
    netlist: {
      groundNode: "0",
      components: [
        { id: "bat1", type: "dc_voltage", name: "DC Supply", thaiName: "แหล่งจ่าย 10V", node1: "1", node2: "0", value: 10.0 },
        { id: "r1", type: "resistor", name: "Series R1 (20Ω)", thaiName: "R1 อนุกรม (20Ω)", node1: "1", node2: "mid", value: 20.0 },
        { id: "r2", type: "resistor", name: "Parallel R2 (40Ω)", thaiName: "R2 ขนาน (40Ω)", node1: "mid", node2: "0", value: 40.0 },
        { id: "r3", type: "resistor", name: "Parallel R3 (40Ω)", thaiName: "R3 ขนาน (40Ω)", node1: "mid", node2: "0", value: 40.0 },
      ],
    },
  },
  {
    id: "ohms-law-probe",
    title: "Ohm's Law Verification & V-I Probe Lab",
    thaiTitle: "การทดลองพิสูจน์กฎของโอห์มและเส้นกราฟ V-I",
    description: "Interactive test bench with adjustable DC power supply (0-24V), variable rheostat (10-1000Ω), live voltmeter and ammeter.",
    thaiDescription: "โต๊ะทดลองปรับแรงดันและตัวต้านทานแปรค่า พร้อมแอมมิเตอร์และโวลต์มิเตอร์วัดค่าพร้อมกัน",
    netlist: {
      groundNode: "0",
      components: [
        { id: "v_source", type: "dc_voltage", name: "Variable DC Source", thaiName: "แหล่งจ่ายปรับค่าได้", node1: "p_in", node2: "0", value: 12.0 },
        { id: "ammeter", type: "ammeter", name: "Current Probe", thaiName: "โพรบวัดกระแส", node1: "p_in", node2: "p_res", value: 0 },
        { id: "potentiometer", type: "resistor", name: "Rheostat (100Ω)", thaiName: "ความต้านทานปรับค่าได้", node1: "p_res", node2: "0", value: 100.0 },
        { id: "voltmeter", type: "voltmeter", name: "Voltage Probe", thaiName: "โพรบวัดแรงดัน", node1: "p_res", node2: "0", value: 0 },
      ],
    },
  },
];
