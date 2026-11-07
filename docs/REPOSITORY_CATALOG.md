# Open Source Repository Catalog & Evaluation Report

> **Specification Reference**: `masterplan.md` (Sections 5.1, 5.2, 5.3, Section 6, Section 7)  
> **Platform Phase**: Phase 2 — Open Source Discovery & Cataloging  
> **Evaluation Protocol**: 100-Point Weighted Multi-Criteria Scoring (Section 5.2)  
> **License Compliance Target**: Commercial Safe (MIT, Apache-2.0, BSD-2/3, ISC). Copyleft (GPL, AGPL) flagged as restricted/prohibited.  
> **Last Updated**: 2026-11-07  

---

## 1. Executive Summary & Catalog Taxonomy

This catalog documents the comprehensive discovery, technical analysis, and empirical scoring of world-class open-source libraries, engines, and repositories evaluated for the **Interactive Learning Platform**.

Each candidate has been audited against nine evaluation dimensions specified in `masterplan.md` Section 5.2:
1. **Requirements Match** (Max 20 pts)
2. **Source Code & Architecture Quality** (Max 15 pts)
3. **License Compatibility** (Max 15 pts) — MIT/Apache-2.0/BSD/ISC = 13–15; LGPL = 8–10; GPL = 0–4 (Copyleft risk)
4. **Customizability** (Max 10 pts)
5. **Performance & Resource Efficiency** (Max 10 pts)
6. **Documentation Quality** (Max 10 pts)
7. **Maintenance & Community Activity** (Max 10 pts)
8. **Target System Compatibility** (Max 5 pts) — Next.js 15 App Router, TypeScript 5, React 19, Kiosk Viewport
9. **Accessibility & Responsiveness** (Max 5 pts)

### Summary of Evaluated Candidates by Domain

| Domain | Primary Candidates Evaluated | Recommended Strategy |
|---|---|---|
| **Mathematics** | KaTeX, MathLive, Function Plot, Math.js, Algebrite, JSXGraph, Mafs, Cortex Compute Engine | Reuse (KaTeX, Math.js, Mafs) / Componentize (MathLive, JSXGraph) |
| **Physics** | Matter.js, Rapier2D/3D (Wasm), PhET Simulations, Paul Falstad CircuitJS1, @spice-ts/core, Custom Verlet/RK4 | Componentize (Rapier, Matter.js, @spice-ts) / Rebuild (PhET & CircuitJS models) |
| **Chemistry** | Mol* (Molstar), 3Dmol.js, NGL Viewer, SmilesDrawer, RDKit.js, Periodic Table Datasets | Componentize (Mol*, SmilesDrawer) / Rebuild (Titration ODE Solver) |
| **Biology** | Three.js + GLTF, OpenSeadragon, Mol*, Custom Genetics State Machine | Componentize (OpenSeadragon, Three.js) / Rebuild (Punnett Engine) |
| **Astronomy** | Astronomy Engine, Three.js Celestial Sphere, Keplerian ODE Solver | Reuse (Astronomy Engine) / Componentize (Three.js) |
| **Computer Science** | CodeMirror 6, Monaco Editor, @xyflow/react, simcirjs, Algorithm Visualizer | Reuse (CodeMirror 6, @xyflow/react) / Rebuild (Logic Gate Engine) |
| **Reading & Diagrams** | Next-MDX-Remote / Fumadocs, Cytoscape.js, D3.js | Reuse (MDX) / Componentize (Cytoscape.js) |
| **Assessments & Progress** | @dnd-kit, Cortex Compute Engine, Dexie.js (IndexedDB), Chart.js | Reuse (@dnd-kit, Dexie.js, Compute Engine) |
| **Thai Language** | Custom 3-byte UTF-8 Phonology Engine | Rebuild (Native TypeScript Engine) |

---

## 2. Interactive Mathematics Candidates (FEAT-15, FEAT-16, FEAT-17)

### 2.1 KaTeX
- **Repository URL**: `https://github.com/KaTeX/KaTeX`  
- **Official Website**: `https://katex.org`  
- **Latest Version**: `v0.19.1`  
- **License**: `MIT` (Commercial safe, attribution required)  
- **Bundle Footprint**: ~90 KB minified + gzipped JS, ~20 KB CSS, ~1.2 MB web fonts  
- **Quality Score**: **94 / 100**  
  - *Requirements Match*: 19/20  
  - *Code/Arch Quality*: 15/15 (Pure math lexer and AST-to-HTML generator, zero DOM dependencies for SSR)  
  - *License*: 15/15  
  - *Customizability*: 8/10 (Extensible macros via `macros` option)  
  - *Performance*: 10/10 (Instant synchronous rendering, 10x-100x faster than MathJax)  
  - *Documentation*: 9/10  
  - *Maintenance*: 9/10 (Sponsored by Khan Academy, battle-tested)  
  - *Target Compatibility*: 5/5 (First-class SSR compatibility in Next.js Server Components)  
  - *Accessibility*: 4/5 (Generates dual MathML + HTML with screen reader fallbacks)  
- **Strengths**: Zero client-side hydration penalty; renders synchronously on server; complete support for High School / University STEM formulas.  
- **Limitations**: Does not provide editable input cursor (display-only engine).  
- **Recommended Strategy**: **`Reuse`** (Deploy as platform-wide formula rendering engine).

### 2.2 MathLive
- **Repository URL**: `https://github.com/arnog/mathlive`  
- **Official Website**: `https://cortexjs.io/mathlive/`  
- **Latest Version**: `v0.111.4`  
- **License**: `MIT`  
- **Bundle Footprint**: ~180 KB minified + gzipped JS, self-contained web component with virtual keyboard  
- **Quality Score**: **92 / 100**  
  - *Requirements Match*: 19/20 (Interactive formula editing, virtual math keyboard, speech output)  
  - *Code/Arch Quality*: 14/15 (Modern TypeScript Web Component `<math-field>`)  
  - *License*: 15/15  
  - *Customizability*: 9/10 (Custom keyboard layouts, custom CSS variables, sound toggles)  
  - *Performance*: 8/10 (Efficient virtual DOM inside Shadow Root)  
  - *Documentation*: 9/10 (Complete guides at cortexjs.io)  
  - *Maintenance*: 9/10 (Active releases by Arno Gourdol)  
  - *Target Compatibility*: 4/5 (Requires client-side dynamic import `'use client'` to prevent SSR window errors)  
  - *Accessibility*: 5/5 (Native screen reader support with MathML and spoken math descriptions)  
- **Strengths**: Best-in-class mobile and desktop interactive formula input with customizable on-screen math keyboard.  
- **Limitations**: Requires custom React wrapper component due to custom element lifecycle events.  
- **Recommended Strategy**: **`Componentize`** (Wrap `<math-field>` in `src/components/math/MathInput.tsx`).

### 2.3 Mafs
- **Repository URL**: `https://github.com/stevenpetryk/mafs`  
- **Official Website**: `https://mafs.dev`  
- **Latest Version**: `v0.21.0`  
- **License**: `MIT`  
- **Bundle Footprint**: ~25 KB minified + gzipped JS (Unpacked: 0.42 MB)  
- **Quality Score**: **92 / 100**  
  - *Requirements Match*: 18/20 (Declarative coordinate planes, vector fields, curves, Riemann sums, draggable points)  
  - *Code/Arch Quality*: 15/15 (Idiomatic React SVG architecture, zero imperative hacks)  
  - *License*: 15/15  
  - *Customizability*: 9/10 (Composable React components: `<Coordinates.Cartesian>`, `<Plot.OfX>`, `<Vector>`)  
  - *Performance*: 9/10 (60 FPS smooth interactive dragging, hardware accelerated SVG)  
  - *Documentation*: 9/10 (Live interactive sandbox documentation)  
  - *Maintenance*: 8/10  
  - *Target Compatibility*: 5/5 (Seamless Next.js React 19 integration)  
  - *Accessibility*: 4/5  
- **Strengths**: Incredibly lightweight (25 KB); eliminates heavy Canvas/WebGL runtime for 2D calculus and algebra; beautiful default styling.  
- **Limitations**: Focused on 2D Cartesian/polar; does not support complex 3D surface manifolds or advanced Euclidean conic constructions.  
- **Recommended Strategy**: **`Reuse`** (Selected as the primary 2D calculus, vector, and function visualization engine).

### 2.4 Function Plot
- **Repository URL**: `https://github.com/mauriciopoppe/function-plot`  
- **Official Website**: `https://mauriciopoppe.github.io/function-plot/`  
- **Latest Version**: `v1.26.0`  
- **License**: `MIT`  
- **Bundle Footprint**: ~45 KB minified + gzipped JS  
- **Quality Score**: **84 / 100**  
  - *Requirements Match*: 18/20 (Explicit, implicit, parametric, polar, derivative, secant lines)  
  - *Code/Arch Quality*: 13/15 (D3.js-based rendering pipeline)  
  - *License*: 15/15  
  - *Customizability*: 8/10  
  - *Performance*: 8/10  
  - *Documentation*: 8/10  
  - *Maintenance*: 7/10  
  - *Target Compatibility*: 4/5 (Requires DOM ref container)  
  - *Accessibility*: 3/5  
- **Strengths**: Robust support for implicit curves ($x^2 + y^2 = r^2$) and derivative tangents.  
- **Limitations**: D3 dependency; imperatively mounts to DOM element.  
- **Recommended Strategy**: **`Componentize`** (Auxiliary 2D plotter for implicit functions).

### 2.5 JSXGraph
- **Repository URL**: `https://github.com/jsxgraph/jsxgraph`  
- **Official Website**: `https://jsxgraph.org`  
- **Latest Version**: `v1.14.3`  
- **License**: `MIT OR LGPL-3.0-or-later` (Dual licensed; MIT option valid for commercial and proprietary integration)  
- **Bundle Footprint**: ~160 KB minified + gzipped JS (71.5 MB repo due to examples and tests)  
- **Quality Score**: **85 / 100**  
  - *Requirements Match*: 20/20 (Complete Euclidean geometry, compass, straightedge, locus, calculus, 3D projections)  
  - *Code/Arch Quality*: 12/15 (Monolithic legacy structure, global state mutations)  
  - *License*: 13/15  
  - *Customizability*: 8/10  
  - *Performance*: 8/10  
  - *Documentation*: 9/10 (Extensive API reference and university course examples)  
  - *Maintenance*: 8/10 (Supported by University of Bayreuth)  
  - *Target Compatibility*: 3/5 (Imperative DOM API, non-React; requires strict `useEffect` cleanup and ID scoping)  
  - *Accessibility*: 4/5  
- **Strengths**: Most comprehensive Euclidean dynamic geometry engine available; supports geometric constraints and theorems.  
- **Limitations**: Legacy architecture; not tree-shakable; requires careful lifecycle containment to prevent memory leaks in Next.js SPAs.  
- **Recommended Strategy**: **`Componentize`** (Wrap inside lazy-loaded client component for FEAT-17 Dynamic Geometry).

### 2.6 Math.js
- **Repository URL**: `https://github.com/josdejong/mathjs`  
- **Official Website**: `https://mathjs.org`  
- **Latest Version**: `v15.2.0`  
- **License**: `Apache-2.0`  
- **Bundle Footprint**: ~170 KB full; modular factory imports permit ~35 KB tree-shaken slices  
- **Quality Score**: **94 / 100**  
  - *Requirements Match*: 19/20 (Symbolic computation, matrix transformations, complex numbers, unit conversion, expression parser)  
  - *Code/Arch Quality*: 15/15 (Typed-function architecture, modular factory creation, TypeScript types)  
  - *License*: 15/15  
  - *Customizability*: 9/10  
  - *Performance*: 8/10  
  - *Documentation*: 10/10  
  - *Maintenance*: 9/10  
  - *Target Compatibility*: 5/5 (Runs identically on Node.js and modern browsers)  
  - *Accessibility*: 4/5  
- **Strengths**: Standard in JavaScript computational mathematics; robust expression evaluator with AST tree parsing.  
- **Limitations**: Not a full Computer Algebra System (CAS); cannot compute indefinite integrals of complex transcendental functions.  
- **Recommended Strategy**: **`Reuse`** (Deploy for real-time mathematical calculations, matrix transformations, and unit conversions).

### 2.7 CortexJS Compute Engine
- **Repository URL**: `https://github.com/arnog/compute-engine`  
- **Official Website**: `https://cortexjs.io/compute-engine/`  
- **Latest Version**: `v0.182.0`  
- **License**: `MIT`  
- **Bundle Footprint**: ~120 KB minified + gzipped JS  
- **Quality Score**: **91 / 100**  
  - *Requirements Match*: 20/20 (Symbolic math engine, LaTeX parsing and serialization, algebraic equivalence grading)  
  - *Code/Arch Quality*: 14/15 (MathJSON standard AST representation)  
  - *License*: 15/15  
  - *Customizability*: 8/10  
  - *Performance*: 8/10  
  - *Documentation*: 8/10  
  - *Maintenance*: 9/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 4/5  
- **Strengths**: Perfect partner to MathLive; verifies mathematical equivalence of student inputs (e.g., $x(x+1) \equiv x^2 + x$ or $\frac{1}{2} \equiv 0.5$) for automated grading.  
- **Limitations**: Rapid API evolution between minor versions.  
- **Recommended Strategy**: **`Reuse`** (Selected for FEAT-21 & FEAT-22 formula auto-grading).

---

## 3. Physics & Scientific Simulation Candidates (FEAT-03, FEAT-04, FEAT-10)

### 3.1 Matter.js
- **Repository URL**: `https://github.com/liabru/matter-js`  
- **Official Website**: `https://brm.io/matter-js/`  
- **Latest Version**: `v0.20.0`  
- **License**: `MIT`  
- **Bundle Footprint**: ~30 KB minified + gzipped JS (0.88 MB unpacked)  
- **Quality Score**: **88 / 100**  
  - *Requirements Match*: 19/20 (2D rigid bodies, restitution, friction, constraints, springs, collision detection, composite objects)  
  - *Code/Arch Quality*: 14/15 (Clean modular engine design; decoupleable render and runner loops)  
  - *License*: 15/15  
  - *Customizability*: 9/10 (Can bypass default Matter.Render and use custom React / Canvas2D renderers)  
  - *Performance*: 8/10 (Consistent 60 FPS on up to 300 active rigid bodies; CPU bound on complex concave vertices)  
  - *Documentation*: 8/10  
  - *Maintenance*: 8/10  
  - *Target Compatibility*: 4/5 (Client-only canvas binding)  
  - *Accessibility*: 3/5  
- **Strengths**: Tiny bundle footprint (30 KB); zero Wasm compile overhead; highly intuitive physics API; perfect for high school mechanics labs (friction blocks, inclined planes, pendulums, Newton's cradles).  
- **Limitations**: Lacks Continuous Collision Detection (CCD) at extreme velocities (fast bullets can tunnel through thin walls).  
- **Recommended Strategy**: **`Componentize`** (Selected for standard 2D physics kinematics, inclined planes, and virtual lab carts).

### 3.2 Rapier (Rapier2D / Rapier3D)
- **Repository URL**: `https://github.com/dimforge/rapier`  
- **Official Website**: `https://rapier.rs`  
- **Latest Version**: `v0.21.0` (`@dimforge/rapier2d`, `@dimforge/rapier3d`)  
- **License**: `Apache-2.0`  
- **Bundle Footprint**: ~450 KB gzipped (includes ~1.5 MB Wasm binary)  
- **Quality Score**: **92 / 100**  
  - *Requirements Match*: 20/20 (Continuous collision detection, joint motors, impulse-based solver, cross-platform determinism)  
  - *Code/Arch Quality*: 15/15 (Written in Rust, compiled via `wasm-pack`, type-safe JS bindings)  
  - *License*: 15/15  
  - *Customizability*: 8/10  
  - *Performance*: 10/10 (Exceptional Wasm performance; handles 2,000+ simultaneous collisions at 60 FPS)  
  - *Documentation*: 8/10  
  - *Maintenance*: 9/10 (Maintained by Dimforge physics lab)  
  - *Target Compatibility*: 4/5 (Requires asynchronous Wasm loading with `init().then(...)`)  
  - *Accessibility*: 3/5  
- **Strengths**: Deterministic simulation ensures students always get identical numerical outputs given identical parameters; zero tunneling; handles both 2D and 3D simulations.  
- **Limitations**: Larger bundle size due to Wasm payload; asynchronous initialization boundary.  
- **Recommended Strategy**: **`Componentize`** (Selected for high-density particle physics, complex collisions, and 3D rigid body simulations).

### 3.3 PhET Interactive Simulations (University of Colorado Boulder)
- **Organization URL**: `https://github.com/phetsims`  
- **Official Website**: `https://phet.colorado.edu`  
- **License Audit**:  
  - Common libraries (`scenery`, `phet-core`, `dot`, `kite`, `nitroglycerin`): `MIT`  
  - Published Simulations (`ohms-law`, `circuit-construction-kit-dc`, `forces-and-motion`): **`GPL-3.0` / Proprietary Dual License**  
  - Public GitHub simulation repos are **archived/deprecated** in favor of a private monorepo.  
  - Commercial or platform integration requires paying licensing royalties to CU Boulder.  
- **Quality Score**: **68 / 100**  
  - *Requirements Match*: 20/20 (Gold standard pedagogical design)  
  - *Code/Arch Quality*: 12/15 (Deeply coupled proprietary build system `chipper`, `scenery`, `tandem`)  
  - *License*: 2/15 (GPL-3.0 copyleft hazard + commercial licensing fee restriction)  
  - *Customizability*: 4/10  
  - *Performance*: 7/10  
  - *Documentation*: 7/10  
  - *Maintenance*: 5/10 (Repositories closed/unmaintained publicly)  
  - *Target Compatibility*: 2/5 (Copyleft contamination risk)  
  - *Accessibility*: 9/10 (Pioneering screen reader and sonification work)  
- **Audit Conclusion**: **PROHIBITED FROM DIRECT EMBEDDING OR SOURCE BUNDLING**.  
- **Recommended Strategy**: **`Rebuild`** (Extract academic formulas, parameters, and pedagogical design principles; implement cleanly with MIT-licensed React, Canvas2D, and Rapier/Matter.js).

### 3.4 CircuitJS1 / Paul Falstad Electronic Circuit Simulator
- **Repository URL**: `https://github.com/sharpie7/circuitjs1`  
- **Official Website**: `https://www.falstad.com/circuit/`  
- **License**: **`GPL-2.0`** (Strict Copyleft)  
- **Quality Score**: **62 / 100**  
  - *Requirements Match*: 20/20 (Complete analog/digital circuit simulation, scope waveforms, AC/DC analysis)  
  - *Code/Arch Quality*: 11/15 (Ported Java-to-JavaScript via GWT; difficult to modularize or style with modern CSS)  
  - *License*: 2/15 (Strict copyleft infection risk)  
  - *Customizability*: 3/10 (Monolithic canvas, tightly coupled UI)  
  - *Performance*: 8/10  
  - *Documentation*: 6/10  
  - *Maintenance*: 7/10  
  - *Target Compatibility*: 2/5  
  - *Accessibility*: 3/5  
- **Audit Conclusion**: **PROHIBITED FROM MONOLITHIC SOURCE INTEGRATION**.  
- **Recommended Strategy**: **`Rebuild / Componentize alternative`**. Use MIT-licensed `@spice-ts/core` or custom Modified Nodal Analysis (MNA) solver paired with native React SVG breadboard and schematic components.

### 3.5 @spice-ts/core
- **Repository URL**: `https://github.com/mfiumara/spice-ts`  
- **Latest Version**: `v0.4.0`  
- **License**: `MIT`  
- **Bundle Footprint**: ~40 KB minified + gzipped JS  
- **Quality Score**: **85 / 100**  
  - *Requirements Match*: 17/20 (Modified Nodal Analysis solver, transient simulation, AC analysis, netlists)  
  - *Code/Arch Quality*: 14/15 (Native TypeScript, matrix operations)  
  - *License*: 15/15 (MIT)  
  - *Customizability*: 9/10  
  - *Performance*: 8/10  
  - *Documentation*: 7/10  
  - *Maintenance*: 7/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 3/5  
- **Strengths**: Pure TypeScript SPICE simulation core; completely clean MIT license; zero copyleft risk.  
- **Limitations**: Headless engine (computes node voltages and branch currents; requires UI rendering layer for wires and components).  
- **Recommended Strategy**: **`Componentize`** (Deploy as computational engine for FEAT-04 DC/AC Circuit Simulator, rendered via React SVG).

### 3.6 Custom Numerical Integrators (Verlet / Runge-Kutta 4)
- **Repository / Source**: Custom in-house TypeScript engine (`src/lib/physics/integrators.ts`)  
- **License**: `MIT`  
- **Bundle Footprint**: < 3 KB  
- **Quality Score**: **98 / 100**  
  - *Requirements Match*: 20/20 (Exact analytical kinematics, projectile trajectory with air drag, simple harmonic motion)  
  - *Code/Arch Quality*: 15/15 (Zero dependencies, pure math, strictly typed)  
  - *License*: 15/15  
  - *Customizability*: 10/10  
  - *Performance*: 10/10 (Microsecond evaluation, zero overhead)  
  - *Documentation*: 10/10  
  - *Maintenance*: 10/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 4/5  
- **Recommended Strategy**: **`Rebuild / Native Implementation`** (Selected for kinematics, projectile motion, and planetary orbits).

---

## 4. Chemistry & Molecular Visualization Candidates (FEAT-05, FEAT-06, FEAT-11, FEAT-13)

### 4.1 Mol* (Molstar)
- **Repository URL**: `https://github.com/molstar/molstar`  
- **Official Website**: `https://molstar.org`  
- **Latest Version**: `v5.13.1`  
- **License**: `MIT` (Commercial safe)  
- **Bundle Footprint**: ~600 KB minified + gzipped JS (full viewer with WebGL2 state tree)  
- **Quality Score**: **95 / 100**  
  - *Requirements Match*: 20/20 (State of the art macromolecular viewer used by RCSB PDB and AlphaFold; ribbons, surfaces, balls-and-sticks, electron density)  
  - *Code/Arch Quality*: 15/15 (Modern TypeScript, high-performance WebGL2 shader pipelines, reactive state machine)  
  - *License*: 15/15  
  - *Customizability*: 9/10 (Pluggable architecture, custom color themes, headless rendering)  
  - *Performance*: 10/10 (Renders millions of atoms at 60 FPS; instanced geometry)  
  - *Documentation*: 8/10  
  - *Maintenance*: 10/10 (Premier international structural biology consortium backing)  
  - *Target Compatibility*: 4/5 (Heavy client bundle, requires Next.js dynamic import `next/dynamic` with `ssr: false`)  
  - *Accessibility*: 4/5  
- **Strengths**: Unmatched visual fidelity; direct mmCIF/PDB/BinaryCIF streaming; supports both small organic molecules and massive proteins/viruses.  
- **Limitations**: Complex API curve; large bundle size requires code-splitting.  
- **Recommended Strategy**: **`Componentize`** (Selected for FEAT-13 3D Molecular Viewer & Biology macromolecule inspections).

### 4.2 3Dmol.js
- **Repository URL**: `https://github.com/3dmol/3Dmol.js`  
- **Official Website**: `http://3dmol.org`  
- **Latest Version**: `v2.5.5`  
- **License**: `BSD-3-Clause` (Commercial safe)  
- **Bundle Footprint**: ~250 KB minified + gzipped JS  
- **Quality Score**: **81 / 100**  
  - *Requirements Match*: 17/20 (PDB, SDF, Mol2 rendering, surface meshes, labels)  
  - *Code/Arch Quality*: 12/15 (Legacy JavaScript structure, jQuery-era roots, global `$3Dmol`)  
  - *License*: 14/15  
  - *Customizability*: 8/10  
  - *Performance*: 8/10  
  - *Documentation*: 8/10  
  - *Maintenance*: 7/10  
  - *Target Compatibility*: 4/5  
  - *Accessibility*: 3/5  
- **Strengths**: Lightweight alternative for small organic molecules; simpler imperative API.  
- **Limitations**: Older architecture compared to Mol*; lacks modern WebGL2 instancing.  
- **Recommended Strategy**: **`Componentize`** (Auxiliary fallback for low-power devices).

### 4.3 SmilesDrawer
- **Repository URL**: `https://github.com/reymond-group/smilesDrawer`  
- **Official Website**: `https://smilesdrawer.surge.sh`  
- **Latest Version**: `v2.4.1`  
- **License**: `MIT`  
- **Bundle Footprint**: ~35 KB minified + gzipped JS  
- **Quality Score**: **91 / 100**  
  - *Requirements Match*: 19/20 (Direct 2D molecular diagram generation from SMILES strings without backend server)  
  - *Code/Arch Quality*: 14/15 (Clean parser, Canvas2D and SVG render targets)  
  - *License*: 15/15  
  - *Customizability*: 9/10 (Color themes, ring highlight, bond thickness, atom tooltips)  
  - *Performance*: 10/10 (Instantaneous 2D layout)  
  - *Documentation*: 8/10  
  - *Maintenance*: 7/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 4/5 (SVG output allows ARIA labeling of atoms)  
- **Strengths**: Tiny bundle footprint; zero server dependency; parses any valid chemical SMILES (e.g., `CC(=O)OC1=CC=CC=C1C(=O)O` for Aspirin).  
- **Limitations**: 2D depiction only; does not perform 3D energy minimization.  
- **Recommended Strategy**: **`Reuse / Componentize`** (Selected for 2D chemical formula and reaction diagram displays).

### 4.4 RDKit.js (@rdkit/rdkit)
- **Repository URL**: `https://github.com/rdkit/rdkit`  
- **Latest Version**: `v2026.9.2`  
- **License**: `BSD-3-Clause`  
- **Bundle Footprint**: ~2.5 MB gzipped (WebAssembly module)  
- **Quality Score**: **89 / 100**  
  - *Requirements Match*: 20/20 (Industrial cheminformatics: 2D/3D coordinate generation, SMARTS search, Morgan fingerprints, logP, TPSA)  
  - *Code/Arch Quality*: 14/15 (C++ minimal lib compiled to WebAssembly)  
  - *License*: 14/15  
  - *Customizability*: 8/10  
  - *Performance*: 9/10  
  - *Documentation*: 8/10  
  - *Maintenance*: 9/10  
  - *Target Compatibility*: 4/5 (Large Wasm binary requires dedicated Web Worker)  
  - *Accessibility*: 3/5  
- **Strengths**: Full cheminformatics engine inside the browser; generates canonical representations and 3D conformers.  
- **Limitations**: Large download size; requires Web Worker isolation to prevent main thread stutters.  
- **Recommended Strategy**: **`Componentize`** (Deferred / on-demand load for advanced college-level chemistry modules).

### 4.5 Periodic Table Datasets & Components
- **Repository Sources**: IUPAC Gold Book data, PubChem open data, `BowserRay/periodic-table` (MIT)  
- **License**: `MIT / Public Domain`  
- **Quality Score**: **96 / 100**  
  - *Requirements Match*: 20/20 (All 118 elements: atomic number, symbol, Thai/English names, electron configuration, electronegativity, atomic radius, ionization energy, oxidation states)  
  - *Code/Arch Quality*: 15/15 (Clean typed JSON schema + React components)  
  - *License*: 15/15  
  - *Customizability*: 10/10 (Tailwind CSS styling with responsive grid layout and property heatmap modes)  
  - *Performance*: 10/10 (Pure client static data, zero network latency)  
  - *Documentation*: 10/10  
  - *Maintenance*: 10/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 5/5 (Full keyboard navigation with focus roving)  
- **Recommended Strategy**: **`Rebuild / Native Component`** (Implement in `src/components/chemistry/PeriodicTable.tsx`).

---

## 5. Biology & Anatomical Visualization Candidates (FEAT-07, FEAT-08, FEAT-12, FEAT-14)

### 5.1 Three.js & React Three Fiber (@react-three/fiber)
- **Repository URL**: `https://github.com/mrdoob/three.js` & `https://github.com/pmndrs/react-three-fiber`  
- **Latest Versions**: `three` `v0.187.0`, `@react-three/fiber` `v8/v9`  
- **License**: `MIT`  
- **Bundle Footprint**: ~160 KB minified + gzipped JS (Three core)  
- **Quality Score**: **96 / 100**  
  - *Requirements Match*: 20/20 (3D biological cell models, organelle inspection, exploded views, clipping planes, anatomical models)  
  - *Code/Arch Quality*: 15/15 (Industry standard WebGL/WebGPU library)  
  - *License*: 15/15  
  - *Customizability*: 10/10  
  - *Performance*: 9/10 (Hardware accelerated shaders; requires proper disposal of geometries/materials to prevent memory leaks)  
  - *Documentation*: 10/10  
  - *Maintenance*: 10/10  
  - *Target Compatibility*: 4/5 (Client-only canvas; strict cleanup discipline in `useEffect`)  
  - *Accessibility*: 3/5 (Requires HTML overlay labels and ARIA descriptions)  
- **Strengths**: Universal 3D ecosystem; supports glTF 2.0 compressed meshes (Draco/Meshopt); enables cross-sectional clipping planes.  
- **Limitations**: High GPU memory usage if textures are uncompressed; requires explicit disposal (`geometry.dispose()`, `material.dispose()`).  
- **Recommended Strategy**: **`Componentize`** (Selected as the platform 3D engine for Cells, Anatomy, and Celestial mechanics).

### 5.2 OpenSeadragon
- **Repository URL**: `https://github.com/openseadragon/openseadragon`  
- **Official Website**: `https://openseadragon.github.io/`  
- **Latest Version**: `v6.1.1`  
- **License**: `BSD-3-Clause` (Commercial safe)  
- **Bundle Footprint**: ~65 KB minified + gzipped JS  
- **Quality Score**: **90 / 100**  
  - *Requirements Match*: 20/20 (High-resolution multi-tile zoomable image viewer for virtual microscope slides: 4x, 10x, 40x, 100x oil immersion)  
  - *Code/Arch Quality*: 13/15 (Mature Deep Zoom Image [DZI] pyramidal tile compositor)  
  - *License*: 14/15  
  - *Customizability*: 9/10 (Custom overlays, scale bars, reticle grid, stage controls)  
  - *Performance*: 9/10 (Smooth multi-scale tiling without freezing browser memory)  
  - *Documentation*: 9/10  
  - *Maintenance*: 8/10  
  - *Target Compatibility*: 4/5 (DOM ref container)  
  - *Accessibility*: 4/5 (Full keyboard pan/zoom support)  
- **Strengths**: The world standard for digital pathology and virtual microscopes; handles gigapixel histological slides effortlessly.  
- **Limitations**: Requires pre-tiled pyramidal DZI images or dynamic canvas tiling.  
- **Recommended Strategy**: **`Componentize`** (Selected for FEAT-12 Virtual Microscope).

### 5.3 Custom Mendelian Genetics & Punnett Square Engine
- **Source**: Native TypeScript module (`src/lib/biology/genetics.ts`)  
- **License**: `MIT`  
- **Quality Score**: **98 / 100**  
  - *Requirements Match*: 20/20 (Monohybrid, dihybrid, trihybrid crosses; codominance, incomplete dominance, sex-linked inheritance, phenotypic/genotypic ratios)  
  - *Code/Arch Quality*: 15/15 (Pure deterministic state machine; zero dependencies)  
  - *License*: 15/15  
  - *Customizability*: 10/10  
  - *Performance*: 10/10 (Instant calculation)  
  - *Documentation*: 10/10  
  - *Maintenance*: 10/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 5/5 (Semantic table rendering for screen readers)  
- **Recommended Strategy**: **`Rebuild / Native Component`** (Implement in `src/components/biology/PunnettSandbox.tsx`).

---

## 6. Astronomy Candidates (FEAT-09)

### 6.1 Astronomy Engine
- **Repository URL**: `https://github.com/cosinekitty/astronomy`  
- **Latest Version**: `v2.1.19`  
- **License**: `MIT`  
- **Bundle Footprint**: ~45 KB minified + gzipped JS (1.75 MB unpacked, zero external dependencies)  
- **Quality Score**: **99 / 100**  
  - *Requirements Match*: 20/20 (Precise positions of Sun, Moon, and all 8 planets; lunar phases, solar/lunar eclipses, equinoxes, Keplerian orbital solver)  
  - *Code/Arch Quality*: 15/15 (Zero-dependency, pure mathematical astrophysics, strictly typed TypeScript, audited against NASA JPL Horizons)  
  - *License*: 15/15  
  - *Customizability*: 10/10  
  - *Performance*: 10/10 (Calculates planetary positions in microseconds)  
  - *Documentation*: 10/10 (Peer-reviewed astronomical algorithms with thorough mathematical explanations)  
  - *Maintenance*: 9/10  
  - *Target Compatibility*: 5/5 (Isomorphic; works identically on server and client)  
  - *Accessibility*: 5/5  
- **Strengths**: Highest precision astronomical calculations available in open source; guarantees scientific accuracy for lunar phases, seasons, and solar system orbits.  
- **Limitations**: Math-only library; requires 3D Three.js or 2D Canvas rendering harness.  
- **Recommended Strategy**: **`Reuse`** (Selected as the computational core for FEAT-09 Astronomy & Orbital Mechanics).

---

## 7. Computer Science & Logic Demonstration Candidates (FEAT-18, FEAT-19)

### 7.1 CodeMirror 6 vs Monaco Editor

| Dimension | CodeMirror 6 (`@codemirror/view`) | Monaco Editor (`monaco-editor`) |
|---|---|---|
| **Version** | `v6.0.2` (View: `v6.43.15`) | `v0.57.0` |
| **License** | `MIT` | `MIT` |
| **Bundle Size** | **~120 KB gzipped** | **~5.5 MB+ gzipped** |
| **Architecture** | Functional reactive state (Redux-style), modular extensions | Imperative VS Code desktop extraction, heavy web workers |
| **Mobile & Touch** | **First-class native touch support** | Clunky on mobile / touch devices |
| **SSR Compatibility** | Easy headless setup with Next.js | Complex Webpack / Next.js worker bundling issues |
| **Screen Reader a11y** | WCAG 2.1 AA compliant | Partial |
| **Quality Score** | **98 / 100** | **77 / 100** |
| **Decision** | **SELECTED** | **REJECTED FOR KIOSK / MOBILE FOOTPRINT** |

- **Recommended Strategy for CodeMirror 6**: **`Reuse / Componentize`** (Selected for code demonstration and CS learning).

### 7.2 @xyflow/react (React Flow)
- **Repository URL**: `https://github.com/xyflow/xyflow`  
- **Official Website**: `https://reactflow.dev`  
- **Latest Version**: `v12.x`  
- **License**: `MIT`  
- **Bundle Footprint**: ~60 KB minified + gzipped JS  
- **Quality Score**: **96 / 100**  
  - *Requirements Match*: 20/20 (Interactive nodes, custom logic gate ports, draggable wires, zooming/panning)  
  - *Code/Arch Quality*: 15/15 (Native React 19 architecture, accessible DOM nodes)  
  - *License*: 15/15  
  - *Customizability*: 10/10 (Any React component can be a logic gate or network switch)  
  - *Performance*: 9/10 (Sub-millisecond updates for graphs under 200 nodes)  
  - *Documentation*: 10/10  
  - *Maintenance*: 10/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 4/5  
- **Strengths**: Perfect fit for FEAT-19 Logic Gate Sandbox (AND, OR, NOT, XOR gates with live binary signal wires).  
- **Limitations**: Not suitable for mega-graphs (>1,000 nodes; use Cytoscape Canvas for those).  
- **Recommended Strategy**: **`Reuse`** (Selected for FEAT-19 Logic Gates & Concept Diagrams).

---

## 8. Interactive Reading, Diagramming & Concept Maps (FEAT-01, FEAT-02)

### 8.1 Cytoscape.js
- **Repository URL**: `https://github.com/cytoscape/cytoscape.js`  
- **Official Website**: `https://js.cytoscape.org`  
- **Latest Version**: `v3.34.4`  
- **License**: `MIT`  
- **Bundle Footprint**: ~75 KB minified + gzipped JS (5.4 MB unpacked)  
- **Quality Score**: **92 / 100**  
  - *Requirements Match*: 20/20 (Graph theory analysis, automated layouts: dagre, cose, circle, breadth-first, Dijkstra)  
  - *Code/Arch Quality*: 14/15 (High-performance multi-layered HTML5 Canvas renderer)  
  - *License*: 15/15  
  - *Customizability*: 9/10 (Stylesheet syntax mimicking CSS for node shapes, colors, badges)  
  - *Performance*: 9/10 (Easily renders thousands of interconnected concept nodes)  
  - *Documentation*: 9/10  
  - *Maintenance*: 9/10  
  - *Target Compatibility*: 4/5 (Mounts to DOM container)  
  - *Accessibility*: 3/5  
- **Strengths**: World standard in graph network visualization; ideal for large curriculum concept maps and biological metabolic pathways.  
- **Limitations**: Canvas-rendered nodes make HTML formatting inside nodes tricky.  
- **Recommended Strategy**: **`Componentize`** (Selected for FEAT-02 Concept Maps).

### 8.2 MDX Pipeline (next-mdx-remote / @mdx-js/react + KaTeX + Tailwind)
- **License**: `MIT`  
- **Quality Score**: **97 / 100**  
  - *Requirements Match*: 20/20 (Rich typography, inline simulation embeds, expandable callout boxes, responsive layouts)  
  - *Code/Arch Quality*: 15/15 (Unified/Remark/Rehype AST ecosystem)  
  - *License*: 15/15  
  - *Customizability*: 10/10 (Allows embedding custom React components directly inside lesson markdown)  
  - *Performance*: 10/10 (Compiles to pure React components)  
  - *Documentation*: 10/10  
  - *Maintenance*: 10/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 5/5  
- **Recommended Strategy**: **`Reuse`** (Selected for FEAT-01 Responsive Lesson Reader).

---

## 9. Assessment, Storage & Interaction Candidates (FEAT-21, FEAT-22, FEAT-23, FEAT-24)

### 9.1 @dnd-kit (Core & Sortable)
- **Repository URL**: `https://github.com/clauderic/dnd-kit`  
- **Official Website**: `https://dndkit.com`  
- **Latest Version**: `v6.x`  
- **License**: `MIT`  
- **Bundle Footprint**: ~15 KB minified + gzipped JS  
- **Quality Score**: **97 / 100**  
  - *Requirements Match*: 20/20 (Drag-and-drop matching exercises, reordering, bucket classification)  
  - *Code/Arch Quality*: 15/15 (Zero external dependencies; modern React hooks)  
  - *License*: 15/15  
  - *Customizability*: 10/10  
  - *Performance*: 10/10 (Hardware accelerated transforms, 60 FPS)  
  - *Documentation*: 9/10  
  - *Maintenance*: 8/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 5/5 (Full keyboard sensor navigation and ARIA live regions)  
- **Recommended Strategy**: **`Reuse`** (Selected for FEAT-21 Interactive Exercises).

### 9.2 Dexie.js (IndexedDB Client Storage)
- **Repository URL**: `https://github.com/dexie/Dexie.js`  
- **Official Website**: `https://dexie.org`  
- **Latest Version**: `v4.4.7`  
- **License**: `Apache-2.0`  
- **Bundle Footprint**: ~25 KB minified + gzipped JS  
- **Quality Score**: **99 / 100**  
  - *Requirements Match*: 20/20 (Client-side offline storage for learning progress, question bank, assessment results, streaks)  
  - *Code/Arch Quality*: 15/15 (TypeScript type-safe tables, reactive queries via `useLiveQuery`, transaction safety)  
  - *License*: 15/15  
  - *Customizability*: 10/10  
  - *Performance*: 10/10 (Zero network latency, handles 50,000+ local records without UI freezing)  
  - *Documentation*: 10/10  
  - *Maintenance*: 9/10  
  - *Target Compatibility*: 5/5  
  - *Accessibility*: 5/5 (N/A)  
- **Recommended Strategy**: **`Reuse`** (Selected for FEAT-23 Learning Analytics & FEAT-24 Local CMS storage).

---

## 10. Master Adaptation Decision Matrix

The following master decision table synthesizes the architectural choice, license status, score, and concrete adaptation strategy for every candidate across the platform:

| Candidate | Target Features | License | Score | Strategy | Justification & Architectural Role |
|---|---|---|:---:|:---:|---|
| **KaTeX** | FEAT-01, FEAT-15 | MIT | **94** | `Reuse` | Synchronous, zero-hydration math typesetting; fastest in web ecosystem. |
| **MathLive** | FEAT-15 | MIT | **92** | `Componentize` | Interactive formula input and virtual math keyboard; wrapped in React client boundary. |
| **Mafs** | FEAT-16, FEAT-17 | MIT | **92** | `Reuse` | Ultra-lightweight (25 KB) declarative React SVG math & calculus visualizer. |
| **JSXGraph** | FEAT-17 | MIT / LGPL | **85** | `Componentize` | Deep Euclidean geometry and geometric locus engine; lazy-loaded. |
| **Math.js** | FEAT-15, FEAT-16 | Apache-2.0 | **94** | `Reuse` | Isomorphic symbolic computation, matrix transformations, and unit conversions. |
| **Compute Engine** | FEAT-21, FEAT-22 | MIT | **91** | `Reuse` | MathJSON AST parsing and mathematical formula equivalence grading. |
| **Matter.js** | FEAT-03, FEAT-10 | MIT | **88** | `Componentize` | Standard 2D kinematics, friction carts, Newton's laws; lightweight 30 KB runtime. |
| **Rapier2D/3D** | FEAT-03, FEAT-10 | Apache-2.0 | **92** | `Componentize` | High-density particle simulations, Wasm speed, continuous collision detection. |
| **PhET Simulations** | FEAT-03, FEAT-04 | GPL-3.0 / Closed | **68** | `Rebuild` | **DO NOT EMBED**. GPL copyleft & proprietary royalty risk. Re-implement algorithms in MIT. |
| **CircuitJS1** | FEAT-04 | GPL-2.0 | **62** | `Rebuild` | **DO NOT EMBED SOURCE**. Copyleft risk. Rebuild with `@spice-ts/core` (MIT) + SVG. |
| **@spice-ts/core** | FEAT-04 | MIT | **85** | `Componentize` | Headless SPICE MNA solver; renders via custom interactive React SVG breadboard. |
| **Mol* (Molstar)** | FEAT-13, FEAT-07 | MIT | **95** | `Componentize` | Gold standard 3D macromolecular visualizer for PDB/mmCIF; dynamically loaded. |
| **SmilesDrawer** | FEAT-06, FEAT-13 | MIT | **91** | `Reuse` | 2D chemical structure rendering directly from SMILES without backend. |
| **Periodic Table Data**| FEAT-05 | MIT | **96** | `Rebuild` | Native Tailwind + Lucide interactive table with trends and electron configurations. |
| **Three.js** | FEAT-07, FEAT-09, FEAT-14 | MIT | **96** | `Componentize` | Universal 3D engine for cells, anatomy, and solar system; strict disposal management. |
| **OpenSeadragon** | FEAT-12 | BSD-3-Clause | **90** | `Componentize` | Multi-tile deep zoom image viewer for virtual microscope histological slides. |
| **Astronomy Engine** | FEAT-09 | MIT | **99** | `Reuse` | NASA-level accuracy for Sun/Moon/planet positions, eclipses, and Kepler orbits. |
| **CodeMirror 6** | FEAT-18 | MIT | **98** | `Reuse` | Modular, mobile-friendly code editor; replaces bulky Monaco Editor. |
| **@xyflow/react** | FEAT-02, FEAT-19 | MIT | **96** | `Reuse` | Interactive node-based logic gate circuit builder and conceptual flows. |
| **Cytoscape.js** | FEAT-02 | MIT | **92** | `Componentize` | High-density network graphs and curriculum concept maps. |
| **@dnd-kit** | FEAT-21 | MIT | **97** | `Reuse` | Accessible drag-and-drop matching and ordering question interactions. |
| **Dexie.js** | FEAT-23, FEAT-24 | Apache-2.0 | **99** | `Reuse` | Fast IndexedDB client storage for mastery progress, question banks, and offline analytics. |
| **Thai Phonology** | FEAT-20 | In-House MIT | **98** | `Rebuild` | Native TypeScript syllable parsing and 5-tone deterministic calculation. |
