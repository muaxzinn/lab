# Feature Tracking Matrix

> **Specification**: `masterplan.md` (Section 10 & Section 12)  
> **Lifecycle Status Values**:  
> `DISCOVERY` | `RESEARCHING` | `AUDITING` | `BENCHMARKING` | `SELECTED` | `CUSTOMIZING` | `DEVELOPING` | `INTEGRATING` | `TESTING` | `OPTIMIZING` | `COMPLETED` | `BLOCKED`  
> **Current Platform Phase**: Phase 4 Completed (Deep Technical Audit, License Audit & Empirical Benchmarking)  
> **Documentation Reference**: `docs/REPOSITORY_CATALOG.md`, `docs/TECHNICAL_AUDIT.md`, `docs/LICENSE_AUDIT.md`, `docs/BENCHMARK_REPORT.md`  

---

## 1. Feature Modules Tracking Table

| Feature ID | Category | Name / Scope | Primary Subjects | Selected Tech Candidate / Engine | Status | Priority | Acceptance Criteria & Strategy |
|---|---|---|---|---|:---:|:---:|---|
| **FEAT-01** | Interactive Content | Responsive Lesson Reader & Callouts | All 9 Subjects | `next-mdx-remote` + `KaTeX` + `@tailwindcss/typography` | `SELECTED` | P0 | LaTeX support, responsive typography, collapsible callouts. Strategy: `Reuse`. |
| **FEAT-02** | Interactive Content | Concept Map & Dynamic Timelines | Biology, Astronomy, Thai | `Cytoscape.js` (large DAGs) + `@xyflow/react` (interactive nodes) | `SELECTED` | P1 | Interactive nodes, panning, zooming, node metadata modal. Strategy: `Componentize`. |
| **FEAT-03** | Simulation | Classical Mechanics & Kinematics | Physics | `Matter.js` (2D mechanics) + `Rapier2D` (dense collisions) | `SELECTED` | P0 | Velocity, acceleration, collision restitution, 60 FPS target. Strategy: `Componentize`. |
| **FEAT-04** | Simulation | DC/AC Electric Circuit Simulator | Physics, Science | `@spice-ts/core` (MNA solver) + Custom React SVG Schematics | `SELECTED` | P1 | Breadboard/schematic views, Ohm/Kirchhoff laws, real-time current. CircuitJS rejected (GPL-2.0). Strategy: `Clean-Room Rebuild`. |
| **FEAT-05** | Simulation | Interactive Periodic Table & Trends | Chemistry | Native React + Tailwind + IUPAC 118 Elements Dataset | `COMPLETED` | P0 | Electronegativity, atomic radius, electron configurations. Strategy: `Rebuild`. |
| **FEAT-06** | Simulation | Chemical Titration & Reaction Engine | Chemistry | Custom TypeScript RK4 ODE Solver + `SmilesDrawer` | `SELECTED` | P1 | pH curve plotting, indicator color shifts, stoichiometry balance. RK4 benchmarked ($2.7 \times 10^{-10}$ error). Strategy: `Componentize`. |
| **FEAT-07** | Simulation | Cell Structure & Organelle Inspector | Biology | Native Vector SVG + Cytology Engine + Cross-section clipping | `COMPLETED` | P0 | Plant/animal cells, clickable organelles, cross-sections, zero VRAM leak. Strategy: `Rebuild`. |
| **FEAT-08** | Simulation | Genetics & Punnett Square Sandbox | Biology | Native TypeScript Mendelian Engine + SVG Grid | `SELECTED` | P1 | Monohybrid & dihybrid crosses, phenotypic ratio verification. Strategy: `Rebuild`. |
| **FEAT-09** | Simulation | Solar System & Orbital Mechanics | Astronomy | `Astronomy Engine` (v2.1) + `Three.js` Celestial Scene | `SELECTED` | P1 | Keplerian orbits, lunar phases, eclipse verification. Strategy: `Reuse` + `Componentize`. |
| **FEAT-10** | Virtual Lab | Physics Virtual Laboratory Bench | Physics | `Matter.js` + Canvas2D apparatus (Vernier caliper, stopwatches) | `SELECTED` | P0 | Virtual calipers, friction carts, ticker tapes, data export. Strategy: `Componentize`. |
| **FEAT-11** | Virtual Lab | Chemistry Wet Lab Bench | Chemistry | Custom Canvas2D Fluid & Meniscus Engine + Glassware Sprites | `SELECTED` | P1 | Beakers, burettes, pipettes, hazardous reaction alerts. Strategy: `Rebuild`. |
| **FEAT-12** | Virtual Lab | Biology Virtual Microscope | Biology | `OpenSeadragon` (v6.1 deep zoom multi-tile viewer) | `SELECTED` | P1 | 4x/10x/40x/100x magnification, focus knobs, specimen slides. Strategy: `Componentize`. |
| **FEAT-13** | 2D/3D Viz | 3D Molecular Viewer | Chemistry, Biology | `Mol*` (Molstar v5.13) + `SmilesDrawer` (2D SMILES) | `SELECTED` | P0 | PDB/mmCIF ribbons, surfaces, ball-and-stick, 2D structures. Strategy: `Componentize`. |
| **FEAT-14** | 2D/3D Viz | 3D Anatomical & Geometric Explorer | Biology, Math | `Three.js` (v0.187) + `@react-three/fiber` + Clipping Planes | `SELECTED` | P1 | Exploded meshes, slicing planes, orbit controls. Strategy: `Componentize`. |
| **FEAT-15** | Mathematics | Mathematical Formula Editor & Parser | Mathematics, Physics | `KaTeX` (v0.19) + `MathLive` (v0.111 virtual keyboard) | `SELECTED` | P0 | Instant LaTeX rendering, on-screen math input. Strategy: `Reuse` + `Componentize`. |
| **FEAT-16** | Mathematics | 2D/3D Function Plotter & Calculus Viz | Mathematics | `Mafs` (v0.21 React SVG) + `Function Plot` (v1.26 implicit) | `SELECTED` | P0 | Tangent lines, derivatives, Riemann sums, polar curves. Strategy: `Reuse`. |
| **FEAT-17** | Mathematics | Dynamic Geometry Sandbox | Mathematics | `JSXGraph` (v1.14 Dual MIT) + `Mafs` | `SELECTED` | P1 | Compass, straightedge, locus points, angle bisectors. Strategy: `Componentize`. |
| **FEAT-18** | Demonstration | Algorithmic Demonstrator & Sorting | Computer Science | `CodeMirror 6` + TypeScript Coroutine Step Generator | `SELECTED` | P1 | Step-by-step sorting/search, tree traversals, call stack. Strategy: `Reuse`. |
| **FEAT-19** | Demonstration | Logic Gate & Boolean Sandbox | Computer Science | `@xyflow/react` (v12) + Topological Boolean Evaluation Engine | `SELECTED` | P1 | AND/OR/NOT/XOR gates, live signal wires, truth tables. Strategy: `Reuse`. |
| **FEAT-20** | Demonstration | Thai Tone & Syllable Rule Visualizer | Thai Language | Native TypeScript Thai Phonology Engine (3-byte safe) | `SELECTED` | P1 | Consonant classes, live syllable parsing, 5-tone rules. Strategy: `Rebuild`. |
| **FEAT-21** | Exercises | Universal Practice Engine | All 9 Subjects | Custom React Component Engine + KaTeX + Auto-Grading & Hints | `COMPLETED` | P0 | MCQ, MSQ, Fill-in-blank, Numeric with tolerance grading. Strategy: `Rebuild`. |
| **FEAT-22** | Assessment | Timed Assessment & Auto-Grader | All 9 Subjects | Client State Machine + Seeded PRNG + `Compute Engine` | `SELECTED` | P0 | Timed exams, question pools, instant rubric grading. Strategy: `Rebuild`. |
| **FEAT-23** | Progress | Learning Analytics & Mastery Matrix | All 9 Subjects | `Dexie.js` (v4.4 IndexedDB) + SVG Radar/Bar Diagnostics | `SELECTED` | P1 | Offline mastery matrix, streaks, time tracking. Strategy: `Reuse`. |
| **FEAT-24** | CMS | Lesson & Assessment Management | All 9 Subjects | `Zod` (v3.25) Schema Validation + Local IndexedDB Admin UI | `SELECTED` | P1 | CRUD operations, schema validation, live preview. Strategy: `Reuse`. |

---

## 2. Subject Matrix Breakdown

| Subject | Total Features | Discovery | Researching | Auditing | Selected | Completed |
|---|---|---|---|---|---|---|
| **Physics** | 6 | 0 | 0 | 0 | 6 (FEAT-01, FEAT-03, FEAT-04, FEAT-10, FEAT-15, FEAT-21-24) | 0 |
| **Chemistry** | 5 | 0 | 0 | 0 | 5 (FEAT-05, FEAT-06, FEAT-11, FEAT-13, FEAT-21-24) | 0 |
| **Biology** | 5 | 0 | 0 | 0 | 5 (FEAT-02, FEAT-07, FEAT-08, FEAT-12, FEAT-14) | 0 |
| **Mathematics** | 4 | 0 | 0 | 0 | 4 (FEAT-15, FEAT-16, FEAT-17, FEAT-21) | 0 |
| **General Science** | 3 | 0 | 0 | 0 | 3 (FEAT-01, FEAT-03, FEAT-04) | 0 |
| **Astronomy** | 3 | 0 | 0 | 0 | 3 (FEAT-02, FEAT-09, FEAT-14) | 0 |
| **Computer Science**| 3 | 0 | 0 | 0 | 3 (FEAT-18, FEAT-19, FEAT-21) | 0 |
| **English** | 2 | 0 | 0 | 0 | 2 (FEAT-01, FEAT-21) | 0 |
| **Thai Language** | 3 | 0 | 0 | 0 | 3 (FEAT-01, FEAT-02, FEAT-20) | 0 |

---

## 3. Progression Criteria for Subsequent Phases

Following `masterplan.md` Phase 3 (Auditing) and Phase 4 (Benchmarking) completion:
1. **From `SELECTED` to `CUSTOMIZING` (Phase 6)**: Selected open-source modules are adapted, wrapped in idiomatic React/Next.js components, and stripped of unnecessary bloat.
2. **To `DEVELOPING` / `INTEGRATING` (Phase 7 & 8)**: Production components are wired into `/src/components/*` with full TypeScript types, unit tests, and responsive container constraints.
3. **To `COMPLETED` (Phase 9 & 11)**: Automated test suites pass, anti-mockup criteria are met, and manual pedagogical acceptance verification passes.
