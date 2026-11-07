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

## 3. High-Level System Architecture

The platform leverages Next.js 15 App Router architecture with strict segregation between React Server Components (RSC) and Client Interactive Boundaries.

```
+---------------------------------------------------------------------------------------+
|                                    Client Browser / Kiosk                             |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  | <KioskContainer />: Viewport Containment, Popstate Trap, Fullscreen Controller  |  |
|  +---------------------------------------------------------------------------------+  |
|                                          |                                            |
|                                          v                                            |
|  +---------------------------------------------------------------------------------+  |
|  | Navigation & Subject Shell (9 Subjects: Physics, Chemistry, Biology, Math, etc.)|  |
|  +---------------------------------------------------------------------------------+  |
|         |                                  |                               |          |
|         v                                  v                               v          |
|  +----------------------+      +----------------------+      +---------------------+  |
|  | <FormulaViewer />    |      | <VerletSimCanvas />  |      | <ThaiPhonoVis />    |  |
|  | - KaTeX Display      |      | - Velocity Verlet    |      | - UTF-8 Slicer      |  |
|  | - Math.js AST Sandbox|      | - WebGL/Canvas Guard |      | - Triyang / Tones   |  |
|  | - Variable Sliders   |      | - Energy Conservation|      | - Contour Charts    |  |
|  +----------------------+      +----------------------+      +---------------------+  |
|         |                                  |                               |          |
+---------|----------------------------------|-------------------------------|----------+
          |                                  |                               |
          v                                  v                               v
+---------------------------------------------------------------------------------------+
| Core Logic & Compute Engines (src/lib)                                                |
|                                                                                       |
|  1. math-sanitizer.ts: KaTeX SSR sanitizer, Map-based evaluation scope, AST validator  |
|  2. webgl-lifecycle.ts: Recursive geometry/texture disposal, context loss guard        |
|  3. worker-protocol.ts: Zero-copy Transferable ArrayBuffer simulation protocol         |
|  4. thai-phonology.ts: 3-byte boundary safe syllable deconstruction & tone engine     |
|  5. utils.ts: Universal Grapheme & Byte-Safe Thai Truncation (Intl.Segmenter)          |
+---------------------------------------------------------------------------------------+
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

### 4.4 Kiosk Shell & Containment System (`src/components/KioskContainer.tsx`)
- **Absolute Containment**: Enforces `overscroll-behavior: none`, `touch-action: pan-x pan-y`, and prevents elastic bounce.
- **Navigation Lockdown**: Traps `popstate` events to prevent accidental back/forward gestures in museum/classroom touchscreens.
- **Display Modes**: Supports Fullscreen API toggling (`requestFullscreen`) and Standalone PWA detection (`display-mode: standalone`).

---

## 5. Client vs. Server Component Boundaries (RSC Strategy)

Next.js 15 defaults to Server Components. The architecture enforces explicit boundary isolation:

| Module / Component | Execution Target | Rationale |
|---|---|---|
| `layout.tsx` | Server (RSC) | Font loading (Sarabun, Prompt, JetBrains Mono), HTML head, global metadata |
| `page.tsx` | Client (`'use client'`) | Interactive tab orchestration, state synchronization, live controls |
| `FormulaViewer.tsx` | Client (`'use client'`) | User slider input, KaTeX dynamic rendering, Math.js expression compilation |
| `VerletSimulationCanvas.tsx` | Client (`'use client'`) | `HTMLCanvasElement`, `requestAnimationFrame`, pointer drag interaction |
| `ThaiPhonologyVisualizer.tsx`| Client (`'use client'`) | Interactive text input, real-time syllable decomposition |
| `KioskContainer.tsx` | Client (`'use client'`) | DOM fullscreen API, `window.addEventListener('popstate')`, `navigator` |
| `src/lib/math-sanitizer.ts` | Universal | Isomorphic; runs safely on server or client |
| `src/lib/thai-phonology.ts` | Universal | Pure algorithmic logic; zero DOM dependency |
| `src/lib/webgl-lifecycle.ts`| Universal / Client | Safe guards checking `typeof window !== 'undefined'` |
| `src/lib/worker-protocol.ts`| Universal | Pure TypeScript interface contracts and ArrayBuffer helpers |

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
