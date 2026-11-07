# Changelog

All notable changes to the Interactive Learning Platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adhering to Semantic Versioning.

---

## [0.3.0] - 2026-11-07

### Added
- **Phase 3 (Deep Technical & License Audit)**:
  - Created `docs/TECHNICAL_AUDIT.md`:
    - Evaluated dependency tree, bundle sizes, and transitive footprints; rejected heavy monolithic runtimes (Monaco Editor ~5 MB, MathJax ~350 KB).
    - Established Client vs. SSR chunk isolation protocol for Next.js 15 App Router using `dynamic()` with `ssr: false` and custom element lifecycle guards.
    - Formalized and implemented GPU/WebGL memory disposal architecture (`src/lib/webgl-lifecycle.ts`) covering meshes, lines, points, sprites, texture map recursive disposal, and renderer context destruction to eliminate VRAM leakage across simulation routes.
    - Formalized and implemented WebGL context loss recovery pattern (`webglcontextlost` / `webglcontextrestored`) and DPR clamping (`Math.min(devicePixelRatio, 2.0)`).
    - Designed and implemented zero-copy Web Worker communication protocols (`src/lib/worker-protocol.ts`) for numerical physics and ODE solvers using Transferable `ArrayBuffer` objects and typed discriminated-union message contracts.
    - Established and implemented defense-in-depth security boundaries (`src/lib/math-sanitizer.ts`): KaTeX sanitization (`trust: false`, strict macros, recursion limits, XSS vector neutralization) and Math.js prototype-safe AST execution using sandboxed `Map` scopes.
  - Created `docs/LICENSE_AUDIT.md`:
    - Formalized commercial compliance and IP clearance for all 32 candidate technologies.
    - Established strict Clean-Room Rebuild boundary for **PhET Interactive Simulations** (GPL-3.0 + trademark/royalties) and **Paul Falstad CircuitJS1** (GPL-2.0 copyleft), guaranteeing 0% copyleft contamination.
    - Verified patent grant terms and automated attribution notice generation for MIT, Apache-2.0, and BSD-3 dependencies.
- **Phase 4 (Benchmark & Empirical Testing)**:
  - Installed core verified mathematical and physical simulation dependencies: `katex` (v0.19.1), `mathjs` (v15.2.0), `matter-js` (v0.20.0), `mafs` (v0.21.0), and typed definition packages.
  - Implemented empirical benchmark harnesses under `src/benchmarks/`:
    - `src/benchmarks/physics-integrators.ts`: Numerical comparison of Explicit Euler vs. Semi-Implicit Euler vs. Velocity Verlet vs. Runge-Kutta 4 across 10,000 steps of 2-body Keplerian orbits, tracking both max orbital drift and final orbital drift, plus Matter.js rigid-body collision solver benchmark with clean-up verification.
    - `src/benchmarks/thai-truncation.ts`: Heavy-load throughput measurement (100,000 iterations) of `safeTruncateThaiBytes` vs. `safeTruncateThaiGraphemes` across diverse Thai text payloads.
    - `src/benchmarks/math-eval.ts`: KaTeX LaTeX parsing/rendering latency across differential, tensor, and neutralized XSS equations, and Math.js uncompiled vs. pre-compiled vs. native JavaScript evaluation across 50,000 data points on multiple expressions (transcendental and polynomial).
    - `src/benchmarks/run-benchmarks.ts`: Master empirical benchmark runner with structured console telemetry and formatted markdown tables.
    - `src/benchmarks/benchmarks.test.ts`: Automated regression test suite verifying physical invariants, numerical bounds, Matter.js cleanup, and throughput thresholds.
    - `src/lib/sanitizer-and-lifecycle.test.ts`: Unit tests validating KaTeX XSS neutralization, Math.js AST sandboxed Map scopes, WebGL recursive disposal, and Worker transferable buffers.
  - Added `"benchmark": "node src/benchmarks/run-benchmarks.ts"` script to `package.json`.
  - Generated `docs/BENCHMARK_REPORT.md` capturing bare-metal empirical metrics:
    - Proved Velocity Verlet ($2.4996 \times 10^{-9}$ max energy error) and RK4 ($2.7779 \times 10^{-10}$ error) stability vs. catastrophic Explicit Euler divergence (47.7% energy increase, 96% radius drift).
    - Measured Matter.js throughput at 25,837 steps/sec with 50 interacting rigid bodies and confirmed 100% collision/body cleanup (0 bodies leaked).
    - Measured Thai byte-safe truncation at 2.8M to 4.1M ops/sec with zero allocations.
    - Measured KaTeX formula generation at 25,000 to 72,000 renders/sec (0.013–0.040 ms per equation) with 0 active XSS links generated.
    - Demonstrated 38x to 49x evaluation speedup for pre-compiled Math.js AST (3.8M–9.0M ops/sec) and 512x–725x for native JS (71M–94M ops/sec).
  - Advanced all 24 features in `docs/FEATURE_MATRIX.md` to `SELECTED` status.

---

## [0.2.0] - 2026-11-07

### Added
- **Phase 1 (Requirement Analysis & Deep Specification) & Phase 2 (Open Source Discovery & Cataloging)**:
  - Created `docs/REPOSITORY_CATALOG.md` documenting comprehensive technical audits and multi-criteria scoring for 23 candidate engines and libraries across 10 feature modules and 9 curriculum subjects:
    - **Mathematics**: KaTeX (94/100, Reuse), MathLive (92/100, Componentize), Mafs (92/100, Reuse), JSXGraph (85/100, Componentize), Math.js (94/100, Reuse), Cortex Compute Engine (91/100, Reuse).
    - **Physics & Circuits**: Matter.js (88/100, Componentize), Rapier2D/3D (92/100, Componentize), @spice-ts/core (85/100, Componentize), Custom Verlet/RK4 integrators (98/100, Rebuild).
    - **License & Legal Audits**: Flagged PhET Interactive Simulations (GPLv3 / proprietary royalty restrictions, score 68/100) and CircuitJS1 (GPLv2 copyleft infection risk, score 62/100) as prohibited from monolithic source bundling; established Clean-Room Rebuild strategies.
    - **Chemistry**: Mol* / Molstar (95/100, Componentize), SmilesDrawer (91/100, Reuse), RDKit.js Wasm (89/100, Componentize), Native IUPAC 118 Elements Table (96/100, Rebuild).
    - **Biology & Anatomy**: Three.js WebGL2 + GLTF (96/100, Componentize), OpenSeadragon (90/100, Componentize), Native Mendelian Punnett Engine (98/100, Rebuild).
    - **Astronomy**: Astronomy Engine v2.1 (99/100, Reuse) with NASA JPL Horizons verified Keplerian planetary mechanics.
    - **Computer Science**: CodeMirror 6 (98/100, Selected over heavy 5MB Monaco Editor), @xyflow/react (96/100, Reuse for interactive logic gates).
    - **Exercises, Assessment & Storage**: @dnd-kit (97/100, Reuse), Dexie.js IndexedDB (99/100, Reuse), Zod (Reuse).
    - **Thai Language**: Native TypeScript Thai Phonology 3-byte safe 5-tone rule engine (98/100, Rebuild).
  - Updated `docs/FEATURE_MATRIX.md` advancing all 24 platform features from `DISCOVERY` baseline to `RESEARCHING`, `AUDITING`, and `SELECTED` with concrete engine mappings, priorities, and adaptation strategies (Reuse, Componentize, Rebuild).

---

## [0.1.0] - 2026-11-07

### Added
- **Phase 0 Workspace Assessment & Initialization**:
  - Git repository initialization and `.gitignore` baseline.
  - Next.js 15 (v15.5.29) App Router project scaffolded with TypeScript 5, Tailwind CSS 4, and ESLint 9 using `pnpm` v12.16.1.
  - Vector iconography via `lucide-react` (v1.69.0), enforcing strict Anti-Emoji Mandate.
  - Typography configuration in `src/app/layout.tsx` and `src/app/globals.css` with Google Fonts `Sarabun`, `Prompt`, and `JetBrains_Mono`.
  - Kiosk containment (`overscroll-behavior: none`) in `src/app/globals.css`.
  - Multibyte Thai UTF-8 safe truncation engine in `src/lib/utils.ts` supporting byte-level truncation (`safeTruncateThaiBytes`), grapheme-cluster-level truncation (`safeTruncateThaiGraphemes`), and universal dispatch (`safeTruncateThai`).
  - Automated unit test suite `src/lib/utils.test.ts` executed via Node v26 native test runner (`node --test`), verifying 3-byte UTF-8 boundary safety, ASCII handling, and compound Thai graphemes.
  - Project governance and specification documentation established in `docs/`:
    - `docs/WORKSPACE_ASSESSMENT.md`: Host environment baseline, framework selection, and resource constraints.
    - `docs/REQUIREMENTS.md`: Deconstructed Functional Requirements (FR-101 to FR-1002) and Non-Functional Requirements.
    - `docs/FEATURE_MATRIX.md`: 24-feature tracking matrix spanning 10 core modules and 9 curriculum subjects in `DISCOVERY` status.
    - `docs/AGENT_RULES.md`: Multi-agent team architecture and Firman Agentic OS master operational laws.
    - `docs/CHANGELOG.md`: Project history log.
