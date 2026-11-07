# Feature Tracking Matrix

> **Specification**: `masterplan.md` (Section 10 & Section 12)  
> **Lifecycle Status Values**:  
> `DISCOVERY` | `RESEARCHING` | `AUDITING` | `BENCHMARKING` | `SELECTED` | `CUSTOMIZING` | `DEVELOPING` | `INTEGRATING` | `TESTING` | `OPTIMIZING` | `COMPLETED` | `BLOCKED`  
> **Current Platform Phase**: Phase 0 (Workspace Assessment & Initialization)  
> **Default Status**: `DISCOVERY`  

---

## 1. Feature Modules Tracking Table

| Feature ID | Category | Name / Scope | Primary Subjects | Tech Candidate / Direction | Status | Priority | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **FEAT-01** | Interactive Content | Responsive Lesson Reader & Callouts | All 9 Subjects | Markdown / MDX + Tailwind | `DISCOVERY` | P0 | Supports LaTeX, responsive typography, expandable callouts |
| **FEAT-02** | Interactive Content | Concept Map & Dynamic Timelines | Biology, Astronomy, Thai | D3.js / Cytoscape / Vis.js | `DISCOVERY` | P1 | Interactive nodes, panning, zooming, node descriptions |
| **FEAT-03** | Simulation | Classical Mechanics & Kinematics | Physics | Matter.js / Rapier2D | `DISCOVERY` | P0 | Accurate velocity, acceleration, collision, friction, 60fps |
| **FEAT-04** | Simulation | DC/AC Electric Circuit Simulator | Physics, Science | CircuitJS / Custom SVG Engine | `DISCOVERY` | P1 | Breadboard/schematic view, Ohm's law, real-time current flow |
| **FEAT-05** | Simulation | Interactive Periodic Table & Trends | Chemistry | Lucide icons, Tailwind, ChemJS | `DISCOVERY` | P0 | Elemental trends (EN, atomic radius), electron shells |
| **FEAT-06** | Simulation | Chemical Titration & Reaction Engine | Chemistry | Canvas2D, Reaction ODE solver | `DISCOVERY` | P1 | pH curve plotting, indicator color shifts, stoichiometry |
| **FEAT-07** | Simulation | Cell Structure & Organelle Inspector | Biology | Three.js / Canvas 2D | `DISCOVERY` | P0 | Plant/animal cells, clickable organelles, cross sections |
| **FEAT-08** | Simulation | Genetics & Punnett Square Sandbox | Biology | React state engine, SVG | `DISCOVERY` | P1 | Monohybrid & dihybrid crosses, phenotypic ratio plots |
| **FEAT-09** | Simulation | Solar System & Orbital Mechanics | Astronomy | Three.js / Kepler ODE solver | `DISCOVERY` | P1 | Gravitational orbits, lunar phases, eclipse alignment |
| **FEAT-10** | Virtual Lab | Physics Virtual Laboratory Bench | Physics | Canvas2D / Matter.js | `DISCOVERY` | P0 | Virtual calipers, stopwatches, friction carts, data export |
| **FEAT-11** | Virtual Lab | Chemistry Wet Lab Bench | Chemistry | 2D glassware sprites, Liquid simulator | `DISCOVERY` | P1 | Beakers, burettes, test tubes, hazardous safety alerts |
| **FEAT-12** | Virtual Lab | Biology Virtual Microscope | Biology | High-res image zoomer (OpenSeadragon) | `DISCOVERY` | P1 | 4x/10x/40x/100x zoom, focus knob, specimen slides |
| **FEAT-13** | 2D/3D Viz | 3D Molecular Viewer | Chemistry, Biology | 3Dmol.js / NGL / Mol* | `DISCOVERY` | P0 | PDB/SDF loading, ball-and-stick, ribbon representation |
| **FEAT-14** | 2D/3D Viz | 3D Anatomical & Geometric Explorer | Biology, Math | Three.js + GLTF loader | `DISCOVERY` | P1 | Exploded view, clipping planes, smooth rotation |
| **FEAT-15** | Mathematics | Mathematical Formula Editor & Parser | Mathematics, Physics | KaTeX / MathLive | `DISCOVERY` | P0 | Fast LaTeX rendering, editable formula input |
| **FEAT-16** | Mathematics | 2D/3D Function Plotter & Calculus Viz | Mathematics | Function Plotter / JSXGraph | `DISCOVERY` | P0 | Tangent lines, derivatives, Riemann sums, polar graphs |
| **FEAT-17** | Mathematics | Dynamic Geometry Sandbox | Mathematics | JSXGraph / Fabric.js | `DISCOVERY` | P1 | Compass & straightedge, angles, draggable vertices |
| **FEAT-18** | Demonstration | Algorithmic Demonstrator & Sorting | Computer Science | Canvas / DOM animation | `DISCOVERY` | P1 | Step-by-step sorting/search, tree traversals, call stack |
| **FEAT-19** | Demonstration | Logic Gate & Boolean Sandbox | Computer Science | SVG / Canvas2D | `DISCOVERY` | P1 | AND/OR/NOT/XOR gates, truth table verification |
| **FEAT-20** | Demonstration | Thai Tone & Syllable Rule Visualizer | Thai Language | Custom Unicode Regex Engine | `DISCOVERY` | P1 | Live Thai 3-byte syllable dissection, live tone computation |
| **FEAT-21** | Exercises | Universal Practice Engine | All 9 Subjects | Modular React question components | `DISCOVERY` | P0 | MCQ, MSQ, True/False, Drag & Drop, Instant hints |
| **FEAT-22** | Assessment | Timed Assessment & Auto-Grader | All 9 Subjects | Client state machine + Timer | `DISCOVERY` | P0 | Random question selection, scorecards, topic breakdowns |
| **FEAT-23** | Progress | Learning Analytics & Mastery Matrix | All 9 Subjects | LocalStorage / IndexedDB / Chart.js | `DISCOVERY` | P1 | Progress streaks, time tracking, weakness diagnostic |
| **FEAT-24** | CMS | Lesson & Assessment Management | All 9 Subjects | Local JSON schema / Admin UI | `DISCOVERY` | P1 | CRUD operations, live preview sandbox, validation |

---

## 2. Subject Matrix Breakdown

| Subject | Total Features | Discovery | Researching | Auditing | In Development | Completed |
|---|---|---|---|---|---|---|
| **Physics** | 6 | 6 | 0 | 0 | 0 | 0 |
| **Chemistry** | 5 | 5 | 0 | 0 | 0 | 0 |
| **Biology** | 5 | 5 | 0 | 0 | 0 | 0 |
| **Mathematics** | 4 | 4 | 0 | 0 | 0 | 0 |
| **General Science** | 3 | 3 | 0 | 0 | 0 | 0 |
| **Astronomy** | 3 | 3 | 0 | 0 | 0 | 0 |
| **Computer Science**| 3 | 3 | 0 | 0 | 0 | 0 |
| **English** | 2 | 2 | 0 | 0 | 0 | 0 |
| **Thai Language** | 3 | 3 | 0 | 0 | 0 | 0 |

---

## 3. Progression Criteria for Future Phases

To advance any feature from `DISCOVERY` to subsequent states:
1. **To `RESEARCHING`**: At least 2 candidate OSS repositories identified with active maintenance.
2. **To `AUDITING`**: Source code inspected for architecture, security, and license (MIT/Apache 2.0).
3. **To `BENCHMARKING`**: Sandboxed standalone test verifying rendering fidelity and 60 FPS performance.
4. **To `SELECTED`**: Formal decision logged in `TECHNICAL_AUDIT.md` and `LICENSE_AUDIT.md`.
5. **To `DEVELOPING` / `INTEGRATING`**: Component implemented matching Next.js 15 + TypeScript standards.
6. **To `COMPLETED`**: Automated test coverage and human acceptance criteria satisfied.
