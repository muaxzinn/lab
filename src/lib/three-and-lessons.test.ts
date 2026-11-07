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
  getLabActionLabel,
  type Lesson,
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
  it("contains rich curriculum lessons covering all required disciplines and topics", () => {
    assert.equal(LESSONS.length, 22, "Must contain exactly 22 comprehensive curriculum lessons");

    const expectedCounts: Record<Lesson["discipline"], number> = {
      physics: 4,
      chemistry: 4,
      biology: 4,
      mathematics: 4,
      cs: 3,
      thai: 3,
    };

    for (const [disc, count] of Object.entries(expectedCounts)) {
      const lessons = getLessonsByDiscipline(disc as Lesson["discipline"]);
      assert.equal(
        lessons.length,
        count,
        `Discipline ${disc} must contain exactly ${count} lessons`
      );
    }

    const expectedLessonIds = [
      "phys-newton",
      "phys-projectile-circular",
      "phys-orbits",
      "phys-kirchhoff",
      "chem-orbitals",
      "chem-vsepr",
      "chem-equilibrium-stoichiometry",
      "chem-organic-biomolecules",
      "bio-organelles",
      "bio-membrane-osmosis",
      "bio-energetics-atp",
      "bio-central-dogma",
      "math-calculus-limits",
      "math-integrals",
      "math-linear-algebra-vectors",
      "math-trig-shm",
      "cs-boolean-logic",
      "cs-data-structures",
      "cs-big-o-complexity",
      "thai-triyang-phonology",
      "thai-spelling-live-dead",
      "thai-morphology-compounds",
    ];

    for (const id of expectedLessonIds) {
      const lesson = getLessonById(id);
      assert.ok(lesson, `Missing expected lesson ID: ${id}`);
    }
  });

  it("verifies structural integrity of each lesson and step", () => {
    for (const lesson of LESSONS) {
      assert.ok(lesson.id.length > 0, "Lesson ID must not be empty");
      assert.ok(lesson.title.length > 0, "Lesson title must not be empty");
      assert.ok(lesson.thaiTitle.length > 0, "Lesson thaiTitle must not be empty");
      assert.ok(lesson.estimatedMinutes > 0, "Estimated minutes must be positive");
      assert.ok(lesson.steps.length >= 3, `Lesson ${lesson.id} must have at least 3 deep steps`);

      lesson.steps.forEach((step, idx) => {
        assert.equal(step.stepNumber, idx + 1, "Step numbers must be 1-indexed sequential");
        assert.ok(step.title.length > 0, "Step title must not be empty");
        assert.ok(step.thaiTitle.length > 0, "Step thaiTitle must not be empty");
        assert.ok(step.deepTheory.length >= 2, "Step deepTheory must contain at least 2 theoretical paragraphs");
        assert.ok(step.application.title.length > 0, "Application title required");
        assert.ok(step.application.thaiDescription.length > 0, "Application thai description required");

        // Verify valid KaTeX rendering
        if (step.formulaLatex) {
          const html = renderSanitizedLatex(step.formulaLatex, { displayMode: true });
          assert.ok(html.includes("katex"), `Formula in step ${step.title} must produce KaTeX markup`);
        }

        // Verify checkpoint validity
        assert.ok(step.checkpoint, `Step ${step.title} in lesson ${lesson.id} must have a checkpoint`);
        if (step.checkpoint) {
          assert.ok(step.checkpoint.options.length >= 2, "Checkpoint must have at least 2 options");
          assert.ok(
            step.checkpoint.correctIndex >= 0 &&
              step.checkpoint.correctIndex < step.checkpoint.options.length,
            "Correct index must be within options range"
          );
          assert.ok(step.checkpoint.explanation.length > 0, "Checkpoint explanation required");
          assert.ok(step.checkpoint.thaiExplanation.length > 0, "Checkpoint thaiExplanation required");
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

  it("resolves contextually tailored action button labels across all disciplines", () => {
    // Mathematics
    const mathLabel = getLabActionLabel("math-calculus-limits", "mathematics");
    assert.ok(mathLabel.includes("Mafs 2D Grapher"), "Math must target Mafs 2D Grapher");

    // Computer Science
    const csLabel = getLabActionLabel("cs-boolean-logic", "cs");
    assert.ok(csLabel.includes("Logic Gate Simulator"), "CS must target Logic Gate Simulator");

    // Thai Language
    const thaiLabel = getLabActionLabel("thai-triyang-phonology", "thai");
    assert.ok(thaiLabel.includes("Phonology Visualizer"), "Thai must target Phonology Visualizer");

    // Physics
    const orbitLabel = getLabActionLabel("phys-orbits", "physics");
    assert.ok(orbitLabel.includes("3D Keplerian Solar System"), "Orbits must target Solar System");

    const circuitLabel = getLabActionLabel("phys-kirchhoff", "physics");
    assert.ok(circuitLabel.includes("MNA DC Circuit Simulator"), "Kirchhoff must target DC Circuit Simulator");

    const projLabel = getLabActionLabel("phys-projectile-circular", "physics");
    assert.ok(projLabel.includes("Verlet Orbit Mechanics"), "Projectile must target Verlet");

    // Chemistry
    const molLabel = getLabActionLabel("chem-vsepr", "chemistry");
    assert.ok(molLabel.includes("3D Molecular Lab"), "VSEPR must target 3D Molecular Lab");

    const eqLabel = getLabActionLabel("chem-equilibrium-stoichiometry", "chemistry");
    assert.ok(eqLabel.includes("Gauss-Jordan Balancer"), "Equilibrium must target Balancer");

    // Biology
    const cellLabel = getLabActionLabel("bio-organelles", "biology");
    assert.ok(cellLabel.includes("3D Cytology Explorer"), "Organelles must target 3D Cytology Explorer");
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

  it("thoroughly disposes Points, LineLoop, LineSegments (GridHelper), and invokes dispose methods", () => {
    const scene = new THREE.Scene();

    let pointsGeomDisposed = false;
    let pointsMatDisposed = false;
    let lineGeomDisposed = false;
    let lineMatDisposed = false;
    let gridGeomDisposed = false;
    let gridMatDisposed = false;

    // Points (like Starfield or Cytoplasm Ribosomes)
    const pointsGeom = new THREE.BufferGeometry();
    pointsGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 1, 1]), 3));
    pointsGeom.dispose = () => { pointsGeomDisposed = true; };
    const pointsMat = new THREE.PointsMaterial({ color: 0xffffff });
    pointsMat.dispose = () => { pointsMatDisposed = true; };
    const points = new THREE.Points(pointsGeom, pointsMat);
    scene.add(points);

    // LineLoop (like Keplerian Orbital Trails)
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, 2, 0, 0, 0, 2, 0]), 3));
    lineGeom.dispose = () => { lineGeomDisposed = true; };
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff });
    lineMat.dispose = () => { lineMatDisposed = true; };
    const lineLoop = new THREE.LineLoop(lineGeom, lineMat);
    scene.add(lineLoop);

    // LineSegments / GridHelper (like Lab Floor Grid)
    const grid = new THREE.GridHelper(10, 10);
    grid.geometry.dispose = () => { gridGeomDisposed = true; };
    if (Array.isArray(grid.material)) {
      grid.material[0].dispose = () => { gridMatDisposed = true; };
    } else {
      grid.material.dispose = () => { gridMatDisposed = true; };
    }
    scene.add(grid);

    assert.equal(scene.children.length, 3);

    disposeThreeScene(scene, null);

    assert.equal(scene.children.length, 0);
    assert.equal(pointsGeomDisposed, true, "Points geometry must be disposed");
    assert.equal(pointsMatDisposed, true, "Points material must be disposed");
    assert.equal(lineGeomDisposed, true, "LineLoop geometry must be disposed");
    assert.equal(lineMatDisposed, true, "LineLoop material must be disposed");
    assert.equal(gridGeomDisposed, true, "GridHelper geometry must be disposed");
    assert.equal(gridMatDisposed, true, "GridHelper material must be disposed");
  });
});
