# Changelog

All notable changes to the Interactive Learning Platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), adhering to Semantic Versioning.

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
