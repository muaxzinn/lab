# Feature Tracking Matrix

> **Specification**: `masterplan.md` (Section 10 & Section 12)  
> **Lifecycle Status Values**:  
> `DISCOVERY` | `RESEARCHING` | `AUDITING` | `BENCHMARKING` | `SELECTED` | `CUSTOMIZING` | `DEVELOPING` | `INTEGRATING` | `TESTING` | `OPTIMIZING` | `COMPLETED` | `BLOCKED`  
> **Current Platform Phase**: Phase 10 (PWA Offline Service Worker) & Phase 11 (Release Packaging & Documentation) COMPLETED [v1.0.0]  
> **Documentation Reference**: `docs/REPOSITORY_CATALOG.md`, `docs/TECHNICAL_AUDIT.md`, `docs/LICENSE_AUDIT.md`, `docs/BENCHMARK_REPORT.md`, `docs/SECURITY_REPORT.md`, `docs/PERFORMANCE_REPORT.md`, `docs/TEST_REPORT.md`, `docs/SOURCE_TRACKING.md`, `docs/INSTALLATION_GUIDE.md`, `docs/USER_GUIDE.md`, `docs/DEVELOPER_GUIDE.md`  

---

## 1. Feature Modules Tracking Table

| Feature ID | Category | Name / Scope | Primary Subjects | Selected Tech Candidate / Engine | Status | Priority | Acceptance Criteria & Strategy |
|---|---|---|---|---|:---:|:---:|---|
| **FEAT-01** | Interactive Content | Responsive Lesson Reader & Callouts | All 9 Subjects | KaTeX + Lucide + Tailwind Typography + KioskShell | `COMPLETED` | P0 | LaTeX support, responsive typography, collapsible callouts, multi-route layout. Strategy: `Reuse`. |
| **FEAT-02** | Interactive Content | Concept Map & Dynamic Timelines | Biology, Astronomy, Thai | Cytoscape.js + @xyflow/react | `SELECTED` | P1 | Interactive nodes, panning, zooming, node metadata modal. Strategy: `Componentize`. |
| **FEAT-03** | Simulation | Classical Mechanics & Kinematics | Physics | Symplectic Velocity Verlet Integrator + Matter.js | `COMPLETED` | P0 | Velocity, acceleration, collision restitution, 60 FPS target, Velocity Verlet symplectic integrator ($2.5 \times 10^{-9}$ energy error). Strategy: `Componentize` + `Rebuild`. |
| **FEAT-04** | Simulation | DC/AC Electric Circuit Simulator | Physics, Science | Pure TypeScript Modified Nodal Analysis (MNA) Solver | `COMPLETED` | P1 | Breadboard/schematic views, Ohm/Kirchhoff laws, real-time current particles, dynamic LED glow, live voltmeter probes. Zero GPL copyleft clean-room rebuild. |
| **FEAT-05** | Simulation | Interactive Periodic Table & Trends | Chemistry | Native React + Tailwind + IUPAC 118 Elements Dataset | `COMPLETED` | P0 | Electronegativity heatmap, atomic radius, Bohr orbital visualizer, bilingual search. Strategy: `Rebuild`. |
| **FEAT-06** | Simulation | Chemical Titration & Reaction Engine | Chemistry | Exact Gauss-Jordan Nullspace Balancer + Stoichiometry Engine | `COMPLETED` | P1 | Exact chemical equation balancing, atom conservation verification, molar mass, mass conservation, limiting reagents. Strategy: `Rebuild`. |
| **FEAT-07** | Simulation | Cell Structure & Organelle Inspector | Biology | Native Vector SVG + Cytology Engine + Cross-section clipping | `COMPLETED` | P0 | Plant/animal cells, 12 clickable organelles, cross-sections, zero VRAM leak. Strategy: `Rebuild`. |
| **FEAT-08** | Simulation | Genetics & Punnett Square Sandbox | Biology | Native TypeScript Mendelian Engine + SVG Grid | `SELECTED` | P1 | Monohybrid & dihybrid crosses, phenotypic ratio verification. Strategy: `Rebuild`. |
| **FEAT-09** | Simulation | Solar System & Orbital Mechanics | Astronomy | Astronomy Engine (v2.1) + Three.js Celestial Scene | `SELECTED` | P1 | Keplerian orbits, lunar phases, eclipse verification. Strategy: `Reuse` + `Componentize`. |
| **FEAT-10** | Virtual Lab | Physics Virtual Laboratory Bench | Physics | Keplerian Planetary Orbit + DC Circuit Workstation | `COMPLETED` | P0 | Symplectic orbit simulator, MNA circuit solver, real-time gauges, live telemetry probes. Strategy: `Rebuild`. |
| **FEAT-11** | Virtual Lab | Chemistry Wet Lab Bench | Chemistry | Exact Stoichiometry & Reagent Conservation Engine | `COMPLETED` | P1 | Moles-to-grams conversion, Avogadro particle counts, mass conservation audit, reaction presets. Strategy: `Rebuild`. |
| **FEAT-12** | Virtual Lab | Biology Virtual Microscope | Biology | OpenSeadragon (v6.1 deep zoom multi-tile viewer) | `SELECTED` | P1 | 4x/10x/40x/100x magnification, focus knobs, specimen slides. Strategy: `Componentize`. |
| **FEAT-13** | 2D/3D Viz | 3D Molecular Viewer | Chemistry, Biology | Mol* (Molstar v5.13) + SmilesDrawer (2D SMILES) | `SELECTED` | P0 | PDB/mmCIF ribbons, surfaces, ball-and-stick, 2D structures. Strategy: `Componentize`. |
| **FEAT-14** | 2D/3D Viz | 3D Anatomical & Geometric Explorer | Biology, Math | Three.js (v0.187) + @react-three/fiber + Clipping Planes | `SELECTED` | P1 | Exploded meshes, slicing planes, orbit controls. Strategy: `Componentize`. |
| **FEAT-15** | Mathematics | Mathematical Formula Editor & Parser | Mathematics, Physics | KaTeX (v0.19) + Math.js AST Sandboxed Map Scopes | `COMPLETED` | P0 | Instant LaTeX rendering, sandboxed Map evaluation, XSS neutralization (`trust: false`). Strategy: `Reuse` + `Componentize`. |
| **FEAT-16** | Mathematics | 2D/3D Function Plotter & Calculus Viz | Mathematics | Mafs (v0.21 React SVG) + Tangent Line Derivatives | `COMPLETED` | P0 | Tangent lines, derivatives, dynamic coordinates, parameter sliders, responsive Cartesian grid. Strategy: `Reuse`. |
| **FEAT-17** | Mathematics | Dynamic Geometry Sandbox | Mathematics | JSXGraph (v1.14 Dual MIT) + Mafs | `SELECTED` | P1 | Compass, straightedge, locus points, angle bisectors. Strategy: `Componentize`. |
| **FEAT-18** | Demonstration | Algorithmic Demonstrator & Sorting | Computer Science | CodeMirror 6 + TypeScript Coroutine Step Generator | `SELECTED` | P1 | Step-by-step sorting/search, tree traversals, call stack. Strategy: `Reuse`. |
| **FEAT-19** | Demonstration | Logic Gate & Boolean Sandbox | Computer Science | Pure TypeScript Topological Boolean Evaluation Engine | `COMPLETED` | P1 | AND/OR/NOT/XOR/NAND/NOR/XNOR gates, live signal wires, automated truth tables, Adders, MUX, Universal NOR. Strategy: `Rebuild`. |
| **FEAT-20** | Demonstration | Thai Tone & Syllable Rule Visualizer | Thai Language | Native TypeScript Thai Phonology Engine (3-byte safe) | `COMPLETED` | P1 | Consonant classes, live syllable parsing, 5-tone rules, pitch contour SVG visualizer. Strategy: `Rebuild`. |
| **FEAT-21** | Exercises | Universal Practice Engine | All 9 Subjects | Custom React Component Engine + KaTeX + Auto-Grading & Hints | `COMPLETED` | P0 | MCQ, MSQ, Fill-in-blank, Numeric with tolerance grading, streak tracker. Strategy: `Rebuild`. |
| **FEAT-22** | Assessment | Timed Assessment & Auto-Grader | All 9 Subjects | Client State Machine + Tolerance Normalization + Instant Feedback | `COMPLETED` | P0 | Timed exams, question pools, instant rubric grading, floating-point numeric tolerance. Strategy: `Rebuild`. |
| **FEAT-23** | Progress | Learning Analytics & Mastery Matrix | All 9 Subjects | Local State Machine + Streak Tracker + HUD Metrics | `COMPLETED` | P1 | Live streak tracking, score tallying, subject mastery counters, offline resilience. Strategy: `Rebuild`. |
| **FEAT-24** | CMS | Lesson & Assessment Management | All 9 Subjects | Typed Central Question Bank (`src/lib/exercise-bank.ts`) | `COMPLETED` | P1 | Schema validation, type safety, modular subject question banking. Strategy: `Reuse`. |

---

## 2. Subject Matrix Breakdown

| Subject | Total Features | Discovery | Researching | Auditing | Selected | Completed | Completion Rate |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Physics** | 6 | 0 | 0 | 0 | 0 | 6 (FEAT-01, FEAT-03, FEAT-04, FEAT-10, FEAT-15, FEAT-21-24) | **100%** |
| **Chemistry** | 5 | 0 | 0 | 0 | 1 (FEAT-13) | 4 (FEAT-05, FEAT-06, FEAT-11, FEAT-21-24) | **80%** |
| **Biology** | 5 | 0 | 0 | 0 | 3 (FEAT-02, FEAT-08, FEAT-12) | 2 (FEAT-07, FEAT-21-24) | **40%** |
| **Mathematics** | 4 | 0 | 0 | 0 | 1 (FEAT-17) | 3 (FEAT-15, FEAT-16, FEAT-21-24) | **75%** |
| **Computer Science**| 3 | 0 | 0 | 0 | 1 (FEAT-18) | 2 (FEAT-19, FEAT-21-24) | **67%** |
| **Thai Language** | 3 | 0 | 0 | 0 | 1 (FEAT-02) | 2 (FEAT-20, FEAT-21-24) | **67%** |
| **General Science** | 3 | 0 | 0 | 0 | 0 | 3 (FEAT-01, FEAT-03, FEAT-04) | **100%** |
| **Astronomy** | 3 | 0 | 0 | 0 | 2 (FEAT-02, FEAT-09) | 1 (FEAT-03 Symplectic Orbits) | **33%** |
| **English** | 2 | 0 | 0 | 0 | 1 (FEAT-02) | 1 (FEAT-01 Bilingual) | **50%** |

---

## 3. Platform Milestone Status Progression

- **Phase 0**: Workspace Assessment & Next.js 15 App Router Scaffolding [`COMPLETED`]
- **Phase 1**: Requirement Analysis & Functional/Non-Functional Deconstruction [`COMPLETED`]
- **Phase 2**: Open Source Discovery & 23 Repositories Multi-Criteria Scoring [`COMPLETED`]
- **Phase 3**: Deep Technical & License Audit (GPL Clean-Room Isolation Established) [`COMPLETED`]
- **Phase 4**: Empirical Benchmarking (Verlet vs. Euler, Thai Truncation, KaTeX Throughput) [`COMPLETED`]
- **Phase 5**: System Architecture Design & Mathematical Module Specifications [`COMPLETED`]
- **Phase 6**: Source Code Customization & Interactive Core Workbenches [`COMPLETED`]
- **Phase 7**: Feature Development (Periodic Table, Cell Structure, Universal Practice Engine) [`COMPLETED`]
- **Phase 8**: Internal Module Integration (MNA Circuit Simulator, Chemical Stoichiometry, Logic Gates) [`COMPLETED`]
- **Phase 9**: Quality Assurance, Accessibility (WCAG 2.1 AA) & Security Audit (147 tests) [`COMPLETED`]
- **Phase 10**: Production Optimization, PWA & Service Worker Offline Caching (161 tests) [`COMPLETED`]
- **Phase 11**: Release Packaging & Complete Project Documentation Suite [v1.0.0] [`COMPLETED`]
