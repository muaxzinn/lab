# Changelog

All notable changes to the Interactive Learning Platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adhering to Semantic Versioning.

---

## [1.1.0] - 2026-11-07

### Added
- **Open Source 3D WebGL Integration (`three` & OrbitControls)**:
  - **Interactive 3D Molecular Laboratory (`src/components/3d/MolecularViewer3D.tsx`)**:
    - Real Three.js WebGL canvas with smooth OrbitControls (rotate, zoom, pan) and auto-rotation toggle.
    - Dual rendering modes: Ball-and-Stick vs. Space-Filling (Van der Waals radii).
    - CPK standard color coding (White H, Charcoal C, Red O, Blue N, Orange P).
    - Raycasting click interaction to inspect individual atomic coordinates, covalent and vdW radii.
    - Curated 3D datasets for 8+ landmark molecules in `src/lib/molecular-data-3d.ts` (Water, Methane, Ethanol, Benzene, Glucose, Caffeine, Aspirin, and B-DNA Double Helix segment).
    - Robust unmount memory disposal via `disposeThreeScene` eliminating GPU context leaks.
    - Integrated as a dedicated tab in `src/app/chemistry/page.tsx` (`ChemistryLabContainer.tsx`).
  - **Heliocentric 3D Solar System Engine (`src/components/3d/SolarSystemViewer3D.tsx`)**:
    - Glowing Sun with PointLight and coronal atmosphere.
    - 8 planets (Mercury through Neptune) plus Earth's Moon and Saturn's rings with Keplerian orbital ellipse trails.
    - Speed multiplier controls (1x, 5x, 10x, 50x, 100x) and pause/resume simulation toggles.
    - Planet tracking and camera zoom focus with astronomical ephemeris cards.
    - Ref-based animation loops preventing WebGL context recreation and orbit resets during play/pause/speed toggles.
    - Integrated as a dedicated tab in `src/app/physics/page.tsx` (`PhysicsLabContainer.tsx`).
  - **3D Cutaway Eukaryotic Cytology Explorer (`src/components/3d/CellViewer3D.tsx`)**:
    - 3D cutaway eukaryotic cell model exposing internal organelles.
    - Mode toggle between Animal Cell and Plant Cell (with rigid cell wall and chloroplasts).
    - 3D organelles: Nucleus, Nucleolus, Mitochondria, RER, SER, Golgi Apparatus, Lysosomes, and Ribosomes.
    - Subtree traversal memory disposal and click-to-inspect raycasting with organelle function, membrane counts, and exam invariants.
    - Integrated as a dedicated tab in `src/app/biology/page.tsx` (`BiologyLabContainer.tsx`).
- **Deep Step-by-Step Interactive Curriculum Lessons (`FEAT-01`)**:
  - **Modular Curriculum Dataset (`src/lib/lesson-data.ts` & `src/lib/lessons/`)**:
    - In-depth, 3-step lessons across 22 topics in 6 core disciplines:
      - **Physics (4)**: Newtonian Dynamics ($F=ma$), Projectile & Circular Motion, Keplerian Orbits, Kirchhoff's DC Circuit Laws (MNA).
      - **Chemistry (4)**: Quantum Orbitals & Aufbau/Hund/Pauli, VSEPR Geometry, Chemical Equilibrium & Le Chatelier, Organic Functional Groups & Biomolecules.
      - **Biology (4)**: Eukaryotic Cell Ultrastructure, Membrane Dynamics & Osmosis, Bioenergetics (Photosynthesis, Respiration, ATP Synthase), Central Dogma of Molecular Biology.
      - **Mathematics (4)**: Differential Calculus & Limits ($\epsilon$-$\delta$), Riemann Integration & FTC, Linear Algebra & Vectors/Eigenvalues, Simple Harmonic Motion & Trigonometry.
      - **Computer Science (3)**: Boolean Logic & Binary Adders, Fundamental Data Structures (Trees, Graphs, Hash Tables), Big-O Algorithmic Complexity & Sorting Algorithms.
      - **Thai Language (3)**: Triyang Consonant Classes, 8 Spelling Sections & Live/Dead Syllable Tone Rules, Kam Samas & Kam Sondhi Morphology.
  - **Interactive Lesson Component (`src/components/content/LessonViewer.tsx`)**:
    - Step-by-step progress tracking with responsive dot navigation.
    - Mathematical formulation rendering via secure KaTeX with detailed symbol legends.
    - Expandable deep theoretical analysis with real-world engineering and scientific applications.
    - Interactive Concept Checkpoints with instantaneous answer verification and conceptual explanations.
    - Mounted into all subject workspaces: `/physics`, `/chemistry`, `/biology`, `/math`, `/cs`, and `/thai`.
- **Minimalist Card-Categorized Scientific Hub & OpenLyceum Fleet (`src/components/home/StudioHub.tsx`)**:
  - Eliminated visual clutter: removed loud telemetry number counter bars ("7", "3D WebGL", "KaTeX", "FEAT-01") and animated neon dots.
  - Implemented responsive, clean card layout with matte dark background, subtle borders, Lucide SVG vector icons, and concise Thai descriptions.
  - Added integrated real-time search input for instant filtering across English and Thai queries.
  - Created `src/lib/simulation-catalog.ts` indexing all 61 OpenLyceum simulations and platform laboratories across 9 standard scientific domains (Astronomy, Physics, Waves & Optics, Electricity, Chemistry, Quantum, Biology, Mathematics & CS, Linguistics).
- **Fluid Vertical Scrolling & Viewport Fix**:
  - Updated `src/app/globals.css`: changed `html, body` height constraints to `min-height: 100%; height: auto; overflow-y: auto; scroll-behavior: smooth; overscroll-behavior-y: none;`.
  - Updated `src/components/layout/KioskShell.tsx`: configured `<main id="main-content">` and parent containers with `min-h-screen overflow-y-auto`.
  - Updated `src/components/KioskContainer.tsx`: removed `overflow-x-hidden touch-pan-x touch-pan-y` constraints blocking wheel/touch scrolling.
- **Automated Unit Testing & Quality Verification**:
  - Added `src/lib/three-and-lessons.test.ts` validating 3D molecular coordinates, CPK colors, lesson structural integrity, and Three.js scene disposal.
  - Added `src/lib/astronomy-data.test.ts` validating OpenLyceum Keplerian orbits, semi-major axes, sidereal periods, and planetary rings.
  - Added `src/lib/simulation-catalog.test.ts` validating the 70+ simulation catalog across all 9 subject domains and bilingual search filtering.
  - Test suite expanded to **184 tests** across **64 suites** with **100% pass rate**.
  - Verified 0 Knip issues, 0 ESLint warnings, 0 TypeScript errors, and successful Turbopack production build.

---

## [1.0.0] - 2026-11-07

### Added
- **Phase 10: Production Optimization, PWA & Service Worker Offline Caching**:
  - **Native Web App Manifest (`src/app/manifest.ts` & `public/manifest.json`)**:
    - Configured native Next.js 15 App Router manifest and static JSON mirror with standalone display mode, theme color `#070b16`, background color `#070b16`, orientation `any`, name `Interactive Learning Platform`, short name `InteractiveLab`, and `th-TH` language.
    - Designed and generated high-resolution vector SVG icons in `public/icons/`: `icon-192.svg` (192x192), `icon-512.svg` (512x512), and `icon-maskable.svg` (512x512 with safe-zone inset) featuring dark aesthetics and Mint/Cyan quantum orbit geometry.
  - **Lightweight Offline Service Worker (`public/sw.js`)**:
    - Precached all 8 core educational routes (`/`, `/math`, `/physics`, `/chemistry`, `/biology`, `/cs`, `/thai`, `/practice`), manifests, offline fallback, and PWA icons in `interactive-lab-v1` cache.
    - Implemented Network-First caching strategy for navigation requests with automatic cache update and graceful fallback to `/offline.html` or cached shell.
    - Implemented Stale-While-Revalidate caching strategy for static chunks, styles, fonts, and vector assets.
    - Implemented version migration with automated obsolete cache cleanup in `activate` event, `self.skipWaiting()`, and `self.clients.claim()`.
  - **Self-Contained Offline Fallback Screen (`public/offline.html`)**:
    - Standalone HTML5 offline page styled in `#070b16` with zero external network dependencies.
    - Lists all cached workbenches available offline (Math, Physics, Chemistry, Biology, CS, Thai, Practice).
    - Includes reload retry button (`window.location.reload()`), strictly adheres to the Anti-Emoji Mandate (100% SVG iconography), and eliminates redundant bracketed text.
  - **Client Offline Status Detection Banner (`src/components/layout/OfflineStatusBanner.tsx`)**:
    - Detects network connectivity via `navigator.onLine` and `online`/`offline` window events.
    - Displays accessible alert banner (`role="alert"`, `aria-live="assertive"`) with Lucide `WifiOff` icon and clean notices when offline.
    - Displays transient reconnection badge (`role="status"`, `aria-live="polite"`) with Lucide `Wifi` icon for 3.5 seconds when network connectivity is restored, with robust timer cleanup.
    - Automatically registers `/sw.js` in browser environment with update event listeners.
    - Seamlessly integrated into `src/components/layout/KioskShell.tsx`.
  - **Automated PWA Unit Test Suite (`src/pwa/pwa.test.ts`)**:
    - Added 17 unit tests across 6 test suites validating manifest metadata, public json mirroring, offline fallback HTML self-containment, anti-emoji verification, Service Worker precache routes, SVG icon vector integrity, and offline query/subresource cache behavioral simulation.
    - Expanded test suite to **164 passing tests** across **59 test suites** with **0 failures**.
- **Phase 11: Release Packaging & Complete Project Documentation Suite**:
  - **Section 10 Complete Documentation**:
    - Created `docs/SOURCE_TRACKING.md`: Complete tracking table of adapted open-source packages, upstream versions, licenses, and custom modification records.
    - Created `docs/INSTALLATION_GUIDE.md`: Step-by-step setup, prerequisites (Node v26, pnpm 12), development workflow, production build, and environment flags.
    - Created `docs/USER_GUIDE.md`: End-user walkthrough for students and teachers across all 8 educational workbenches.
    - Created `docs/DEVELOPER_GUIDE.md`: Comprehensive developer architecture manual detailing directory structure, adding new simulation presets, coding standards, a11y rules, and NPX skill workflow.
    - Updated `docs/FEATURE_MATRIX.md`: Transitioned all implemented features to `COMPLETED` status.
    - Updated `docs/TEST_REPORT.md`: Updated comprehensive test metrics to v1.0.0 (164 tests, 59 suites, 100% pass rate).
    - Updated `docs/PERFORMANCE_REPORT.md`: Recorded 13/13 static routes and PWA Service Worker caching metrics.
    - Updated `docs/SECURITY_REPORT.md`: Documented Service Worker scope isolation and offline network interception boundaries.
    - Updated `docs/NPX_SKILLS_REGISTRY.md`: Registered Phase 10 & 11 tool executions (#25 to #29).
  - **Production Release v1.0.0 Packaging**:
    - Bumped `package.json` version to `1.0.0`.
    - Turbopack production build prerendered 100% static routes (13/13 routes).
    - Verified 0 Knip dead-code issues, 99.91% TypeScript type coverage (100.00% across all production components and PWA suites), and 1.84% code duplication.

---

## [0.7.0] - 2026-11-07

### Added
- **Phase 9: Quality Assurance, Cross-Browser E2E, Accessibility & Security Audit**:
  - **Comprehensive Multi-Route Integration Suite (`src/lib/integration.test.ts`)**:
    - Validated all 8 canonical routes in `NAV_ROUTES` map 1:1 to concrete Next.js 15 App Router pages (`src/app/**/page.tsx`).
    - Validated breadcrumb hierarchy computation across root, subroutes, and deep nested paths with trailing slash normalization.
    - Validated multilingual search engine across English terms, Thai queries (e.g. `ตารางธาตุ`, `วงจร`), descriptions, and keyword tags.
    - Verified cross-module scientific consistency between 118 IUPAC elements and chemical stoichiometry calculations.
    - Verified all reaction presets in `REACTION_PRESETS` balance with zero mass loss ($|\Delta m| < 10^{-4}\text{g}$) and atom conservation.
    - Verified Modified Nodal Analysis (MNA) DC circuit solver and Gaussian elimination across all circuit presets with KVL/KCL power conservation.
    - Verified digital logic gate truth table generation across Half Adder, Full Adder, Multiplexer, and Universal NOR presets.
    - Verified eukaryotic cytology organelle datasets partition plant vs. animal cell structures cleanly.
    - Verified Thai phonology triyang rules align with syllable classification logic and tone sound rules.
    - Verified universal practice bank questions across all 5 subjects evaluate correctly against answer keys and reject incorrect inputs.
  - **Security & Vulnerability Hardening Suite (`src/lib/security.test.ts`)**:
    - Created `escapeHtml` and `unescapeHtml` string utilities in `src/lib/utils.ts` for safe HTML entity neutralization.
    - Fuzzed KaTeX rendering with classic script tags, inline SVG/IMG event handlers (`<img onerror=...>`, `<svg onload=...>`), and unclosed groups.
    - Verified neutralization of dangerous KaTeX link protocols (`\href{javascript:...}`, `\href{data:text/html,...}`, `\url{vbscript:...}`) under `trust: false`.
    - Enforced strict prototype pollution and code execution defenses in `validateExpressionSecurity` by intercepting `__proto__`, `constructor`, `prototype`, `globalThis`, `require`, `self`, `top`, `parent`, `fetch`, `localStorage`, `sessionStorage`, `XMLHttpRequest`, `WebSocket`, and `indexedDB`.
    - Verified Map scope isolation (`createSandboxedScope()`), preventing user variable tampering with `Object.prototype`.
    - Fuzzed chemical formula parser against prototype pollution identifiers (`__proto__`, `constructor`, `toString`).
    - Fuzzed DC circuit solver with disconnected, empty, and non-grounded netlists.
    - Tested logic gate cyclic feedback oscillator detection (`hasCycles: true`).
    - Fuzzed practice question evaluator against SQL injection, HTML injection, prototype keywords, `NaN`, and `Infinity`.
    - Fuzzed Thai byte/grapheme truncation utilities against zero, negative, ASCII, mixed, and emoji boundaries with zero replacement characters (`\uFFFD`).
    - Verified complete HTML entity escaping roundtrip without character corruption across multilingual Thai and scientific equations.
  - **Accessibility (a11y) & WCAG 2.1 AA Compliance Hardening across all 8 Workbenches**:
    - Added direct skip-to-content bypass link (`#main-content`) targeting `<main id="main-content" tabIndex={-1}>` in `KioskShell.tsx` per WCAG Success Criterion 2.4.1.
    - Added WAI-ARIA tablist semantics (`role="tablist"`, `role="tab"`, `aria-selected`) to `CellStructureViewer.tsx`, `ChemistryLabContainer.tsx`, and `PhysicsLabContainer.tsx`.
    - Added accessible organelle quick selector buttons in `CellStructureViewer.tsx` for screen reader users.
    - Added descriptive input labels, slider labels, and `role="img"` graphics in `ThaiPhonologyVisualizer.tsx`, `FormulaViewer.tsx`, and `VerletSimulationCanvas.tsx`.
    - Added `role="radiogroup"`, `role="radio"`, `role="checkbox"`, and `role="status"` `aria-live="polite"` feedback regions in `ExerciseEngine.tsx`.
    - Added `role="alert"` `aria-live="polite"` live error region in `ChemicalReactionViewer.tsx`.
    - Added `role="dialog"`, `aria-modal="true"`, and `Escape` key close listeners to `PeriodicTableViewer.tsx` modal and `AppHeader.tsx` search modal.
    - Added keyboard interaction (`role="button"`, `tabIndex={0}`, `onKeyDown` for Enter/Space) to interactive SVG circuit switches and digital logic inputs.
    - Verified 44px+ touch targets and zero decorative cartoon emojis in compliance with Firman Agentic OS Lobe 3.
  - **Phase 9 Deliverable Documentation**:
    - Created `docs/SECURITY_REPORT.md`: Comprehensive security architecture, threat model, sandboxed AST validation, and dependency vulnerability assessment.
    - Created `docs/PERFORMANCE_REPORT.md`: Core Web Vitals empirical telemetry (LCP, INP, CLS), static bundle optimization, microbenchmark throughput, and WebGL memory lifecycle.
    - Created `docs/TEST_REPORT.md`: Complete testing breakdown covering 147 passing tests across 52 test suites with zero failures.
    - Updated `docs/NPX_SKILLS_REGISTRY.md`: Registered Phase 9 executions (#20 to #24: `license-checker-rseidelsohn`, `@axe-core/cli`, `knip`, `typescript-coverage-report`, `jscpd`).
    - Updated `docs/FEATURE_MATRIX.md`: Updated Phase 9 status and feature tracking table.
- **Automated Verification Expansion**:
  - Expanded test suite from 113 to **147 passing tests** across **52 test suites** with **0 failures**.
  - TypeScript type coverage maintained at **99.90%** (27,316 / 27,342 symbols).
  - Code duplication measured at **1.93%** across 18,789 lines of source code.
  - Turbopack production build verifies **12/12 static routes** with 0 errors.

---

## [0.6.0] - 2026-11-07

### Added
- **Phase 8: Internal Module Integration & Advanced Simulation Modules**:
  - **Interactive DC/AC Circuit Simulator & Modified Nodal Analysis Engine (`FEAT-04`)**:
    - Created `src/lib/circuit-solver.ts`: Pure TypeScript Modified Nodal Analysis (MNA) linear solver using Gaussian elimination with partial pivoting. Solves arbitrary DC networks for node voltages, branch currents, and component power dissipation.
    - Clean-Room Implementation (Zero GPL copyleft): Replaces GPL-licensed alternatives with clean-room pure TS modeling DC batteries (0-24V), fixed/variable resistors (1Ω-10kΩ), interactive switches (open/closed), lamps, LEDs with forward bias and dynamic radiant glow, and in-line ammeter/voltmeter probes.
    - Created `src/components/physics/CircuitSimulator.tsx`: Interactive SVG circuit schematic with animated current particle flows, draggable/toggable switches, resistance sliders, live movable digital voltmeter probes, and KVL/KCL energy conservation telemetry.
    - Created `src/components/physics/PhysicsLabContainer.tsx`: Tabbed laboratory container switching between DC Circuit Simulator and Keplerian Orbital Mechanics under `/physics`.
  - **Chemical Equation Balancer & Stoichiometry Engine (`FEAT-06` & `FEAT-11`)**:
    - Created `src/lib/chemical-solver.ts`: Stack-based chemical formula parser handling nested parentheses and brackets (`Ca(OH)2`, `(NH4)2SO4`, `Al2(SO4)3`), exact rational Gauss-Jordan elimination solving the nullspace of the atom conservation matrix, IUPAC molar mass calculations, and stoichiometric mole/mass/Avogadro particle count conversions.
    - Law of Conservation of Mass: Verifies exact atom conservation and mass equality ($\Delta m = 0.0000\text{g}$) across reactants and products.
    - Curriculum Presets: Water synthesis, Methane combustion, Plant photosynthesis, Iron rusting, Aluminum sulfate formation, Acid-base neutralization, and KMnO4 redox.
    - Created `src/components/chemistry/ChemicalReactionViewer.tsx`: Interactive formula input with live validation, preset quick-selectors, coefficient badges, atom inventory breakdown, and live stoichiometry calculator.
    - Created `src/components/chemistry/ChemistryLabContainer.tsx`: Tabbed workstation switching between Chemical Equation Balancer and IUPAC Periodic Table under `/chemistry`.
  - **Logic Gate & Boolean Digital Circuit Sandbox (`FEAT-19`)**:
    - Created `src/lib/logic-gate-engine.ts`: Boolean logic engine supporting AND, OR, NOT, XOR, NAND, NOR, XNOR, and BUFFER gates with topological relaxation propagation, cycle detection, and automated $2^n$-state truth table generation.
    - Curriculum Presets: Half Adder (Sum & Carry), Full Adder (Cascaded 1-bit), 2-to-1 Multiplexer (MUX), and De Morgan's Laws equivalence verification.
    - Created `src/components/cs/LogicGateSandbox.tsx`: Interactive SVG digital circuit schematic with high-contrast signal lines (Mint/Cyan for HIGH `1`, Dark Slate for LOW `0`), animated signal flow, clickable input switches, glowing output LEDs, and live truth table row tracking.
    - Created new route `/cs` (`src/app/cs/page.tsx`): Dedicated Computer Science Laboratory route with metadata, HUD metrics, and App Shell integration.
    - Integrated `/cs` into `src/components/layout/nav-data.ts` and `src/app/page.tsx` dashboard cards.
- **AI Agent Skills via `npx` Integration**:
  - Executed `npx --yes knip` verifying 0 dead files, 0 unused exports, and 0 unused dependencies across the entire workspace.
  - Executed `npx --yes typescript-coverage-report -r text` achieving 99.89% overall TypeScript type coverage (24,479/24,505 symbols) with 100.00% across all new solvers, models, and UI components.
  - Documented executions #16 and #17 in `docs/NPX_SKILLS_REGISTRY.md`.
- **Automated Unit Tests & Quality Assurance**:
  - Created `src/lib/circuit-solver.test.ts` (16 unit tests) verifying Ohm's Law, series/parallel combinations, voltage division, switch cutoff, dynamic LED/bulb glow, in-line ammeter/switch current polarity consistency, balanced/unbalanced Wheatstone bridge networks, singular short-circuit detection, and KVL/KCL conservation.
  - Created `src/lib/chemical-solver.test.ts` (13 unit tests) verifying formula parsing, polyatomics, exact rational balancing, mass conservation, and stoichiometry conversions.
  - Created `src/lib/logic-gate-engine.test.ts` (9 unit tests) verifying gate primitives, N-input gates, Half/Full Adders, Universal NOR logic synthesis, De Morgan equivalence, MUX data routing, and oscillator cycle guards.
  - Expanded test suite to 113 unit tests (42 suites, 100% pass rate).
  - Clean linting (`pnpm lint`: 0 problems, 0 warnings), zero TypeScript errors (`pnpm typecheck`), and full Turbopack static prerendering (12/12 routes).

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
