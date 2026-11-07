import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  MOLECULES_3D,
  CPK_COLORS,
  COVALENT_RADII,
  VDW_RADII,
} from "./molecular-data-3d.ts";
import {
  LESSONS,
  getLessonsByDiscipline,
  getLessonById,
} from "./lesson-data.ts";
import { renderSanitizedLatex } from "./math-sanitizer.ts";
import * as THREE from "three";
import { disposeThreeScene } from "./three-cleanup.ts";

describe("3D Molecular Dataset Verification (FEAT-04 WebGL)", () => {
  it("contains all required landmark molecules", () => {
    assert.ok(MOLECULES_3D.length >= 8);
    const requiredIds = [
      "water",
      "methane",
      "ethanol",
      "benzene",
      "glucose",
      "caffeine",
      "aspirin",
      "dna-helix",
    ];
    const availableIds = new Set(MOLECULES_3D.map((m) => m.id));
    for (const reqId of requiredIds) {
      assert.ok(availableIds.has(reqId), `Missing required molecule: ${reqId}`);
    }
  });

  it("verifies all molecules possess valid 3D coordinates, CPK colors, and positive radii", () => {
    for (const mol of MOLECULES_3D) {
      assert.ok(mol.name.length > 0, `Molecule ${mol.id} must have a name`);
      assert.ok(mol.thaiName.length > 0, `Molecule ${mol.id} must have a thaiName`);
      assert.ok(mol.formula.length > 0, `Molecule ${mol.id} must have a formula`);
      assert.ok(mol.molarMass > 0, `Molecule ${mol.id} must have positive molar mass`);
      assert.ok(mol.atoms.length >= 3, `Molecule ${mol.id} must have at least 3 atoms`);

      mol.atoms.forEach((atom, idx) => {
        assert.equal(atom.position.length, 3, `Atom #${idx} in ${mol.id} must have 3D coords`);
        atom.position.forEach((coord) => {
          assert.equal(typeof coord, "number");
          assert.ok(!Number.isNaN(coord), `Coord must not be NaN in ${mol.id}`);
        });
        assert.ok(atom.color.startsWith("#"), `Atom color must be hex in ${mol.id}`);
        assert.ok(atom.covalentRadius > 0, `Covalent radius must be positive in ${mol.id}`);
        assert.ok(atom.vdwRadius > atom.covalentRadius, `vdW radius must exceed covalent radius in ${mol.id}`);
      });
    }
  });

  it("verifies all bond indices point to valid atoms in the molecule", () => {
    for (const mol of MOLECULES_3D) {
      for (const bond of mol.bonds) {
        assert.ok(
          bond.atom1 >= 0 && bond.atom1 < mol.atoms.length,
          `Bond atom1 ${bond.atom1} out of bounds in ${mol.id}`
        );
        assert.ok(
          bond.atom2 >= 0 && bond.atom2 < mol.atoms.length,
          `Bond atom2 ${bond.atom2} out of bounds in ${mol.id}`
        );
        assert.notEqual(bond.atom1, bond.atom2, `Bond cannot connect atom to itself in ${mol.id}`);
      }
    }
  });

  it("verifies CPK standard color palette invariants", () => {
    assert.equal(CPK_COLORS.H, "#FFFFFF");
    assert.equal(CPK_COLORS.C, "#909090");
    assert.equal(CPK_COLORS.N, "#3050F8");
    assert.equal(CPK_COLORS.O, "#FF0D0D");
    assert.equal(CPK_COLORS.P, "#FF8000");
  });

  it("verifies physical radii constraints for key elements", () => {
    assert.ok(COVALENT_RADII.H < COVALENT_RADII.C);
    assert.ok(COVALENT_RADII.O < COVALENT_RADII.C);
    assert.ok(COVALENT_RADII.P > COVALENT_RADII.C);
    assert.ok(VDW_RADII.H < VDW_RADII.C);
  });
});

describe("Interactive Curriculum Lessons (FEAT-01)", () => {
  it("contains rich curriculum lessons covering all required disciplines", () => {
    const disciplines = ["physics", "chemistry", "biology", "mathematics", "cs", "thai"] as const;

    for (const disc of disciplines) {
      const lessons = getLessonsByDiscipline(disc);
      assert.ok(
        lessons.length >= 1,
        `Discipline ${disc} must contain at least 1 deep lesson`
      );
    }
  });

  it("verifies structural integrity of each lesson and step", () => {
    for (const lesson of LESSONS) {
      assert.ok(lesson.id.length > 0, "Lesson ID must not be empty");
      assert.ok(lesson.title.length > 0, "Lesson title must not be empty");
      assert.ok(lesson.thaiTitle.length > 0, "Lesson thaiTitle must not be empty");
      assert.ok(lesson.estimatedMinutes > 0, "Estimated minutes must be positive");
      assert.ok(lesson.steps.length >= 1, `Lesson ${lesson.id} must have steps`);

      lesson.steps.forEach((step, idx) => {
        assert.equal(step.stepNumber, idx + 1, "Step numbers must be 1-indexed sequential");
        assert.ok(step.title.length > 0, "Step title must not be empty");
        assert.ok(step.thaiTitle.length > 0, "Step thaiTitle must not be empty");
        assert.ok(step.deepTheory.length >= 1, "Step deepTheory must contain content");
        assert.ok(step.application.title.length > 0, "Application title required");
        assert.ok(step.application.thaiDescription.length > 0, "Application thai description required");

        // If step has a formula, verify it renders cleanly into valid KaTeX without throwing
        if (step.formulaLatex) {
          const html = renderSanitizedLatex(step.formulaLatex, { displayMode: true });
          assert.ok(html.includes("katex"), `Formula in step ${step.title} must produce KaTeX markup`);
        }

        // If step has a checkpoint, verify valid options and index
        if (step.checkpoint) {
          assert.ok(step.checkpoint.options.length >= 2, "Checkpoint must have at least 2 options");
          assert.ok(
            step.checkpoint.correctIndex >= 0 &&
              step.checkpoint.correctIndex < step.checkpoint.options.length,
            "Correct index must be within options range"
          );
        }
      });
    }
  });

  it("resolves lessons by ID accurately", () => {
    const newtonLesson = getLessonById("phys-newton");
    assert.ok(newtonLesson);
    assert.equal(newtonLesson?.discipline, "physics");
    assert.equal(newtonLesson?.steps.length, 3);

    const nonExistent = getLessonById("unknown-lesson");
    assert.equal(nonExistent, undefined);
  });
});

describe("Three.js Lifecycle & Disposal Safety (FEAT-04 Clean-up)", () => {
  it("safely disposes mesh geometries, materials, and scene hierarchies without crashing", () => {
    const scene = new THREE.Scene();

    const geom1 = new THREE.SphereGeometry(1, 8, 8);
    const mat1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh1 = new THREE.Mesh(geom1, mat1);
    scene.add(mesh1);

    const geom2 = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
    const mat2 = [
      new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
      new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    ];
    const mesh2 = new THREE.Mesh(geom2, mat2);
    scene.add(mesh2);

    assert.equal(scene.children.length, 2);

    // Call disposeThreeScene with null renderer (simulating non-DOM environment)
    assert.doesNotThrow(() => {
      disposeThreeScene(scene, null);
    });

    assert.equal(scene.children.length, 0);
  });
});
