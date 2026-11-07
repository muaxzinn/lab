import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  evaluateGatePrimitive,
  evaluateCircuit,
  generateTruthTable,
  CS_LOGIC_PRESETS,
  type LogicCircuit,
} from "./logic-gate-engine.ts";

describe("Boolean Logic Gate & Digital Circuit Engine", () => {
  describe("Gate Primitive Evaluator", () => {
    it("evaluates AND, OR, NOT, XOR, NAND, NOR, XNOR, and BUFFER primitives accurately", () => {
      // AND
      assert.equal(evaluateGatePrimitive("AND", [false, false]), false);
      assert.equal(evaluateGatePrimitive("AND", [true, false]), false);
      assert.equal(evaluateGatePrimitive("AND", [true, true]), true);

      // OR
      assert.equal(evaluateGatePrimitive("OR", [false, false]), false);
      assert.equal(evaluateGatePrimitive("OR", [true, false]), true);
      assert.equal(evaluateGatePrimitive("OR", [false, true]), true);

      // NOT
      assert.equal(evaluateGatePrimitive("NOT", [false]), true);
      assert.equal(evaluateGatePrimitive("NOT", [true]), false);

      // XOR
      assert.equal(evaluateGatePrimitive("XOR", [false, false]), false);
      assert.equal(evaluateGatePrimitive("XOR", [true, false]), true);
      assert.equal(evaluateGatePrimitive("XOR", [true, true]), false);

      // NAND
      assert.equal(evaluateGatePrimitive("NAND", [false, false]), true);
      assert.equal(evaluateGatePrimitive("NAND", [true, true]), false);

      // NOR
      assert.equal(evaluateGatePrimitive("NOR", [false, false]), true);
      assert.equal(evaluateGatePrimitive("NOR", [true, false]), false);

      // XNOR
      assert.equal(evaluateGatePrimitive("XNOR", [true, true]), true);
      assert.equal(evaluateGatePrimitive("XNOR", [false, false]), true);
      assert.equal(evaluateGatePrimitive("XNOR", [true, false]), false);

      // BUFFER
      assert.equal(evaluateGatePrimitive("BUFFER", [true]), true);
      assert.equal(evaluateGatePrimitive("BUFFER", [false]), false);
    });
  });

  describe("Half Adder Circuit Verification", () => {
    const halfAdder = CS_LOGIC_PRESETS.find((p) => p.id === "half-adder");
    assert.ok(halfAdder);

    it("evaluates all 4 binary addition states correctly", () => {
      // 0 + 0 = 0 (Sum 0, Carry 0)
      const res00 = evaluateCircuit(halfAdder, { in_a: false, in_b: false });
      assert.equal(res00.outputStates["out_sum"], false);
      assert.equal(res00.outputStates["out_carry"], false);

      // 0 + 1 = 1 (Sum 1, Carry 0)
      const res01 = evaluateCircuit(halfAdder, { in_a: false, in_b: true });
      assert.equal(res01.outputStates["out_sum"], true);
      assert.equal(res01.outputStates["out_carry"], false);

      // 1 + 0 = 1 (Sum 1, Carry 0)
      const res10 = evaluateCircuit(halfAdder, { in_a: true, in_b: false });
      assert.equal(res10.outputStates["out_sum"], true);
      assert.equal(res10.outputStates["out_carry"], false);

      // 1 + 1 = 2 (Sum 0, Carry 1)
      const res11 = evaluateCircuit(halfAdder, { in_a: true, in_b: true });
      assert.equal(res11.outputStates["out_sum"], false);
      assert.equal(res11.outputStates["out_carry"], true);
    });

    it("generates a complete 4-row truth table for Half Adder", () => {
      const table = generateTruthTable(halfAdder);
      assert.equal(table.length, 4);

      // Row 0: 0, 0 -> Sum 0, Carry 0
      assert.equal(table[0].inputs["in_a"], false);
      assert.equal(table[0].inputs["in_b"], false);
      assert.equal(table[0].outputs["out_sum"], false);
      assert.equal(table[0].outputs["out_carry"], false);

      // Row 3: 1, 1 -> Sum 0, Carry 1
      assert.equal(table[3].inputs["in_a"], true);
      assert.equal(table[3].inputs["in_b"], true);
      assert.equal(table[3].outputs["out_sum"], false);
      assert.equal(table[3].outputs["out_carry"], true);
    });
  });

  describe("De Morgan's Laws Dual-Branch Verification", () => {
    const deMorgan = CS_LOGIC_PRESETS.find((p) => p.id === "demorgan-theorem");
    assert.ok(deMorgan);

    it("proves NOT(A AND B) strictly equals (NOT A OR NOT B) across all 4 states", () => {
      const table = generateTruthTable(deMorgan);
      assert.equal(table.length, 4);

      for (const row of table) {
        const nandOut = row.outputs["out_nand"];
        const demorganOut = row.outputs["out_demorgan"];
        assert.equal(
          nandOut,
          demorganOut,
          `De Morgan equality failed at row ${row.decimalIndex}: NAND=${nandOut}, NOT-OR=${demorganOut}`
        );
      }
    });
  });

  describe("Full Adder 3-Input Cascaded Circuit", () => {
    const fullAdder = CS_LOGIC_PRESETS.find((p) => p.id === "full-adder");
    assert.ok(fullAdder);

    it("generates an 8-row truth table and verifies binary arithmetic", () => {
      const table = generateTruthTable(fullAdder);
      assert.equal(table.length, 8);

      for (const row of table) {
        const a = row.inputs["in_a"] ? 1 : 0;
        const b = row.inputs["in_b"] ? 1 : 0;
        const cin = row.inputs["in_cin"] ? 1 : 0;
        const total = a + b + cin;

        const expectedSum = Boolean(total & 1);
        const expectedCout = Boolean(total >= 2);

        assert.equal(
          row.outputs["out_sum"],
          expectedSum,
          `Full Adder Sum mismatch at A=${a}, B=${b}, Cin=${cin}`
        );
        assert.equal(
          row.outputs["out_cout"],
          expectedCout,
          `Full Adder Cout mismatch at A=${a}, B=${b}, Cin=${cin}`
        );
      }
    });
  });

  describe("2-to-1 Multiplexer Circuit", () => {
    const mux = CS_LOGIC_PRESETS.find((p) => p.id === "multiplexer-2to1");
    assert.ok(mux);

    it("routes D0 to output when S=0, and D1 to output when S=1", () => {
      // S = 0 -> output should follow D0
      const resS0_D0High = evaluateCircuit(mux, { in_s: false, in_d0: true, in_d1: false });
      assert.equal(resS0_D0High.outputStates["out_y"], true);

      const resS0_D0Low = evaluateCircuit(mux, { in_s: false, in_d0: false, in_d1: true });
      assert.equal(resS0_D0Low.outputStates["out_y"], false);

      // S = 1 -> output should follow D1
      const resS1_D1High = evaluateCircuit(mux, { in_s: true, in_d0: false, in_d1: true });
      assert.equal(resS1_D1High.outputStates["out_y"], true);

      const resS1_D1Low = evaluateCircuit(mux, { in_s: true, in_d0: true, in_d1: false });
      assert.equal(resS1_D1Low.outputStates["out_y"], false);
    });
  });

  describe("Cycle Handling & Robustness", () => {
    it("safely detects circular connections without hanging or stack explosion", () => {
      // Ring oscillator (NOT gate feeding into its own input)
      const cyclicCircuit: LogicCircuit = {
        id: "cyclic-test",
        name: "Ring Oscillator Test",
        thaiName: "วงจรริงออสซิลเลเตอร์",
        description: "Single NOT gate feeding into itself causing continuous oscillation",
        thaiDescription: "เกต NOT ต่อวนกลับเข้าตัวเองทำให้เกิดการแกว่งไม่รู้จบ",
        nodes: [
          { id: "not1", type: "NOT", label: "NOT 1", x: 100, y: 100 },
          { id: "out", type: "OUTPUT", label: "Out", x: 200, y: 100 },
        ],
        wires: [
          { id: "w1", fromNodeId: "not1", toNodeId: "not1", toPinIndex: 0 },
          { id: "w2", fromNodeId: "not1", toNodeId: "out", toPinIndex: 0 },
        ],
      };

      const result = evaluateCircuit(cyclicCircuit);
      assert.equal(result.hasCycles, true);
    });
  });
});
