# System Architecture Specification

> **Specification Reference**: `masterplan.md` (Section 4, Section 7, Section 8 Phase 5, Section 9)  
> **Platform Phase**: Phase 5 — Architecture Design & Special Cross-Cutting Phase  
> **Target Framework**: Next.js 15 App Router (Turbopack) | React 19 | TypeScript 5 | Tailwind CSS v4 | Node.js v26  
> **Architecture Status**: Approved System Architecture Baseline  
> **Last Updated**: 2026-11-07  

---

## 1. Executive Architecture Overview

The **Interactive Learning Platform** is engineered as a modern, high-precision educational runtime providing scientific simulations, virtual laboratory experiments, dynamic mathematical modeling, and linguistics/phonology analysis across 9 core subject tracks.

The system is architected around five non-negotiable operational laws:
1. **Scientific & Mathematical Precision**: All numerical integrators, physics systems, and math solvers must guarantee formal accuracy (symplectic conservation, AST sandboxing).
2. **Deterministic Memory & GPU Lifecycle**: Explicit, recursive VRAM and context loss management for all Canvas, WebGL, and simulation runtimes.
3. **Multibyte UTF-8 Boundary Safety**: Strict preservation of 3-byte Thai UTF-8 character boundaries (`0xE0` lead bytes) and grapheme clusters (`Intl.Segmenter`) across all text manipulation.
4. **Kiosk Containment & Lockdown**: Absolute viewport trapping (`overscroll-behavior: none`, `touch-action`, navigation popstate trapping) for dedicated classroom and museum kiosks.
5. **Aesthetics & Minimalist Rigor (Anti-Emoji Mandate)**: Clean, professional UI utilizing Lucide SVG vector iconography and CSS gradients—never cartoon emojis.

---

## 2. Special Cross-Cutting Phase: Autonomous Skill & Tooling Discovery via `npx`

### 2.1 Philosophy & Zero-Install Discipline
To maintain extreme repository cleanliness, minimize attack surface, and prevent `node_modules` dependency bloat, external auditing tools, code scaffolding utilities, and skill analysis scripts from npm/GitHub are executed strictly via **`npx` zero-install execution**.

```
+-----------------------------------------------------------------------------------+
|                        Zero-Install Tooling Philosophy                            |
|                                                                                   |
|  +--------------------+       npx --yes       +--------------------------------+  |
|  | GitHub / npm Cloud | --------------------> | Ephemeral Tool Execution Cache |  |
|  +--------------------+                       +--------------------------------+  |
|                                                               |                   |
|                                                               v                   |
|                                               +--------------------------------+  |
|                                               | Quality Gate & Security Audit  |  |
|                                               +--------------------------------+  |
|                                                               |                   |
|                                                               v                   |
|                                               +--------------------------------+  |
|                                               | docs/NPX_SKILLS_REGISTRY.md    |  |
|                                               +--------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 2.2 Core Operational Directives for NPX Skills
1. **Zero Global/Local Pollution**: Auditing packages (`knip`, `type-coverage`, `jscpd`, `license-checker-rseidelsohn`) must never be installed into `devDependencies` if they are only needed during quality gates or periodic auditing.
2. **Explicit Version Pinning**: When running security-critical or repeatable checks, pin the package version: `npx --yes <package>@<version> <args>`.
3. **Registry Logging Requirement**: Every single `npx` invocation across all development phases (Phase 0 through Phase 11) must be formally logged in `docs/NPX_SKILLS_REGISTRY.md` with timestamp, exact command, source package, purpose, and verified output.
4. **Safe Dry-Run for Code Modifiers**: Any tool capable of mutating files must be run with `--dry-run` or verified via `git diff` prior to commit.

---

## 3. High-Level System Architecture (Multi-Route Modular Educational Platform)

The platform leverages Next.js 15 App Router architecture with strict segregation between React Server Components (RSC) and Client Interactive Boundaries. Re-architected in v0.5.1 as a dedicated multi-route modular platform where each laboratory operates as an isolated chunk.

```
+---------------------------------------------------------------------------------------------------+
|                                      Client Browser / Kiosk Shell                                 |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | <KioskShell />: Enforces [overscroll-behavior:none], Popstate Trapping, Fullscreen Kiosk     |  |
|  |                                                                                             |  |
|  |   +---------------------------------------------------------------------------------------+ |  |
|  |   | <AppHeader />: Breadcrumb trail, Quick Search (⌘K), Active Lab Indicator, Kiosk Fullscreen | |
|  |   +---------------------------------------------------------------------------------------+ |  |
|  |   | <AppSidebar /> (Desktop lg:): Category-grouped navigation, live status, Mint/Cyan accent| |  |
|  |   | <AppNavbar /> (Mobile/Touch): Ergonomic bottom touch bar for kiosk displays             | |  |
|  +---|-----------------------------------------------------------------------------------------|-+  |
|      |                                                                                         |    |
|      v                                                                                         v    |
|  +-----------------------------------------------------------------------------------------------+  |
|  | Multi-Route App Router Topology (src/app/)                                                    |  |
|  |                                                                                               |  |
|  |  /           -> Home Portal & System HUD (Metrics, Quick Lab Launcher, 9 Subjects, 10 Feats)  |  |
|  |  /math       -> Mathematics Laboratory (<FormulaViewer />: Mafs 2D + KaTeX + Math.js AST)     |  |
|  |  /physics    -> Physics Laboratory (<VerletSimulationCanvas />: Symplectic Velocity Verlet)   |  |
|  |  /chemistry  -> Chemistry Workstation (<PeriodicTableViewer />: IUPAC 118 Elements + Bohr)  |  |
|  |  /biology    -> Cytology & Anatomy (<CellStructureViewer />: 12 Organelles + Cross-Section)   |  |
|  |  /thai       -> Thai Language Studio (<ThaiPhonologyVisualizer />: Triyang + 5 Tone Contours) |  |
|  |  /practice   -> Universal Practice Engine (<ExerciseEngine />: FEAT-21 Auto-Grading & Streaks)|  |
|  |  /_not-found -> Custom 404 Kiosk Fallback (<NotFound />: Breadcrumb recovery)                 |  |
|  +-----------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------------------+
| Core Logic & Compute Engines (src/lib)                                                            |
|                                                                                                   |
|  1. math-sanitizer.ts: KaTeX SSR sanitizer, Map-based evaluation scope, AST validator              |
|  2. webgl-lifecycle.ts: Recursive geometry/texture disposal, context loss guard                    |
|  3. worker-protocol.ts: Zero-copy Transferable ArrayBuffer simulation protocol                     |
|  4. thai-phonology.ts: 3-byte boundary safe syllable deconstruction & tone engine                 |
|  5. utils.ts: Universal Grapheme & Byte-Safe Thai Truncation (Intl.Segmenter)                      |
|  6. periodic-table-data.ts: 118 chemical elements, Bohr shells, and Pauling electronegativity     |
|  7. cell-structure-data.ts: Eukaryotic plant & animal cytology models and exam notes             |
|  8. exercise-bank.ts: 20 curriculum questions across 5 core subjects with LaTeX formulas          |
+---------------------------------------------------------------------------------------------------+
```

---

## 4. Module Decomposition & Responsibilities

### 4.1 Interactive Mathematics System (`src/components/FormulaViewer.tsx`)
- **Rendering Layer**: KaTeX (`v0.19.1`) synchronous markup rendering with `trust: false` and strict macro depth limits (`maxExpand: 1000`).
- **Evaluation Layer**: Math.js expression parsing backed by prototype-safe `Map<string, number>` scopes (`safeEvaluateMath`, `safeCompileMath`).
- **Coordinate Graphing**: Mafs (`v0.21.0`) interactive 2D Cartesian coordinate plane dynamically plotting functions $f(x)$ with dynamic current-value trackers.
- **AST Security Guard**: Rejection of forbidden tokens (`__proto__`, `constructor`, `Function`, `import`, etc.) via `validateExpressionSecurity`.
- **Dynamic Interaction**: Real-time slider and numeric inputs that compile expressions into optimized execution closures.

### 4.2 Symplectic Physics Engine (`src/components/VerletSimulationCanvas.tsx`)
- **Numerical Integrator**: Velocity Verlet (Symplectic ODE integrator) preserving Hamiltonian energy:
  $$x(t + \Delta t) = x(t) + v(t)\Delta t + \frac{1}{2}a(t)\Delta t^2$$
  $$v(t + \Delta t) = v(t) + \frac{a(t) + a(t + \Delta t)}{2}\Delta t$$
- **Energy Conservation Tracking**: Simultaneous computation of Kinetic Energy ($T = \frac{1}{2}mv^2$), Gravitational Potential Energy ($U = -G\frac{M m}{r}$), and total energy drift ($\Delta E / E_0$).
- **Lifecycle & GPU Management**: Integration with `src/lib/webgl-lifecycle.ts` for automated animation frame cancellation, context loss handling, and device pixel ratio clamping.

### 4.3 Thai Phonological Engine (`src/components/ThaiPhonologyVisualizer.tsx`)
- **Lobe 3 Compliance**: Adheres to strict 3-byte UTF-8 character boundary safety without mid-byte truncation (`safeTruncateThaiBytes`, `safeTruncateThaiGraphemes`).
- **Triyang Classification**: Decomposes Thai syllables into initial consonant classes (อักษร 3 หมู่: กลาง, สูง, ต่ำเดี่ยว, ต่ำคู่).
- **Phonetic Decomposition**: Identifies vowels (short/long, diphthongs), spelling sections (มาตราตัวสะกด 8 แม่ + แม่ ก กา), and live/dead status (คำเป็น/คำตาย).
- **Tone Sound Derivation**: Implements standard Central Thai tone rules (เสียงสามัญ, เอก, โท, ตรี, จัตวา) and renders SVG pitch contour tracks.

### 4.4 Kiosk Shell & Containment System (`src/components/KioskContainer.tsx` & `src/components/layout/KioskShell.tsx`)
- **Absolute Containment**: Enforces `overscroll-behavior: none`, `touch-action: pan-x pan-y`, and prevents elastic bounce.
- **Navigation Lockdown**: Traps `popstate` events to prevent accidental back/forward gestures in museum/classroom touchscreens.
- **Display Modes**: Supports Fullscreen API toggling (`requestFullscreen`) and Standalone PWA detection (`display-mode: standalone`).
- **Global Layout Shell (`KioskShell.tsx`)**: Integrates `AppHeader` (breadcrumbs, ⌘K search, kiosk fullscreen toggle, active module badge), `AppSidebar` (desktop category-grouped navigation with Mint/Cyan accents), and `AppNavbar` (touchscreen bottom kiosk bar).

### 4.5 Chemistry Workstation (`src/components/chemistry/PeriodicTableViewer.tsx`)
- **IUPAC Standardized Dataset**: Pure TypeScript dataset (`src/lib/periodic-table-data.ts`) containing all 118 elements with atomic number, mass, oxidation states, electron configurations, and discovery history.
- **Bohr Shell Visualization**: Dynamically generates concentric orbital SVG rings depicting electrons per quantum shell ($n=1, 2, \dots, 7$).
- **Thermal Heatmap & Trends**: Real-time Pauling electronegativity gradient mapping, block filtering ($s, p, d, f$), and dual Thai/English bilingual search.

### 4.6 Cytology & Cellular Biology (`src/components/biology/CellStructureViewer.tsx`)
- **Eukaryotic Cytology**: Complete comparative visualizer for plant and animal eukaryotic cells with 12 organelles (`src/lib/cell-structure-data.ts`).
- **Cross-Section Mode**: Interactive clipping exposing internal organelle spatial arrangements.
- **Biochemical Popovers**: Deep examination notes, organelle dimensions, membrane boundaries, and high-yield examination tips.

### 4.7 Universal Practice & Exercise Engine (`src/components/exercises/ExerciseEngine.tsx`)
- **Multi-Subject Question Bank**: 20 curriculum questions across Mathematics, Physics, Chemistry, Biology, and Thai (`src/lib/exercise-bank.ts`).
- **4 Auto-Graded Formats**: Single Choice, Multiple Select (set equality), Fill-in-the-Blank (normalized), and Numeric (floating-point tolerance).
- **Gamification & Feedback**: Progressive hint revelation, solution breakdowns with KaTeX LaTeX formulas, and streak score tracking.

---

## 5. Client vs. Server Component Boundaries & Vercel React Best Practices

Next.js 15 defaults to Server Components. In accordance with `vercel-react-best-practices` and `nextjs-app-router-patterns`, the platform enforces strict chunk isolation, zero barrel imports, and static prerendering:

| Module / Component | Route Path | Execution Target | Rationale |
|---|---|---|---|
| `layout.tsx` | Global | Server (RSC) | Font loading (Sarabun, Prompt, JetBrains Mono), HTML head, global metadata |
| `src/app/page.tsx` | `/` | Server (RSC) | Static dashboard portal, system telemetry HUD, laboratory launcher |
| `src/app/math/page.tsx` | `/math` | Server (RSC) | Isolated route page streaming `<FormulaViewer />` client bundle |
| `src/app/physics/page.tsx` | `/physics` | Server (RSC) | Isolated route page streaming `<VerletSimulationCanvas />` client bundle |
| `src/app/chemistry/page.tsx` | `/chemistry` | Server (RSC) | Isolated route page streaming `<PeriodicTableViewer />` client bundle |
| `src/app/biology/page.tsx` | `/biology` | Server (RSC) | Isolated route page streaming `<CellStructureViewer />` client bundle |
| `src/app/thai/page.tsx` | `/thai` | Server (RSC) | Isolated route page streaming `<ThaiPhonologyVisualizer />` client bundle |
| `src/app/practice/page.tsx` | `/practice` | Server (RSC) | Isolated route page streaming `<ExerciseEngine />` client bundle |
| `src/app/not-found.tsx` | `/_not-found` | Server (RSC) | Kiosk 404 recovery portal |
| `KioskShell.tsx` | Global Shell | Client (`'use client'`) | Viewport metrics, popstate trap, fullscreen state, mobile drawer |
| `AppHeader.tsx` | Global Header | Client (`'use client'`) | Pathname tracking, breadcrumbs, search modal, fullscreen toggle |
| `AppSidebar.tsx` | Global Sidebar | Client (`'use client'`) | Active route highlights, responsive mobile drawer, category grouping |
| `AppNavbar.tsx` | Mobile Navbar | Client (`'use client'`) | Touchscreen bottom navigation bar |

### 5.1 Vercel Performance Rules Applied
1. **`bundle-barrel-imports`**: All components and helpers are imported directly from explicit module paths (e.g., `@/components/layout/KioskShell`), never from monolithic index re-exports.
2. **`bundle-dynamic-imports`**: Heavy 2D/3D visualizers and simulation canvases are split across isolated Next.js App Router route chunks, shrinking the portal initial load from 420 kB down to 0 kB page JS.
3. **`async-suspense-boundaries`**: Independent layout and page streaming ensures fast First Contentful Paint (FCP).
4. **`rendering-hoist-jsx` & `rerender-memo`**: Static SVG paths and constant navigation definitions (`NAV_ROUTES`) are hoisted to module scope to eliminate redundant re-allocations on render.

---

## 6. Security Architecture & Threat Modeling

1. **LaTeX Injection & XSS**: KaTeX is configured with `trust: false`, disallowing `\href{javascript:...}`, raw HTML injection, or unauthorized CSS classes.
2. **Prototype Pollution**: Math.js evaluation strictly uses `Map` instances for variable storage, preventing Object prototype manipulation.
3. **AST Walking Denial of Service**: KaTeX macro expansion clamped to `maxExpand: 1000` to eliminate Billion-Laughs recursive macro bombs.
4. **Memory Exhaustion (VRAM/RAM)**: Simulation components register unmount handlers that release GPU buffers, detach WebGL contexts, and cancel `requestAnimationFrame` loops.

---

## 7. Technology Stack Summary

- **Core Framework**: Next.js 15.5.29 (Turbopack engine)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.9.3 (strict mode, zero implicit any)
- **Styling**: Tailwind CSS v4.0 with CSS variables & `@theme inline`
- **Iconography**: Lucide React (pure vector SVG, anti-emoji policy)
- **Typography**: Next.js Google Fonts (`Sarabun`, `Prompt`, `JetBrains Mono`)
- **Mathematics**: KaTeX 0.19.1, Math.js 15.2.0, Mafs 0.21.0
- **Physics**: Matter.js 0.20.0 + Custom Symplectic Velocity Verlet
- **Quality Tooling**: `npx` ephemeral tool execution (Knip, Type-Coverage, JSCPD, License-Checker)
