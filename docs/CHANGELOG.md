# Changelog

All notable changes to the Interactive Learning Platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adhering to Semantic Versioning.

---

## [0.5.1] - 2026-11-07

### Added
- **Multi-Route Modular Educational Platform Architecture (Next.js 15 App Router & Turbopack)**:
  - Re-architected platform from a monolithic tabbed single page into a high-performance modular multi-route system:
    - `/` (Platform Portal / Dashboard): Master system overview, telemetry HUD, quick launch workstation cards, 9 curriculum subject tracks, and 10 feature module roadmap.
    - `/math` (Mathematics Laboratory): Dedicated route for dynamic 2D function graphing with Mafs v0.21, KaTeX formula typesetting, and Math.js AST evaluation.
    - `/physics` (Physics Laboratory): Dedicated route for 2-body Keplerian planetary orbit simulation running Velocity Verlet vs. Explicit Euler with real-time Hamiltonian energy conservation gauge.
    - `/chemistry` (Chemistry Workstation): Dedicated route for IUPAC 118-element periodic table, SVG Bohr electron shell orbitals, and Pauling electronegativity heatmap.
    - `/biology` (Cytology & Cellular Biology): Dedicated route for eukaryotic plant and animal cell explorer with 12 clickable organelles, internal cross-section mode, and exam notes.
    - `/thai` (Thai Language Studio): Dedicated route for 3-byte safe syllable deconstruction, Triyang consonant classes, 8 spelling sections, and dynamic SVG pitch contour plots.
    - `/practice` (Universal Practice Engine): Dedicated route for 20 curriculum questions across 5 subjects with instant auto-grading, step-by-step breakdown, and streak tracking.
    - `/_not-found` (`src/app/not-found.tsx`): Kiosk-contained 404 recovery page enabling 100% static page prerendering in Turbopack.
- **Enterprise App Shell & Navigation Framework (`src/components/layout/`)**:
  - Created `src/components/layout/nav-data.ts`: Central typed navigation registry with routes, Thai/English bilingual metadata, category grouping, and multi-criteria search.
  - Created `src/components/layout/AppHeader.tsx`: Breadcrumb trail, quick navigation search modal (`⌘K`), active subject indicator badge with pulsing Mint/Cyan gradient dot, and Fullscreen Kiosk toggle.
  - Created `src/components/layout/AppSidebar.tsx`: Desktop responsive category navigation with Mint/Cyan gradient active accents (`linear-gradient(135deg, #2ef2a0, #00f0ff)`), platform HUD, and 100% Lucide SVG vector iconography (Anti-Emoji mandate).
  - Created `src/components/layout/AppNavbar.tsx`: Touchscreen mobile kiosk bottom navigation bar with 44px+ tap targets.
  - Created `src/components/layout/KioskShell.tsx`: Global layout wrapper integrating lockdown containment (`overscroll-behavior: none`), touchscreen popstate trapping, and responsive viewport shell.
- **AI Agent Skills via `npx` Integration**:
  - Discovered and executed skills from GitHub / npm via `npx skills find` and `npx skills use`:
    - `vercel-labs/agent-skills@vercel-react-best-practices`: Integrated 70 rules for chunk isolation, zero barrel imports, and memoized rendering.
    - `wshobson/agents@nextjs-app-router-patterns`: Implemented Next.js App Router multi-route topology, RSC default boundaries, and layout composition.
    - `vercel-labs/agent-skills@vercel-composition-patterns`: Applied compound component composition and state lifting for App Shell.
  - Logged all 7 new `npx` executions into `docs/NPX_SKILLS_REGISTRY.md`.
- **Automated Tests & Quality Assurance**:
  - Created `src/components/layout/layout.test.ts` (6 unit tests) verifying route completeness, uniqueness, path formatting, breadcrumb hierarchy, and search filtering.
  - Expanded test suite from 69 to 75 unit tests (22 suites, 100% pass rate).
  - Production build prerendered 100% static pages (11/11 routes), dropping home page JS size from 420 kB down to 0 kB initial page JS.
  - Achieved 99.89% overall TypeScript coverage (17,774/17,793 symbols) via `npx typescript-coverage-report` (100.00% across all new routes and app shell components).
  - Hardened Kiosk containment: added `contextmenu` suppression when locked (Lobe 3 Kiosk Lockdown rule), WebKit/Safari fullscreen vendor prefix fallback, `.no-scrollbar` cross-browser utility in `globals.css`, and 44px+ minimum tap targets on mobile `AppNavbar`.
  - Upgraded `AppHeader` quick navigation search modal: added keyboard `Enter` selection on top search matches and multi-tier subroute prefix resolution in `getNavRouteByPath` and `getBreadcrumbs`.
  - Verified 0 dead code issues via `npx knip`.

---

## [0.5.0] - 2026-11-07

### Added
- **Phase 7 (Feature Development — Priority 1 Core Learning & Priority 2 Scientific Modules)**:
  - **Interactive Exercises & Practice Engine (`FEAT-21`)**:
    - Created `src/components/exercises/ExerciseEngine.tsx`: Practice engine supporting Single Choice, Multiple Select, Fill-in-the-Blank, and Numeric answers with KaTeX rendering, instant auto-grading, step-by-step solution breakdowns, progressive hint reveal, score tallying, answer streak tracking, and non-blocking filter recovery.
    - Created `src/lib/exercise-bank.ts`: 20 high-yield curriculum questions across Mathematics, Physics, Chemistry, Biology, and Thai language across Easy, Medium, and Hard difficulty tiers with LaTeX math equations, 3-byte safe Thai UTF-8 text, and international/Thai numeral parsing.
  - **Interactive Periodic Table of Elements (`FEAT-05`)**:
    - Created `src/lib/periodic-table-data.ts`: Complete IUPAC standardized dataset of all 118 chemical elements (Hydrogen #1 to Oganesson #118) with atomic mass, electron configurations, electrons per shell, electronegativity (Pauling scale), oxidation states, discovery history, and dual Thai/English scientific summaries.
    - Created `src/components/chemistry/PeriodicTableViewer.tsx`: Interactive 18-column Periodic Table with Lanthanide/Actinide series, category color coding, Pauling electronegativity heatmap gradient, block filtering (s, p, d, f), search by symbol/name/Thai/category, SVG Bohr electron shell visualizer with orbital concentric rings, WCAG 2.1 AA aria-labels, and detailed element modal inspection.
  - **Interactive Cell & Organelle Visualizer (`FEAT-07`)**:
    - Created `src/lib/cell-structure-data.ts`: Pure TypeScript cytology dataset and contracts defining plant and animal cell structures, categories, and high-yield examination notes.
    - Created `src/components/biology/CellStructureViewer.tsx`: Multi-layered biological cytology explorer with instant switching between Plant Cell (เซลล์พืช) and Animal Cell (เซลล์สัตว์), clickable organelles (Nucleus, Mitochondria, Ribosomes, Chloroplast, Vacuole, Rough/Smooth ER, Golgi, Lysosome, Centrosome, Cell Wall, Plasma Membrane), internal cross-section mode, free cytosolic ribosome clusters, high-yield biology exam notes, comparison matrix, and zero WebGL VRAM leak via high-performance vector SVG.
  - **Automated Unit Tests & Quality Assurance**:
    - Created `src/lib/periodic-table.test.ts` (10 unit tests) verifying 118 elements completeness, sequential atomic numbers, Bohr electron shell conservation, and electronegativity trends.
    - Created `src/components/biology/cell-structure.test.ts` (5 unit tests) verifying organelle structural integrity, bilingual descriptions, and plant vs. animal partitioning.
    - Created `src/components/exercises/exercise-engine.test.ts` (9 unit tests) verifying question bank integrity, single-choice/multi-select set equality, fill-in-blank normalization, difficulty filters across Easy/Medium/Hard, and numeric floating-point tolerance boundaries with Thai numerals and comma decimals.
    - Expanded test suite from 45 to 69 passing tests (21 suites, 100% pass rate).
  - **Special Cross-Cutting Phase (`npx` Tools)**:
    - Executed `npx knip`: confirmed 0 dead files, 0 unused exports, 0 unused dependencies.
    - Executed `npx typescript-coverage-report`: achieved 99.88% overall type coverage across 15,857 symbols (100.00% across all new components and datasets).
    - Recorded executions in `docs/NPX_SKILLS_REGISTRY.md`.
  - **Homepage Integration (`src/app/page.tsx`)**:
    - Re-architected tab navigation with dedicated tabs for Overview, Mathematics & Physics, Chemistry & Biology, Thai Phonology Engine, and Exercises & Practice Engine with smooth sub-tab switching.

---

## [0.4.0] - 2026-11-07

### Added
- **Special Cross-Cutting Phase (Autonomous Skill & Tooling Discovery via `npx`)**:
  - Established Zero-Install Tooling Governance and created `docs/NPX_SKILLS_REGISTRY.md`.
  - Documented npx philosophy, version pinning, safe dry-run protocol, and execution matrix.
  - Executed and verified `npx typescript-coverage-report` (99.76% overall type coverage; 100% across all 4 interactive components), `npx knip` (clean 0 dead code / 0 unused dependencies / 0 unused exports audit), and `npx license-checker-rseidelsohn` (recursive license validation across 340 packages).
- **Phase 5 (System Architecture & Module Specifications)**:
  - Created `docs/ARCHITECTURE.md` defining system topology, RSC vs client interactive boundaries, memory/GPU lifecycles, and security threat models.
  - Created `docs/MODULE_SPECIFICATIONS.md` detailing mathematical and physical contracts for all core interactive modules, including Mafs 2D coordinate plotting and comprehensive phonological deconstruction heuristics.
- **Phase 6 (Source Code Customization & Interactive Components)**:
  - Created `src/components/FormulaViewer.tsx`: Interactive KaTeX mathematical typesetter with Math.js AST sandboxed variable evaluation across 6 presets (Kinetic Energy, Wave Speed, Harmonic Oscillator, Ohm's Law, Ideal Gas Law, Gravitation) and dynamic 2D function graph plotting via `Mafs` (v0.21.0).
  - Created `src/components/VerletSimulationCanvas.tsx`: Symplectic planetary orbit physics canvas running Velocity Verlet vs. Explicit Euler with real-time Hamiltonian energy conservation gauge.
  - Created `src/components/ThaiPhonologyVisualizer.tsx`: Interactive Thai syllable deconstructor, Triyang classifier, 8 spelling sections, live/dead analysis, and SVG pitch contour trajectories.
  - Created `src/components/KioskContainer.tsx`: Viewport lockdown shell with `overscroll-behavior: none`, `touch-action`, navigation popstate trapping, Fullscreen API, and standalone PWA detection.
  - Created and expanded `src/lib/thai-phonology.test.ts`: Comprehensive 45 unit tests verifying Thai phonological rules, leading consonants (ห นำ, อ นำ), true clusters, complex vowels (open/closed สระ อัว, เ-ีย, เ-ือ, เ-อ, เ-าะ), Thanthakhat silenced cluster stripping, and 5 tone derivations.
  - Integrated interactive component showcase into `src/app/page.tsx` with responsive tabs and telemetry HUD.

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
