# Agent Operational Rules & Subagent Scope

> **Specification Reference**: `masterplan.md` (Sections 4, 11)  
> **Master Framework**: Firman Agentic OS + Lobe Architecture Guidelines  
> **Status**: Active Governance Directive  

---

## 1. Multi-Agent Team Architecture & Responsibilities

The development of the Interactive Learning Platform is orchestrated by a multi-agent hierarchy consisting of a Master Agent and specialized Sub-Agents as outlined in Section 4 of `masterplan.md`:

| Agent Role | Primary Responsibilities | Key Deliverables |
|---|---|---|
| **Master Agent** | Overall workflow orchestration, architectural coherence, requirement scoping, subagent task dispatching, quality gate enforcement. | `docs/FEATURE_MATRIX.md`, phase transition approvals |
| **Research Agent** | Systematic open-source discovery across GitHub, package registries, academic demos, and technical papers. | `docs/REPOSITORY_CATALOG.md` |
| **Technical Auditor Agent** | Deep source code inspection, dependency hygiene, architecture compatibility, customization limits. | `docs/TECHNICAL_AUDIT.md` |
| **License Auditor Agent** | Strict OSS license compliance (MIT / Apache 2.0 preferred), attribution validation, commercial readiness. | `docs/LICENSE_AUDIT.md` |
| **Benchmark Agent** | Isolated repository cloning, build/run verification, FPS measurement, memory/CPU profiling, bundle size analysis. | `docs/BENCHMARK_REPORT.md` |
| **UI/UX Agent** | Clean design system adherence, mobile-first responsiveness, accessibility (a11y), Lucide vector iconography. | Component specs, Design tokens |
| **Educational Content Agent** | Academic correctness, curriculum alignment across 9 core subjects, equation accuracy. | Subject curriculum validation |
| **Simulation Agent** | 2D/3D physics/chemistry engines, ODE solvers, WebGL/Three.js lifecycle management, GPU resource disposal. | Simulation engine modules |
| **Integration Agent** | Internal module wiring, state synchronization, shared component isolation, zero duplication. | App Router page integrations |
| **QA Agent** | Automated unit/integration tests, cross-browser validation, regression testing, Thai multibyte boundary tests. | `docs/TEST_REPORT.md` |
| **Documentation Agent** | Technical specs, architecture diagrams, installation and developer guides. | Developer guides, API references |

---

## 2. Core Operational Laws (Firman Agentic OS)

### 2.1 Proactive Co-Architect Mindset
- Subagents are intellectual co-architects, not passive order-takers.
- All technical decisions, schemas, and state machines must possess architectural headroom for future feature phases.

### 2.2 The Anti-Emoji Mandate (Lobe 3)
- **Zero Unicode cartoon emojis** in professional UI buttons, status badges, headers, and navigation elements.
- Always use high-contrast SVG vector icons from `lucide-react`.
- When representing colors, themes, or filters, use real CSS gradients (`linear-gradient`) rendered in 24px circular pills instead of cartoon symbols.
- Eliminate redundant bracketed notes in Thai copywriting (e.g., avoid `(Default)`, `(CMS)` when the label is already self-describing).

### 2.3 Multibyte Thai UTF-8 Safety Engine (Lobe 3)
- Thai characters in UTF-8 are 3 bytes long (starting with byte `0xE0`).
- Never truncate or slice strings mid-byte across a 3-byte Thai sequence.
- Slicing strings for UI display must respect Unicode grapheme cluster boundaries using `Intl.Segmenter('th', { granularity: 'grapheme' })` to prevent detaching floating vowels and tonal marks.
- String truncation for network packets, buffer allocations, or storage limits must use byte-safe cutting (`safeTruncateThaiBytes`).
- Enforce the required typography hierarchy:
  - Primary Thai Body & Headings: `Prompt` or `Sarabun`
  - English Display: `Plus Jakarta Sans` or `Inter`
  - Code, QR Data & Telemetry: `JetBrains Mono` (tabular figures prevent layout shifting)

### 2.4 Kiosk Containment & Viewport Lockdown
- Enforce absolute viewport containment (`overscroll-behavior: none`).
- Clean cleanup of all RAF (requestAnimationFrame) loops, WebGL contexts, and event listeners upon component unmount.

### 2.5 Delivery Verification & Anti-Mockup Mandate (Lobe 4)
- Zero mockups, fake UI simulations, or `// TODO` stubs.
- Every deliverable must pass automated typechecking (`tsc --noEmit`), linting (`eslint`), unit testing (`node --test`), and production compilation (`next build`).
