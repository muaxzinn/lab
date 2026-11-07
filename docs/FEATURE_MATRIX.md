# Feature Tracking Matrix

> **Specification**: `masterplan.md` (Section 10 & Section 12)  
> **Lifecycle Status Values**:  
> `DISCOVERY` | `RESEARCHING` | `AUDITING` | `BENCHMARKING` | `SELECTED` | `CUSTOMIZING` | `DEVELOPING` | `INTEGRATING` | `TESTING` | `OPTIMIZING` | `COMPLETED` | `BLOCKED`  
> **Current Platform Phase**: Phase 9 Completed (Comprehensive QA, Cross-Browser E2E, a11y & Security Audit) [v0.7.0]  
> **Documentation Reference**: `docs/REPOSITORY_CATALOG.md`, `docs/TECHNICAL_AUDIT.md`, `docs/LICENSE_AUDIT.md`, `docs/BENCHMARK_REPORT.md`, `docs/SECURITY_REPORT.md`, `docs/PERFORMANCE_REPORT.md`, `docs/TEST_REPORT.md`  

---

## 1. Feature Modules Tracking Table

| Feature ID | Category | Name / Scope | Primary Subjects | Selected Tech Candidate / Engine | Status | Priority | Acceptance Criteria & Strategy |
|---|---|---|---|---|:---:|:---:|---|
| **FEAT-01** | Interactive Content | Responsive Lesson Reader & Callouts | All 9 Subjects | `next-mdx-remote` + `KaTeX` + `@tailwindcss/typography` | `SELECTED` | P0 | LaTeX support, responsive typography, collapsible callouts. Strategy: `Reuse`. |
| **FEAT-02** | Interactive Content | Concept Map & Dynamic Timelines | Biology, Astronomy, Thai | `Cytoscape.js` (large DAGs) + `@xyflow/react` (interactive nodes) | `SELECTED` | P1 | Interactive nodes, panning, zooming, node metadata modal. Strategy: `Componentize`. |
| **FEAT-03** | Simulation | Classical Mechanics & Kinematics | Physics | `Matter.js` (2D mechanics) + `Rapier2D` (dense collisions) | `COMPLETED` | P0 | Velocity, acceleration, collision restitution, 60 FPS target, Velocity Verlet symplectic integrator. Strategy: `Componentize`. |
| **FEAT-04** | Simulation | DC/AC Electric Circuit Simulator | Physics, Science | Pure TypeScript Modified Nodal Analysis (MNA) Solver | `COMPLETED` | P1 | Breadboard/schematic views, Ohm/Kirchhoff laws, real-time current, dynamic LED glow. Zero GPL copyleft clean-room rebuild. |
| **FEAT-05** | Simulation | Interactive Periodic Table & Trends | Chemistry | Native React + Tailwind + IUPAC 118 Elements Dataset | `COMPLETED` | P0 | Electronegativity, atomic radius, electron configurations. Strategy: `Rebuild`. |
| **FEAT-06** | Simulation | Chemical Titration & Reaction Engine | Chemistry | Exact Gauss-Jordan Nullspace Balancer + Stoichiometry Engine | `COMPLETED` | P1 | Exact chemical equation balancing, atom conservation verification, molar mass, mass conservation, limiting reagents. |
| **FEAT-07** | Simulation | Cell Structure & Organelle Inspector | Biology | Native Vector SVG + Cytology Engine + Cross-section clipping | `COMPLETED` | P0 | Plant/animal cells, clickable organelles, cross-sections, zero VRAM leak. Strategy: `Rebuild`. |
| **FEAT-08** | Simulation | Genetics & Punnett Square Sandbox | Biology | Native TypeScript Mendelian Engine + SVG Grid | `SELECTED` | P1 | Monohybrid & dihybrid crosses, phenotypic ratio verification. Strategy: `Rebuild`. |
| **FEAT-09** | Simulation | Solar System & Orbital Mechanics | Astronomy | `Astronomy Engine` (v2.1) + `Three.js` Celestial Scene | `SELECTED` | P1 | Keplerian orbits, lunar phases, eclipse verification. Strategy: `Reuse` + `Componentize`. |
| **FEAT-10** | Virtual Lab | Physics Virtual Laboratory Bench | Physics | `Matter.js` + Canvas2D apparatus (Vernier caliper, stopwatches) | `SELECTED` | P0 | Virtual calipers, friction carts, ticker tapes, data export. Strategy: `Componentize`. |
| **FEAT-11** | Virtual Lab | Chemistry Wet Lab Bench | Chemistry | Exact Stoichiometry & Reagent Conservation Engine | `COMPLETED` | P1 | Moles-to-grams conversion, Avogadro particle counts, reaction presets. |
| **FEAT-12** | Virtual Lab | Biology Virtual Microscope | Biology | `OpenSeadragon` (v6.1 deep zoom multi-tile viewer) | `SELECTED` | P1 | 4x/10x/40x/100x magnification, focus knobs, specimen slides. Strategy: `Componentize`. |
| **FEAT-13** | 2D/3D Viz | 3D Molecular Viewer | Chemistry, Biology | `Mol*` (Molstar v5.13) + `SmilesDrawer` (2D SMILES) | `SELECTED` | P0 | PDB/mmCIF ribbons, surfaces, ball-and-stick, 2D structures. Strategy: `Componentize`. |
| **FEAT-14** | 2D/3D Viz | 3D Anatomical & Geometric Explorer | Biology, Math | `Three.js` (v0.187) + `@react-three/fiber` + Clipping Planes | `SELECTED` | P1 | Exploded meshes, slicing planes, orbit controls. Strategy: `Componentize`. |
| **FEAT-15** | Mathematics | Mathematical Formula Editor & Parser | Mathematics, Physics | `KaTeX` (v0.19) + `MathLive` (v0.111 virtual keyboard) | `COMPLETED` | P0 | Instant LaTeX rendering, sandboxed Map evaluation, XSS neutralization. Strategy: `Reuse` + `Componentize`. |
| **FEAT-16** | Mathematics | 2D/3D Function Plotter & Calculus Viz | Mathematics | `Mafs` (v0.21 React SVG) + `Function Plot` (v1.26 implicit) | `COMPLETED` | P0 | Tangent lines, derivatives, dynamic coordinates, parameter sliders. Strategy: `Reuse`. |
| **FEAT-17** | Mathematics | Dynamic Geometry Sandbox | Mathematics | `JSXGraph` (v1.14 Dual MIT) + `Mafs` | `SELECTED` | P1 | Compass, straightedge, locus points, angle bisectors. Strategy: `Componentize`. |
| **FEAT-18** | Demonstration | Algorithmic Demonstrator & Sorting | Computer Science | `CodeMirror 6` + TypeScript Coroutine Step Generator | `SELECTED` | P1 | Step-by-step sorting/search, tree traversals, call stack. Strategy: `Reuse`. |
| **FEAT-19** | Demonstration | Logic Gate & Boolean Sandbox | Computer Science | Pure TypeScript Topological Boolean Evaluation Engine | `COMPLETED` | P1 | AND/OR/NOT/XOR/NAND/NOR/XNOR gates, live signal wires, automated truth tables, Adders, MUX, Universal NOR. |
| **FEAT-20** | Demonstration | Thai Tone & Syllable Rule Visualizer | Thai Language | Native TypeScript Thai Phonology Engine (3-byte safe) | `COMPLETED` | P1 | Consonant classes, live syllable parsing, 5-tone rules, pitch contour SVG visualizer. Strategy: `Rebuild`. |
| **FEAT-21** | Exercises | Universal Practice Engine | All 9 Subjects | Custom React Component Engine + KaTeX + Auto-Grading & Hints | `COMPLETED` | P0 | MCQ, MSQ, Fill-in-blank, Numeric with tolerance grading. Strategy: `Rebuild`. |
| **FEAT-22** | Assessment | Timed Assessment & Auto-Grader | All 9 Subjects | Client State Machine + Seeded PRNG + `Compute Engine` | `SELECTED` | P0 | Timed exams, question pools, instant rubric grading. Strategy: `Rebuild`. |
| **FEAT-23** | Progress | Learning Analytics & Mastery Matrix | All 9 Subjects | `Dexie.js` (v4.4 IndexedDB) + SVG Radar/Bar Diagnostics | `SELECTED` | P1 | Offline mastery matrix, streaks, time tracking. Strategy: `Reuse`. |
| **FEAT-24** | CMS | Lesson & Assessment Management | All 9 Subjects | `Zod` (v3.25) Schema Validation + Local IndexedDB Admin UI | `SELECTED` | P1 | CRUD operations, schema validation, live preview. Strategy: `Reuse`. |

---

## 2. Subject Matrix Breakdown

| Subject | Total Features | Discovery | Researching | Auditing | Selected | Completed |
|---|---|---|---|---|---|---|
| **Physics** | 6 | 0 | 0 | 0 | 5 (FEAT-01, FEAT-03, FEAT-10, FEAT-15, FEAT-22-24) | 1 (FEAT-04, FEAT-21) |
| **Chemistry** | 5 | 0 | 0 | 0 | 2 (FEAT-13, FEAT-22-24) | 3 (FEAT-05, FEAT-06, FEAT-11, FEAT-21) |
| **Biology** | 5 | 0 | 0 | 0 | 4 (FEAT-02, FEAT-08, FEAT-12, FEAT-14) | 1 (FEAT-07, FEAT-21) |
| **Mathematics** | 4 | 0 | 0 | 0 | 3 (FEAT-15, FEAT-16, FEAT-17) | 1 (FEAT-21) |
| **General Science** | 3 | 0 | 0 | 0 | 2 (FEAT-01, FEAT-03) | 1 (FEAT-04) |
| **Astronomy** | 3 | 0 | 0 | 0 | 3 (FEAT-02, FEAT-09, FEAT-14) | 0 |
| **Computer Science**| 3 | 0 | 0 | 0 | 2 (FEAT-18, FEAT-22) | 1 (FEAT-19, FEAT-21) |
| **English** | 2 | 0 | 0 | 0 | 2 (FEAT-01, FEAT-21) | 0 |
| **Thai Language** | 3 | 0 | 0 | 0 | 3 (FEAT-01, FEAT-02, FEAT-20) | 0 |

---

## 3. Progression Criteria for Subsequent Phases

Following `masterplan.md` Phase 3 (Auditing) and Phase 4 (Benchmarking) completion:
1. **From `SELECTED` to `CUSTOMIZING` (Phase 6)**: Selected open-source modules are adapted, wrapped in idiomatic React/Next.js components, and stripped of unnecessary bloat.
2. **To `DEVELOPING` / `INTEGRATING` (Phase 7 & 8)**: Production components are wired into `/src/components/*` with full TypeScript types, unit tests, and responsive container constraints.
3. **To `COMPLETED` (Phase 9 & 11)**: Automated test suites pass, anti-mockup criteria are met, and manual pedagogical acceptance verification passes.
