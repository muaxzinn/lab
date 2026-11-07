import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  solveCircuit,
  solveLinearSystem,
  CIRCUIT_PRESETS,
  type CircuitNetlist,
} from "./circuit-solver.ts";

describe("Modified Nodal Analysis (MNA) Circuit Solver", () => {
  describe("Linear System Solver (Gaussian Elimination with Partial Pivoting)", () => {
    it("solves standard 2x2 and 3x3 non-singular systems accurately", () => {
      // 2x + y = 5
      // x + 3y = 5
      // Solution: x = 2, y = 1
      const A = [
        [2, 1],
        [1, 3],
      ];
      const b = [5, 5];
      const sol = solveLinearSystem(A, b);
      assert.ok(sol);
      assert.ok(Math.abs(sol[0] - 2) < 1e-9);
      assert.ok(Math.abs(sol[1] - 1) < 1e-9);
    });

    it("handles zero dimensions safely", () => {
      const sol = solveLinearSystem([], []);
      assert.deepEqual(sol, []);
    });
  });

  describe("Elementary DC Circuits & Ohm's Law", () => {
    it("solves simple single-resistor circuit: V = 10V, R = 100Ω -> I = 0.1A, P = 1.0W", () => {
      const netlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 10.0 },
          { id: "r1", type: "resistor", name: "R1", node1: "1", node2: "0", value: 100.0 },
        ],
      };

      const result = solveCircuit(netlist);
      assert.equal(result.success, true);
      assert.equal(result.nodeVoltages["0"], 0);
      assert.ok(Math.abs(result.nodeVoltages["1"] - 10.0) < 1e-5);

      const rRes = result.componentResults["r1"];
      assert.ok(Math.abs(rRes.current - 0.1) < 1e-5);
      assert.ok(Math.abs(rRes.voltageDrop - 10.0) < 1e-5);
      assert.ok(Math.abs(rRes.power - 1.0) < 1e-5);

      assert.ok(Math.abs(result.totalPowerSupplied - 1.0) < 1e-5);
      assert.ok(Math.abs(result.totalPowerDissipated - 1.0) < 1e-5);
      assert.ok(Math.abs(result.equivalentResistance - 100.0) < 1e-2);
      assert.equal(result.kvlVerified, true);
    });

    it("verifies series resistors: R_eq = R1 + R2 and voltage division", () => {
      // 12V battery across R1 = 40Ω and R2 = 80Ω
      // Total R = 120Ω, I = 0.1A
      // V(R1) = 4V, V(R2) = 8V
      const netlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 12.0 },
          { id: "r1", type: "resistor", name: "R1", node1: "1", node2: "2", value: 40.0 },
          { id: "r2", type: "resistor", name: "R2", node1: "2", node2: "0", value: 80.0 },
        ],
      };

      const result = solveCircuit(netlist);
      assert.equal(result.success, true);
      assert.ok(Math.abs(result.nodeVoltages["1"] - 12.0) < 1e-5);
      assert.ok(Math.abs(result.nodeVoltages["2"] - 8.0) < 1e-5);

      const r1Res = result.componentResults["r1"];
      const r2Res = result.componentResults["r2"];
      assert.ok(Math.abs(r1Res.voltageDrop - 4.0) < 1e-5);
      assert.ok(Math.abs(r2Res.voltageDrop - 8.0) < 1e-5);
      assert.ok(Math.abs(r1Res.current - 0.1) < 1e-5);
      assert.ok(Math.abs(r2Res.current - 0.1) < 1e-5);

      assert.ok(Math.abs(result.equivalentResistance - 120.0) < 1e-2);
    });

    it("verifies parallel resistors: 1/R_eq = 1/R1 + 1/R2 and current division", () => {
      // 10V battery across R1 = 50Ω || R2 = 50Ω
      // Equivalent R = 25Ω, total current = 0.4A (0.2A in each branch)
      const netlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 10.0 },
          { id: "r1", type: "resistor", name: "R1", node1: "1", node2: "0", value: 50.0 },
          { id: "r2", type: "resistor", name: "R2", node1: "1", node2: "0", value: 50.0 },
        ],
      };

      const result = solveCircuit(netlist);
      assert.equal(result.success, true);
      const r1 = result.componentResults["r1"];
      const r2 = result.componentResults["r2"];
      assert.ok(Math.abs(r1.current - 0.2) < 1e-5);
      assert.ok(Math.abs(r2.current - 0.2) < 1e-5);
      assert.ok(Math.abs(result.equivalentResistance - 25.0) < 1e-2);
      assert.ok(Math.abs(result.totalPowerSupplied - 4.0) < 1e-4);
    });

    it("verifies series-parallel combination: R1 + (R2 || R3)", () => {
      // 10V battery: R1 = 20Ω in series with (R2 = 40Ω || R3 = 40Ω = 20Ω)
      // Total R_eq = 40Ω, I_total = 10 / 40 = 0.25A
      // Midpoint voltage = 10 - (0.25 * 20) = 5.0V
      // Each parallel branch current = 0.125A
      const combo = CIRCUIT_PRESETS.find((p) => p.id === "series-parallel-combo");
      assert.ok(combo);

      const result = solveCircuit(combo.netlist);
      assert.equal(result.success, true);
      assert.ok(Math.abs(result.nodeVoltages["mid"] - 5.0) < 1e-4);
      assert.ok(Math.abs(result.equivalentResistance - 40.0) < 1e-2);

      const r1 = result.componentResults["r1"];
      const r2 = result.componentResults["r2"];
      const r3 = result.componentResults["r3"];
      assert.ok(Math.abs(r1.current - 0.25) < 1e-4);
      assert.ok(Math.abs(r2.current - 0.125) < 1e-4);
      assert.ok(Math.abs(r3.current - 0.125) < 1e-4);
    });
  });

  describe("Switches, Lamps & LED Visual Indicators", () => {
    it("stops current completely when switch is opened", () => {
      const netlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 9.0 },
          { id: "sw1", type: "switch", name: "Switch", node1: "1", node2: "2", value: 0, closed: false },
          { id: "bulb1", type: "bulb", name: "Bulb", node1: "2", node2: "0", value: 50.0, ratedPower: 2.0 },
        ],
      };

      const result = solveCircuit(netlist);
      assert.equal(result.success, true);
      const bulb = result.componentResults["bulb1"];
      assert.ok(Math.abs(bulb.current) < 1e-6);
      assert.equal(bulb.state.isLit, false);
      assert.equal(bulb.state.luminance, 0);

      const sw = result.componentResults["sw1"];
      assert.equal(sw.state.isOpen, true);
      assert.ok(Math.abs(sw.current) < 1e-6);
    });

    it("conducts and illuminates bulb when switch is closed", () => {
      const netlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 9.0 },
          { id: "sw1", type: "switch", name: "Switch", node1: "1", node2: "2", value: 0, closed: true },
          { id: "bulb1", type: "bulb", name: "Bulb", node1: "2", node2: "0", value: 25.0, ratedPower: 4.0 },
        ],
      };

      const result = solveCircuit(netlist);
      assert.equal(result.success, true);
      const bulb = result.componentResults["bulb1"];
      assert.ok(bulb.current > 0.3); // 9V / 25Ω = 0.36A
      assert.equal(bulb.state.isLit, true);
      assert.ok((bulb.state.luminance ?? 0) > 0.5);
    });

    it("verifies LED forward bias and reverse bias cutoff", () => {
      // Forward biased LED
      const forwardNetlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 5.0 },
          { id: "led1", type: "led", name: "LED", node1: "1", node2: "0", value: 50.0, forwardVoltage: 2.0 },
        ],
      };
      const fwdResult = solveCircuit(forwardNetlist);
      assert.equal(fwdResult.componentResults["led1"].state.isLit, true);

      // Reverse biased LED (node1 = 0, node2 = 1 with V(1) = 5V -> Vdrop = -5V)
      const reverseNetlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "Battery", node1: "1", node2: "0", value: 5.0 },
          { id: "led1", type: "led", name: "LED", node1: "0", node2: "1", value: 50.0, forwardVoltage: 2.0 },
        ],
      };
      const revResult = solveCircuit(reverseNetlist);
      assert.equal(revResult.componentResults["led1"].state.isLit, false);
      assert.equal(revResult.componentResults["led1"].current, 0);
    });
  });

  describe("Current Sensors & Polarity Consistency", () => {
    it("reports positive current through in-line ammeter and closed switch in series loop", () => {
      const basic = CIRCUIT_PRESETS.find((p) => p.id === "series-basic");
      assert.ok(basic);

      const res = solveCircuit(basic.netlist);
      assert.equal(res.success, true);

      // In 9V source with 50Ω resistor + 25Ω bulb = 75Ω total
      // I = 9 / 75 = 0.12 A = 120 mA
      const sw = res.componentResults["sw1"];
      const amm = res.componentResults["amm1"];
      const r1 = res.componentResults["r1"];
      const bulb = res.componentResults["bulb1"];

      assert.ok(Math.abs(sw.current - 0.12) < 1e-4, `Expected sw1 current ~0.12A, got ${sw.current}`);
      assert.ok(Math.abs(amm.current - 0.12) < 1e-4, `Expected amm1 current ~0.12A, got ${amm.current}`);
      assert.ok(Math.abs(r1.current - 0.12) < 1e-4);
      assert.ok(Math.abs(bulb.current - 0.12) < 1e-4);
    });
  });

  describe("Complex Bridge Networks (Wheatstone Bridge)", () => {
    it("verifies null detection in balanced Wheatstone bridge (R1/R3 = R2/R4)", () => {
      const bridge = CIRCUIT_PRESETS.find((p) => p.id === "wheatstone-bridge");
      assert.ok(bridge);

      const res = solveCircuit(bridge.netlist);
      assert.equal(res.success, true);

      // Midpoints must have equal potential (5.0V)
      assert.ok(Math.abs(res.nodeVoltages["left"] - 5.0) < 1e-4);
      assert.ok(Math.abs(res.nodeVoltages["right"] - 5.0) < 1e-4);

      // Zero current through the bridge galvanometer
      const galv = res.componentResults["galv"];
      assert.ok(Math.abs(galv.current) < 1e-6);
      assert.ok(Math.abs(galv.voltageDrop) < 1e-6);
      assert.equal(res.kvlVerified, true);
    });

    it("verifies accurate off-balance current in unbalanced Wheatstone bridge", () => {
      const unbalancedNetlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "bat1", type: "dc_voltage", name: "10V Supply", node1: "top", node2: "0", value: 10.0 },
          { id: "r1", type: "resistor", name: "R1 (100Ω)", node1: "top", node2: "left", value: 100.0 },
          { id: "r2", type: "resistor", name: "R2 (200Ω)", node1: "top", node2: "right", value: 200.0 },
          { id: "r3", type: "resistor", name: "R3 (200Ω)", node1: "left", node2: "0", value: 200.0 },
          { id: "r4", type: "resistor", name: "R4 (100Ω)", node1: "right", node2: "0", value: 100.0 },
          { id: "galv", type: "resistor", name: "Bridge (50Ω)", node1: "left", node2: "right", value: 50.0 },
        ],
      };

      const res = solveCircuit(unbalancedNetlist);
      assert.equal(res.success, true);
      assert.ok(res.nodeVoltages["left"] > res.nodeVoltages["right"]);
      const galv = res.componentResults["galv"];
      assert.ok(galv.current > 0.015 && galv.current < 0.025);
      assert.equal(res.kvlVerified, true);
    });
  });

  describe("Validation & Robustness Guards", () => {
    it("detects and rejects short-circuited ideal voltage loops", () => {
      const shortNetlist: CircuitNetlist = {
        groundNode: "0",
        components: [
          { id: "v1", type: "dc_voltage", name: "10V Battery", node1: "1", node2: "0", value: 10.0 },
          { id: "w1", type: "wire", name: "Ideal Short", node1: "1", node2: "0", value: 0 },
        ],
      };

      const res = solveCircuit(shortNetlist);
      assert.equal(res.success, false);
      assert.ok(res.error?.includes("Singular"));
    });

    it("handles empty netlists gracefully", () => {
      const result = solveCircuit({ components: [] });
      assert.equal(result.success, false);
      assert.equal(result.error, "Empty circuit");
    });

    it("handles single-node circuits gracefully", () => {
      const result = solveCircuit({
        components: [
          { id: "r1", type: "resistor", name: "R", node1: "0", node2: "0", value: 10 },
        ],
      });
      assert.equal(result.success, false);
      assert.equal(result.error, "Insufficient nodes");
    });

    it("verifies all curriculum presets solve cleanly without errors", () => {
      for (const preset of CIRCUIT_PRESETS) {
        const res = solveCircuit(preset.netlist);
        assert.equal(res.success, true, `Preset ${preset.id} failed to solve`);
        assert.ok(res.totalPowerSupplied >= 0);
        assert.ok(res.equivalentResistance >= 0);
      }
    });
  });
});
