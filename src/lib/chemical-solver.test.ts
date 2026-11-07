import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseChemicalFormula,
  calculateMolarMass,
  balanceChemicalEquation,
  calculateStoichiometry,
  REACTION_PRESETS,
  AVOGADRO_CONSTANT,
} from "./chemical-solver.ts";

describe("Chemical Equation Balancer & Stoichiometry Engine", () => {
  describe("Chemical Formula Parser & Molar Mass Calculation", () => {
    it("parses simple diatomic molecules and compounds", () => {
      assert.deepEqual(parseChemicalFormula("H2"), { H: 2 });
      assert.deepEqual(parseChemicalFormula("O2"), { O: 2 });
      assert.deepEqual(parseChemicalFormula("H2O"), { H: 2, O: 1 });
      assert.deepEqual(parseChemicalFormula("CO2"), { C: 1, O: 2 });
      assert.deepEqual(parseChemicalFormula("CH4"), { C: 1, H: 4 });
    });

    it("parses polyatomic groups with parentheses and nested multipliers", () => {
      assert.deepEqual(parseChemicalFormula("Ca(OH)2"), { Ca: 1, O: 2, H: 2 });
      assert.deepEqual(parseChemicalFormula("(NH4)2SO4"), { N: 2, H: 8, S: 1, O: 4 });
      assert.deepEqual(parseChemicalFormula("Al2(SO4)3"), { Al: 2, S: 3, O: 12 });
      assert.deepEqual(parseChemicalFormula("Fe(NO3)3"), { Fe: 1, N: 3, O: 9 });
    });

    it("parses complex carbohydrate macromolecules", () => {
      const glucose = parseChemicalFormula("C6H12O6");
      assert.deepEqual(glucose, { C: 6, H: 12, O: 6 });
      const molarMass = calculateMolarMass(glucose);
      // C: 12.011*6 + H: 1.008*12 + O: 15.999*6 ≈ 180.156 g/mol
      assert.ok(Math.abs(molarMass - 180.156) < 0.1);
    });

    it("rejects malformed formulas with syntax errors", () => {
      assert.throws(() => parseChemicalFormula("Ca(OH"), /Unclosed parenthesis/);
      assert.throws(() => parseChemicalFormula("CaOH)2"), /Mismatched closing parenthesis/);
      assert.throws(() => parseChemicalFormula("2H2O"), /Invalid character/);
    });
  });

  describe("Chemical Equation Balancer (Gauss-Jordan Nullspace Elimination)", () => {
    it("balances Water Synthesis: H2 + O2 -> H2O (2 H2 + O2 -> 2 H2O)", () => {
      const result = balanceChemicalEquation("H2 + O2 -> H2O");
      assert.equal(result.success, true);
      assert.equal(result.reactants[0].formula, "H2");
      assert.equal(result.reactants[0].coefficient, 2);
      assert.equal(result.reactants[1].formula, "O2");
      assert.equal(result.reactants[1].coefficient, 1);
      assert.equal(result.products[0].formula, "H2O");
      assert.equal(result.products[0].coefficient, 2);
      assert.equal(result.balancedEquationString, "2 H2 + O2 → 2 H2O");
      assert.equal(result.massConserved, true);
      assert.ok(result.massDifference < 0.001);
    });

    it("balances Methane Combustion: CH4 + O2 -> CO2 + H2O (CH4 + 2 O2 -> CO2 + 2 H2O)", () => {
      const result = balanceChemicalEquation("CH4 + O2 -> CO2 + H2O");
      assert.equal(result.success, true);
      assert.equal(result.balancedEquationString, "CH4 + 2 O2 → CO2 + 2 H2O");
      assert.equal(result.massConserved, true);
    });

    it("balances Plant Photosynthesis: CO2 + H2O -> C6H12O6 + O2", () => {
      const result = balanceChemicalEquation("CO2 + H2O -> C6H12O6 + O2");
      assert.equal(result.success, true);
      assert.equal(result.balancedEquationString, "6 CO2 + 6 H2O → C6H12O6 + 6 O2");
      assert.equal(result.massConserved, true);
    });

    it("balances Iron Rusting: Fe + O2 -> Fe2O3", () => {
      const result = balanceChemicalEquation("Fe + O2 -> Fe2O3");
      assert.equal(result.success, true);
      assert.equal(result.balancedEquationString, "4 Fe + 3 O2 → 2 Fe2O3");
      assert.equal(result.massConserved, true);
    });

    it("balances Aluminum Sulfate Single Displacement: Al + H2SO4 -> Al2(SO4)3 + H2", () => {
      const result = balanceChemicalEquation("Al + H2SO4 -> Al2(SO4)3 + H2");
      assert.equal(result.success, true);
      assert.equal(result.balancedEquationString, "2 Al + 3 H2SO4 → Al2(SO4)3 + 3 H2");
      assert.equal(result.massConserved, true);
    });

    it("balances complex Potassium Permanganate Redox: KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2", () => {
      const result = balanceChemicalEquation("KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2");
      assert.equal(result.success, true);
      assert.equal(
        result.balancedEquationString,
        "2 KMnO4 + 16 HCl → 2 KCl + 2 MnCl2 + 8 H2O + 5 Cl2"
      );
      assert.equal(result.massConserved, true);
    });

    it("catches element mismatch between reactants and products", () => {
      const result = balanceChemicalEquation("H2 + O2 -> CO2 + H2O");
      assert.equal(result.success, false);
      assert.ok(result.error?.includes("Element \"C\" is present in products but missing in reactants"));
    });
  });

  describe("Stoichiometry & Mass Conservation Calculations", () => {
    it("computes exact stoichiometry for Water Synthesis with 4.0 moles of H2", () => {
      const reaction = balanceChemicalEquation("H2 + O2 -> H2O");
      const stoich = calculateStoichiometry(reaction, "H2", 4.0, "moles");

      assert.equal(stoich.referenceFormula, "H2");
      assert.equal(stoich.referenceMoles, 4.0);

      // 2 H2 + 1 O2 -> 2 H2O
      // 4.0 moles H2 requires 2.0 moles O2 and produces 4.0 moles H2O
      const h2 = stoich.species.find((s) => s.formula === "H2")!;
      const o2 = stoich.species.find((s) => s.formula === "O2")!;
      const h2o = stoich.species.find((s) => s.formula === "H2O")!;

      assert.ok(Math.abs(h2.moles - 4.0) < 1e-4);
      assert.ok(Math.abs(o2.moles - 2.0) < 1e-4);
      assert.ok(Math.abs(h2o.moles - 4.0) < 1e-4);

      // Mass conservation
      assert.ok(Math.abs(stoich.totalReactantMass - stoich.totalProductMass) < 0.01);
      assert.ok(stoich.massConservationDelta < 0.01);

      // Particle count verification
      assert.ok(Math.abs(h2.particleCount - 4.0 * AVOGADRO_CONSTANT) < 1e20);
    });

    it("verifies all curriculum presets balance cleanly without errors", () => {
      for (const preset of REACTION_PRESETS) {
        const balanced = balanceChemicalEquation(preset.equation);
        assert.equal(balanced.success, true, `Preset ${preset.id} failed to balance: ${balanced.error}`);
        assert.equal(balanced.massConserved, true);
        assert.ok(balanced.totalReactantMassPerMole > 0);
        assert.ok(balanced.totalProductMassPerMole > 0);
      }
    });
  });
});
